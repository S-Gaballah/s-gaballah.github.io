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
import { Timestamp } from '../api/timestamp';
import { User } from '../auth/user';
import { Query } from '../core/query';
import { BatchId, ProtoByteString } from '../core/types';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { MutationBatch } from '../model/mutation_batch';
import { SortedMap } from '../util/sorted_map';
import { LocalSerializer } from './local_serializer';
import { MutationQueue } from './mutation_queue';
import { PersistenceTransaction, ReferenceDelegate } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { SimpleDbTransaction } from './simple_db';
import { AnyJs } from '../../src/util/misc';
/** A mutation queue for a specific user, backed by IndexedDB. */
export declare class IndexedDbMutationQueue implements MutationQueue {
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    private userId;
    private serializer;
    private readonly referenceDelegate;
    /**
     * Caches the document keys for pending mutation batches. If the mutation
     * has been removed from IndexedDb, the cached value may continue to
     * be used to retrieve the batch's document keys. To remove a cached value
     * locally, `removeCachedMutationKeys()` should be invoked either directly
     * or through `removeMutationBatches()`.
     *
     * With multi-tab, when the primary client acknowledges or rejects a mutation,
     * this cache is used by secondary clients to invalidate the local
     * view of the documents that were previously affected by the mutation.
     */
    private documentKeysByBatchId;
    constructor(
        /**
         * The normalized userId (e.g. null UID => "" userId) used to store /
         * retrieve mutations.
         */
        userId: string, serializer: LocalSerializer, referenceDelegate: ReferenceDelegate);
    /**
     * Creates a new mutation queue for the given user.
     * @param user The user for which to create a mutation queue.
     * @param serializer The serializer to use when persisting to IndexedDb.
     */
    static forUser(user: User, serializer: LocalSerializer, referenceDelegate: ReferenceDelegate): IndexedDbMutationQueue;
    checkEmpty(transaction: PersistenceTransaction): PersistencePromise<boolean>;
    acknowledgeBatch(transaction: PersistenceTransaction, batch: MutationBatch, streamToken: ProtoByteString): PersistencePromise<void>;
    getLastStreamToken(transaction: PersistenceTransaction): PersistencePromise<ProtoByteString>;
    setLastStreamToken(transaction: PersistenceTransaction, streamToken: ProtoByteString): PersistencePromise<void>;
    addMutationBatch(transaction: PersistenceTransaction, localWriteTime: Timestamp, mutations: Mutation[]): PersistencePromise<MutationBatch>;
    lookupMutationBatch(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    lookupMutationKeys(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<DocumentKeySet | null>;
    getNextMutationBatchAfterBatchId(transaction: PersistenceTransaction, batchId: BatchId): PersistencePromise<MutationBatch | null>;
    getAllMutationBatches(transaction: PersistenceTransaction): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKey(transaction: PersistenceTransaction, documentKey: DocumentKey): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKeys(transaction: PersistenceTransaction, documentKeys: SortedMap<DocumentKey, AnyJs>): PersistencePromise<MutationBatch[]>;
    getAllMutationBatchesAffectingQuery(transaction: PersistenceTransaction, query: Query): PersistencePromise<MutationBatch[]>;
    private lookupMutationBatches(transaction, batchIDs);
    removeMutationBatch(transaction: PersistenceTransaction, batch: MutationBatch): PersistencePromise<void>;
    removeCachedMutationKeys(batchId: BatchId): void;
    performConsistencyCheck(txn: PersistenceTransaction): PersistencePromise<void>;
    containsKey(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
    /** Returns the mutation queue's metadata from IndexedDb. */
    private getMutationQueueMetadata(transaction);
}
/** Returns true if any mutation queue contains the given document. */
export declare function mutationQueuesContainKey(txn: PersistenceTransaction, docKey: DocumentKey): PersistencePromise<boolean>;
/**
 * Delete a mutation batch and the associated document mutations.
 * @return A PersistencePromise of the document mutations that were removed.
 */
export declare function removeMutationBatch(txn: SimpleDbTransaction, userId: string, batch: MutationBatch): PersistencePromise<DocumentKey[]>;
