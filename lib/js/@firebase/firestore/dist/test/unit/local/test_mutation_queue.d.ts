import { Query } from '../../../src/core/query';
import { BatchId, ProtoByteString } from '../../../src/core/types';
import { MutationQueue } from '../../../src/local/mutation_queue';
import { Persistence } from '../../../src/local/persistence';
import { DocumentKeySet } from '../../../src/model/collections';
import { DocumentKey } from '../../../src/model/document_key';
import { Mutation } from '../../../src/model/mutation';
import { MutationBatch } from '../../../src/model/mutation_batch';
/**
 * A wrapper around a MutationQueue that automatically creates a
 * transaction around every operation to reduce test boilerplate.
 */
export declare class TestMutationQueue {
    persistence: Persistence;
    queue: MutationQueue;
    constructor(persistence: Persistence, queue: MutationQueue);
    checkEmpty(): Promise<boolean>;
    countBatches(): Promise<number>;
    acknowledgeBatch(batch: MutationBatch, streamToken: ProtoByteString): Promise<void>;
    getLastStreamToken(): Promise<string>;
    setLastStreamToken(streamToken: string): Promise<void>;
    addMutationBatch(mutations: Mutation[]): Promise<MutationBatch>;
    lookupMutationBatch(batchId: BatchId): Promise<MutationBatch | null>;
    getNextMutationBatchAfterBatchId(batchId: BatchId): Promise<MutationBatch | null>;
    getAllMutationBatches(): Promise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKey(documentKey: DocumentKey): Promise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKeys(documentKeys: DocumentKeySet): Promise<MutationBatch[]>;
    getAllMutationBatchesAffectingQuery(query: Query): Promise<MutationBatch[]>;
    removeMutationBatch(batch: MutationBatch): Promise<void>;
}
