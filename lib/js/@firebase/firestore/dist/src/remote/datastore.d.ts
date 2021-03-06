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
import { CredentialsProvider } from '../api/credentials';
import { MaybeDocument } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { Mutation, MutationResult } from '../model/mutation';
import { AsyncQueue } from '../util/async_queue';
import { Connection } from './connection';
import { WatchStreamListener, WriteStreamListener } from './persistent_stream';
import { PersistentListenStream, PersistentWriteStream } from './persistent_stream';
import { JsonProtoSerializer } from './serializer';
/**
 * Datastore is a wrapper around the external Google Cloud Datastore grpc API,
 * which provides an interface that is more convenient for the rest of the
 * client SDK architecture to consume.
 */
export declare class Datastore {
    private queue;
    private connection;
    private credentials;
    private serializer;
    constructor(queue: AsyncQueue, connection: Connection, credentials: CredentialsProvider, serializer: JsonProtoSerializer);
    newPersistentWriteStream(listener: WriteStreamListener): PersistentWriteStream;
    newPersistentWatchStream(listener: WatchStreamListener): PersistentListenStream;
    commit(mutations: Mutation[]): Promise<MutationResult[]>;
    lookup(keys: DocumentKey[]): Promise<MaybeDocument[]>;
    /** Gets an auth token and invokes the provided RPC. */
    private invokeRPC<Req, Resp>(rpcName, request);
    /** Gets an auth token and invokes the provided RPC with streamed results. */
    private invokeStreamingRPC<Req, Resp>(rpcName, request);
}
