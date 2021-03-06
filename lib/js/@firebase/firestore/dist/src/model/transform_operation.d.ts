/**
 * Copyright 2018 Google Inc.
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
import { Timestamp } from '../api/timestamp';
import { FieldValue } from './field_value';
/** Represents a transform within a TransformMutation. */
export interface TransformOperation {
    /**
     * Computes the local transform result against the provided `previousValue`,
     * optionally using the provided localWriteTime.
     */
    applyToLocalView(previousValue: FieldValue | null, localWriteTime: Timestamp): FieldValue;
    /**
     * Computes a final transform result after the transform has been acknowledged
     * by the server, potentially using the server-provided transformResult.
     */
    applyToRemoteDocument(previousValue: FieldValue | null, transformResult: FieldValue | null): FieldValue;
    isEqual(other: TransformOperation): boolean;
}
/** Transforms a value into a server-generated timestamp. */
export declare class ServerTimestampTransform implements TransformOperation {
    private constructor();
    static instance: ServerTimestampTransform;
    applyToLocalView(previousValue: FieldValue | null, localWriteTime: Timestamp): FieldValue;
    applyToRemoteDocument(previousValue: FieldValue | null, transformResult: FieldValue | null): FieldValue;
    isEqual(other: TransformOperation): boolean;
}
/** Transforms an array value via a union operation. */
export declare class ArrayUnionTransformOperation implements TransformOperation {
    readonly elements: FieldValue[];
    constructor(elements: FieldValue[]);
    applyToLocalView(previousValue: FieldValue | null, localWriteTime: Timestamp): FieldValue;
    applyToRemoteDocument(previousValue: FieldValue | null, transformResult: FieldValue | null): FieldValue;
    private apply(previousValue);
    isEqual(other: TransformOperation): boolean;
}
/** Transforms an array value via a remove operation. */
export declare class ArrayRemoveTransformOperation implements TransformOperation {
    readonly elements: FieldValue[];
    constructor(elements: FieldValue[]);
    applyToLocalView(previousValue: FieldValue | null, localWriteTime: Timestamp): FieldValue;
    applyToRemoteDocument(previousValue: FieldValue | null, transformResult: FieldValue | null): FieldValue;
    private apply(previousValue);
    isEqual(other: TransformOperation): boolean;
}
