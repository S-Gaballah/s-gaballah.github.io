/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { User } from '../auth/user';
import { DatabaseInfo } from '../core/database_info';
import { SequenceNumberSyncer } from '../core/listen_sequence';
import { ListenSequenceNumber } from '../core/types';
import { DocumentKey } from '../model/document_key';
import { Platform } from '../platform/platform';
import { JsonProtoSerializer } from '../remote/serializer';
import { AsyncQueue } from '../util/async_queue';
import { FirestoreError } from '../util/error';
import { IndexedDbQueryCache } from './indexeddb_query_cache';
import { IndexedDbRemoteDocumentCache } from './indexeddb_remote_document_cache';
import { ActiveTargets, LruDelegate, LruGarbageCollector, LruParams } from './lru_garbage_collector';
import { MutationQueue } from './mutation_queue';
import { Persistence, PersistenceTransaction, PrimaryStateListener, ReferenceDelegate } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { QueryData } from './query_data';
import { ReferenceSet } from './reference_set';
import { ClientId } from './shared_client_state';
import { SimpleDbStore, SimpleDbTransaction } from './simple_db';
export declare class IndexedDbTransaction extends PersistenceTransaction {
    readonly simpleDbTransaction: SimpleDbTransaction;
    readonly currentSequenceNumber: any;
    constructor(simpleDbTransaction: SimpleDbTransaction, currentSequenceNumber: any);
}
/**
 * An IndexedDB-backed instance of Persistence. Data is stored persistently
 * across sessions.
 *
 * On Web only, the Firestore SDKs support shared access to its persistence
 * layer. This allows multiple browser tabs to read and write to IndexedDb and
 * to synchronize state even without network connectivity. Shared access is
 * currently optional and not enabled unless all clients invoke
 * `enablePersistence()` with `{experimentalTabSynchronization:true}`.
 *
 * In multi-tab mode, if multiple clients are active at the same time, the SDK
 * will designate one client as the “primary client”. An effort is made to pick
 * a visible, network-connected and active client, and this client is
 * responsible for letting other clients know about its presence. The primary
 * client writes a unique client-generated identifier (the client ID) to
 * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
 * update this entry, another client can acquire the lease and take over as
 * primary.
 *
 * Some persistence operations in the SDK are designated as primary-client only
 * operations. This includes the acknowledgment of mutations and all updates of
 * remote documents. The effects of these operations are written to persistence
 * and then broadcast to other tabs via LocalStorage (see
 * `WebStorageSharedClientState`), which then refresh their state from
 * persistence.
 *
 * Similarly, the primary client listens to notifications sent by secondary
 * clients to discover persistence changes written by secondary clients, such as
 * the addition of new mutations and query targets.
 *
 * If multi-tab is not enabled and another tab already obtained the primary
 * lease, IndexedDbPersistence enters a failed state and all subsequent
 * operations will automatically fail.
 *
 * Additionally, there is an optimization so that when a tab is closed, the
 * primary lease is released immediately (this is especially important to make
 * sure that a refreshed tab is able to immediately re-acquire the primary
 * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
 * since it is an asynchronous API. So in addition to attempting to give up the
 * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
 * LocalStorage which acts as an indicator that another tab should go ahead and
 * take the primary lease immediately regardless of the current lease timestamp.
 *
 * TODO(b/114226234): Remove `experimentalTabSynchronization` section when
 * multi-tab is no longer optional.
 */
