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
import { SortedMap, SortedMapIterator } from './sorted_map';
/**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
export declare class SortedSet<T> {
    private comparator;
    private data;
    constructor(comparator: (left: T, right: T) => number);
    /**
     * Creates a SortedSet from the keys of the map.
     * This is currently implemented as an O(n) copy.
     */
    static fromMapKeys<K, V>(map: SortedMap<K, V>): SortedSet<K>;
    has(elem: T): boolean;
    first(): T | null;
    last(): T | null;
    readonly size: number;
    indexOf(elem: T): number;
    /** Iterates elements in order defined by "comparator" */
    forEach(cb: (elem: T) => void): void;
    /** Iterates over `elem`s such that: range[0] <= elem < range[1]. */
    forEachInRange(range: [T, T], cb: (elem: T) => void): void;
    /**
     * Iterates over `elem`s such that: start <= elem until false is returned.
     */
    forEachWhile(cb: (elem: T) => boolean, start?: T): void;
    /** Finds the least element greater than or equal to `elem`. */
    firstAfterOrEqual(elem: T): T | null;
    getIterator(): SortedSetIterator<T>;
    getIteratorFrom(key: T): SortedSetIterator<T>;
    /** Inserts or updates an element */
    add(elem: T): SortedSet<T>;
    /** Deletes an element */
    delete(elem: T): SortedSet<T>;
    isEmpty(): boolean;
    unionWith(other: SortedSet<T>): SortedSet<T>;
    isEqual(other: SortedSet<T>): boolean;
    toArray(): T[];
    toString(): string;
    private copy(data);
}
export declare class SortedSetIterator<T> {
    private iter;
    constructor(iter: SortedMapIterator<T, boolean>);
    getNext(): T;
    hasNext(): boolean;
}
