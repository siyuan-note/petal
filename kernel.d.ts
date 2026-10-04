/// <reference types="@dop251/types-goja_nodejs-buffer" />
/// <reference types="@dop251/types-goja_nodejs-global" />
/// <reference types="@dop251/types-goja_nodejs-url" />

import type { JSONSchema } from "zod/v4/core";
declare global {
    const siyuan: ISiyuan;
    /**
     * The same object as {@link ISiyuan.crypto}, installed for code that uses the standard
     * Web Crypto global.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `Crypto` type; use
     * `siyuan.crypto` for the kernel's own typing.
     */
    var crypto: typeof globalThis extends { crypto: infer T; onmessage: any } ? T : ICrypto;
    /**
     * Encodes strings as UTF-8; see {@link ITextEncoderConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `TextEncoder` type.
     */
    var TextEncoder: typeof globalThis extends { TextEncoder: infer T; onmessage: any } ? T : ITextEncoderConstructor;
    /**
     * Decodes UTF-8 and UTF-16 bytes; see {@link ITextDecoderConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `TextDecoder` type.
     */
    var TextDecoder: typeof globalThis extends { TextDecoder: infer T; onmessage: any } ? T : ITextDecoderConstructor;
    /**
     * Creates an {@link IAbortSignal} that can be aborted on demand; see {@link IAbortControllerConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `AbortController` type.
     */
    var AbortController: typeof globalThis extends { AbortController: infer T; onmessage: any } ? T : IAbortControllerConstructor;
    /**
     * A cancellation signal usable with {@link IClient.fetch}; see {@link IAbortSignalConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `AbortSignal` type.
     */
    var AbortSignal: typeof globalThis extends { AbortSignal: infer T; onmessage: any } ? T : IAbortSignalConstructor;
    /**
     * Creates immutable binary data; see {@link IBlobConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `Blob` type.
     */
    var Blob: typeof globalThis extends { Blob: infer T; onmessage: any } ? T : IBlobConstructor;
    /**
     * Creates a {@link IBlob} with a file name and a modification time; see {@link IFileConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `File` type.
     */
    var File: typeof globalThis extends { File: infer T; onmessage: any } ? T : IFileConstructor;
    /**
     * Builds `multipart/form-data` request bodies for {@link IClient.fetch}; see {@link IFormDataConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `FormData` type.
     */
    var FormData: typeof globalThis extends { FormData: infer T; onmessage: any } ? T : IFormDataConstructor;
    /**
     * Creates a {@link IReadableStream}, such as {@link IFetchResponse.body}; see
     * {@link IReadableStreamConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `ReadableStream` type.
     */
    var ReadableStream: typeof globalThis extends { ReadableStream: infer T; onmessage: any } ? T : IReadableStreamConstructor;
    /**
     * Creates a {@link IWritableStream}, such as {@link IResponseStream.stream}; see
     * {@link IWritableStreamConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `WritableStream` type.
     */
    var WritableStream: typeof globalThis extends { WritableStream: infer T; onmessage: any } ? T : IWritableStreamConstructor;
    /**
     * Creates a {@link ITransformStream}; see {@link ITransformStreamConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `TransformStream` type.
     */
    var TransformStream: typeof globalThis extends { TransformStream: infer T; onmessage: any } ? T : ITransformStreamConstructor;
    /**
     * A {@link IQueuingStrategy} that counts each chunk as size `1`; see
     * {@link ICountQueuingStrategyConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `CountQueuingStrategy` type.
     */
    var CountQueuingStrategy: typeof globalThis extends { CountQueuingStrategy: infer T; onmessage: any } ? T : ICountQueuingStrategyConstructor;
    /**
     * A {@link IQueuingStrategy} that sizes each chunk by its `byteLength`; see
     * {@link IByteLengthQueuingStrategyConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `ByteLengthQueuingStrategy` type.
     */
    var ByteLengthQueuingStrategy: typeof globalThis extends { ByteLengthQueuingStrategy: infer T; onmessage: any } ? T : IByteLengthQueuingStrategyConstructor;
}

// ── Primitives ────────────────────────────────────────────────────────────────

/**
 * WebSocket connection ready-state values.
 *
 * @remarks Mirrors the browser `WebSocket.readyState` constants:
 * - `0`: CONNECTING
 * - `1`: OPEN
 * - `2`: CLOSING
 * - `3`: CLOSED
 */
export type TWebSocketReadyState = 0 | 1 | 2 | 3;

/**
 * Server-Sent Events connection ready-state values.
 *
 * @remarks Mirrors the browser `EventSource.readyState` constants:
 * - `0`: CONNECTING
 * - `1`: OPEN
 * - `2`: CLOSED
 */
export type TEventSourceReadyState = 0 | 1 | 2;

/** An absolute URL path that must start with `/`. */
export type TRequestPath = `/${string}`;

/** A standard UUID in hyphenated 8-4-4-4-12 format. */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * A single directory entry returned by {@link IStorage.list}.
 */
export interface IStorageEntry {
    /** File or directory name (not the full path). */
    name: string;
    /** `true` if this entry is a directory. */
    isDir: boolean;
    /** `true` if this entry is a symbolic link. */
    isSymlink: boolean;
    /** Last-modified time as a Unix timestamp (seconds since epoch). */
    updated: number;
}

/**
 * A lazy data accessor returned by {@link IStorage.get} and {@link IFetchResponse}.
 *
 * @remarks Each method decodes the same underlying byte slice; call at most once per method per
 * instance. The results of {@link IDataObject.buffer}, {@link IDataObject.arrayBuffer}, and
 * {@link IDataObject.bytes} share that memory, so changes made through one of them are visible to the
 * others and to later calls, whereas {@link IDataObject.blob} returns a copy.
 */
export interface IDataObject {
    /**
     * Decodes the data as a UTF-8 string.
     *
     * @returns The text content.
     */
    text(): Promise<string>;
    /**
     * Parses the data as JSON.
     *
     * @returns The parsed value.
     */
    json(): Promise<any>;
    /**
     * Returns the raw bytes as a node.js compatible `Buffer`.
     *
     * @returns The binary content.
     */
    buffer(): Promise<Buffer>;
    /**
     * Returns the raw bytes as an `ArrayBuffer`.
     *
     * @returns The binary content.
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Returns the raw bytes as a `Uint8Array`.
     *
     * @returns The binary content.
     */
    bytes(): Promise<Uint8Array>;
    /**
     * Returns a copy of the raw bytes as a blob that is not a file.
     *
     * @remarks The blob's `type` is the `Content-Type` header of the response for {@link IFetchResponse},
     * of the request for {@link IRequestBody.data}, and of the part for {@link IRequestFile.data},
     * normalized as described for {@link IBlobPropertyBag.type}. It is `""` for {@link IStorage.get} and
     * when the header is absent. Unlike the Fetch Standard, the header is not parsed as a MIME type, so
     * whitespace is kept and a value that is not a valid MIME type is not replaced with `""`:
     * `Text/HTML; Charset=UTF-8` becomes `text/html; charset=utf-8`.
     *
     * @returns The binary content.
     */
    blob(): Promise<TBlob>;
}

/**
 * Response object returned by {@link ISiyuan.fetch}.
 *
 * @remarks Extends {@link IDataObject} so the response body can be read as text, JSON, raw bytes,
 * or a blob; {@link body} additionally exposes it as a stream.
 *
 * Unlike the general {@link IDataObject} contract (which allows each method to be called
 * repeatedly), a fetch response body can only be claimed once in total: at most one of `body`,
 * `text()`, `json()`, `buffer()`, `arrayBuffer()`, `bytes()`, or `blob()` may be used across the
 * whole response, matching the standard Fetch API's `Response.bodyUsed` behavior. `fetch()` itself
 * resolves as soon as the response headers arrive; the body is then read incrementally from the
 * network rather than buffered eagerly, so a second attempt to claim it rejects with a `TypeError`
 * instead of replaying cached bytes.
 */
export interface IFetchResponse extends IDataObject {
    /** The final URL after any redirects. */
    url: string;
    /** `true` when `status` is in the range 200–299. */
    ok: boolean;
    /** HTTP status code, e.g. `200`. */
    status: number;
    /** HTTP status text, e.g. `"OK"`. */
    statusText: string;
    /** Response headers as a flat string-to-string map. */
    headers: Record<string, string>;
    /**
     * The response body as a stream of `Uint8Array` chunks, delivered incrementally as they arrive
     * over the network.
     *
     * @remarks Claims the body the first time its reader actually reads from it (not merely by
     * accessing this property); see the claim-once remarks on {@link IFetchResponse} itself.
     */
    body: TReadableStream<Uint8Array>;
}

/**
 * Options accepted by {@link ISiyuan.fetch}.
 */
export interface IRequestInit {
    /** HTTP method. Defaults to `"GET"` when omitted. */
    method?: string;
    /** Additional request headers. */
    headers?: Record<string, string>;
    /**
     * Request body. Omit for methods that carry no body (e.g. GET, HEAD).
     *
     * @remarks A {@link TFormData} is encoded as `multipart/form-data` when {@link IClient.fetch} is
     * called, so later changes to it do not affect the request, and `Content-Type` is set to
     * `multipart/form-data` with the generated boundary unless {@link headers} already sets one.
     * Values of other types, such as typed arrays and blobs, are ignored and no body is sent.
     */
    body?: string | ArrayBuffer | TFormData;
    /**
     * Timeout in milliseconds for the whole request, from connecting until the response body is read.
     * Defaults to `60000` when omitted; `0` disables the timeout. Must be a non-negative finite
     * number, otherwise the request is rejected without being sent.
     *
     * @remarks Pending requests are cancelled when the plugin stops, but only after
     * {@link IPluginLifecycle.onunload} settles, so awaiting a request without a timeout in
     * `onunload` can block stopping the plugin and a normal kernel shutdown indefinitely.
     */
    timeout?: number;
    /**
     * Aborts the request when the signal is aborted, independently of {@link timeout}.
     *
     * @remarks If already aborted when {@link IClient.fetch} is called, the request is rejected
     * with the signal's `reason` without being sent. Aborting later rejects the pending request
     * with that same `reason`, which can be any value and is not wrapped into an `Error`.
     */
    signal?: TAbortSignal;
}

/**
 * An event message delivered to {@link IEvent.handler}.
 */
export interface IEventMessage {
    /** Unique event identifier. */
    id: UUID;
    /** Event type name, e.g. `"ws"`. */
    type: string;
    /** Event-specific payload; the shape depends on `type`. */
    detail: any;
}

/**
 * Published on the runtime event bus after the plugin starts successfully
 * and enters the running state.
 */
export interface IStartEventMessage extends IEventMessage {
    type: 'start';
    detail: null;
}

/**
 * Published on the runtime event bus at the beginning of a clean plugin
 * shutdown, before the runtime is torn down.
 */
export interface IStopEventMessage extends IEventMessage {
    type: 'stop';
    detail: null;
}

/** File-system event kind emitted by the kernel storage watcher. */
export type TFsNotifyOperation = 'CREATE' | 'WRITE' | 'RENAME' | 'REMOVE';

/**
 * Published on the runtime event bus when a watched storage path is
 * created, written, renamed, or removed.
 *
 * Watching is managed via {@link IStorage.watcher}.
 */
export interface IFsNotifyEventMessage extends IEventMessage {
    type: 'fs-notify';
    detail: {
        /** The type of file-system change that triggered this event. */
        operation: TFsNotifyOperation;
        /** Path relative to the plugin's storage directory. */
        path: string;
    }
}

export type TEventMessage = IStartEventMessage | IStopEventMessage | IFsNotifyEventMessage | IEventMessage;

// ── WebSocket ─────────────────────────────────────────────────────────────────

/**
 * Event fired when the WebSocket connection is established.
 *
 * @see {@link IWebSocket.onopen}
 */
export interface IWebSocketOpenEvent {
    type: 'open';
}

/**
 * Event fired when the WebSocket connection is closed.
 *
 * @see {@link IWebSocket.onclose}
 */
export interface IWebSocketCloseEvent {
    type: 'close';
    /** WebSocket close code per RFC 6455, e.g. `1000` (normal closure). */
    code: number;
    /** Human-readable reason string supplied by the closing peer. */
    reason: string;
}

/**
 * Event fired when a WebSocket transport error occurs.
 *
 * @see {@link IWebSocket.onerror}
 */
