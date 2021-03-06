import { User } from '../auth/user';
import { Query } from '../core/query';
import { SnapshotVersion } from '../core/snapshot_version';
import { BatchId, ProtoByteString, TargetId } from '../core/types';
import { DocumentKeySet, DocumentMap, MaybeDocumentMap } from '../model/collections';
import { MaybeDocument } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { MutationBatch, MutationBatchResult } from '../model/mutation_batch';
import { RemoteEvent } from '../remote/remote_event';
import { LocalViewChanges } from './local_view_changes';
import { LruGarbageCollector, LruResults } from './lru_garbage_collector';
import { Persistence } from './persistence';
import { QueryData } from './query_data';
import { ClientId } from './shared_client_state';
/** The result of a write to the local store. */
export interface LocalWriteResult {
    batchId: BatchId;
    changes: MaybeDocumentMap;
}
/** The result of a user-change operation in the local store. */
export interface UserChangeResult {
    readonly affectedDocuments: MaybeDocumentMap;
    readonly removedBatchIds: BatchId[];
    readonly addedBatchIds: BatchId[];
}
/**
 * Local storage in the Firestore client. Coordinates persistence components
 * like the mutation queue and remote document cache to present a
 * latency-compensated view of stored data.
 *
 * The LocalStore is responsible for accepting mutations from the Sync Engine.
 * Writes from the client are put into a queue as provisional Mutations until
 * they are processed by the RemoteStore and confirmed as having been written
 * to the server.
 *
 * The local store provides the local version of documents that have been
 * modified locally. It maintains the constraint:
 *
 *   LocalDocument = RemoteDocument + Active(LocalMutations)
 *
 * (Active mutations are those that are enqueued and have not been previously
 * acknowledged or rejected).
 *
 * The RemoteDocument ("ground truth") state is provided via the
 * applyChangeBatch method. It will be some version of a server-provided
 * document OR will be a server-provided document PLUS acknowledged mutations:
 *
 *   RemoteDocument' = RemoteDocument + Acknowledged(LocalMutations)
 *
 * Note that this "dirty" version of a RemoteDocument will not be identical to a
 * server base version, since it has LocalMutations added to it pending getting
 * an authoritative copy from the server.
 *
 * Since LocalMutations can be rejected by the server, we have to be able to
 * revert a LocalMutation that has already been applied to the LocalDocument
 * (typically done by replaying all remaining LocalMutations to the
 * RemoteDocument to re-apply).
 *
 * The LocalStore is responsible for the garbage collection of the documents it
 * contains. For now, it every doc referenced by a view, the mutation queue, or
 * the RemoteStore.
 *
 * It also maintains the persistence of mapping queries to resume tokens and
 * target ids. It needs to know this data about queries to properly know what
 * docs it would be allowed to garbage collect.
 *
 * The LocalStore must be able to efficiently execute queries against its local
 * cache of the documents, to provide the initial set of results before any
 * remote changes have been received.
 *
 * Note: In TypeScript, most methods return Promises since the implementation
 * may rely on fetching data from IndexedDB which is async.
 * These Promises will only be rejected on an I/O error or other internal
 * (unexpected) failure (e.g. failed assert) and always represent an
 * unrecoverable error (should be caught / reported by the async_queue).
 */
