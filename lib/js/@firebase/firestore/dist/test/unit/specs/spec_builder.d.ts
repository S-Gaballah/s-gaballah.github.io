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
import { Query } from '../../../src/core/query';
import { TargetIdGenerator } from '../../../src/core/target_id_generator';
import { TargetId } from '../../../src/core/types';
import { Document, MaybeDocument, NoDocument } from '../../../src/model/document';
import { DocumentKey } from '../../../src/model/document_key';
import { JsonObject } from '../../../src/model/field_value';
import { Code } from '../../../src/util/error';
import { AnyJs } from '../../../src/util/misc';
import { TestSnapshotVersion } from '../../util/helpers';
import { TimerId } from '../../../src/util/async_queue';
import { RpcError } from './spec_rpc_error';
import { SpecConfig, SpecQuery, SpecStep } from './spec_test_runner';
export declare type QueryMap = {
    [query: string]: TargetId;
};
export declare type LimboMap = {
    [key: string]: TargetId;
};
export declare type ActiveTargetMap = {
    [targetId: number]: {
        query: SpecQuery;
        resumeToken: string;
    };
};
/**
 * Tracks the expected memory state of a client (e.g. the expected active watch
 * targets based on userListens(), userUnlistens(), and watchRemoves()
 * as well as the expectActiveTargets() and expectLimboDocs() expectations).
 *
 * Automatically keeping track of the active targets makes writing tests
 * much simpler and the tests much easier to follow.
 *
 * Whenever the map changes, the expected state is automatically encoded in
 * the tests.
 */
export declare class ClientMemoryState {
    activeTargets: ActiveTargetMap;
    queryMapping: QueryMap;
    limboMapping: LimboMap;
    limboIdGenerator: TargetIdGenerator;
    constructor();
    /** Reset all internal memory state (as done during a client restart). */
    reset(): void;
    /**
     * Reset the internal limbo mapping (as done during a primary lease failover).
     */
    resetLimboMapping(): void;
}
/**
 * Provides a high-level language to construct spec tests that can be exported
 * to the spec JSON format or be run as a spec test directly.
 *
 * Exported JSON tests can be used in other clients without the need to
 * duplicate tests in every client.
 */