export declare type MultiClientParams = {
    sequenceNumberSyncer: SequenceNumberSyncer;
};
export declare class IndexedDbPersistence implements Persistence {
    private readonly persistenceKey;
    private readonly clientId;
    private readonly queue;
    private readonly multiClientParams;
    static getStore<Key extends IDBValidKey, Value>(txn: PersistenceTransaction, store: string): SimpleDbStore<Key, Value>;
    /**
     * The name of the main (and currently only) IndexedDB database. this name is
     * appended to the prefix provided to the IndexedDbPersistence constructor.
     */
    static MAIN_DATABASE: string;
    static createIndexedDbPersistence(persistenceKey: string, clientId: ClientId, platform: Platform, queue: AsyncQueue, serializer: JsonProtoSerializer, lruParams: LruParams): Promise<IndexedDbPersistence>;
    static createMultiClientIndexedDbPersistence(persistenceKey: string, clientId: ClientId, platform: Platform, queue: AsyncQueue, serializer: JsonProtoSerializer, lruParams: LruParams, multiClientParams: MultiClientParams): Promise<IndexedDbPersistence>;
    private readonly document;
    private readonly window;
    private simpleDb;
    private _started;
    private isPrimary;
    private networkEnabled;
    private dbName;
    /** Our window.unload handler, if registered. */
    private windowUnloadHandler;
    private inForeground;
    private serializer;
    /** Our 'visibilitychange' listener if registered. */
    private documentVisibilityHandler;
    /** The client metadata refresh task. */
    private clientMetadataRefresher;
    /** The last time we garbage collected the Remote Document Changelog. */
    private lastGarbageCollectionTime;
    /** Whether to allow shared multi-tab access to the persistence layer. */
    private allowTabSynchronization;
    /** A listener to notify on primary state changes. */
    private primaryStateListener;
    private readonly queryCache;
    private readonly remoteDocumentCache;
    private readonly webStorage;
    private listenSequence;
    readonly referenceDelegate: IndexedDbLruDelegate;
    private constructor();
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @return {Promise<void>} Whether persistence was enabled.
     */
    private start();
    private startRemoteDocumentCache();
    setPrimaryStateListener(primaryStateListener: PrimaryStateListener): Promise<void>;
    setNetworkEnabled(networkEnabled: boolean): void;
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    private updateClientMetadataAndTryBecomePrimary();
    private verifyPrimaryLease(txn);
    private removeClientMetadata(txn);
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    private maybeGarbageCollectMultiClientState();
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    private scheduleClientMetadataAndPrimaryLeaseRefreshes();
    /** Checks whether `client` is the local client. */
    private isLocalClient(client);
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    private canActAsPrimary(txn);
    shutdown(deleteData?: boolean): Promise<void>;
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    private filterActiveClients(clients, activityThresholdMs);
    getActiveClients(): Promise<ClientId[]>;
    readonly started: boolean;
    getMutationQueue(user: User): MutationQueue;
    getQueryCache(): IndexedDbQueryCache;
    getRemoteDocumentCache(): IndexedDbRemoteDocumentCache;
    runTransaction<T>(action: string, mode: 'readonly' | 'readwrite' | 'readwrite-primary', transactionOperation: (transaction: PersistenceTransaction) => PersistencePromise<T>): Promise<T>;
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    private verifyAllowTabSynchronization(txn);
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    private acquireOrExtendPrimaryLease(txn);
    static isAvailable(): boolean;
    /**
     * Generates a string used as a prefix when storing data in IndexedDB and
     * LocalStorage.
     */
    static buildStoragePrefix(databaseInfo: DatabaseInfo): string;
    /** Checks the primary lease and removes it if we are the current primary. */
    private releasePrimaryLeaseIfHeld(txn);
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */
    private isWithinAge(updateTimeMs, maxAgeMs);
    private attachVisibilityHandler();
    private detachVisibilityHandler();
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    private attachWindowUnloadHook();
    private detachWindowUnloadHook();
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    private isClientZombied(clientId);
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    private markClientZombied();
    /** Removes the zombied client entry if it exists. */
    private removeClientZombiedEntry();
    private zombiedClientLocalStorageKey(clientId);
}
/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err An error returned by a LocalStore operation.
 * @return A Promise that resolves after we recovered, or the original error.
 */
export declare function ignoreIfPrimaryLeaseLoss(err: FirestoreError): Promise<void>;
/** Provides LRU functionality for IndexedDB persistence. */
export declare class IndexedDbLruDelegate implements ReferenceDelegate, LruDelegate {
    private readonly db;
    private inMemoryPins;
    readonly garbageCollector: LruGarbageCollector;
    constructor(db: IndexedDbPersistence, params: LruParams);
    getSequenceNumberCount(txn: PersistenceTransaction): PersistencePromise<number>;
    private orphanedDocmentCount(txn);
    forEachTarget(txn: PersistenceTransaction, f: (q: QueryData) => void): PersistencePromise<void>;
    forEachOrphanedDocumentSequenceNumber(txn: PersistenceTransaction, f: (sequenceNumber: ListenSequenceNumber) => void): PersistencePromise<void>;
    setInMemoryPins(inMemoryPins: ReferenceSet): void;
    addReference(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    removeReference(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    removeMutationReference(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    private isPinned(txn, docKey);
    removeOrphanedDocuments(txn: PersistenceTransaction, upperBound: ListenSequenceNumber): PersistencePromise<number>;
    /**
     * Clears a document from the cache. The document is assumed to be orphaned, so target-document
     * associations are not queried. We remove it from the remote document cache, as well as remove
     * its sentinel row.
     */
    private removeOrphanedDocument(txn, docKey);
    removeTarget(txn: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    updateLimboDocument(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<void>;
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    private forEachOrphanedDocument(txn, f);
    getCacheSize(txn: PersistenceTransaction): PersistencePromise<number>;
}
