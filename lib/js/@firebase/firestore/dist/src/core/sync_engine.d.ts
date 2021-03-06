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
import { LocalStore } from '../local/local_store';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { MutationBatchResult } from '../model/mutation_batch';
import { RemoteEvent } from '../remote/remote_event';
import { RemoteStore } from '../remote/remote_store';
import { RemoteSyncer } from '../remote/remote_syncer';
import { FirestoreError } from '../util/error';
import { Deferred } from '../util/promise';
import { SortedMap } from '../util/sorted_map';
import { ClientId, SharedClientState } from '../local/shared_client_state';
import { QueryTargetState, SharedClientStateSyncer } from '../local/shared_client_state_syncer';
import { Query } from './query';
import { Transaction } from './transaction';
import { BatchId, MutationBatchState, OnlineState, OnlineStateSource, TargetId } from './types';
import { ViewSnapshot } from './view_snapshot';
/**
 * Interface implemented by EventManager to handle notifications from
 * SyncEngine.
 */
export interface SyncEngineListener {
    /** Handles new view snapshots. */
    onWatchChange(snapshots: ViewSnapshot[]): void;
    /** Handles the failure of a query. */
    onWatchError(query: Query, error: Error): void;
    /** Handles a change in online state. */
    onOnlineStateChange(onlineState: OnlineState): void;
}
/**
 * SyncEngine is the central controller in the client SDK architecture. It is
 * the glue code between the EventManager, LocalStore, and RemoteStore. Some of
 * SyncEngine's responsibilities include:
 * 1. Coordinating client requests and remote events between the EventManager
 *    and the local and remote data stores.
 * 2. Managing a View object for each query, providing the unified view between
 *    the local and remote data stores.
 * 3. Notifying the RemoteStore when the LocalStore has new mutations in its
 *    queue that need sending to the backend.
 *
 * The SyncEngine’s methods should only ever be called by methods running in the
 * global async queue.
 */
export declare class SyncEngine implements RemoteSyncer, SharedClientStateSyncer {
    private localStore;
    private remoteStore;
    private sharedClientState;
    private currentUser;
    private syncEngineListener;
    private queryViewsByQuery;
    private queryViewsByTarget;
    private limboTargetsByKey;
    private limboResolutionsByTarget;
    private limboDocumentRefs;
    /** Stores user completion handlers, indexed by User and BatchId. */
    private mutationUserCallbacks;
    private limboTargetIdGenerator;
    private isPrimary;
    private onlineState;
    constructor(localStore: LocalStore, remoteStore: RemoteStore, sharedClientState: SharedClientState, currentUser: User);
    readonly isPrimaryClient: boolean;
    /** Subscribes to SyncEngine notifications. Has to be called exactly once. */
    subscribe(syncEngineListener: SyncEngineListener): void;
    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the targetId of the query.
     */
    listen(query: Query): Promise<TargetId>;
    /**
     * Registers a view for a previously unknown query and computes its initial
     * snapshot.
     */
    private initializeViewAndComputeSnapshot(queryData, current);
    /**
     * Reconcile the list of synced documents in an existing view with those
     * from persistence.
     */
    private synchronizeViewAndComputeSnapshot(queryView);
    /** Stops listening to the query. */
    unlisten(query: Query): Promise<void>;
    /**
     * Initiates the write of local mutation batch which involves adding the
     * writes to the mutation queue, notifying the remote store about new
     * mutations and raising events for any changes this write caused.
     *
     * The promise returned by this call is resolved when the above steps
     * have completed, *not* when the write was acked by the backend. The
     * userCallback is resolved once the write was acked/rejected by the
     * backend (or failed locally for any other reason).
     */
    write(batch: Mutation[], userCallback: Deferred<void>): Promise<void>;
    private wrapUpdateFunctionError(error);
    /**
     * Takes an updateFunction in which a set of reads and writes can be performed
     * atomically. In the updateFunction, the client can read and write values
     * using the supplied transaction object. After the updateFunction, all
     * changes will be committed. If some other client has changed any of the data
     * referenced, then the updateFunction will be called again. If the
     * updateFunction still fails after the given number of retries, then the
     * transaction will be rejection.
     *
     * The transaction object passed to the updateFunction contains methods for
     * accessing documents and collections. Unlike other datastore access, data
     * accessed with the transaction will not reflect local changes that have not
     * been committed. For this reason, it is required that all reads are
     * performed before any writes. Transactions must be performed while online.
     *
     * The promise returned is resolved when the transaction is fully committed.
     */
    runTransaction<T>(updateFunction: (transaction: Transaction) => Promise<T>, retries?: number): Promise<T>;
    applyRemoteEvent(remoteEvent: RemoteEvent): Promise<void>;
    /**
     * Applies an OnlineState change to the sync engine and notifies any views of
     * the change.
     */
    applyOnlineStateChange(onlineState: OnlineState, source: OnlineStateSource): void;
    rejectListen(targetId: TargetId, err: FirestoreError): Promise<void>;
    applyBatchState(batchId: BatchId, batchState: MutationBatchState, error?: FirestoreError): Promise<void>;
    applySuccessfulWrite(mutationBatchResult: MutationBatchResult): Promise<void>;
    rejectFailedWrite(batchId: BatchId, error: FirestoreError): Promise<void>;
    private addMutationCallback(batchId, callback);
    /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */
    private processUserCallback(batchId, error);
    private removeAndCleanupQuery(queryView);
    private removeLimboTarget(key);
    private updateTrackedLimbos(targetId, limboChanges);
    private trackLimboChange(limboChange);
    currentLimboDocs(): SortedMap<DocumentKey, TargetId>;
    private emitNewSnapsAndNotifyLocalStore(changes, remoteEvent?);
    private assertSubscribed(fnName);
    handleCredentialChange(user: User): Promise<void>;
    applyPrimaryState(isPrimary: boolean): Promise<void>;
    private resetLimboDocuments();
    /**
     * Reconcile the query views of the provided query targets with the state from
     * persistence. Raises snapshots for any changes that affect the local
     * client and returns the updated state of all target's query data.
     */
    private synchronizeQueryViewsAndRaiseSnapshots(targets);
    getActiveClients(): Promise<ClientId[]>;
    applyTargetState(targetId: TargetId, state: QueryTargetState, error?: FirestoreError): Promise<void>;
    applyActiveTargetsChange(added: TargetId[], removed: TargetId[]): Promise<void>;
    enableNetwork(): Promise<void>;
    disableNetwork(): Promise<void>;
    getRemoteKeysForTarget(targetId: TargetId): DocumentKeySet;
}
