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
import * as firestore from '@firebase/firestore-types';
import { Blob } from '../../src/api/blob';
import { DocumentKeyReference } from '../../src/api/user_data_converter';
import { DatabaseId } from '../../src/core/database_info';
import { Bound, Filter, OrderBy } from '../../src/core/query';
import { SnapshotVersion } from '../../src/core/snapshot_version';
import { ProtoByteString, TargetId } from '../../src/core/types';
import { LimboDocumentChange, View, ViewChange } from '../../src/core/view';
import { LocalViewChanges } from '../../src/local/local_view_changes';
import { QueryData, QueryPurpose } from '../../src/local/query_data';
import { DocumentKeySet, MaybeDocumentMap } from '../../src/model/collections';
import { Document, DocumentOptions, MaybeDocument, NoDocument, UnknownDocument } from '../../src/model/document';
import { DocumentComparator } from '../../src/model/document_comparator';
import { DocumentKey } from '../../src/model/document_key';
import { DocumentSet } from '../../src/model/document_set';
import { FieldValue, JsonObject, ObjectValue } from '../../src/model/field_value';
import { DeleteMutation, MutationResult, PatchMutation, Precondition, SetMutation, TransformMutation } from '../../src/model/mutation';
import { FieldPath, ResourcePath } from '../../src/model/path';
import { RemoteEvent, TargetChange } from '../../src/remote/remote_event';
import { AnyJs } from '../../src/util/misc';
import { Dict } from '../../src/util/obj';
import { SortedMap } from '../../src/util/sorted_map';
import { SortedSet } from '../../src/util/sorted_set';
export declare type TestSnapshotVersion = number;
/**
 * A string sentinel that can be used with patchMutation() to mark a field for
 * deletion.
 */
export declare const DELETE_SENTINEL = "<DELETE>";
export declare function version(v: TestSnapshotVersion): SnapshotVersion;
export declare function ref(dbIdStr: string, keyStr: string): DocumentKeyReference;
export declare function doc(keyStr: string, ver: TestSnapshotVersion, json: JsonObject<AnyJs>, options?: DocumentOptions): Document;
export declare function deletedDoc(keyStr: string, ver: TestSnapshotVersion, options?: DocumentOptions): NoDocument;
export declare function unknownDoc(keyStr: string, ver: TestSnapshotVersion): UnknownDocument;
export declare function removedDoc(keyStr: string): NoDocument;
export declare function wrap(value: AnyJs): FieldValue;
export declare function wrapObject(obj: JsonObject<AnyJs>): ObjectValue;
export declare function dbId(project: string, database?: string): DatabaseId;
export declare function key(path: string): DocumentKey;
export declare function keys(...documents: Array<MaybeDocument | string>): DocumentKeySet;
export declare function path(path: string, offset?: number): ResourcePath;
export declare function field(path: string): FieldPath;
export declare function blob(...bytes: number[]): Blob;
export declare function filter(path: string, op: string, value: AnyJs): Filter;
export declare function setMutation(keyStr: string, json: JsonObject<AnyJs>): SetMutation;
export declare function patchMutation(keyStr: string, json: JsonObject<AnyJs>, precondition?: Precondition): PatchMutation;
export declare function deleteMutation(keyStr: string): DeleteMutation;
/**
 * Creates a TransformMutation by parsing any FieldValue sentinels in the
 * provided data. The data is expected to use dotted-notation for nested fields
 * (i.e. { "foo.bar": FieldValue.foo() } and must not contain any non-sentinel
 * data.
 */
