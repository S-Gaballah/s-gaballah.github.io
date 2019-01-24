import { ListenSequenceNumber } from '../core/types';
import { AsyncQueue } from '../util/async_queue';
import { AnyJs } from '../util/misc';
import { LocalStore } from './local_store';
import { PersistenceTransaction } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { QueryData } from './query_data';
/**
 * Persistence layers intending to use LRU Garbage collection should have reference delegates that
 * implement this interface. This interface defines the operations that the LRU garbage collector
 * needs from the persistence layer.
 */
export interface LruDelegate {
    readonly garbageCollector: LruGarbageCollector;
    /** Enumerates all the targets in the QueryCache. */
    forEachTarget(txn: PersistenceTransaction, f: (target: QueryData) => void): PersistencePromise<void>;
    getSequenceNumberCount(txn: PersistenceTransaction): PersistencePromise<number>;
    /**
     * Enumerates sequence numbers for documents not associated with a target.
     * Note that this may include duplicate sequence numbers.
     */
    forEachOrphanedDocumentSequenceNumber(txn: PersistenceTransaction, f: (sequenceNumber: ListenSequenceNumber) => void): PersistencePromise<void>;
    /**
     * Removes all targets that have a sequence number less than or equal to `upperBound`, and are not
     * present in the `activeTargetIds` set.
     *
     * @return the number of targets removed.
     */
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    /**
     * Removes all unreferenced documents from the cache that have a sequence number less than or
     * equal to the given `upperBound`.
     *
     * @return the number of documents removed.
     */
    removeOrphanedDocuments(txn: PersistenceTransaction, upperBound: ListenSequenceNumber): PersistencePromise<number>;
    getCacheSize(txn: PersistenceTransaction): PersistencePromise<number>;
}
/**
 * Describes an object whose keys are active target ids. We do not care about the type of the
 * values.
 */
export declare type ActiveTargets = {
    [id: number]: AnyJs;
};
/**
 * Describes the results of a garbage collection run. `didRun` will be set to
 * `false` if collection was skipped (either it is disabled or the cache size
 * has not hit the threshold). If collection ran, the other fields will be
 * filled in with the details of the results.
 */
export declare type LruResults = {
    readonly didRun: boolean;
    readonly sequenceNumbersCollected: number;
    readonly targetsRemoved: number;
    readonly documentsRemoved: number;
};
export declare class LruParams {
    readonly cacheSizeCollectionThreshold: number;
    readonly percentileToCollect: number;
    readonly maximumSequenceNumbersToCollect: number;
    static readonly COLLECTION_DISABLED: number;
    static readonly MINIMUM_CACHE_SIZE_BYTES: number;
    static readonly DEFAULT_CACHE_SIZE_BYTES: number;
    private static readonly DEFAULT_COLLECTION_PERCENTILE;
    private static readonly DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT;
    static withCacheSize(cacheSize: number): LruParams;
    static readonly DEFAULT: LruParams;
    static readonly DISABLED: LruParams;
    constructor(cacheSizeCollectionThreshold: number, percentileToCollect: number, maximumSequenceNumbersToCollect: number);
}
/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */
export declare class LruScheduler {
    private readonly garbageCollector;
    private readonly asyncQueue;
    private readonly localStore;
    private hasRun;
    private gcTask;
    constructor(garbageCollector: LruGarbageCollector, asyncQueue: AsyncQueue, localStore: LocalStore);
    start(): void;
    stop(): void;
    readonly started: boolean;
    private scheduleGC();
}
/** Implements the steps for LRU garbage collection. */
export declare class LruGarbageCollector {
    private readonly delegate;
    readonly params: LruParams;
    constructor(delegate: LruDelegate, params: LruParams);
    /** Given a percentile of target to collect, returns the number of targets to collect. */
    calculateTargetCount(txn: PersistenceTransaction, percentile: number): PersistencePromise<number>;
    /** Returns the nth sequence number, counting in order from the smallest. */
    nthSequenceNumber(txn: PersistenceTransaction, n: number): PersistencePromise<ListenSequenceNumber>;
    /**
     * Removes targets with a sequence number equal to or less than the given upper bound, and removes
     * document associations with those targets.
     */
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    /**
     * Removes documents that have a sequence number equal to or less than the upper bound and are not
     * otherwise pinned.
     */
    removeOrphanedDocuments(txn: PersistenceTransaction, upperBound: ListenSequenceNumber): PersistencePromise<number>;
    collect(txn: PersistenceTransaction, activeTargetIds: ActiveTargets): PersistencePromise<LruResults>;
    getCacheSize(txn: PersistenceTransaction): PersistencePromise<number>;
    private runGarbageCollection(txn, activeTargetIds);
}