export declare class SpecBuilder {
    protected config: SpecConfig;
    protected currentStep: SpecStep | null;
    private steps;
    private queryIdGenerator;
    private readonly currentClientState;
    protected readonly clientState: ClientMemoryState;
    private readonly limboIdGenerator;
    private readonly queryMapping;
    private readonly limboMapping;
    private readonly activeTargets;
    /**
     * Exports the spec steps as a JSON object that be used in the spec runner.
     */
    toJSON(): {
        config: SpecConfig;
        steps: SpecStep[];
    };
    /**
     * Run the spec as a test. If persistence is available it will run it with and
     * without persistence enabled.
     */
    runAsTest(name: string, usePersistence: boolean): Promise<void>;
    withGCEnabled(gcEnabled: boolean): this;
    userListens(query: Query, resumeToken?: string): this;
    /**
     * Registers a previously active target with the test expectations after a
     * stream disconnect.
     */
    restoreListen(query: Query, resumeToken: string): this;
    userUnlistens(query: Query): this;
    userSets(key: string, value: JsonObject<AnyJs>): this;
    userPatches(key: string, value: JsonObject<AnyJs>): this;
    userDeletes(key: string): this;
    becomeHidden(): this;
    becomeVisible(): this;
    runTimer(timerId: TimerId): this;
    changeUser(uid: string | null): this;
    disableNetwork(): this;
    enableNetwork(): this;
    restart(): this;
    shutdown(): this;
    /** Overrides the currently expected set of active targets. */
    expectActiveTargets(...targets: Array<{
        query: Query;
        resumeToken: string;
    }>): this;
    /**
     * Expects a document to be in limbo. A targetId is assigned if it's not in
     * limbo yet.
     */
    expectLimboDocs(...keys: DocumentKey[]): this;
    /**
     * Special helper for limbo documents that acks with either a document or
     * with no document for NoDocument. This is translated into normal watch
     * messages.
     */
    ackLimbo(version: TestSnapshotVersion, doc: Document | NoDocument): this;
    /**
     * Special helper for limbo documents that acks an unlisten for a limbo doc
     * with either a document or with no document for NoDocument. This is
     * translated into normal watch messages.
     */
    watchRemovesLimboTarget(doc: Document | NoDocument): this;
    /**
     * Acks a write with a version and optional additional options.
     *
     * expectUserCallback defaults to true if omitted.
     */
    writeAcks(doc: string, version: TestSnapshotVersion, options?: {
        expectUserCallback?: boolean;
        keepInQueue?: boolean;
    }): this;
    /**
     * Fails a write with an error and optional additional options.
     *
     * expectUserCallback defaults to true if omitted.
     */
    failWrite(doc: string, error: RpcError, options?: {
        expectUserCallback?: boolean;
        keepInQueue?: boolean;
    }): this;
    watchAcks(query: Query): this;
    watchCurrents(query: Query, resumeToken: string): this;
    watchRemoves(query: Query, cause?: RpcError): this;
    watchSends(targets: {
        affects?: Query[];
        removed?: Query[];
    }, ...docs: MaybeDocument[]): this;
    watchRemovesDoc(key: DocumentKey, ...targets: Query[]): this;
    watchFilters(queries: Query[], ...docs: DocumentKey[]): this;
    watchResets(...queries: Query[]): this;
    watchSnapshots(version: TestSnapshotVersion, targets?: Query[], resumeToken?: string): this;
    watchAcksFull(query: Query, version: TestSnapshotVersion, ...docs: Document[]): this;
    watchStreamCloses(error: Code, opts?: {
        runBackoffTimer: boolean;
    }): this;
    expectUserCallbacks(docs: {
        acknowledged?: string[];
        rejected?: string[];
    }): this;
    expectEvents(query: Query, events: {
        fromCache?: boolean;
        hasPendingWrites?: boolean;
        added?: Document[];
        modified?: Document[];
        removed?: Document[];
        metadata?: Document[];
        errorCode?: Code;
    }): this;
    /** Registers a query that is active in another tab. */
    expectListen(query: Query, resumeToken?: string): this;
    /** Removes a query that is no longer active in any tab. */
    expectUnlisten(query: Query): this;
    /**
     * Verifies the total number of requests sent to the write backend since test
     * initialization.
     */
    expectWriteStreamRequestCount(num: number): this;
    /**
     * Verifies the total number of requests sent to the watch backend since test
     * initialization.
     */
    expectWatchStreamRequestCount(num: number): this;
    expectNumOutstandingWrites(num: number): this;
    expectNumActiveClients(num: number): this;
    expectPrimaryState(isPrimary: boolean): this;
    private static queryToSpec(query);
    private static docToSpec(doc);
    private static keyToSpec(key);
    protected nextStep(): void;
    private assertStep(msg);
    private getTargetId(query);
}
/**
 * SpecBuilder that supports serialized interactions between different clients.
 *
 * Use `client(clientIndex)` to switch between clients.
 */
export declare class MultiClientSpecBuilder extends SpecBuilder {
    private activeClientIndex;
    private clientStates;
    protected readonly clientState: ClientMemoryState;
    client(clientIndex: number): MultiClientSpecBuilder;
    /**
     * Take the primary lease, even if another client has already obtained the
     * lease.
     */
    stealPrimaryLease(): this;
    protected nextStep(): void;
}
/** Starts a new single-client SpecTest. */
export declare function spec(): SpecBuilder;
/** Starts a new multi-client SpecTest. */
export declare function client(num: number, withGcEnabled?: boolean): MultiClientSpecBuilder;
