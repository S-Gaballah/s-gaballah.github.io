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
import { Query } from '../core/query';
import { SnapshotVersion } from '../core/snapshot_version';
import { ListenSequenceNumber, TargetId } from '../core/types';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { ActiveTargets } from './lru_garbage_collector';
import { MemoryPersistence } from './memory_persistence';
import { PersistenceTransaction } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { QueryCache } from './query_cache';
import { QueryData } from './query_data';
export declare class MemoryQueryCache implements QueryCache {
    private readonly persistence;
    /**
     * Maps a query to the data about that query
     */
    private queries;
    /** The last received snapshot version. */
    private lastRemoteSnapshotVersion;
    /** The highest numbered target ID encountered. */
    private highestTargetId;
    /** The highest sequence number encountered. */
    private highestSequenceNumber;
    /**
     * A ordered bidirectional mapping between documents and the remote target
     * IDs.
     */
    private references;
    private targetCount;
    private targetIdGenerator;
    constructor(persistence: MemoryPersistence);
    getTargetCount(txn: PersistenceTransaction): PersistencePromise<number>;
    forEachTarget(txn: PersistenceTransaction, f: (q: QueryData) => void): PersistencePromise<void>;
    getLastRemoteSnapshotVersion(transaction: PersistenceTransaction): PersistencePromise<SnapshotVersion>;
    getHighestSequenceNumber(transaction: PersistenceTransaction): PersistencePromise<ListenSequenceNumber>;
    allocateTargetId(transaction: PersistenceTransaction): PersistencePromise<TargetId>;
    setTargetsMetadata(transaction: PersistenceTransaction, highestListenSequenceNumber: number, lastRemoteSnapshotVersion?: SnapshotVersion): PersistencePromise<void>;
    private saveQueryData(queryData);
    addQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    updateQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    removeQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    removeTargets(transaction: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    getQueryCount(transaction: PersistenceTransaction): PersistencePromise<number>;
    getQueryData(transaction: PersistenceTransaction, query: Query): PersistencePromise<QueryData | null>;
    getQueryDataForTarget(transaction: PersistenceTransaction, targetId: TargetId): never;
    addMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<void>;
    getMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<DocumentKeySet>;
    containsKey(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
}