export interface IWebSocketErrorEvent {
    type: 'error';
    /** The underlying error. */
    error: Error;
}

/**
 * Event fired when a WebSocket ping frame is received.
 *
 * @see {@link IWebSocket.onping}
 */
export interface IWebSocketPingEvent {
    type: 'ping';
    /** Application data carried in the ping frame. */
    data: string;
}

/**
 * Event fired when a WebSocket pong frame is received.
 *
 * @see {@link IWebSocket.onpong}
 */
export interface IWebSocketPongEvent {
    type: 'pong';
    /** Application data carried in the pong frame. */
    data: string;
}

/**
 * Event fired when the WebSocket data frame is received.
 *
 * @see {@link IWebSocket.onmessage}
 */
export interface IWebSocketMessageEvent {
    type: 'message';
    /** Payload: `string` for text frames, `ArrayBuffer` for binary frames. */
    data: string | ArrayBuffer;
}

// ── EventSource ───────────────────────────────────────────────────────────────

/**
 * Event fired when the EventSource connection is established.
 *
 * @see {@link IEventSource.onopen}
 */
export interface IEventSourceOpenEvent {
    type: 'open';
}

/**
 * Event fired when an SSE message is received.
 *
 * @remarks The `type` field reflects the SSE `event:` field value;
 * defaults to `"message"` when the field is absent.
 *
 * @see {@link IEventSource.onmessage}
 */
export interface IEventSourceMessageEvent {
    /** Event type; mirrors the SSE `event:` field, defaulting to `"message"`. */
    type: string;
    /** UTF-8 decoded SSE `data:` field value. */
    data: string;
    /** Value of the SSE `id:` field, or an empty string if absent. */
    lastEventId: string;
}

/**
 * Event fired when the EventSource connection is closed.
 *
 * @see {@link IEventSource.onclose}
 */
export interface IEventSourceCloseEvent {
    type: 'close';
}

/**
 * Event fired when an EventSource transport error occurs.
 *
 * @see {@link IEventSource.onerror}
 */
export interface IEventSourceErrorEvent {
    type: 'error';
    /** The underlying error. */
    error: Error;
}

/**
 * A kernel-proxied WebSocket connection returned by {@link IClient.socket}.
 *
 * @remarks Unlike the browser `WebSocket`, this object is returned
 * immediately in a disconnected state. Call {@link IWebSocket.open} to
 * initiate the connection. All event callbacks are nullable; assign a
 * function to start receiving events. Every send operation is asynchronous.
 */
export interface IWebSocket {
    /**
     * How binary data is returned in {@link IWebSocket.onmessage}.
     *
     * @remarks Always `"arraybuffer"`.
     */
    readonly binaryType: string;
    /** Number of bytes currently queued for sending but not yet transmitted. */
    readonly bufferedAmount: number;
    /** Negotiated WebSocket extensions, or an empty string if none. */
    readonly extensions: string;
    /** Negotiated sub-protocol, or an empty string if none was negotiated. */
    readonly protocol: string;
    /** Current connection state. See {@link TWebSocketReadyState}. */
    readonly readyState: TWebSocketReadyState;
    /** The WebSocket server URL (e.g. `"ws://127.0.0.1:6806/ws/…"`). */
    readonly url: string;
    /** Called when the connection is established. */
    onopen: ((event: IWebSocketOpenEvent) => void | Promise<void>) | null;
    /** Called when the connection is closed. */
    onclose: ((event: IWebSocketCloseEvent) => void | Promise<void>) | null;
    /** Called when a transport error occurs. */
    onerror: ((event: IWebSocketErrorEvent) => void | Promise<void>) | null;
    /** Called when a ping control frame is received. */
    onping: ((event: IWebSocketPingEvent) => void | Promise<void>) | null;
    /** Called when a pong control frame is received. */
    onpong: ((event: IWebSocketPongEvent) => void | Promise<void>) | null;
    /** Called when a data frame is received. */
    onmessage: ((event: IWebSocketMessageEvent) => void | Promise<void>) | null;
    /**
     * Initiates the WebSocket connection.
     *
     * @remarks The returned `Promise` resolves once the TCP/TLS handshake
     * succeeds and the HTTP upgrade is confirmed. Calling `open()` more than
     * once is a no-op — the second call resolves immediately.
     */
    open(): Promise<void>;
    /**
     * Sends a text or binary data frame to the remote peer.
     *
     * @param data - UTF-8 string for a text frame; `ArrayBuffer` for a binary frame.
     */
    send(data: string | ArrayBuffer): Promise<void>;
    /**
     * Sends a ping control frame.
     *
     * @param data - Optional application data to include in the frame.
     */
    ping(data?: string): Promise<void>;
    /**
     * Sends a pong control frame.
     *
     * @param data - Optional application data to include in the frame.
     */
    pong(data?: string): Promise<void>;
    /**
     * Initiates a graceful close handshake.
     *
     * @param code   - WebSocket close code (default `1000` — normal closure).
     * @param reason - Optional human-readable reason string (max 123 bytes).
     */
    close(code?: number, reason?: string): Promise<void>;
}

// ── Sub-namespaces ────────────────────────────────────────────────────────────

/**
 * A kernel-proxied Server-Sent Events connection returned by {@link IClient.event}.
 *
 * @remarks The object is returned in {@link TEventSourceReadyState | CONNECTING} state
 * immediately; the kernel starts the SSE subscription in the background and
 * fires {@link IEventSource.onopen} once the stream is established.
 * Call {@link IEventSource.close} to cancel the subscription.
 */
export interface IEventSource {
    /** Current connection state. See {@link TEventSourceReadyState}. */
    readonly readyState: TEventSourceReadyState;
    /** The original path passed to {@link IClient.event}, e.g. `"/api/…"`. */
    readonly url: string;
    /** Called when the connection is established. */
    onopen: ((event: IEventSourceOpenEvent) => void | Promise<void>) | null;
    /** Called when a message is received. */
    onmessage: ((event: IEventSourceMessageEvent) => void | Promise<void>) | null;
    /** Called when the connection is closed by the server or after {@link IEventSource.close}. */
    onclose: ((event: IEventSourceCloseEvent) => void | Promise<void>) | null;
    /** Called when a transport error occurs. */
    onerror: ((event: IEventSourceErrorEvent) => void | Promise<void>) | null;
    /** Cancels the subscription and closes the connection. */
    close(): void;
}

/**
 * Network client utilities exposed as `siyuan.client`.
 *
 * @remarks Provides HTTP, WebSocket, and Server-Sent Events access, all
 * tunnelled through the kernel and authenticated with the plugin token.
 */
export interface IClient {
    /**
     * Tunnels an HTTP request through the kernel's REST API.
     *
     * @remarks Rejects once {@link IRequestInit.timeout} elapses (60 seconds by default) or
     * {@link IRequestInit.signal} is aborted, whichever happens first.
     *
     * @param path - Absolute path starting with `/`, e.g. `"/api/system/version"`.
     * @param init - Optional request options (method, headers, body, timeout, signal).
     * @returns A {@link IFetchResponse} with lazy body accessor methods.
     */
    fetch(path: TRequestPath, init?: IRequestInit): Promise<IFetchResponse>;
    /**
     * Creates a WebSocket connection proxied through the kernel.
     *
     * @remarks The returned object is in {@link TWebSocketReadyState | CONNECTING}
     * state but not yet connected. Call {@link IWebSocket.open} to initiate
     * the handshake.
     *
     * @param path      - Absolute path starting with `/`.
     * @param protocols - Optional WebSocket sub-protocol(s) to negotiate.
     * @returns A sealed {@link IWebSocket} handle.
     */
    socket(path: TRequestPath, protocols?: string | string[]): Promise<IWebSocket>;
    /**
     * Opens a Server-Sent Events stream proxied through the kernel.
     *
     * @param path - Absolute path starting with `/`.
     * @returns A sealed {@link IEventSource} handle.
     */
    event(path: TRequestPath): Promise<IEventSource>;
}

// ── Plugin sub-namespaces ─────────────────────────────────────────────────────

/**
 * Static metadata for the running plugin instance.
 *
 * @remarks Exposed as `siyuan.plugin`. All properties are read-only at
 * runtime; the values are set by the kernel before `onload` is called.
 */
export interface IPlugin {
    /** Internal plugin identifier (matches the plugin directory name). */
    readonly name: string;
    /** Semantic version string, e.g. `"1.0.0"`. */
    readonly version: string;
    /** Human-readable display name shown in the plugin marketplace. */
    readonly displayName: string;
    /** Backend platform identifier, e.g. `"windows"`, `"linux"`, `"darwin"`. */
    readonly platform: string;
    /** Localization strings loaded from the plugin's `i18n/` directory. */
    readonly i18n: Record<string, any>;
    /** Kernel lifecycle hooks for this plugin. */
    readonly lifecycle: IPluginLifecycle;
}

/**
 * Optional lifecycle callbacks invoked by the kernel at state transitions.
 *
 * @remarks Exposed as `siyuan.plugin.lifecycle`. Assign a function to any
 * property to subscribe; the kernel awaits any returned `Promise` before
 * advancing to the next lifecycle stage. Unset callbacks (`null`) are skipped.
 */
export interface IPluginLifecycle {
    /** Called when the plugin script is first evaluated (before the `running` state.). */
    onload: (() => void | Promise<void>) | null;
    /** Called when the plugin transitions to the `running` state. */
    onrunning: (() => void | Promise<void>) | null;
    /** Called when the plugin is being unloaded (e.g. on shutdown or hot-reload). */
    onunload: (() => void | Promise<void>) | null;
}

/**
 * Kernel event bridge.
 *
 * @remarks Exposed as `siyuan.event`. Allows the plugin to receive kernel
 * broadcast events and publish events to the in-process bus.
 */
export interface IEvent {
    /**
     * Inbound kernel event handler.
     *
     * @remarks Assign a function to receive every kernel dispatched event.
     * Set to `null` to stop receiving events.
     */
    handler: ((event: TEventMessage) => void | Promise<void>) | null;
    /**
     * Publishes an event to the in-process event bus.
     *
     * @param topic - Event topic string used to route the event to subscribers.
     * @param event - Arbitrary serializable payload.
     */
    emit(topic: string, event: IEventMessage): Promise<void>;
}

/**
 * Structured logger for the plugin.
 *
 * @remarks Exposed as `siyuan.logger`. Level semantics mirror the browser
 * `console` API (`trace` < `debug` < `info` < `warn` < `error`). Output is
 * written to the kernel log file and prefixed with the plugin name.
 */
export interface ILogger {
    /** Emits a `TRACE`-level log entry. */
    readonly trace: (...args: any[]) => Promise<void>;
    /** Emits a `DEBUG`-level log entry. */
    readonly debug: (...args: any[]) => Promise<void>;
    /** Emits an `INFO`-level log entry. */
    readonly info: (...args: any[]) => Promise<void>;
    /** Emits a `WARN`-level log entry. */
    readonly warn: (...args: any[]) => Promise<void>;
    /** Emits an `ERROR`-level log entry. */
    readonly error: (...args: any[]) => Promise<void>;
}

/**
 * Scoped file storage for the plugin.
 *
 * @remarks Exposed as `siyuan.storage`. All paths are relative to the
 * plugin's data directory at `data/plugins/<name>/`. Forward slashes are
 * accepted on all platforms.
 */
export interface IStorage {
    /**
     * Reads a file and returns a lazy data accessor.
     *
     * @param path - Path relative to the plugin data directory.
     * @returns A {@link IDataObject} wrapping the file contents.
     * @throws Rejects if the file does not exist.
     */
    get(path: string): Promise<IDataObject>;
    /**
     * Creates or overwrites a file with the provided UTF-8 string content.
     *
     * @param path    - Path relative to the plugin data directory.
     * @param content - UTF-8 encoded content to write.
     */
    put(path: string, content: string): Promise<void>;
    /**
     * Deletes a file or recursively removes a directory tree.
     *
     * @param path - Path relative to the plugin data directory.
     */
    remove(path: string): Promise<void>;
    /**
     * Lists the entries in a directory.
     *
     * @param path - Path relative to the plugin data directory.
     * @returns An array of {@link IStorageEntry} descriptors.
     */
    list(path: string): Promise<IStorageEntry[]>;
    readonly watcher: IStorageWatcher;
}

