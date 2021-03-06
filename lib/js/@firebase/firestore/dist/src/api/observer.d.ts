import { AnyJs } from '../util/misc';
/**
 * Observer/Subscribe interfaces.
 */
export declare type NextFn<T> = (value: T) => void;
export declare type ErrorFn = (error: Error) => void;
export declare type CompleteFn = () => void;
export interface PartialObserver<T> {
    next?: NextFn<T>;
    error?: ErrorFn;
    complete?: CompleteFn;
}
export interface Unsubscribe {
    (): void;
}
export declare function isPartialObserver(obj: AnyJs): boolean;
