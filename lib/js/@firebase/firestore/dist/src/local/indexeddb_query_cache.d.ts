import { Query } from '../core/query';
import { SnapshotVersion } from '../core/snapshot_version';
import { ListenSequenceNumber, TargetId } from '../core/types';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { IndexedDbLruDelegate } from './indexeddb_persistence';
import { DbTargetDocument, DbTargetDocumentKey } from './indexeddb_schema';
import { LocalSerializer } from './local_serializer';
import { ActiveTargets } from './lru_garbage_collector';
import { PersistenceTransaction } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { QueryCache } from './query_cache';
import { QueryData } from './query_data';
import { SimpleDbStore, SimpleDbTransaction } from './simple_db';
export declare class IndexedDbQueryCache implements QueryCache {
    private readonly referenceDelegate;
    private serializer;
    constructor(referenceDelegate: IndexedDbLruDelegate, serializer: LocalSerializer);
    private targetIdGenerator;
    allocateTargetId(transaction: PersistenceTransaction): PersistencePromise<TargetId>;
    getLastRemoteSnapshotVersion(transaction: PersistenceTransaction): PersistencePromise<SnapshotVersion>;
    getHighestSequenceNumber(transaction: PersistenceTransaction): PersistencePromise<ListenSequenceNumber>;
    setTargetsMetadata(transaction: PersistenceTransaction, highestListenSequenceNumber: number, lastRemoteSnapshotVersion?: SnapshotVersion): PersistencePromise<void>;
    addQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    updateQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    removeQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    /**
     * Call provided function with each `QueryData` that we have cached.
     */
    forEachTarget(txn: PersistenceTransaction, f: (q: QueryData) => void): PersistencePromise<void>;
    private retrieveMetadata(transaction);
    private saveMetadata(transaction, metadata);
    private saveQueryData(transaction, queryData);
    /**
     * In-place updates the provided metadata to account for values in the given
     * QueryData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    private updateMetadataFromQueryData(queryData, metadata);
    getQueryCount(transaction: PersistenceTransaction): PersistencePromise<number>;
    getQueryData(transaction: PersistenceTransaction, query: Query): PersistencePromise<QueryData | null>;
    addMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<void>;
    getMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<DocumentKeySet>;
    containsKey(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
    getQueryDataForTarget(transaction: PersistenceTransaction, targetId: TargetId): PersistencePromise<QueryData | null>;
}
export declare function getHighestListenSequenceNumber(txn: SimpleDbTransaction): PersistencePromise<ListenSequenceNumber>;
/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */
export declare function documentTargetStore(txn: PersistenceTransaction): SimpleDbStore<DbTargetDocumentKey, DbTargetDocument>;