/**
 * Controls which storage paths the plugin's file-system watcher monitors.
 * Changes on watched paths are delivered as {@link IFsNotifyEventMessage}
 * events on the runtime event bus.
 */
export interface IStorageWatcher {
    /**
     * Resolves `path` and registers it with the file-system watcher.
     * @param path - Path relative to the storage directory to start watching.
     */
    add(path: string): Promise<void>;
    /**
     * Resolves `path` and unregisters it from the file-system watcher.
     * @param path - Path relative to the storage directory to stop watching.
     */
    remove(path: string): Promise<void>;
}

/** RPC method handler type. */
export type THandler = (...args: any[]) => any | Promise<any>;

/** Agent capability handler type. */
export type TAgentCapabilityHandler = (input: Record<string, any>) => any | Promise<any>;

/**
 * JSON-RPC method registry for the plugin.
 *
 * @remarks Exposed as `siyuan.rpc`. Registered methods are callable by
 * external clients via `GET /api/plugin/rpc`, `POST /api/plugin/rpc`, or
 * the WebSocket endpoint `GET /ws/plugin/rpc`.
 */
export interface IRpc {
    /**
     * Registers a named RPC method callable by external clients.
     *
     * @param name         - Unique method name used to dispatch the call.
     * @param handler      - Handler function; may be async.
     * @param descriptions - Optional human-readable description strings.
     */
    bind(
        name: string,
        handler: THandler,
        ...descriptions: string[]
    ): Promise<void>;
    /**
     * Unregisters a previously registered RPC method.
     *
     * @param name - The method name originally passed to {@link IRpc.bind}.
     */
    unbind(name: string): Promise<void>;
    /**
     * Broadcasts a JSON-RPC notification to all connected clients.
     *
     * @param method - Notification method name.
     * @param params - Optional notification parameters.
     */
    broadcast(method: string, params?: any[] | Record<string, any>): Promise<void>;
}

/** Agent capability registry exposed to plugins as `siyuan.agent`. */
export interface IAgent {
    /**
     * Registers an Agent capability.
     *
     * The capability name is automatically namespaced and suffixed with a stable hash
     * to avoid collisions between plugins.
     *
     * @param name - The capability name local to this plugin (e.g. `"my-capability"`).
     * @param config - Metadata, schemas, and declared side effects for the capability.
     * @param handler - The function invoked when an Agent calls the capability.
     * @returns The registration record, including the fully-qualified tool name.
     */
    registerCapability(
        name: string,
        config: IAgentCapabilityConfig,
        handler: TAgentCapabilityHandler,
    ): Promise<IRegisteredCapability>;

    /**
     * Unregisters a previously registered Agent capability.
     *
     * Uses the same local name passed to {@link registerCapability}; the kernel resolves
     * the fully-qualified name internally.
     *
     * @param name - The local capability name used when the capability was registered.
     */
    unregisterCapability(name: string): Promise<void>;
}

/** Side effects declared by an Agent capability or one of its actions. */
export interface IAgentCapabilityEffects {
    /** Reads local data. */
    localRead?: boolean;
    /** Modifies local data. */
    localWrite?: boolean;
    /** Sends data outside the local environment. */
    dataEgress?: boolean;
    /** May incur an external cost. */
    externalCost?: boolean;
}

/** Metadata, schemas, and side effects describing an Agent capability. */
export interface IAgentCapabilityConfig {
    /** Human-readable display name shown in Agent UIs. */
    title?: string;
    /** Natural-language description used by the Agent to discover and select the capability. */
    description: string;
    /** JSON Schema describing the capability's input parameters. */
    inputSchema: JSONSchema.ObjectSchema;
    /** JSON Schema describing the capability's output. */
    outputSchema?: JSONSchema.Schema;
    /** Default side effects for the capability. */
    effects?: IAgentCapabilityEffects;
    /** Side effects for individual values of the input `action` property. */
    actionEffects?: Record<string, IAgentCapabilityEffects>;
}

/**
 * The registration record returned by {@link IAgent.registerCapability}.
 */
export interface IRegisteredCapability extends IAgentCapabilityConfig {
    /** Stable capability identifier used by Agent configuration. */
    id: string;
    /**
     * The fully-qualified tool name exposed to the Agent.
     *
     * @example "plugin__plugin_name__capability_name__0123456789ab"
     */
    name: string;
}

// ── Server request types ─────────────────────────────────────────────────────

/**
 * Serialization format for a structured {@link IResponseBody.data} payload.
 *
 * @remarks The kernel delegates to the corresponding Gin writer:
 * JSON variants map to `c.JSON` / `c.JSONP` / `c.AsciiJSON` / etc.;
 * `XML` → `c.XML`; `YAML` → `c.YAML`; `TOML` → `c.TOML`;
 * `ProtoBuf` → `c.ProtoBuf`.
 */
export type TSerializedType =
    | 'JSON' | 'JSONP' | 'AsciiJSON' | 'IndentedJSON' | 'PureJSON' | 'SecureJSON'
    | 'XML' | 'YAML' | 'TOML' | 'ProtoBuf';

/**
 * HTTP Basic authentication credentials extracted from the request URL.
 */
export interface IRequestUser {
    /** Decoded username. */
    username: string;
    /** Decoded password. */
    password: string;
}

/**
 * Parsed URL components of an incoming server request.
 *
 * @remarks Field names mirror the browser `URL` / `Location` API where
 * applicable (`pathname`, `hash`, `search`).
 */
export interface IRequestUrl {
    /** Basic-auth credentials, or `null` if the request carries none. */
    user: IRequestUser | null;
    /** Value of the `Host` request header, e.g. `"127.0.0.1:6806"`. */
    host: string;
    /** URL-decoded path, e.g. `"/plugin/private/sample/api/hello/a space"`. */
    path: string;
    /** Percent-encoded path, e.g. `"/plugin/private/sample/api/hello/a%20space"`. */
    pathname: string;
    /** URL-decoded fragment without the leading `#`. */
    fragment: string;
    /** Percent-encoded fragment without the leading `#`. */
    hash: string;
    /** Raw query string without the leading `?`, e.g. `"a=1&b=2"`. */
    search: string;
    /** Parsed query parameters, e.g. `{ a: ["1"], b: ["2"] }`. */
    query: Record<string, string[]>;
}

/**
 * An uploaded file part within a `multipart/form-data` request.
 */
export interface IRequestFile {
    /** Original filename provided by the client. */
    filename: string;
    /** MIME part headers (e.g. `Content-Disposition`, `Content-Type`). */
    headers: Record<string, string[]>;
    /** File size in bytes. */
    size: number;
    /**
     * File contents as a lazy {@link IDataObject}.
     *
     * @remarks `null` if the file could not be read during request parsing.
     */
    data: IDataObject | null;
}

/**
 * Parsed form data from an `application/x-www-form-urlencoded` or
 * `multipart/form-data` request.
 */
export interface IRequestForm {
    /**
     * String form fields keyed by field name.
     *
     * @remarks Each key maps to an array to support repeated fields with the
     * same name, e.g. `{ tags: ["a", "b"] }`.
     */
    values: Record<string, string[]>;
    /** Uploaded file parts keyed by field name. */
    files: Record<string, IRequestFile[]>;
}

/**
 * Body of an incoming server request.
 *
 * @remarks Exactly one of `form` or `data` is non-null:
 * `form` is set for `application/x-www-form-urlencoded` and
 * `multipart/form-data`; `data` is set for all other content types and is
 * `null` when the request carries no body.
 */
export interface IRequestBody {
    /**
     * Parsed form data.
     *
     * @remarks `null` for non-form requests.
     */
    form: IRequestForm | null;
    /**
     * Raw request body as a lazy {@link IDataObject}.
     *
     * @remarks `null` when `form` is non-null or the request carries no body.
     */
    data: IDataObject | null;
}

/**
 * HTTP request-line and header fields.
 *
 * @remarks The `Cookie` and `Authorization` headers are stripped from
 * `headers` before the request is forwarded to the plugin handler.
 */
export interface IRequestContent {
    /** HTTP method in upper-case, e.g. `"GET"`, `"POST"`. */
    method: string;
    /** Full request URI including the query string, e.g. `"/plugin/private/sample/api/hello?a=1"`. */
    uri: string;
    /** HTTP protocol version string, e.g. `"HTTP/1.1"`. */
    proto: string;
    /** Major protocol version number, e.g. `1`. */
    protoMajor: number;
    /** Minor protocol version number, e.g. `1`. */
    protoMinor: number;
    /**
     * Request headers with `Cookie` and `Authorization` redacted.
     *
     * @remarks Each header name maps to an array of values to handle
     * repeated headers, e.g. `{ "Accept-Encoding": ["gzip", "br"] }`.
     */
    headers: Record<string, string[]>;
    /**
     * Request cookies keyed by cookie name.
     *
     * @remarks Each name maps to an array to handle duplicate cookie names.
     */
    cookies: Record<string, string[]>;
    /** Media type from the `Content-Type` header (parameters stripped), e.g. `"application/json"`. */
    contentType: string;
    /** Value of the `Content-Length` header in bytes; `-1` if unknown. */
    contentLength: number;
    /** Value of the `Referer` header, or an empty string if absent. */
    referer: string;
    /** Value of the `User-Agent` header. */
    userAgent: string;
    /** Parsed request body. */
    body: IRequestBody;
}

/**
 * Gin routing context for an incoming server request.
 */
export interface IRequestContext {
    /**
     * The sub-path captured by the `*path` wildcard parameter.
     *
     * @example `"/api/hello"` for a request to `/plugin/private/sample/api/hello`.
     */
    path: string;
    /** Full Gin route template, e.g. `"/plugin/private/:name/*path"`. */
    fullPath: string;
    /** Best-guess client IP address (honors `X-Forwarded-For` / `X-Real-IP`). */
    clientIp: string;
    /** Remote IP of the TCP connection (proxy headers are not considered). */
    remoteIp: string;
    /** `host:port` of the remote TCP endpoint, e.g. `"127.0.0.1:54321"`. */
    remoteAddr: string;
    /**
     * Named route parameters extracted by Gin.
     *
     * @example `{ name: ["plugin-sample"], path: ["/api/hello"] }`
     */
    params: Record<string, string[]>;
}

/**
 * The complete request object passed as the sole argument to server handlers.
 */
export interface IServerRequest {
    /** Parsed URL components. */
    url: IRequestUrl;
    /** HTTP request-line, headers, and body. */
    request: IRequestContent;
    /** Gin routing context. */
    context: IRequestContext;
}

// ── Server response types ─────────────────────────────────────────────────────

/**
 * A structured-data response body serialized by the kernel.
 *
 * @remarks The kernel selects the Gin writer that corresponds to `type`
 * (e.g. `c.JSON` for `"JSON"`, `c.XML` for `"XML"`).
 */
export interface IResponseSerializedData {
    /** Serialization format to use. */
    type: TSerializedType;
    /** The value to serialize; must be compatible with the chosen format. */
    data: any;
}

/**
 * A file response body served directly from the local filesystem.
 *
 * @remarks When `name` is non-empty the kernel sends the file as a
 * downloadable attachment (`Content-Disposition: attachment; filename="<name>"`).
 * When `name` is empty or omitted the file is served inline via `c.File`.
 *
 * The path must resolve inside the SiYuan workspace, matching the boundary the
 * kernel file APIs enforce. Absolute paths inside the workspace and
 * workspace-relative paths (a leading slash is allowed) are both accepted.
 * Symbolic links and directory junctions that resolve outside the workspace are
 * rejected. A path that resolves outside the workspace is answered with `404`,
 * the same response as a missing file.
 */
export interface IResponseFile {
    /**
     * Download filename for the `Content-Disposition` header.
     *
     * @remarks Omit or leave empty to serve the file inline.
     */
    name?: string;
    /**
     * Path of the file to serve.
     *
     * @remarks Must resolve inside the SiYuan workspace, for example
     * `/data/plugins/<plugin-name>/app/index.html`. A path outside the workspace
     * is answered with `404`.
     */
    path: string;
}

/**
 * A formatted-string response body.
 *
 * @remarks The kernel passes `format` and `values` to Go's `fmt.Sprintf`
 * and writes the resulting string via `c.String`.
 */
