import { Transaction } from '../core/transaction';
import { OnlineState, TargetId } from '../core/types';
import { LocalStore } from '../local/local_store';
import { QueryData } from '../local/query_data';
import { DocumentKeySet } from '../model/collections';
import { AsyncQueue } from '../util/async_queue';
import { Datastore } from './datastore';
import { RemoteSyncer } from './remote_syncer';
import { TargetMetadataProvider } from './watch_change';
/**
 * RemoteStore - An interface to remotely stored data, basically providing a
 * wrapper around the Datastore that is more reliable for the rest of the
 * system.
 *
 * RemoteStore is responsible for maintaining the connection to the server.
 * - maintaining a list of active listens.
 * - reconnecting when the connection is dropped.
 * - resuming all the active listens on reconnect.
 *
 * RemoteStore handles all incoming events from the Datastore.
 * - listening to the watch stream and repackaging the events as RemoteEvents
 * - notifying SyncEngine of any changes to the active listens.
 *
 * RemoteStore takes writes from other components and handles them reliably.
 * - pulling pending mutations from LocalStore and sending them to Datastore.
 * - retrying mutations that failed because of network problems.
 * - acking mutations to the SyncEngine once they are accepted or rejected.
 */
export declare class RemoteStore implements TargetMetadataProvider {
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    private localStore;
    /** The client-side proxy for interacting with the backend. */
    private datastore;
    /**
     * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
     * LocalStore via fillWritePipeline() and have or will send to the write
     * stream.
     *
     * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
     * restart the write stream. When the stream is established the writes in the
     * pipeline will be sent in order.
     *
     * Writes remain in writePipeline until they are acknowledged by the backend
     * and thus will automatically be re-sent if the stream is interrupted /
     * restarted before they're acknowledged.
     *
     * Write responses from the backend are linked to their originating request
     * purely based on order, and so we can just shift() writes from the front of
     * the writePipeline as we receive responses.
     */
    private writePipeline;
    /**
     * A mapping of watched targets that the client cares about tracking and the
     * user has explicitly called a 'listen' for this target.
     *
     * These targets may or may not have been sent to or acknowledged by the
     * server. On re-establishing the listen stream, these targets should be sent
     * to the server. The targets removed with unlistens are removed eagerly
     * without waiting for confirmation from the listen stream.
     */
    private listenTargets;
    private watchStream;
    private writeStream;
    private watchChangeAggregator;
    /**
     * Set to true by enableNetwork() and false by disableNetwork() and indicates
     * the user-preferred network state.
     */
    private networkEnabled;
    private isPrimary;
    private onlineStateTracker;
    constructor(
        /**
         * The local store, used to fill the write pipeline with outbound mutations.
         */
        localStore: LocalStore, 
        /** The client-side proxy for interacting with the backend. */
        datastore: Datastore, asyncQueue: AsyncQueue, onlineStateHandler: (onlineState: OnlineState) => void);
    /** SyncEngine to notify of watch and write events. */
    syncEngine: RemoteSyncer;
    /**
     * Starts up the remote store, creating streams, restoring state from
     * LocalStore, etc.
     */
    start(): Promise<void>;
    /** Re-enables the network. Idempotent. */
    enableNetwork(): Promise<void>;
    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */
    disableNetwork(): Promise<void>;
    private disableNetworkInternal();
    shutdown(): Promise<void>;
    /** Starts new listen for the given query. Uses resume token if provided */
    listen(queryData: QueryData): void;
    /** Removes the listen from server */
    unlisten(targetId: TargetId): void;
    /** {@link TargetMetadataProvider.getQueryDataForTarget} */
    getQueryDataForTarget(targetId: TargetId): QueryData | null;
    /** {@link TargetMetadataProvider.getRemoteKeysForTarget} */
    getRemoteKeysForTarget(targetId: TargetId): DocumentKeySet;
    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */
    private sendWatchRequest(queryData);
    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */
    private sendUnwatchRequest(targetId);
    private startWatchStream();
    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */
    private shouldStartWatchStream();
    private canUseNetwork();
    private cleanUpWatchStreamState();
    private onWatchStreamOpen();
    private onWatchStreamClose(error?);
    private onWatchStreamChange(watchChange, snapshotVersion);
    /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */
    private raiseWatchSnapshot(snapshotVersion);
    /** Handles an error on a target */
    private handleTargetError(watchChange);
    /**
     * Attempts to fill our write pipeline with writes from the LocalStore.
     *
     * Called internally to bootstrap or refill the write pipeline and by
     * SyncEngine whenever there are new mutations to process.
     *
     * Starts the write stream if necessary.
     */
    fillWritePipeline(): Promise<void>;
    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */
    private canAddToWritePipeline();
    outstandingWrites(): number;
    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */
    private addToWritePipeline(batch);
    private shouldStartWriteStream();
    private startWriteStream();
    private onWriteStreamOpen();
    private onWriteHandshakeComplete();
    private onMutationResult(commitVersion, results);
    private onWriteStreamClose(error?);
    private handleHandshakeError(error);
    private handleWriteError(error);
    createTransaction(): Transaction;
    handleCredentialChange(): Promise<void>;
    /**
     * Toggles the network state when the client gains or loses its primary lease.
     */
    applyPrimaryState(isPrimary: boolean): Promise<void>;
}
