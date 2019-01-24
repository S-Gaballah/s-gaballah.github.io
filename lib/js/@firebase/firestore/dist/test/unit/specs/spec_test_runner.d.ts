import { TargetId } from '../../../src/core/types';
import { DocumentOptions } from '../../../src/model/document';
import { JsonObject } from '../../../src/model/field_value';
import { AnyJs } from '../../../src/util/misc';
import { TestSnapshotVersion } from '../../util/helpers';
/**
 * Runs a spec test case.
 *
 * The spec consists of an array of individual steps to run in sequence.
 */
export declare function runSpec(name: string, usePersistence: boolean, config: SpecConfig, steps: SpecStep[]): Promise<void>;
/** Specifies initial configuration information for the test. */
export interface SpecConfig {
    /** A boolean to enable / disable GC. */
    useGarbageCollection: boolean;
    /** The number of active clients for this test run. */
    numClients: number;
}
/**
 * Union type for each step. The step consists of exactly one `field`
 * set and optionally expected events in the `expect` field.
 */
export interface SpecStep {
    /** The index of the local client for multi-client spec tests. */
    clientIndex?: number;
    /** Listen to a new query (must be unique) */
    userListen?: SpecUserListen;
    /** Unlisten from a query (must be listened to) */
    userUnlisten?: SpecUserUnlisten;
    /** Perform a user initiated set */
    userSet?: SpecUserSet;
    /** Perform a user initiated patch */
    userPatch?: SpecUserPatch;
    /** Perform a user initiated delete */
    userDelete?: SpecUserDelete;
    /** Ack for a query in the watch stream */
    watchAck?: SpecWatchAck;
    /** Marks the query results as current */
    watchCurrent?: SpecWatchCurrent;
    /** Reset the results of a query */
    watchReset?: SpecWatchReset;
    /** Ack for remove or rejection of a query in the watch stream */
    watchRemove?: SpecWatchRemove;
    /** Document update in the watch stream */
    watchEntity?: SpecWatchEntity;
    /** Existence filter in the watch stream */
    watchFilter?: SpecWatchFilter;
    /** Snapshot ("NO_CHANGE") event in the watch stream. */
    watchSnapshot?: SpecWatchSnapshot;
    /** A step that the watch stream restarts. */
    watchStreamClose?: SpecWatchStreamClose;
    /** Ack the last write */
    writeAck?: SpecWriteAck;
    /** Fail a write */
    failWrite?: SpecWriteFailure;
    /**
     * Run a queued timer task (without waiting for the delay to expire). See
     * TimerId enum definition for possible values).
     */
    runTimer?: string;
    /**
     * Process all events currently enqueued in the AsyncQueue.
     */
    drainQueue?: true;
    /** Enable or disable RemoteStore's network connection. */
    enableNetwork?: boolean;
    /** Changes the metadata state of a client instance. */
    applyClientState?: SpecClientState;
    /** Change to a new active user (specified by uid or null for anonymous). */
    changeUser?: string | null;
    /**
     * Restarts the SyncEngine from scratch, except re-uses persistence and auth
     * components. This allows you to queue writes, get documents into cache,
     * etc. and then simulate an app restart.
     */
    restart?: true;
    /** Shut down the client and close it network connection. */
    shutdown?: true;
    /**
     * Optional list of expected events.
     * If not provided, the test will fail if the step causes events to be raised.
     */
    expect?: SpecExpectation[];
    /**
     * Optional dictionary of expected states.
     */
    stateExpect?: StateExpectation;
}
/** [<target-id>, <query-path>] */
export declare type SpecUserListen = [TargetId, string | SpecQuery];
/** [<target-id>, <query-path>] */
export declare type SpecUserUnlisten = [TargetId, string | SpecQuery];
/** [<key>, <value>] */
export declare type SpecUserSet = [string, JsonObject<AnyJs>];
/** [<key>, <patches>] */
export declare type SpecUserPatch = [string, JsonObject<AnyJs>];
/** key */
export declare type SpecUserDelete = string;
/** [<target-id>, ...] */
export declare type SpecWatchAck = TargetId[];
/** [[<target-id>, ...], <resume-token>] */
export declare type SpecWatchCurrent = [TargetId[], string];
/** [<target-id>, ...] */
export declare type SpecWatchReset = TargetId[];
export declare type SpecError = {
    code: number;
    message: string;
};
export declare type SpecWatchRemove = {
    targetIds: TargetId[];
    cause?: SpecError;
};
export declare type SpecWatchSnapshot = {
    version: TestSnapshotVersion;
    targetIds: TargetId[];
    resumeToken?: string;
};
export declare type SpecWatchStreamClose = {
    error: SpecError;
    runBackoffTimer: boolean;
};
export declare type SpecWriteAck = {
    /** The version the backend uses to ack the write. */
    version: TestSnapshotVersion;
    /**
     * Whether we should keep the write in our internal queue. This should only
     * be set to 'true' if the client ignores the write (e.g. a secondary client
     * which ignores write acknowledgments).
     *
     * Defaults to false.
     */
    keepInQueue?: boolean;
};
export declare type SpecWriteFailure = {
    /** The error the backend uses to fail the write. */
    error: SpecError;
    /**
     * Whether we should keep the write in our internal queue. This should be set
     * to 'true' for transient errors or if the client ignores the failure
     * (e.g. a secondary client which ignores write rejections).
     *
     * Defaults to false.
     */
    keepInQueue?: boolean;
};
export interface SpecWatchEntity {
    key?: string;
    /** [<key>, <version>, <value>] */
    doc?: SpecDocument;
    /** [<key>, <version>, <value>][] */
    docs?: SpecDocument[];
    /** [<target-id>, ...] */
    targets?: TargetId[];
    /** [<target-id>, ...] */
    removedTargets?: TargetId[];
}
export declare type SpecClientState = {
    /** The visibility state of the browser tab running the client. */
    visibility?: VisibilityState;
    /** Whether this tab should try to forcefully become primary. */
    primary?: true;
};
/**
 * [[<target-id>, ...], <key>, ...]
 * Note that the last parameter is really of type ...string (spread operator)
 * The filter is based of a list of keys to match in the existence filter
 */