export interface IResponseString {
    /** Go `fmt.Sprintf`-style format string, e.g. `"Hello, %s!"`. */
    format: string;
    /** Positional arguments interpolated into `format`. */
    values?: any[];
}

/**
 * A raw-bytes response body with an explicit `Content-Type`.
 *
 * @remarks Written to the response via `c.Data`. `data` accepts a UTF-8
 * string, a Node.js `Buffer`, or an `ArrayBuffer`; the kernel converts all
 * three forms to `[]byte` before writing.
 */
export interface IResponseRawData {
    /** MIME type for the `Content-Type` response header, e.g. `"image/png"`. */
    contentType: string;
    /** Raw response body bytes. */
    data: string | ArrayBuffer;
}

/**
 * A redirect response body.
 *
 * @remarks The kernel issues the redirect via `c.Redirect` using the
 * `statusCode` from the enclosing {@link IHttpResponse}.
 */
export interface IResponseRedirect {
    /** Target URL; may be absolute or relative. */
    location: string;
}

/**
 * A streamed response body with an explicit `Content-Type`.
 *
 * @remarks Chunks are written to the response and flushed as they are read from `stream`, rather
 * than being buffered and sent all at once; each chunk must be a `BufferSource` (an `ArrayBuffer`
 * or a view onto one, e.g. `Uint8Array`) or a string (encoded as UTF-8), the same shape as
 * {@link IFetchResponse.body}'s chunks. If the client disconnects before the stream ends, the
 * kernel cancels its reader instead of letting the handler keep producing chunks nobody reads.
 */
export interface IResponseStream {
    /** MIME type for the `Content-Type` response header, e.g. `"text/event-stream"`. */
    contentType: string;
    /** The stream providing the response body. */
    stream: TReadableStream<TBufferSource | string>;
}

/**
 * The body of an HTTP response returned by a server handler.
 *
 * @remarks Set exactly one field; the kernel inspects `data`, `file`,
 * `string`, `raw`, `redirect`, `proxy`, and `stream` in that order and uses the first
 * non-null value. Returning an empty object (all fields absent or null)
 * results in a status-only response via `c.Status`.
 */
export interface IResponseBody {
    /** Structured data serialized by the kernel (JSON, XML, YAML, …). */
    data?: IResponseSerializedData | null;
    /** File served from the local filesystem. */
    file?: IResponseFile | null;
    /** Formatted string written via `fmt.Sprintf`. */
    string?: IResponseString | null;
    /** Raw bytes with an explicit `Content-Type`. */
    raw?: IResponseRawData | null;
    /** HTTP redirect. */
    redirect?: IResponseRedirect | null;
    /** Response body read incrementally from a {@link IReadableStream}. */
    stream?: IResponseStream | null;
}

/**
 * A `Set-Cookie` descriptor included in an {@link IHttpResponse}.
 *
 * @remarks Field names use PascalCase because they mirror Go's
 * `net/http.Cookie` struct, which has no JSON tags and therefore serializes
 * its exported field names verbatim.
 */
export interface IResponseCookie {
    /** Cookie name. */
    Name: string;
    /** Cookie value. */
    Value: string;
    /** `true` if the value should be wrapped in double-quotes in the header. */
    Quoted?: boolean;
    /** Cookie path scope, e.g. `"/plugin/private/my-plugin/"`. */
    Path?: string;
    /** Cookie domain scope. */
    Domain?: string;
    /** Absolute expiry time as an ISO 8601 string. */
    Expires?: string;
    /** Raw, unparsed `Expires` attribute string (informational). */
    RawExpires?: string;
    /** `Max-Age` in seconds. `0` deletes the cookie; negative values are not sent. */
    MaxAge?: number;
    /** Restricts the cookie to HTTPS connections. */
    Secure?: boolean;
    /** Hides the cookie from JavaScript (`HttpOnly` flag). */
    HttpOnly?: boolean;
    /**
     * `SameSite` cookie policy.
     *
     * @remarks Maps to Go `http.SameSite` constants:
     * `0` = default (browser-defined), `1` = None, `2` = Lax, `3` = Strict.
     */
    SameSite?: number;
    /** Sets the `Partitioned` (CHIPS) cookie attribute. */
    Partitioned?: boolean;
    /** Raw `Set-Cookie` line as sent by the server (informational). */
    Raw?: string;
    /** Unparsed attribute strings not recognized by the Go cookie parser. */
    Unparsed?: string[] | null;
}

/**
 * The return value expected from an HTTP server handler.
 */
export interface IHttpResponse {
    /** HTTP status code to send, e.g. `200`, `404`. */
    statusCode: number;
    /**
     * Additional response headers.
     *
     * @remarks Each header name maps to an array of values to support
     * multi-value headers such as `Link` or repeated `Set-Cookie` entries.
     */
    headers?: Record<string, string[]>;
    /** Cookies to attach to the response via `Set-Cookie` headers. */
    cookies?: IResponseCookie[];
    /** Response body. Omit or set to `null` for a header-only response. */
    body?: IResponseBody | null;
}

// ── Server handler interfaces ─────────────────────────────────────────────────

/**
 * A single Server-Sent Event (SSE) frame sent from the server to the client.
 *
 * Each field corresponds to a line prefix defined by the SSE specification
 * {@link https://html.spec.whatwg.org/multipage/server-sent-events.html | HTML Standard - 9.2 Server-sent events}.
 */
export interface IServerSentEvent {
    /** `id:` field — sets the event source's last-event-ID, used for reconnection replay. */
    id?: string;
    /** `event:` field — custom event type. */
    event?: string;
    /** `data:` field — the payload of the event. Multi-line values are joined with `\n`. */
    data: any;
    /** `retry:` field — overrides the client's reconnection delay (milliseconds). */
    retry?: number;
}

/**
 * Server-side SSE (Server-Sent Events) port provided to
 * {@link IServerEventSourceRequest.port}.
 *
 * @remarks
 * The kernel opens the SSE response stream before invoking the handler.
 * Once streaming begins, {@link IEventSourcePort.onopen} fires to signal that
 * the stream is ready for events. Call {@link IEventSourcePort.send} to push
 * SSE events to the client and {@link IEventSourcePort.close} to terminate
 * the stream. The connection stays open until `close()` is called or the
 * client disconnects.
 */
export interface IEventSourcePort {
    /** Called once when the SSE stream is ready to accept events. */
    onopen: ((event: IEventSourceOpenEvent) => void | Promise<void>) | null;
    /** Called when the client disconnects or after {@link IEventSourcePort.close}. */
    onclose: ((event: IEventSourceCloseEvent) => void | Promise<void>) | null;
    /**
     * Pushes one SSE event to the connected client.
     *
     * @remarks
     * `send` is synchronous — no `await` required. It enqueues the event in
     * the kernel's SSE write buffer; the actual flush is asynchronous.
     *
     * @param event - The SSE event to send.
     */
    send(event: IServerSentEvent): void;
    /** Terminates the SSE stream and closes the response. */
    close(): void;
}

/**
 * The request object received by {@link IServerScope.ws | WebSocket server handlers}.
 *
 * @remarks
 * Extends {@link IServerRequest} with a `port` property that mirrors the
 * {@link IWebSocket} client interface. The kernel upgrades the HTTP connection
 * to WebSocket before invoking the handler. After the handler returns, the
 * kernel auto-opens the port's read loop if `port.open()` was not called
 * explicitly.
 */
export interface IServerWebSocketRequest extends IServerRequest {
    /**
     * Bidirectional WebSocket port connected to the client.
     *
     * @remarks
     * Assign event callbacks (`onopen`, `onmessage`, `onping`, `onpong`,
     * `onclose`, `onerror`) before the handler returns. Calling `port.open()`
     * is optional — the kernel opens the read loop automatically.
     */
    readonly port: Omit<IWebSocket, "extensions" | "url">;
}

/**
 * The request object received by {@link IServerScope.es | SSE server handlers}.
 *
 * @remarks
 * Extends {@link IServerRequest} with a `port` property for pushing
 * Server-Sent Events to the client. The kernel opens the SSE response before
 * the handler is invoked; {@link IEventSourcePort.onopen} fires once streaming
 * begins.
 */
export interface IServerEventSourceRequest extends IServerRequest {
    /**
     * Server-side SSE port for pushing events to the connected client.
     *
     * @remarks
     * Assign `onopen` and `onclose` callbacks in the handler body. Call
     * `port.send(eventType, data)` inside `onopen` to emit SSE events.
     */
    readonly port: IEventSourcePort;
}

/**
 * Handler slot for one request type within a server scope.
 *
 * @remarks
 * The object is sealed by the kernel; only the `handler` property may be
 * reassigned. Set `handler` to `null` to leave the slot empty — the kernel
 * will return `500 Internal Server Error` for any unhandled request.
 *
 * @typeParam TRes - Expected return type of the handler function.
 * @typeParam TReq - Request object type passed to the handler. Defaults to
 *   {@link IServerRequest} for the HTTP slot; specialised to
 *   {@link IServerWebSocketRequest} and {@link IServerEventSourceRequest} for the WS and SSE
 *   slots respectively.
 */
export interface IServerRequestHandler<TRes, TReq extends IServerRequest = IServerRequest> {
    /**
     * The function invoked for each incoming request of this type.
     *
     * @remarks
     * The kernel passes the parsed request as the sole argument and awaits
     * any returned `Promise` before writing the response.
     */
    handler: ((request: TReq) => TRes | Promise<TRes>) | null;
}

/**
 * All request-type handler slots for one access scope.
 *
 * @remarks The object is frozen by the kernel; only the `handler` property
 * on each child object may be reassigned.
 */
export interface IServerScope {
    /**
     * HTTP request handler.
     *
     * @remarks Handles all HTTP methods at `ANY /plugin/private/<name>/*path`.
     * The handler must return an {@link IHttpResponse}.
     */
    readonly http: IServerRequestHandler<IHttpResponse>;
    /**
     * WebSocket upgrade handler.
     *
     * @remarks
     * The handler receives an {@link IServerWebSocketRequest} that includes
     * `request.port`, a bidirectional {@link IWebSocket} connected to the
     * client. Assign event callbacks before the handler returns; the kernel
     * auto-opens the port's read loop afterwards.
     */
    readonly ws: IServerRequestHandler<void, IServerWebSocketRequest>;
    /**
     * Server-Sent Events handler.
     *
     * @remarks
     * The handler receives an {@link IServerEventSourceRequest} that includes
     * `request.port`, an {@link IEventSourcePort} for pushing SSE events.
     * Assign `onopen` / `onclose` callbacks and call `port.send` inside
     * `onopen`.
     */
    readonly es: IServerRequestHandler<void, IServerEventSourceRequest>;
}

/**
 * Web server handler registry for the plugin.
 *
 * @remarks Exposed as `siyuan.server`. The kernel creates one frozen scope
 * object per access level. Only the `handler` properties inside each scope
 * object are writable.
 */
export interface IServer {
    /**
     * Private-scope handler group.
     *
     * @remarks Routes under `/plugin/private/<name>/*path` require kernel
     * authentication and admin role before the request reaches the handler.
     * The `<name>` segment must match the running plugin's `name`.
     */
    readonly private: IServerScope;
}

// ── Web Crypto ────────────────────────────────────────────────────────────────

/**
 * Binary input accepted by {@link ISubtleCrypto} operations and {@link ITextDecoder.decode}.
 *
 * @remarks {@link ISubtleCrypto} rejects strings and plain arrays with a `TypeError`;
 * encode text yourself, e.g. `new TextEncoder().encode(text)`. The kernel copies the
 * bytes before computing, so modifying the buffer afterwards does not affect the
 * pending operation.
 */
export type TBufferSource = ArrayBuffer | ArrayBufferView;

/** Integer `TypedArray` accepted by {@link ICrypto.getRandomValues}. */
export type TIntegerArray =
    | Int8Array | Uint8Array | Uint8ClampedArray
    | Int16Array | Uint16Array
    | Int32Array | Uint32Array
    | BigInt64Array | BigUint64Array;

/** Digest algorithms defined by the Web Crypto specification. */
export type TStandardHashAlgorithmName = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