export declare function transformMutation(keyStr: string, data: Dict<AnyJs>): TransformMutation;
export declare function mutationResult(testVersion: TestSnapshotVersion): MutationResult;
export declare function bound(values: Array<[string, {}, firestore.OrderByDirection]>, before: boolean): Bound;
export declare function queryData(targetId: TargetId, queryPurpose: QueryPurpose, path: string): QueryData;
export declare function docAddedRemoteEvent(doc: MaybeDocument, updatedInTargets?: TargetId[], removedFromTargets?: TargetId[], limboTargets?: TargetId[]): RemoteEvent;
export declare function docUpdateRemoteEvent(doc: MaybeDocument, updatedInTargets?: TargetId[], removedFromTargets?: TargetId[], limboTargets?: TargetId[]): RemoteEvent;
export declare function updateMapping(snapshotVersion: SnapshotVersion, added: Array<Document | string>, modified: Array<Document | string>, removed: Array<MaybeDocument | string>, current?: boolean): TargetChange;
export declare function addTargetMapping(...docsOrKeys: Array<Document | string>): TargetChange;
export declare function ackTarget(...docsOrKeys: Array<Document | string>): TargetChange;
export declare function limboChanges(changes: {
    added?: Document[];
    removed?: Document[];
}): LimboDocumentChange[];
export declare function localViewChanges(targetId: TargetId, changes: {
    added?: string[];
    removed?: string[];
}): LocalViewChanges;
/** Creates a resume token to match the given snapshot version. */
export declare function resumeTokenForSnapshot(snapshotVersion: SnapshotVersion): ProtoByteString;
export declare function orderBy(path: string, op?: string): OrderBy;
/**
 * Converts a sorted map to an array with inorder traversal
 */
export declare function mapAsArray<K, V>(sortedMap: SortedMap<K, V>): Array<{
    key: K;
    value: V;
}>;
/**
 * Converts a list of documents or document keys to a sorted map. A document
 * key is used to represent a deletion and maps to null.
 */
export declare function documentUpdates(...docsOrKeys: Array<Document | DocumentKey>): MaybeDocumentMap;
/**
 * Short for view.applyChanges(view.computeDocChanges(documentUpdates(docs))).
 */
export declare function applyDocChanges(view: View, ...docsOrKeys: Array<Document | DocumentKey>): ViewChange;
/**
 * Constructs a document set.
 */
export declare function documentSet(comp: DocumentComparator, ...docs: Document[]): DocumentSet;
export declare function documentSet(...docs: Document[]): DocumentSet;
/**
 * Constructs a document key set.
 */
export declare function keySet(...keys: DocumentKey[]): DocumentKeySet;
/** Converts a DocumentSet to an array. */
export declare function documentSetAsArray(docs: DocumentSet): Document[];
export declare class DocComparator {
    static byField(...fields: string[]): DocumentComparator;
}
/**
 * Two helper functions to simplify testing isEqual() method.
 */
export declare function expectEqual(left: any, right: any, message?: string): void;
export declare function expectNotEqual(left: any, right: any, message?: string): void;
export declare function expectEqualArrays(left: AnyJs[], right: AnyJs[], message?: string): void;
/**
 * Checks that an ordered array of elements yields the correct pair-wise
 * comparison result for the supplied comparator
 */
export declare function expectCorrectComparisons<T extends AnyJs>(array: T[], comp: (left: T, right: T) => number): void;
/**
 * Takes an array of "equality group" arrays and asserts that the comparator
 * returns the same as comparing the indexes of the "equality groups"
 * (0 for items in the same group).
 */
export declare function expectCorrectComparisonGroups<T extends AnyJs>(groups: T[][], comp: (left: T, right: T) => number): void;
/** Compares SortedSet to an array */
export declare function expectSetToEqual<T>(set: SortedSet<T>, arr: T[]): void;
/**
 * Takes an array of array of elements and compares each of the elements
 * to every other element.
 *
 * Elements in the same inner array are expect to be equal with regard to
 * the provided equality function to all other elements from the same array
 * (including itself) and unequal to all other elements from the other array
 */
export declare function expectEqualitySets<T>(elems: T[][], equalityFn: (v1: T, v2: T) => boolean): void;
/** Returns the number of keys in this object. */
export declare function size(obj: JsonObject<AnyJs>): number;
export declare function expectFirestoreError(err: Error): void;