export declare class LocalStore {
    /** Manages our in-memory or durable persistence. */
    private persistence;
    /**
     * The maximum time to leave a resume token buffered without writing it out.
     * This value is arbitrary: it's long enough to avoid several writes
     * (possibly indefinitely if updates come more frequently than this) but
     * short enough that restarting after crashing will still have a pretty
     * recent resume token.
     */
    private static readonly RESUME_TOKEN_MAX_AGE_MICROS;
    /**
     * The set of all mutations that have been sent but not yet been applied to
     * the backend.
     */
    private mutationQueue;
    /** The set of all cached remote documents. */
    private remoteDocuments;
    /**
     * The "local" view of all documents (layering mutationQueue on top of
     * remoteDocumentCache).
     */
    private localDocuments;
    /**
     * The set of document references maintained by any local views.
     */
    private localViewReferences;
    /** Maps a query to the data about that query. */
    private queryCache;
    /** Maps a targetID to data about its query. */
    private queryDataByTarget;
    constructor(
        /** Manages our in-memory or durable persistence. */
        persistence: Persistence, initialUser: User);
    /**
     * Tells the LocalStore that the currently authenticated user has changed.
     *
     * In response the local store switches the mutation queue to the new user and
     * returns any resulting document changes.
     */
    handleUserChange(user: User): Promise<UserChangeResult>;
    localWrite(mutations: Mutation[]): Promise<LocalWriteResult>;
    /** Returns the local view of the documents affected by a mutation batch. */
    lookupMutationDocuments(batchId: BatchId): Promise<MaybeDocumentMap | null>;
    /**
     * Acknowledge the given batch.
     *
     * On the happy path when a batch is acknowledged, the local store will
     *
     *  + remove the batch from the mutation queue;
     *  + apply the changes to the remote document cache;
     *  + recalculate the latency compensated view implied by those changes (there
     *    may be mutations in the queue that affect the documents but haven't been
     *    acknowledged yet); and
     *  + give the changed documents back the sync engine
     *
     * @returns The resulting (modified) documents.
     */
    acknowledgeBatch(batchResult: MutationBatchResult): Promise<MaybeDocumentMap>;
    /**
     * Remove mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */
    rejectBatch(batchId: BatchId): Promise<MaybeDocumentMap>;
    /** Returns the last recorded stream token for the current user. */
    getLastStreamToken(): Promise<ProtoByteString>;
    /**
     * Sets the stream token for the current user without acknowledging any
     * mutation batch. This is usually only useful after a stream handshake or in
     * response to an error that requires clearing the stream token.
     */
    setLastStreamToken(streamToken: ProtoByteString): Promise<void>;
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */
    getLastRemoteSnapshotVersion(): Promise<SnapshotVersion>;
    /**
     * Update the "ground-state" (remote) documents. We assume that the remote
     * event reflects any write batches that have been acknowledged or rejected
     * (i.e. we do not re-apply local mutations to updates from this event).
     *
     * LocalDocuments are re-calculated if there are remaining mutations in the
     * queue.
     */
    applyRemoteEvent(remoteEvent: RemoteEvent): Promise<MaybeDocumentMap>;
    /**
     * Returns true if the newQueryData should be persisted during an update of
     * an active target. QueryData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, QueryData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
    private static shouldPersistQueryData(oldQueryData, newQueryData, change);
    /**
     * Notify local store of the changed views to locally pin documents.
     */
    notifyLocalViewChanges(viewChanges: LocalViewChanges[]): Promise<void>;
    /**
     * Gets the mutation batch after the passed in batchId in the mutation queue
     * or null if empty.
     * @param afterBatchId If provided, the batch to search after.
     * @returns The next mutation or null if there wasn't one.
     */
    nextMutationBatch(afterBatchId?: BatchId): Promise<MutationBatch | null>;
    /**
     * Read the current value of a Document with a given key or null if not
     * found - used for testing.
     */
    readDocument(key: DocumentKey): Promise<MaybeDocument | null>;
    /**
     * Assigns the given query an internal ID so that its results can be pinned so
     * they don't get GC'd. A query must be allocated in the local store before
     * the store can be used to manage its view.
     */
    allocateQuery(query: Query): Promise<QueryData>;
    /**
     * Unpin all the documents associated with the given query. If
     * `keepPersistedQueryData` is set to false and Eager GC enabled, the method
     * directly removes the associated query data from the query cache.
     */
    releaseQuery(query: Query, keepPersistedQueryData: boolean): Promise<void>;
    /**
     * Runs the specified query against all the documents in the local store and
     * returns the results.
     */
    executeQuery(query: Query): Promise<DocumentMap>;
    /**
     * Returns the keys of the documents that are associated with the given
     * target id in the remote table.
     */
    remoteDocumentKeys(targetId: TargetId): Promise<DocumentKeySet>;
    getActiveClients(): Promise<ClientId[]>;
    removeCachedMutationBatchMetadata(batchId: BatchId): void;
    setNetworkEnabled(networkEnabled: boolean): void;
    private applyWriteToRemoteDocuments(txn, batchResult, documentBuffer);
    collectGarbage(garbageCollector: LruGarbageCollector): Promise<LruResults>;
    getQueryForTarget(targetId: TargetId): Promise<Query | null>;
    getNewDocumentChanges(): Promise<MaybeDocumentMap>;
}
