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
import { DatabaseId, DatabaseInfo } from '../../src/core/database_info';
import { ProtoByteString } from '../../src/core/types';
import { Platform } from '../../src/platform/platform';
import { Connection } from '../../src/remote/connection';
import { JsonProtoSerializer } from '../../src/remote/serializer';
import { AnyJs } from '../../src/util/misc';
/**
 * `Window` fake that implements the event and storage API that is used by
 * Firestore.
 */
export declare class FakeWindow {
    private readonly fakeStorageArea;
    private readonly fakeIndexedDb;
    private storageListeners;
    constructor(sharedFakeStorage: SharedFakeWebStorage, fakeIndexedDb?: IDBFactory);
    readonly localStorage: Storage;
    readonly indexedDB: IDBFactory | null;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
}
/**
 * `Document` fake that implements the `visibilitychange` API used by Firestore.
 */
export declare class FakeDocument {
    private _visibilityState;
    private visibilityListener;
    readonly visibilityState: VisibilityState;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
    raiseVisibilityEvent(visibility: VisibilityState): void;
}
/**
 * `WebStorage` mock that implements the WebStorage behavior for multiple
 * clients. To get a client-specific storage area that implements the WebStorage
 * API, invoke `getStorageArea(storageListener)`.
 */
export declare class SharedFakeWebStorage {
    private readonly data;
    private readonly activeClients;
    getStorageArea(storageListener: EventListener): Storage;
    private clear();
    private getItem(key);
    private key(index);
    private removeItem(key);
    private setItem(key, data);
    private readonly length;
    private raiseStorageEvent(sourceClientIndex, key, oldValue, newValue);
}
/**
 * Implementation of `Platform` that allows faking of `document` and `window`.
 */
export declare class TestPlatform implements Platform {
    private readonly basePlatform;
    private readonly mockStorage;
    readonly mockDocument: FakeDocument | null;
    readonly mockWindow: FakeWindow | null;
    constructor(basePlatform: Platform, mockStorage: SharedFakeWebStorage);
    readonly document: Document | null;
    readonly window: Window | null;
    readonly base64Available: boolean;
    readonly emptyByteString: ProtoByteString;
    raiseVisibilityEvent(visibility: VisibilityState): void;
    loadConnection(databaseInfo: DatabaseInfo): Promise<Connection>;
    newSerializer(databaseId: DatabaseId): JsonProtoSerializer;
    formatJSON(value: AnyJs): string;
    atob(encoded: string): string;
    btoa(raw: string): string;
}
