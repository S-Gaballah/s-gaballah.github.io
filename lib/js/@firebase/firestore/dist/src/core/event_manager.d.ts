import { EventHandler } from '../util/misc';
import { Query } from './query';
import { SyncEngine, SyncEngineListener } from './sync_engine';
import { OnlineState, TargetId } from './types';
import { ViewSnapshot } from './view_snapshot';
/**
 * Interface for handling events from the EventManager.
 */
export interface Observer<T> {
    next: EventHandler<T>;
    error: EventHandler<Error>;
}
/**
 * EventManager is responsible for mapping queries to query event emitters.
 * It handles "fan-out". -- Identical queries will re-use the same watch on the
 * backend.
 */
export declare class EventManager implements SyncEngineListener {
    private syncEngine;
    private queries;
    private onlineState;
    constructor(syncEngine: SyncEngine);
    listen(listener: QueryListener): Promise<TargetId>;
    unlisten(listener: QueryListener): Promise<void>;
    onWatchChange(viewSnaps: ViewSnapshot[]): void;
    onWatchError(query: Query, error: Error): void;
    onOnlineStateChange(onlineState: OnlineState): void;
}
export interface ListenOptions {
    /** Raise events even when only the metadata changes */
    readonly includeMetadataChanges?: boolean;
    /**
     * Wait for a sync with the server when online, but still raise events while
     * offline.
     */
    readonly waitForSyncWhenOnline?: boolean;
}
/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */
export declare class QueryListener {
    readonly query: Query;
    private queryObserver;
    /**
     * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
     * observer. This flag is set to true once we've actually raised an event.
     */
    private raisedInitialEvent;
    private options;
    private snap;
    private onlineState;
    constructor(query: Query, queryObserver: Observer<ViewSnapshot>, options?: ListenOptions);
    onViewSnapshot(snap: ViewSnapshot): void;
    onError(error: Error): void;
    applyOnlineStateChange(onlineState: OnlineState): void;
    private shouldRaiseInitialEvent(snap, onlineState);
    private shouldRaiseEvent(snap);
    private raiseInitialEvent(snap);
}