export interface SpecWatchFilter extends Array<TargetId[] | string | undefined> {
    '0': TargetId[];
    '1': string | undefined;
}
/**
 * [field, op, value]
 * This currently only supports relation filters (<, <=, ==, >=, >)
 */
export declare type SpecQueryFilter = [string, string, AnyJs];
/**
 * [field, direction]
 * Direction can be 'asc' or 'desc'.
 */
export declare type SpecQueryOrderBy = [string, string];
/**
 * A representation of a query.
 */
export interface SpecQuery {
    path: string;
    limit?: number;
    filters?: SpecQueryFilter[];
    orderBys?: SpecQueryOrderBy[];
}
/**
 * [<key>, <version>, <value>, <doc-options> (optional), ...]
 * Represents a document. <value> is null for deleted documents.
 * Doc options are:
 *   'local': document has local modifications
 */
export interface SpecDocument {
    key: string;
    version: TestSnapshotVersion;
    value: JsonObject<AnyJs> | null;
    options?: DocumentOptions;
}
export interface SpecExpectation {
    query: SpecQuery;
    errorCode?: number;
    fromCache?: boolean;
    hasPendingWrites?: boolean;
    added?: SpecDocument[];
    removed?: SpecDocument[];
    modified?: SpecDocument[];
    metadata?: SpecDocument[];
}
export interface StateExpectation {
    /** Number of outstanding writes in the datastore queue. */
    numOutstandingWrites?: number;
    /** Number of clients currently marked active. Used in multi-client tests. */
    numActiveClients?: number;
    /** Number of requests sent to the write stream. */
    writeStreamRequestCount?: number;
    /** Number of requests sent to the watch stream. */
    watchStreamRequestCount?: number;
    /** Current documents in limbo. Verified in each step until overwritten. */
    limboDocs?: string[];
    /**
     * Whether the instance holds the primary lease. Used in multi-client tests.
     */
    isPrimary?: boolean;
    /**
     * Current expected active targets. Verified in each step until overwritten.
     */
    activeTargets?: {
        [targetId: number]: {
            query: SpecQuery;
            resumeToken: string;
        };
    };
    /**
     * Expected set of callbacks for previously written docs.
     */
    userCallbacks?: {
        acknowledgedDocs: string[];
        rejectedDocs: string[];
    };
}