/**
 * Digest algorithms the kernel supports beyond the Web Crypto specification.
 *
 * @remarks NOT part of the Web Crypto API. A browser rejects `"MD5"` with
 * `NotSupportedError`, so code using it only runs in the kernel sandbox.
 *
 * MD5 is accepted where a digest acts as a pseudorandom function: by
 * {@link ISubtleCrypto.digest} and as the `hash` of HMAC, HKDF, and PBKDF2. It exists
 * for interoperating with existing systems that cannot be changed. Signature algorithms
 * reject it with `NotSupportedError`, because their security depends on collision
 * resistance and practical MD5 collisions make such signatures forgeable. Do not use it
 * in new designs.
 */
export type TLegacyHashAlgorithmName = "MD5";

/** Digest algorithms supported by the kernel, including the non-standard extension. */
export type THashAlgorithmName = TStandardHashAlgorithmName | TLegacyHashAlgorithmName;

/**
 * Cipher algorithms the kernel supports beyond the Web Crypto specification.
 *
 * @remarks NOT part of the Web Crypto API. A browser rejects `"AES-ECB"` with
 * `NotSupportedError`, so code using it only runs in the kernel sandbox.
 *
 * ECB encrypts every block independently, so identical plaintext blocks yield identical
 * ciphertext blocks and the ciphertext leaks the structure of the plaintext. It takes no
 * IV, which makes encryption deterministic, and it provides no authentication, so
 * tampering is not detected. It exists for decrypting data produced by existing systems.
 * Prefer AES-GCM for anything new.
 *
 * Only `"encrypt"` and `"decrypt"` are permitted. Requesting `"wrapKey"` or
 * `"unwrapKey"` rejects with `SyntaxError`, because wrapping a key under a
 * deterministic, unauthenticated mode would expose the wrapped key's block structure.
 * The kernel applies PKCS#7 padding, matching OpenSSL's default, so ciphertext
 * interoperates with `openssl enc -aes-256-ecb` and Node's `createCipheriv`.
 */
export type TLegacyAlgorithmName = "AES-ECB";

/** Named elliptic curves supported by the kernel. */
export type TNamedCurve = "P-256" | "P-384" | "P-521";

/** Key usages recognized by {@link ISubtleCrypto}. */
export type TKeyUsage =
    | "encrypt" | "decrypt" | "sign" | "verify"
    | "deriveKey" | "deriveBits" | "wrapKey" | "unwrapKey";

/**
 * Key data formats recognized by {@link ISubtleCrypto}.
 *
 * @remarks Which formats an algorithm accepts differs: symmetric and HMAC keys use
 * `"raw"` and `"jwk"`, HKDF and PBKDF2 only `"raw"`, RSA `"spki"` / `"pkcs8"` / `"jwk"`,
 * and the curve algorithms additionally accept `"raw"` for public keys. Requesting an
 * unsupported combination rejects with `NotSupportedError`.
 */
export type TKeyFormat = "raw" | "pkcs8" | "spki" | "jwk";

/** A hash algorithm given either by name or as an object with a `name`. */
export type THashAlgorithmIdentifier = THashAlgorithmName | { name: THashAlgorithmName };

/**
 * An algorithm given either by name or as an object with parameters.
 *
 * @remarks Names are matched case-insensitively; unknown names reject with
 * `NotSupportedError`.
 */
export type TAlgorithmIdentifier = string | IAlgorithmParams;

/** Algorithm parameters; only the members an operation needs are read. */
export interface IAlgorithmParams {
    /**
     * Algorithm name, e.g. `"AES-GCM"`.
     *
     * @remarks Besides the Web Crypto algorithms, the kernel accepts the non-standard
     * `"AES-ECB"`; see {@link TLegacyAlgorithmName}.
     */
    name: string;
    /**
     * Digest algorithm, required by HMAC, RSA, ECDSA, HKDF, and PBKDF2.
     *
     * @remarks Signature algorithms accept only {@link TStandardHashAlgorithmName};
     * passing `"MD5"` to RSA or ECDSA rejects with `NotSupportedError`.
     */
    hash?: THashAlgorithmIdentifier;
    /**
     * Initialization vector for AES-CBC (16 bytes) and AES-GCM.
     *
     * @remarks AES-ECB takes no IV, which is why it is unsafe: the same plaintext
     * always produces the same ciphertext.
     */
    iv?: TBufferSource;
    /** Initial counter block for AES-CTR; must be 16 bytes. */
    counter?: TBufferSource;
    /** Additional authenticated data for AES-GCM. */
    additionalData?: TBufferSource;
    /** Label for RSA-OAEP. */
    label?: TBufferSource;
    /** Salt for HKDF and PBKDF2; required by both and may be empty. */
    salt?: TBufferSource;
    /** Context information for HKDF; required and may be empty. */
    info?: TBufferSource;
    /** Public exponent for RSA key generation; only `65537` is supported. */
    publicExponent?: TBufferSource;
    /**
     * Key length in bits for AES and HMAC; counter length in bits for AES-CTR.
     *
     * @remarks AES keys must be 128, 192, or 256 bits. `generateKey` and `deriveKey`
     * require this member for AES, while `importKey` and `unwrapKey` ignore it and take the
     * length from the key data, so the parameters passed to AES-CTR `encrypt` can be reused
     * for importing. HMAC imports still check it against the key data.
     */
    length?: number;
    /**
     * Authentication tag length in bits for AES-GCM.
     *
     * @remarks The kernel supports 96 to 128 bits. With an IV other than 12 bytes
     * only 128 is available, and 32 or 64 reject with `NotSupportedError`.
     * @defaultValue 128
     */
    tagLength?: number;
    /** Iteration count for PBKDF2; must be greater than zero. */
    iterations?: number;
    /**
     * Salt length in bytes for RSA-PSS.
     *
     * @remarks A value of `0` rejects with `NotSupportedError`.
     */
    saltLength?: number;
    /**
     * Modulus length in bits for RSA key generation.
     *
     * @remarks The kernel requires at least 1024 bits.
     */
    modulusLength?: number;
    /** Named curve for ECDSA and ECDH key generation and import. */
    namedCurve?: TNamedCurve;
    /** The other party's public key for ECDH and X25519 derivation. */
    public?: ICryptoKey;
}

/**
 * A JSON Web Key accepted by {@link ISubtleCrypto.importKey}.
 *
 * @remarks A private key must be consistent with its public members: an EC `d` outside
 * [1, n−1] or not matching `x` and `y`, an OKP `d` not matching `x`, or an inconsistent
 * RSA key rejects with `DataError`. Keys returned by {@link ISubtleCrypto.exportKey} have
 * the narrower shape {@link IExportedJsonWebKey}.
 */
export interface IJsonWebKey {
    kty: string;
    crv?: string;
    alg?: string;
    /**
     * Intended use of the key, `"sig"` or `"enc"`.
     *
     * @remarks When `keyUsages` is not empty, a present value must be `"sig"` for HMAC,
     * RSASSA-PKCS1-v1_5, RSA-PSS, ECDSA, and Ed25519, and `"enc"` for the AES algorithms,
     * RSA-OAEP, ECDH, and X25519; otherwise the import rejects with `DataError`.
     */
    use?: string;
    /**
     * Operations the key may perform.
     *
     * @remarks When present, even as an empty array, it must contain every requested usage
     * and no repeated value, otherwise the import rejects with `DataError`. When absent,
     * it places no restriction on the requested usages.
     */
    key_ops?: TKeyUsage[];
    /**
     * Whether the key may be exported.
     *
     * @remarks `false` rejects an import that requests an extractable key with `DataError`.
     */
    ext?: boolean;
    /** Symmetric key material, base64url-encoded. */
    k?: string;
    /** RSA modulus and exponent, base64url-encoded. */
    n?: string;
    e?: string;
    /** EC and OKP public key coordinates, base64url-encoded. */
    x?: string;
    y?: string;
    /** Private key material, base64url-encoded. */
    d?: string;
    p?: string;
    q?: string;
    dp?: string;
    dq?: string;
    qi?: string;
}

/**
 * A JSON Web Key returned by {@link ISubtleCrypto.exportKey}.
 *
 * @remarks Always carries `key_ops` and `ext`. `key_ops` is an empty array for keys
 * without usages, such as the public half of an ECDH or X25519 pair, and `use` is never
 * set. The result can be passed back to {@link ISubtleCrypto.importKey} unchanged.
 */
export interface IExportedJsonWebKey extends IJsonWebKey {
    key_ops: TKeyUsage[];
    ext: boolean;
}

/**
 * The algorithm a {@link ICryptoKey} was created with.
 *
 * @remarks Only the members that apply to the key's algorithm are present. ECDSA
 * keys carry no `hash`, because the digest belongs to the sign and verify parameters.
 */
export interface IKeyAlgorithm {
    /** Normalized algorithm name, e.g. `"AES-GCM"`. */
    readonly name: string;
    /** Digest algorithm for HMAC and RSA keys. */
    readonly hash?: { readonly name: THashAlgorithmName };
    /** Key length in bits for AES and HMAC keys. */
    readonly length?: number;
    /** Modulus length in bits for RSA keys. */
    readonly modulusLength?: number;
    /** Public exponent for RSA keys. */
    readonly publicExponent?: Uint8Array;
    /** Named curve for ECDSA and ECDH keys. */
    readonly namedCurve?: TNamedCurve;
}

/**
 * An opaque handle to key material held by the kernel.
 *
 * @remarks The key material never enters the plugin runtime; retrieve it with
 * {@link ISubtleCrypto.exportKey}, which requires {@link ICryptoKey.extractable}.
 * All properties are read-only accessors, so the object exposes no own properties:
 * `Object.keys(key)` returns `[]` and `JSON.stringify(key)` returns `{}`. Only keys
 * created by the kernel are accepted; a plain object with the same shape is rejected
 * with a `TypeError`. The handle cannot be frozen or structured-cloned, and persists
 * only for the lifetime of the runtime — to keep a key across restarts, export it
 * and store the result with {@link IStorage.put}.
 */
export interface ICryptoKey {
    /** Which half of a key pair this is, or `"secret"` for symmetric keys. */
    readonly type: "secret" | "public" | "private";
    /** Whether {@link ISubtleCrypto.exportKey} may return the key material. */
    readonly extractable: boolean;
    /** The algorithm and its parameters. */
    readonly algorithm: IKeyAlgorithm;
    /**
     * The operations this key permits.
     *
     * @remarks Using the key for anything else rejects with `InvalidAccessError`.
     * Public keys of ECDH and X25519 carry an empty array, because only the private
     * key derives.
     */
    readonly usages: readonly TKeyUsage[];
}

/** A generated public and private key pair. */
export interface ICryptoKeyPair {
    readonly publicKey: ICryptoKey;
    readonly privateKey: ICryptoKey;
}

/**
 * Cryptographic primitives exposed as `siyuan.crypto.subtle`.
 *
 * @remarks Mirrors the browser `SubtleCrypto` interface, computed by the kernel with
 * Go's standard library. Operations run off the event loop and resolve on it.
 *
 * Rejections carry the error name defined by the Web Crypto specification — for
 * example `NotSupportedError`, `InvalidAccessError`, `DataError`, or `OperationError`
 * — on an `Error` instance. The sandbox has no `DOMException`, so branch on
 * `error.name` rather than `instanceof`. Invalid argument types reject with a
 * `TypeError`.
 *
 * Every method returns a promise and never throws synchronously: an exception raised while
 * the arguments are read, for example by a getter, `valueOf`, or an iterator, rejects the
 * promise with the thrown value itself.
 */
