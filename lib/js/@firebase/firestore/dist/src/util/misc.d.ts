export declare type EventHandler<E> = (value: E) => void;
/**
 * A union of all of the standard JS types, useful for cases where the type is
 * unknown. Unlike "any" this doesn't lose all type-safety, since the consuming
 * code must still cast to a particular type before using it.
 */
export declare type AnyJs = null | undefined | boolean | number | string | object;
/**
 * `Unknown` is a stand-in for Typescript 3's `unknown` type. It is similar to
 * `any` but forces code to check types before performing operations on a value
 * of type `Unknown`. See: https://blogs.msdn.microsoft.com/typescript/2018/07/30/announcing-typescript-3-0/#the-unknown-type
 */
export declare type Unknown = null | undefined | {} | void;
export declare class AutoId {
    static newId(): string;
}
export declare function primitiveComparator<T>(left: T, right: T): number;
/** Duck-typed interface for objects that have an isEqual() method. */
export interface Equatable<T> {
    isEqual(other: T): boolean;
}
/** Helper to compare nullable (or undefined-able) objects using isEqual(). */
export declare function equals<T>(left: Equatable<T> | null | undefined, right: T | null | undefined): boolean;
/** Helper to compare arrays using isEqual(). */
export declare function arrayEquals<T>(left: Array<Equatable<T>>, right: T[]): boolean;
/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */
export declare function immediateSuccessor(s: string): string;