export interface ISubtleCrypto {
    /**
     * Computes a message digest.
     *
     * @remarks Also accepts the non-standard `"MD5"`; see
     * {@link TLegacyHashAlgorithmName}.
     *
     * @param algorithm - One of {@link THashAlgorithmName}.
     * @param data      - The data to hash.
     * @returns The digest as an `ArrayBuffer`.
     */
    digest(algorithm: THashAlgorithmIdentifier, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Encrypts data.
     *
     * @remarks Supports AES-GCM, AES-CBC, AES-CTR, and RSA-OAEP, plus the non-standard
     * AES-ECB; see {@link TLegacyAlgorithmName}. AES-CBC and AES-ECB apply PKCS#7
     * padding. AES-CTR wraps the counter within the low `length` bits and rejects with
     * `DataError` when the counter space is too small for the data.
     */
    encrypt(algorithm: TAlgorithmIdentifier, key: ICryptoKey, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Decrypts data.
     *
     * @remarks Authentication and padding failures reject with `OperationError`
     * without distinguishing the cause.
     */
    decrypt(algorithm: TAlgorithmIdentifier, key: ICryptoKey, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Signs data.
     *
     * @remarks Supports HMAC, RSASSA-PKCS1-v1_5, RSA-PSS, ECDSA, and Ed25519.
     * ECDSA signatures are the fixed-length `r‖s` form, not DER.
     *
     * HMAC accepts `"MD5"` as its `hash`; the signature algorithms reject it with
     * `NotSupportedError`.
     */
    sign(algorithm: TAlgorithmIdentifier, key: ICryptoKey, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Verifies a signature.
     *
     * @returns `true` when the signature is valid. A malformed or wrong-length
     * signature resolves with `false` rather than rejecting.
     */
    verify(algorithm: TAlgorithmIdentifier, key: ICryptoKey, signature: TBufferSource,
        data: TBufferSource): Promise<boolean>;
    /**
     * Generates a key or key pair.
     *
     * @param algorithm   - The algorithm and its generation parameters.
     * @param extractable - Whether the key material may be exported. Public keys of a
     *                      generated pair are always extractable.
     * @param keyUsages   - The operations the key may perform. Usages are split between
     *                      the public and private key; at least one private-key usage is
     *                      required, otherwise the call rejects with `SyntaxError`.
     * @returns A single {@link ICryptoKey} for symmetric algorithms, or an
     *          {@link ICryptoKeyPair} for asymmetric ones.
     */
    generateKey(algorithm: TAlgorithmIdentifier, extractable: boolean,
        keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey | ICryptoKeyPair>;
    /**
     * Imports a key from an external format.
     *
     * @remarks A JWK is checked as described on {@link IJsonWebKey}. AES keys take their
     * length from the key data; see {@link IAlgorithmParams.length}.
     *
     * @param format      - See {@link TKeyFormat}.
     * @param keyData     - An {@link IJsonWebKey} when `format` is `"jwk"`, otherwise bytes.
     * @param algorithm   - The algorithm the key is for. ECDSA and ECDH need only
     *                      `namedCurve`; the digest is supplied per operation.
     * @param extractable - Whether the key material may be exported. HKDF and PBKDF2
     *                      keys must not be extractable.
     * @param keyUsages   - The operations the key may perform.
     */
    importKey(format: TKeyFormat, keyData: TBufferSource | IJsonWebKey, algorithm: TAlgorithmIdentifier,
        extractable: boolean, keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey>;
    /**
     * Exports a key's material as a JSON Web Key.
     *
     * @remarks Rejects with `InvalidAccessError` when the key is not extractable.
     * @returns An {@link IExportedJsonWebKey}.
     */
    exportKey(format: "jwk", key: ICryptoKey): Promise<IExportedJsonWebKey>;
    /**
     * Exports a key's material as bytes.
     *
     * @remarks Rejects with `InvalidAccessError` when the key is not extractable,
     * or when the format does not match the key type — `"spki"` and `"raw"` export
     * public keys, `"pkcs8"` private keys.
     * @returns The encoded key as an `ArrayBuffer`.
     */
    exportKey(format: Exclude<TKeyFormat, "jwk">, key: ICryptoKey): Promise<ArrayBuffer>;
    /**
     * Exports a key's material in a format chosen at run time.
     *
     * @returns An {@link IExportedJsonWebKey} when `format` is `"jwk"`, otherwise an
     * `ArrayBuffer`.
     */
    exportKey(format: TKeyFormat, key: ICryptoKey): Promise<ArrayBuffer | IExportedJsonWebKey>;
    /**
     * Derives raw bits from a base key.
     *
     * @param algorithm - HKDF, PBKDF2, ECDH, or X25519 parameters.
     * @param baseKey   - The key to derive from.
     * @param length    - Number of bits to derive; must be a non-zero multiple of 8.
     *                    For ECDH and X25519, `null` returns the full shared secret.
     */
    deriveBits(algorithm: TAlgorithmIdentifier, baseKey: ICryptoKey,
        length?: number | null): Promise<ArrayBuffer>;
    /**
     * Derives a key from a base key.
     *
     * @remarks Derives the bits the target algorithm needs and imports them as a
     * `"raw"` key, so `derivedKeyAlgorithm` must be AES or HMAC.
     */
    deriveKey(algorithm: TAlgorithmIdentifier, baseKey: ICryptoKey,
        derivedKeyAlgorithm: TAlgorithmIdentifier, extractable: boolean,
        keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey>;
    /**
     * Exports a key and encrypts the result.
     *
     * @remarks The wrapping key needs the `wrapKey` usage and the wrapped key must be
     * extractable. Supports AES-KW as well as the AES encryption modes and RSA-OAEP.
     */
    wrapKey(format: TKeyFormat, key: ICryptoKey, wrappingKey: ICryptoKey,
        wrapAlgorithm: TAlgorithmIdentifier): Promise<ArrayBuffer>;
    /**
     * Decrypts a wrapped key and imports it.
     *
     * @remarks The unwrapping key needs the `unwrapKey` usage. A failed integrity
     * check rejects with `OperationError`.
     */
    unwrapKey(format: TKeyFormat, wrappedKey: TBufferSource, unwrappingKey: ICryptoKey,
        unwrapAlgorithm: TAlgorithmIdentifier, unwrappedKeyAlgorithm: TAlgorithmIdentifier,
        extractable: boolean, keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey>;
}

/**
 * Cryptography exposed as `siyuan.crypto` and, as the same object, `globalThis.crypto`.
 *
 * @remarks Mirrors the browser `Crypto` interface, so code that uses the standard
 * global needs no adapter. The `Crypto`, `SubtleCrypto`, and `CryptoKey` interfaces
 * have no global constructors, so `instanceof` checks against them throw a
 * `ReferenceError`.
 *
 * The kernel additionally accepts two algorithms that the Web Crypto specification does
 * not define, for interoperating with existing systems: see
 * {@link TLegacyHashAlgorithmName} for MD5 and {@link TLegacyAlgorithmName} for AES-ECB.
 * Code that uses either will not run in a browser.
 */
export interface ICrypto {
    /**
     * Fills an integer `TypedArray` with cryptographically strong random values.
     *
     * @remarks Writes in place and returns the same array. Float arrays and
     * `DataView` throw `TypeMismatchError`; more than 65536 bytes throws
     * `QuotaExceededError`.
     */
    getRandomValues<T extends TIntegerArray>(array: T): T;
    /** Returns a randomly generated version 4 UUID. */
    randomUUID(): string;
    /** Low-level cryptographic primitives. */
    readonly subtle: ISubtleCrypto;
}

// ── Text encoding ────────────────────────────────────────────────────────────

/** Canonical encoding names reported by {@link ITextDecoder.encoding}. */
export type TTextDecoderEncoding = "utf-8" | "utf-16le" | "utf-16be";

/** Options of the global `TextDecoder` constructor. */
export interface ITextDecoderOptions {
    /**
     * Throw a `TypeError` on malformed input instead of decoding it as U+FFFD.
     *
     * @defaultValue `false`
     */
    fatal?: boolean;
    /**
     * Keep a leading byte order mark in the output instead of removing it.
     *
     * @defaultValue `false`
     */
    ignoreBOM?: boolean;
}

/** Options of {@link ITextDecoder.decode}. */
export interface ITextDecodeOptions {
    /**
     * Hold back an incomplete trailing byte sequence for the next call instead of
     * decoding it as U+FFFD.
     *
     * @defaultValue `false`
     */
    stream?: boolean;
}

/** An encoder created by the global `TextEncoder`. */
export interface ITextEncoder {
    /** Always `"utf-8"`. */
    readonly encoding: "utf-8";
    /**
     * Encodes `input` as UTF-8.
     *
     * @remarks `undefined` and `null` encode as an empty array; lone surrogates encode
     * as U+FFFD.
     */
    encode(input?: string): Uint8Array;
}

/**
 * The global `TextEncoder` constructor of the WHATWG Encoding Standard.
 *
 * @remarks Instances are plain objects carrying their members as own read-only
 * properties, so `instanceof TextEncoder` is `false`. `encodeInto` is not available.
 */
export interface ITextEncoderConstructor {
    new(): ITextEncoder;
}

/** A decoder created by the global `TextDecoder`. */
export interface ITextDecoder {
    /** Canonical name of the encoding selected by the constructor label. */
    readonly encoding: TTextDecoderEncoding;
    /** Whether malformed input throws instead of decoding as U+FFFD. */
    readonly fatal: boolean;
    /** Whether a leading byte order mark is kept in the output. */
    readonly ignoreBOM: boolean;
    /**
     * Decodes `input` and returns the text.
     *
     * @remarks Omitting `input` decodes nothing and flushes the bytes held back by a
     * previous `{ stream: true }` call. With {@link ITextDecoderOptions.fatal}, malformed
     * input throws a `TypeError` and discards the held-back bytes.
     */
    decode(input?: TBufferSource, options?: ITextDecodeOptions): string;
}

/**
 * The global `TextDecoder` constructor of the WHATWG Encoding Standard.
 *
 * @remarks Instances are plain objects carrying their members as own read-only
 * properties, so `instanceof TextDecoder` is `false`.
 */
export interface ITextDecoderConstructor {
    /**
     * @param label - Encoding label, matched case-insensitively after trimming ASCII
     * whitespace; defaults to `"utf-8"`. Only UTF-8 and UTF-16 labels are supported,
     * such as `"utf8"`, `"utf-16"` (little-endian), and `"utf-16be"`; any other label,
     * including valid ones such as `"gbk"`, throws a `RangeError`.
     * @param options - Decoding options.
     */
    new(label?: string, options?: ITextDecoderOptions): ITextDecoder;
}

// ── Abort signaling ───────────────────────────────────────────────────────────

/**
 * A single listener callback registered through {@link IAbortSignal.addEventListener}.
 *
 * @remarks `this` inside the callback is the {@link IAbortSignal} it was registered on.
 */
export type TAbortEventListener = (this: IAbortSignal, event: IAbortSignalEvent) => void;

/** An object with a `handleEvent` method, usable wherever {@link TAbortEventListener} is accepted. */
export interface IAbortEventListenerObject {
    handleEvent(event: IAbortSignalEvent): void;
}

/** Options accepted by {@link IAbortSignal.addEventListener}. */
export interface IAbortSignalAddEventListenerOptions {
    /**
     * Automatically removes the listener after it runs once.
     *
     * @defaultValue `false`
     */
    once?: boolean;
}

/**
 * The event delivered to `"abort"` listeners.
 *
 * @remarks A plain object shaped like a DOM `Event`, not an instance of one; `preventDefault`,
 * `stopPropagation`, and `stopImmediatePropagation` are no-ops because the event never bubbles
 * and is never cancelable.
 */
export interface IAbortSignalEvent {
    readonly type: "abort";
    readonly target: IAbortSignal;
    readonly currentTarget: IAbortSignal;
    readonly bubbles: false;
    readonly cancelable: false;
    readonly composed: false;
    readonly defaultPrevented: false;
    readonly isTrusted: true;
    /**
     * Event creation time in milliseconds since the Unix epoch.
     *
     * @remarks The DOM measures this from the time origin instead; the sandbox exposes no
     * `performance` object, so the Unix epoch is used.
     */
    readonly timeStamp: number;
    preventDefault(): void;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
}

/**
 * A cancellation signal, created by {@link IAbortControllerConstructor} or the static methods of
 * {@link IAbortSignalConstructor}, and accepted by {@link IClient.fetch} as `init.signal`.
 *
 * @remarks Mirrors the browser `AbortSignal` interface over a reduced event mechanism: instances
 * are plain objects, so `instanceof IAbortSignal` behaves correctly only through the exposed
 * `AbortSignal` global, and `dispatchEvent` only recognizes the `"abort"` type. `addEventListener`
 * ignores the `capture`/`passive`/`signal` options; only `once` is honored.
 */
export interface IAbortSignal {
    /** `true` once the signal has been aborted. */
    readonly aborted: boolean;
    /** The abort reason, or `undefined` before `aborted` becomes `true`. */
    readonly reason: unknown;
    /** Throws `reason` if `aborted` is `true`; otherwise does nothing. */
    throwIfAborted(): void;
    /** Shorthand for a single `"abort"` listener; replaces any previously assigned handler. */
    onabort: TAbortEventListener | null;
    addEventListener(type: "abort", listener: TAbortEventListener | IAbortEventListenerObject,
        options?: IAbortSignalAddEventListenerOptions): void;
    removeEventListener(type: "abort", listener: TAbortEventListener | IAbortEventListenerObject): void;
    /** Only an event with `type === "abort"` triggers the registered listeners. */
    dispatchEvent(event: Pick<IAbortSignalEvent, "type">): boolean;
}

/**
 * The global `AbortSignal` constructor.
 *
 * @remarks Calling it, with or without `new`, throws `TypeError: Illegal constructor`; obtain an
 * instance from {@link IAbortControllerConstructor} or one of the static methods below.
 */
export interface IAbortSignalConstructor {
    readonly prototype: IAbortSignal;
    /** Returns a signal that is already aborted, optionally with `reason` (defaults to an `AbortError`). */
    abort(reason?: unknown): IAbortSignal;
    /** Returns a signal that aborts itself after `milliseconds` with a `TimeoutError` reason. */
    timeout(milliseconds: number): IAbortSignal;
    /**
     * Returns a signal that aborts as soon as any of `signals` does, with the same reason.
     *
     * @remarks Only accepts an array; other iterables are not supported.
     */
    any(signals: readonly IAbortSignal[]): IAbortSignal;
}

/**
 * The `AbortSignal` instance type usable across APIs such as {@link IRequestInit.signal}.
 *
 * @remarks Resolves to the DOM `AbortSignal` type when the DOM library is loaded, matching what
 * `new AbortController().signal` and `AbortSignal.timeout(...)` actually produce in that case;
 * otherwise resolves to {@link IAbortSignal}.
 */
export type TAbortSignal = typeof globalThis extends { AbortSignal: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IAbortSignal
    : IAbortSignal;

/** Created by {@link IAbortControllerConstructor}; aborts its {@link IAbortController.signal}. */
export interface IAbortController {
    /** The signal to pass as `init.signal`, e.g. to {@link IClient.fetch}. */
    readonly signal: IAbortSignal;
    /**
     * Aborts {@link IAbortController.signal}, optionally with `reason` (defaults to an `AbortError`).
     *
     * @remarks A no-op if the signal is already aborted; the original reason is kept.
     */
    abort(reason?: unknown): void;
}

/** The global `AbortController` constructor. */
export interface IAbortControllerConstructor {
    readonly prototype: IAbortController;
    new(): IAbortController;
}

// ── Blob, File and FormData ─────────────────────────────────────────────────

/** A part accepted by {@link IBlobConstructor} and {@link IFileConstructor}. */
export type TBlobPart = TBufferSource | IBlob | string;

/** Options of {@link IBlobConstructor}. */
export interface IBlobPropertyBag {
    /**
     * Media type of the blob, converted to ASCII lowercase; a type containing characters outside
     * U+0020 to U+007E becomes `""`.
     *
     * @defaultValue `""`
     */
    type?: string;
    /**
     * How line breaks in string parts are written: `"transparent"` keeps them as they are, while
     * `"native"` converts CRLF, CR, and LF to the line break of the kernel's platform (CRLF on
     * Windows, LF elsewhere). Bytes from buffer sources and blobs are never converted.
     *
     * @defaultValue `"transparent"`
     */
    endings?: "transparent" | "native";
}

/** Options of {@link IFileConstructor}. */
export interface IFilePropertyBag extends IBlobPropertyBag {
    /**
     * Last modification time in milliseconds since the Unix epoch; fractions are truncated.
     *
     * @defaultValue The time the file is created.
     */
    lastModified?: number;
}

/**
 * Immutable binary data with a media type, created by {@link IBlobConstructor} or {@link IBlob.slice}.
 *
 * @remarks `stream()` is not available because kernel plugins have no `ReadableStream`.
 */
export interface IBlob {
    /** Size in bytes. */
    readonly size: number;
    /** Media type in ASCII lowercase, or `""` when unknown. */
    readonly type: string;
    /**
     * Returns a new blob with the bytes from `start` up to but not including `end`.
     *
     * @remarks Negative positions count back from the end, positions are clamped to `[0, size]`, and
     * fractions are rounded to the nearest integer (ties to even). The result is never a
     * {@link IFile}, and its type is the normalized `contentType` or `""`; it does not inherit this
     * blob's type.
     */
    slice(start?: number, end?: number, contentType?: string): IBlob;
    /** Decodes the bytes as UTF-8; a leading byte order mark is removed and malformed input becomes U+FFFD. */
    text(): Promise<string>;
    /** Returns a copy of the bytes. */
    arrayBuffer(): Promise<ArrayBuffer>;
    /** Returns a copy of the bytes as a `Uint8Array`. */
    bytes(): Promise<Uint8Array>;
}

/**
 * The global `Blob` constructor of the File API.
 *
 * @remarks Supports subclassing with `extends`, and instances accept added properties, but they cannot
 * be frozen. Unlike in browsers, calling the constructor without `new` does not throw.
 */
export interface IBlobConstructor {
    readonly prototype: IBlob;
    /**
     * @param blobParts - Parts concatenated in order: strings are encoded as UTF-8 (lone surrogates
     * become U+FFFD), and buffer sources and blobs contribute a copy of their current bytes. Must be
     * an iterable object such as an array; a string throws a `TypeError`.
     * @param options - Media type and line-ending handling.
     */
    new(blobParts?: Iterable<TBlobPart>, options?: IBlobPropertyBag): IBlob;
}

/**
 * The `Blob` instance type returned by {@link IDataObject.blob}.
 *
 * @remarks Resolves to the DOM `Blob` type when the DOM library is loaded, matching what
 * `new Blob()` produces in that case; otherwise resolves to {@link IBlob}.
 */
export type TBlob = typeof globalThis extends { Blob: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IBlob
    : IBlob;

/** A {@link IBlob} with a file name and a modification time, created by {@link IFileConstructor}. */
export interface IFile extends IBlob {
    /** The file name exactly as given, including any `/`. */
    readonly name: string;
    /** Last modification time in milliseconds since the Unix epoch. */
    readonly lastModified: number;
}

/**
 * The global `File` constructor of the File API; `File` inherits from `Blob`.
 *
 * @remarks The caveats of {@link IBlobConstructor} apply.
 */
export interface IFileConstructor {
    readonly prototype: IFile;
    /**
     * @param fileBits - The contents, as for `blobParts` of {@link IBlobConstructor}, but required.
     * @param fileName - The file name.
     * @param options - Media type, line-ending handling, and modification time.
     */
    new(fileBits: Iterable<TBlobPart>, fileName: string, options?: IFilePropertyBag): IFile;
}

/** The value of a {@link IFormData} entry: a string or a file. */
export type TFormDataEntryValue = string | IFile;

/**
 * An ordered list of name/value entries, sent as `multipart/form-data` when used as
 * {@link IRequestInit.body}, for example to upload files through `/api/asset/upload`.
 *
 * @remarks Iteration, including `for...of`, `entries()`, `keys()`, `values()`, and `forEach()`, reads
 * the current entries, so entries added while iterating are visited.
 */
export interface IFormData {
    /**
     * Appends an entry.
     *
     * @remarks A blob is stored as a {@link IFile}: a blob that is not a file is named `"blob"`, and
     * `filename` renames it, keeping its type and, for a file, its `lastModified`. Other values are
     * converted to strings; passing `filename` with a value that is not a blob throws a `TypeError`.
     */
    append(name: string, value: string): void;
    append(name: string, blobValue: IBlob, filename?: string): void;
    /** Removes all entries named `name`. */
    delete(name: string): void;
    /** Returns the value of the first entry named `name`, or `null` if there is none. */
    get(name: string): TFormDataEntryValue | null;
    /** Returns the values of all entries named `name`, in order. */
    getAll(name: string): TFormDataEntryValue[];
    /** Whether an entry named `name` exists. */
    has(name: string): boolean;
    /**
     * Replaces the first entry named `name` and removes the other entries with that name, or appends
     * the entry if there is none.
     *
     * @remarks Values are handled as in {@link IFormData.append}.
     */
    set(name: string, value: string): void;
    set(name: string, blobValue: IBlob, filename?: string): void;
    entries(): IterableIterator<[string, TFormDataEntryValue]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<TFormDataEntryValue>;
    forEach(callback: (value: TFormDataEntryValue, key: string, parent: IFormData) => void, thisArg?: unknown): void;
    [Symbol.iterator](): IterableIterator<[string, TFormDataEntryValue]>;
}

/**
 * The global `FormData` constructor of the XMLHttpRequest Standard.
 *
 * @remarks Kernel plugins have no `HTMLFormElement`, so the constructor takes no form, and any argument
 * other than `undefined` throws a `TypeError`. The caveats of {@link IBlobConstructor} apply.
 */
export interface IFormDataConstructor {
    readonly prototype: IFormData;
    new(): IFormData;
}

/**
 * The `FormData` instance type accepted by {@link IRequestInit.body}.
 *
 * @remarks Resolves to the DOM `FormData` type when the DOM library is loaded, matching what
 * `new FormData()` produces in that case; otherwise resolves to {@link IFormData}.
 */
export type TFormData = typeof globalThis extends { FormData: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IFormData
    : IFormData;

// ── Streams ───────────────────────────────────────────────────────────────────
//
// Implements the default (non-byte) subset of the WHATWG Streams Standard: ReadableStream,
// WritableStream, TransformStream, and their default controllers/readers/writers, plus
// CountQueuingStrategy and ByteLengthQueuingStrategy. Byte streams are not supported
// (ReadableByteStreamController, ReadableStreamBYOBReader, ReadableStreamBYOBRequest, and
// `getReader({mode: "byob"})` do not exist); `WritableStreamDefaultController.signal` is not
// exposed either, so an underlying sink can only observe cancellation through the `reason`
// argument of its `abort` method. The sandbox has no native `Symbol.asyncIterator`, so
// `ReadableStream.prototype.values()` is reachable but `for await...of` does not work; drive a
// stream with `getReader()` and `read()` instead.

/**
 * The result of {@link IReadableStreamDefaultReader.read} or
 * {@link IReadableStreamAsyncIterator.next} for a chunk that has not ended the stream.
 */
export interface IReadableStreamReadValueResult<T> {
    done: false;
    value: T;
}

/** The result of {@link IReadableStreamDefaultReader.read} once the stream has closed. */
export interface IReadableStreamReadDoneResult {
    done: true;
    value?: undefined;
}

export type TReadableStreamReadResult<T> = IReadableStreamReadValueResult<T> | IReadableStreamReadDoneResult;

/** Passed to {@link IUnderlyingDefaultSource}'s methods to control a {@link IReadableStream}. */
export interface IReadableStreamDefaultController<R = any> {
    /**
     * The stream's internal queue size, in units set by the queuing strategy, subtracted from its
     * `highWaterMark`; `null` once the stream has errored.
     */
    readonly desiredSize: number | null;
    /** Closes the stream: no more chunks may be enqueued, and pending reads resolve as `done`. */
    close(): void;
    /** Appends a chunk to the stream's internal queue. */
    enqueue(chunk?: R): void;
    /** Errors the stream: pending and future reads reject with `e`. */
    error(e?: any): void;
}

/** The `underlyingSource` argument accepted by {@link IReadableStreamConstructor}. */
export interface IUnderlyingDefaultSource<R = any> {
    /** Called once when the stream is constructed, before any `pull` call. */
    start?(controller: IReadableStreamDefaultController<R>): void | PromiseLike<void>;
    /**
     * Called whenever the stream's internal queue has room (and once eagerly after `start`
     * settles); called again only after the returned value settles.
     */
    pull?(controller: IReadableStreamDefaultController<R>): void | PromiseLike<void>;
    /** Called when the stream's consumer cancels it, e.g. via {@link IReadableStream.cancel}. */
    cancel?(reason?: any): void | PromiseLike<void>;
}

/** A sizing strategy accepted by {@link IReadableStreamConstructor} and {@link IWritableStreamConstructor}. */
export interface IQueuingStrategy<T = any> {
    /** The queue size, in the strategy's own units, above which backpressure is signaled. */
    highWaterMark?: number;
    /** Returns the size of `chunk` in the strategy's own units; defaults to `1` per chunk. */
    size?(chunk: T): number;
}

/** A reader acquired from a {@link IReadableStream} via {@link IReadableStream.getReader}. */
export interface IReadableStreamDefaultReader<R = any> {
    /** Resolves when the stream closes, or rejects with its error. */
    readonly closed: Promise<void>;
    /** Cancels the stream, as if calling {@link IReadableStream.cancel} on its owner. */
    cancel(reason?: any): Promise<void>;
    /** Reads the next chunk, resolving `{done: true}` once the stream closes. */
    read(): Promise<TReadableStreamReadResult<R>>;
    /** Releases this reader's lock on the stream, allowing another reader to be acquired. */
    releaseLock(): void;
}

/**
 * Options accepted by {@link IReadableStream.getReader}.
 *
 * @remarks `mode` is typed as `never` because `"byob"` (the only other value defined by the
 * Streams Standard) is not supported; passing it throws at runtime.
 */
export interface IReadableStreamGetReaderOptions {
    mode?: never;
}

/** Options accepted by {@link IReadableStream.pipeTo} and {@link IReadableStream.pipeThrough}. */
export interface IStreamPipeOptions {
    /** Do not close `destination` when this stream closes. */
    preventClose?: boolean;
    /** Do not abort `destination` when this stream errors. */
    preventAbort?: boolean;
    /** Do not cancel this stream when `destination` errors or becomes closed/errored unexpectedly. */
    preventCancel?: boolean;
    /** Aborts the pipe (and, per the two flags above, the source and/or destination) when triggered. */
    signal?: TAbortSignal;
}

/** A `{readable, writable}` pair, such as a {@link ITransformStream}, accepted by {@link IReadableStream.pipeThrough}. */
export interface IReadableWritablePair<O = any, I = any> {
    readable: IReadableStream<O>;
    writable: IWritableStream<I>;
}

/** Options accepted by {@link IReadableStream.values}. */
export interface IReadableStreamIteratorOptions {
    /** Do not cancel the stream when iteration ends early (e.g. via `break` or `return()`). */
    preventCancel?: boolean;
}

/**
 * The async-iterator-shaped object returned by {@link IReadableStream.values}.
 *
 * @remarks Because the sandbox has no native `Symbol.asyncIterator`, this object cannot be used
 * with `for await...of`; call `next()` directly instead.
 */
export interface IReadableStreamAsyncIterator<R = any> {
    /** Equivalent to a reader's `read()`. */
    next(): Promise<TReadableStreamReadResult<R>>;
    /** Equivalent to releasing the reader, optionally cancelling the stream first. */
    return(value?: any): Promise<IReadableStreamReadDoneResult>;
}

/** A readable stream of chunks of type `R`, such as {@link IFetchResponse.body}. */
export interface IReadableStream<R = any> {
    /** `true` once a reader has been acquired via {@link getReader} and not yet released. */
    readonly locked: boolean;
    /** Cancels the stream; throws if it is {@link locked}. */
    cancel(reason?: any): Promise<void>;
    /** Acquires the stream's single reader; throws if it is already {@link locked}. */
    getReader(options?: IReadableStreamGetReaderOptions): IReadableStreamDefaultReader<R>;
    /** Pipes this stream through `transform`, returning its readable side. */
    pipeThrough<O>(transform: IReadableWritablePair<O, R>, options?: IStreamPipeOptions): IReadableStream<O>;
    /** Pipes this stream's chunks into `destination` until it closes, errors, or is cancelled. */
    pipeTo(destination: IWritableStream<R>, options?: IStreamPipeOptions): Promise<void>;
    /** Splits this stream into two independently readable branches over the same chunks. */
    tee(): [IReadableStream<R>, IReadableStream<R>];
    /** Returns an async-iterator-shaped object over this stream's chunks; see the remarks on {@link IReadableStreamAsyncIterator}. */
    values(options?: IReadableStreamIteratorOptions): IReadableStreamAsyncIterator<R>;
}

/** Constructs a {@link IReadableStream}. */
export interface IReadableStreamConstructor {
    new <R = any>(underlyingSource?: IUnderlyingDefaultSource<R>, strategy?: IQueuingStrategy<R>): IReadableStream<R>;
    /** Wraps an iterable or async iterable as a {@link IReadableStream} that yields its values. */
    from<R = any>(iterable: Iterable<R> | AsyncIterable<R>): IReadableStream<R>;
}

/** Passed to {@link IUnderlyingSink}'s methods to control a {@link IWritableStream}. */
export interface IWritableStreamDefaultController {
    /** Errors the stream; equivalent to calling this from outside, e.g. in response to another failure. */
    error(e?: any): void;
}

/** The `underlyingSink` argument accepted by {@link IWritableStreamConstructor}. */
export interface IUnderlyingSink<W = any> {
    /** Called once when the stream is constructed. */
    start?(controller: IWritableStreamDefaultController): void | PromiseLike<void>;
    /** Called once per queued chunk, in order; not called again until the returned value settles. */
    write?(chunk: W, controller: IWritableStreamDefaultController): void | PromiseLike<void>;
    /** Called once all queued writes have settled, when the stream is told to close. */
    close?(): void | PromiseLike<void>;
    /** Called when the stream is aborted; `reason` is whatever the caller passed to `abort()`. */
    abort?(reason?: any): void | PromiseLike<void>;
}

/** A writer acquired from a {@link IWritableStream} via {@link IWritableStream.getWriter}. */
export interface IWritableStreamDefaultWriter<W = any> {
    /** Resolves once the stream closes, or rejects with its error. */
    readonly closed: Promise<void>;
    /** The queue size headroom in the strategy's units; `null` once errored, `0` once closed. */
    readonly desiredSize: number | null;
    /** Resolves once {@link desiredSize} is positive again, i.e. backpressure has cleared. */
    readonly ready: Promise<void>;
    /** Aborts the stream, as if calling {@link IWritableStream.abort} on its owner. */
    abort(reason?: any): Promise<void>;
    /** Closes the stream, as if calling {@link IWritableStream.close} on its owner. */
    close(): Promise<void>;
    /** Releases this writer's lock on the stream, allowing another writer to be acquired. */
    releaseLock(): void;
    /** Queues `chunk` to be written; resolves once it has actually been written. */
    write(chunk?: W): Promise<void>;
}

/** A writable stream of chunks of type `W`, such as {@link IResponseStream.stream}. */
export interface IWritableStream<W = any> {
    /** `true` once a writer has been acquired via {@link getWriter} and not yet released. */
    readonly locked: boolean;
    /** Aborts the stream; throws if it is {@link locked}. */
    abort(reason?: any): Promise<void>;
    /** Closes the stream; throws if it is {@link locked} or already closing/closed. */
    close(): Promise<void>;
    /** Acquires the stream's single writer; throws if it is already {@link locked}. */
    getWriter(): IWritableStreamDefaultWriter<W>;
}

/** Constructs a {@link IWritableStream}. */
export interface IWritableStreamConstructor {
    new <W = any>(underlyingSink?: IUnderlyingSink<W>, strategy?: IQueuingStrategy<W>): IWritableStream<W>;
}

/** Passed to {@link ITransformer}'s methods to produce a {@link ITransformStream}'s readable side. */
export interface ITransformStreamDefaultController<O = any> {
    /** Same meaning as {@link IReadableStreamDefaultController.desiredSize} for the readable side. */
    readonly desiredSize: number | null;
    /** Appends a chunk to the readable side's internal queue. */
    enqueue(chunk?: O): void;
    /** Errors both sides of the transform stream. */
    error(reason?: any): void;
    /** Closes the readable side and errors the writable side with a `TypeError`. */
    terminate(): void;
}

/** The `transformer` argument accepted by {@link ITransformStreamConstructor}. */
export interface ITransformer<I = any, O = any> {
    /** Called once when the stream is constructed. */
    start?(controller: ITransformStreamDefaultController<O>): void | PromiseLike<void>;
    /**
     * Called once per chunk written to the writable side; defaults to enqueueing the chunk
     * unchanged (an identity transform) when omitted.
     */
    transform?(chunk: I, controller: ITransformStreamDefaultController<O>): void | PromiseLike<void>;
    /** Called once the writable side closes, before the readable side closes in turn. */
    flush?(controller: ITransformStreamDefaultController<O>): void | PromiseLike<void>;
    /**
     * Called when the writable side is aborted; its return value settling closes the readable
     * side. Not called when the readable side is cancelled instead (that only errors the writable
     * side, without invoking this method).
     */
    cancel?(reason?: any): void | PromiseLike<void>;
}

/** A linked `{readable, writable}` pair where writes to `writable` are transformed into `readable`'s chunks. */
export interface ITransformStream<I = any, O = any> {
    /** Yields the transformed chunks. */
    readonly readable: IReadableStream<O>;
    /** Accepts the chunks to transform. */
    readonly writable: IWritableStream<I>;
}

/** Constructs a {@link ITransformStream}. */
export interface ITransformStreamConstructor {
    new <I = any, O = any>(transformer?: ITransformer<I, O>, writableStrategy?: IQueuingStrategy<I>,
        readableStrategy?: IQueuingStrategy<O>): ITransformStream<I, O>;
}

/** A {@link IQueuingStrategy} that counts each chunk as size `1`, regardless of its contents. */
export interface ICountQueuingStrategy {
    readonly highWaterMark: number;
    size(chunk?: any): 1;
}

/** Constructs a {@link ICountQueuingStrategy}. */
export interface ICountQueuingStrategyConstructor {
    new (init: { highWaterMark: number }): ICountQueuingStrategy;
}

/** A {@link IQueuingStrategy} that sizes each chunk by its `byteLength`. */
export interface IByteLengthQueuingStrategy {
    readonly highWaterMark: number;
    size(chunk: TBufferSource): number;
}

/** Constructs a {@link IByteLengthQueuingStrategy}. */
export interface IByteLengthQueuingStrategyConstructor {
    new (init: { highWaterMark: number }): IByteLengthQueuingStrategy;
}

/**
 * The `ReadableStream` instance type produced by {@link IReadableStreamConstructor} and used by
 * {@link IFetchResponse.body}.
 *
 * @remarks Resolves to the DOM `ReadableStream` type when the DOM library is loaded, matching what
 * `new ReadableStream()` produces in that case; otherwise resolves to {@link IReadableStream}.
 * TypeScript cannot thread the chunk type parameter `R` through the DOM branch, so `R` is only
 * honored when the DOM library is not loaded.
 */
export type TReadableStream<R = any> = typeof globalThis extends { ReadableStream: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IReadableStream<R>
    : IReadableStream<R>;

/**
 * The `WritableStream` instance type produced by {@link IWritableStreamConstructor}.
 *
 * @remarks Resolves to the DOM `WritableStream` type when the DOM library is loaded, matching what
 * `new WritableStream()` produces in that case; otherwise resolves to {@link IWritableStream}. See
 * {@link TReadableStream} for the same caveat about the chunk type parameter `W`.
 */
export type TWritableStream<W = any> = typeof globalThis extends { WritableStream: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IWritableStream<W>
    : IWritableStream<W>;

/**
 * The `TransformStream` instance type produced by {@link ITransformStreamConstructor}.
 *
 * @remarks Resolves to the DOM `TransformStream` type when the DOM library is loaded, matching what
 * `new TransformStream()` produces in that case; otherwise resolves to {@link ITransformStream}. See
 * {@link TReadableStream} for the same caveat about the chunk type parameters `I`/`O`.
 */
export type TTransformStream<I = any, O = any> = typeof globalThis extends { TransformStream: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : ITransformStream<I, O>
    : ITransformStream<I, O>;

// ── Top-level interface ───────────────────────────────────────────────────────

/**
 * The root `siyuan` global exposed to every kernel plugin script.
 *
 * @remarks Available as the global constant `siyuan`. All async operations
 * return `Promise`s resolved on the plugin's JavaScript runtime event loop.
 */
export interface ISiyuan {
    /** Static metadata about this plugin instance. */
    readonly plugin: IPlugin;
    /** Kernel event bridge. */
    readonly event: IEvent;
    /** Structured logger. */
    readonly logger: ILogger;
    /** Scoped persistent file storage. */
    readonly storage: IStorage;
    /** JSON-RPC method registry. */
    readonly rpc: IRpc;
    /** Agent capability registry. */
    readonly agent: IAgent;
    /** Network client utilities (HTTP, WebSocket, SSE). */
    readonly client: IClient;
    /** Web request handler registry. */
    readonly server: IServer;
    /** Web Crypto primitives. */
    readonly crypto: ICrypto;
}
