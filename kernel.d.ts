/// <reference types="@dop251/types-goja_nodejs-buffer" />
/// <reference types="@dop251/types-goja_nodejs-global" />
/// <reference types="@dop251/types-goja_nodejs-url" />

import type { JSONSchema } from "zod/v4/core";
declare global {
    const siyuan: ISiyuan;

    /**
     * The goja_nodejs `Buffer` bundled with the kernel names the URL-safe Base64 codec `"base64Url"`.
     *
     * @remarks The referenced Buffer declarations list Node's `"base64url"`, which the kernel does not
     * support: `buf.toString("base64url")` throws `Unknown encoding`, and `Buffer.from(text, "base64url")`
     * silently decodes `text` as UTF-8. Use `"base64Url"` instead.
     */
    interface BufferConstructor {
        from(string: string, encoding: "base64Url"): Buffer<ArrayBuffer>;
    }

    interface Buffer<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike> {
        /** Encodes the bytes as unpadded URL-safe Base64; see {@link BufferConstructor.from}. */
        toString(encoding: "base64Url", start?: number, end?: number): string;
    }

    // The declarations below describe other globals of the kernel plugin sandbox. When DOM declarations
    // are also loaded (e.g. frontend and kernel code share one compilation), timer handles become
    // numbers and `URL` / `URLSearchParams` use the DOM types, so frontend code keeps compiling.
    // The sandbox also provides `require`, which is not declared here to avoid conflicts with `@types/node`.

    /**
     * `console` provided by the sandbox.
     *
     * @remarks Output is written to the kernel log with the `[plugin:<name>]` prefix: `log`, `info`,
     * and `debug` at INFO level, `warn` at WARN level, and `error` at ERROR level.
     */
    interface Console {
        log(...data: any[]): void;
        info(...data: any[]): void;
        debug(...data: any[]): void;
        warn(...data: any[]): void;
        error(...data: any[]): void;
    }

    var console: Console;

    /**
     * Schedules `handler` on the plugin's event loop. String handlers are not supported.
     *
     * @returns An opaque handle for {@link clearTimeout}; in the sandbox it is an object, not a number.
     */
    function setTimeout(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): TTimeoutHandle;

    /**
     * Schedules `handler` repeatedly on the plugin's event loop. String handlers are not supported.
     *
     * @returns An opaque handle for {@link clearInterval}; in the sandbox it is an object, not a number.
     */
    function setInterval(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): TIntervalHandle;

    /**
     * Runs `handler` on the plugin's event loop as soon as possible.
     *
     * @returns An opaque handle for {@link clearImmediate}.
     */
    function setImmediate(handler: (...args: any[]) => void, ...args: any[]): TImmediateHandle;

    function clearTimeout(handle: TTimeoutHandle | null | undefined): void;

    function clearInterval(handle: TIntervalHandle | null | undefined): void;

    function clearImmediate(handle: TImmediateHandle | null | undefined): void;

    /** WHATWG `URL` implemented by goja_nodejs. */
    var URL: typeof globalThis extends { onmessage: any; URL: infer T } ? T : typeof import("url").URL;

    /** WHATWG `URLSearchParams` implemented by goja_nodejs. */
    var URLSearchParams: typeof globalThis extends { onmessage: any; URLSearchParams: infer T }
        ? T
        : typeof import("url").URLSearchParams;

    /**
     * Error type used by the kernel to reject `siyuan.*` promises and to throw from synchronous APIs.
     *
     * @remarks `message` is the kernel's Go error text. Errors created by the kernel also carry the
     * wrapped Go error in `value`.
     */
    interface GoError extends Error {
        value?: unknown;
    }

    var GoError: {
        new(message?: string): GoError;
        (message?: string): GoError;
        readonly prototype: GoError;
    };
}

/** Opaque object returned by the sandbox `setTimeout`. */
export interface ITimeoutHandle {
    readonly __timeoutHandle: never;
}

/** Opaque object returned by the sandbox `setInterval`. */
export interface IIntervalHandle {
    readonly __intervalHandle: never;
}

/** Opaque object returned by the sandbox `setImmediate`. */
export interface IImmediateHandle {
    readonly __immediateHandle: never;
}

/** Timer handle type: {@link ITimeoutHandle}, or `number` when DOM declarations are also loaded. */
export type TTimeoutHandle = typeof globalThis extends { onmessage: any } ? number : ITimeoutHandle;

/** Interval handle type: {@link IIntervalHandle}, or `number` when DOM declarations are also loaded. */
export type TIntervalHandle = typeof globalThis extends { onmessage: any } ? number : IIntervalHandle;

/** Immediate handle type: {@link IImmediateHandle}, or `number` when DOM declarations are also loaded. */
export type TImmediateHandle = typeof globalThis extends { onmessage: any } ? number : IImmediateHandle;

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
 * A lazy data accessor returned by {@link IStorage.get} and {@link IFetchResponse}, and used for
 * private server request bodies and uploaded files.
 *
 * @remarks Every method reads the same bytes and can be called any number of times. `buffer()` and
 * `arrayBuffer()` return views over those bytes without copying, so writes through them change what
 * later calls on the same object return; copy the bytes before modifying them.
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
     * @returns The parsed value; rejects when the data is not valid JSON.
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
}

/**
 * Response object returned by {@link ISiyuan.fetch}.
 *
 * @remarks Extends {@link IDataObject} so the response body can be read
 * as text, JSON, or raw bytes.
 */
export interface IFetchResponse extends IDataObject {
    /** The path passed to {@link IClient.fetch}; redirects are not reflected. */
    url: string;
    /** `true` when `status` is in the range 200–299. */
    ok: boolean;
    /** HTTP status code, e.g. `200`. */
    status: number;
    /** HTTP status line text including the code, e.g. `"200 OK"`. */
    statusText: string;
    /** Response headers as a flat string-to-string map. */
    headers: Record<string, string>;
}

/**
 * Options accepted by {@link ISiyuan.fetch}.
 */
export interface IRequestInit {
    /** HTTP method. Defaults to `"GET"` when omitted. */
    method?: string;
    /** Additional request headers. */
    headers?: Record<string, string>;
    /** Request body. Omit for methods that carry no body (e.g. GET, HEAD). */
    body?: string | ArrayBuffer;
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
}

/**
 * An event message delivered to {@link IEvent.handler}.
 */
export interface IEventMessage {
    /** Unique event identifier. */
    id: UUID;
    /** Event type name, e.g. `"start"` or `"fs-notify"`. */
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
        /** Path relative to the plugin's storage directory, using the platform's path separator. */
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
    /** `true` if no outgoing data was still buffered when the connection closed. */
    wasClean: boolean;
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
 * @remarks `type` distinguishes text frames from binary frames.
 *
 * @see {@link IWebSocket.onmessage}
 */
export type IWebSocketMessageEvent = {
    type: 'text';
    /** Payload of a text frame. */
    data: string;
} | {
    type: 'binary';
    /** Payload of a binary frame. */
    data: ArrayBuffer;
};

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
    /** Always an empty string; negotiated extensions are not reported. */
    readonly extensions: string;
    /** Negotiated sub-protocol, or an empty string if none was negotiated. */
    readonly protocol: string;
    /** Current connection state. See {@link TWebSocketReadyState}. */
    readonly readyState: TWebSocketReadyState;
    /** The WebSocket server URL (e.g. `"ws://127.0.0.1:6806/ws/…"`). */
    readonly url: string;
    /** Called when the connection is established. */
    onopen: ((event: IWebSocketOpenEvent) => void | Promise<void>) | null;
    /**
     * Called only when the remote peer sends a Close frame, after {@link IWebSocket.onerror}.
     *
     * @remarks Not called for a local {@link IWebSocket.close} or an abrupt disconnect.
     * `readyState` is `2` during the callback and `3` afterwards.
     */
    onclose: ((event: IWebSocketCloseEvent) => void | Promise<void>) | null;
    /**
     * Called when a connection attempt fails and whenever the connection terminates,
     * including clean closes and a local {@link IWebSocket.close}.
     *
     * @remarks `error.message` is the kernel's close or transport error text.
     */
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
     * @remarks The returned `Promise` resolves once the upgrade to the local kernel
     * succeeds, before {@link IWebSocket.onopen} runs. While a connection attempt is
     * pending, further calls share its result; once open, calls resolve immediately.
     * After a failed attempt or {@link IWebSocket.close}, calls reject and the handle
     * cannot be reopened.
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
     * Sends a Close frame and closes the connection immediately without waiting
     * for the peer's reply.
     *
     * @param code   - WebSocket close code (default `1000` — normal closure); codes below `1000` become `1000`.
     * @param reason - Optional human-readable reason string, truncated to 123 bytes.
     */
    close(code?: number, reason?: string): Promise<void>;
}

// ── Sub-namespaces ────────────────────────────────────────────────────────────

/**
 * A kernel-proxied Server-Sent Events connection returned by {@link IClient.event}.
 *
 * @remarks The object is returned in {@link TEventSourceReadyState | CONNECTING} state
 * immediately; the kernel starts the SSE subscription in the background and
 * fires {@link IEventSource.onopen} when the first event arrives, not when the
 * response headers are received.
 *
 * After a stream read error the kernel fires {@link IEventSource.onclose}, reconnects with
 * exponential backoff, and fires `onopen` again on the next event. Connection failures,
 * including non-200 responses, are retried the same way; {@link IEventSource.onerror} fires
 * only after retries give up (about 15 minutes by default). If the server ends the stream
 * cleanly, neither `onclose` nor `onerror` fires and `readyState` becomes `2`.
 * Call {@link IEventSource.close} to cancel the subscription.
 */
export interface IEventSource {
    /** Current connection state. See {@link TEventSourceReadyState}. */
    readonly readyState: TEventSourceReadyState;
    /** The original path passed to {@link IClient.event}, e.g. `"/api/…"`. */
    readonly url: string;
    /** Called when the first event arrives after connecting or reconnecting. */
    onopen: ((event: IEventSourceOpenEvent) => void | Promise<void>) | null;
    /** Called when a message is received. */
    onmessage: ((event: IEventSourceMessageEvent) => void | Promise<void>) | null;
    /** Called when reading the stream fails, before the kernel reconnects. */
    onclose: ((event: IEventSourceCloseEvent) => void | Promise<void>) | null;
    /** Called when the subscription ends with an error after retries give up. */
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
     * @remarks The request is always sent to the local kernel (`http://127.0.0.1:<port><path>`)
     * and rejects once {@link IRequestInit.timeout} elapses (60 seconds by default).
     *
     * @param path - Absolute path starting with `/`, e.g. `"/api/system/version"`.
     * @param init - Optional request options (method, headers, body, timeout).
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
    /**
     * Backend platform identifier: the operating system on desktop (`"windows"`, `"linux"`, `"darwin"`),
     * otherwise the container (`"docker"`, `"android"`, `"ios"`, `"harmony"`).
     */
    readonly platform: "windows" | "linux" | "darwin" | "docker" | "android" | "ios" | "harmony" | (string & {});
    /** Localization strings loaded from the plugin's `i18n/` directory, or `null` if none were loaded. */
    readonly i18n: Record<string, any> | null;
    /** Kernel lifecycle hooks for this plugin. */
    readonly lifecycle: IPluginLifecycle;
}

/**
 * Optional lifecycle callbacks invoked by the kernel at state transitions.
 *
 * @remarks Exposed as `siyuan.plugin.lifecycle`. Assign a function to any
 * property to subscribe; the kernel awaits any returned `Promise` before
 * advancing to the next lifecycle stage, with no timeout, so a `Promise` that
 * never settles blocks starting or stopping the plugin. Errors thrown by a hook
 * are logged and do not abort the transition. Unset callbacks (`null`) are
 * skipped, but the kernel logs an error for them.
 */
export interface IPluginLifecycle {
    /**
     * Called after the top-level code of `kernel.js` finishes, while the plugin is still
     * `loading`; RPC and private server requests are rejected until it becomes `running`.
     */
    onload: (() => void | Promise<void>) | null;
    /**
     * Called after the plugin enters the `running` state; the `start` event is published
     * after this hook settles.
     */
    onrunning: (() => void | Promise<void>) | null;
    /**
     * Called when a running plugin is stopped (e.g. disabled, reloaded, or on a normal kernel
     * shutdown), after the `stop` event and while the plugin is `stopping`.
     */
    onunload: (() => void | Promise<void>) | null;
}

/**
 * Kernel event bridge.
 *
 * @remarks Exposed as `siyuan.event`. Each plugin has its own in-process bus;
 * events never reach other plugins or the frontend.
 */
export interface IEvent {
    /**
     * Inbound event handler.
     *
     * @remarks Receives the kernel's `start`, `stop`, and `fs-notify` events, plus any payload
     * emitted to the `"runtime"` topic as-is. It is called with `this` set to `siyuan.event`;
     * a returned `Promise` is not awaited and errors thrown by the handler are not reported.
     * Set to `null` to stop receiving events.
     */
    handler: ((event: TEventMessage) => void | Promise<void>) | null;
    /**
     * Publishes a payload to this plugin's in-process event bus.
     *
     * @remarks Only the `"runtime"` topic is delivered, asynchronously, to {@link IEvent.handler};
     * the `"plugin"` topic is only written to the debug log, and other topics have no subscribers.
     * Rejects if `topic` is empty or `event` is omitted.
     *
     * @param topic - Event topic string used to route the event to subscribers.
     * @param event - Payload to publish.
     */
    emit(topic: "runtime" | "plugin" | (string & {}), event: unknown): Promise<void>;
}

/**
 * Structured logger for the plugin.
 *
 * @remarks Exposed as `siyuan.logger`. Level semantics mirror the browser
 * `console` API (`trace` < `debug` < `info` < `warn` < `error`). Output is
 * written to the kernel log file; each line is prefixed with `[plugin:<name>]`.
 *
 * Every method is synchronous and returns `undefined`. Arguments are joined with
 * spaces: strings as-is, objects serialized as JSON, other values converted with
 * `String()`. Each call is written asynchronously, so consecutive calls may appear
 * out of order in the log.
 */
export interface ILogger {
    /** Emits a `TRACE`-level log entry. */
    readonly trace: (...args: any[]) => void;
    /** Emits a `DEBUG`-level log entry. */
    readonly debug: (...args: any[]) => void;
    /** Emits an `INFO`-level log entry. */
    readonly info: (...args: any[]) => void;
    /** Emits a `WARN`-level log entry. */
    readonly warn: (...args: any[]) => void;
    /** Emits an `ERROR`-level log entry. */
    readonly error: (...args: any[]) => void;
}

/**
 * Scoped file storage for the plugin.
 *
 * @remarks Exposed as `siyuan.storage`. All paths are resolved against the
 * plugin's private storage directory `<workspace>/data/storage/petal/<name>/`,
 * which is created when the plugin starts and is shared with the frontend
 * plugin's `loadData`/`saveData`. A leading `/` is treated as relative to that
 * directory, and a path that escapes it rejects with
 * `siyuan.storage: path traversal not allowed`. Forward slashes are accepted on
 * all platforms.
 */
export interface IStorage {
    /**
     * Reads a file and returns a lazy data accessor.
     *
     * @param path - Path relative to the plugin storage directory.
     * @returns A {@link IDataObject} wrapping the file contents.
     * @throws Rejects if the file does not exist.
     */
    get(path: string): Promise<IDataObject>;
    /**
     * Creates or overwrites a file with the provided UTF-8 string content.
     *
     * @remarks Missing parent directories are created. Rejects when the kernel is
     * in read-only mode.
     *
     * @param path    - Path relative to the plugin storage directory.
     * @param content - UTF-8 encoded content to write.
     */
    put(path: string, content: string): Promise<void>;
    /**
     * Deletes a file or recursively removes a directory tree.
     *
     * @remarks Resolves when the path does not exist. Rejects when the kernel is in
     * read-only mode or when `path` resolves to the storage directory itself.
     *
     * @param path - Path relative to the plugin storage directory.
     */
    remove(path: string): Promise<void>;
    /**
     * Lists the entries in a directory.
     *
     * @param path - Path relative to the plugin storage directory.
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
     *
     * @remarks Rejects on mobile, where the plugin file watcher is not supported.
     * @param path - Path relative to the storage directory to start watching.
     */
    add(path: string): Promise<void>;
    /**
     * Resolves `path` and unregisters it from the file-system watcher.
     *
     * @remarks Rejects on mobile, or if no path has been added yet.
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
 * @remarks Exposed as `siyuan.rpc`. Registered methods are called with JSON-RPC 2.0 via
 * `POST /api/plugin/rpc/<plugin>` (or `POST /api/plugin/rpc?name=<plugin>`) and over the
 * WebSocket endpoint `GET /ws/plugin/rpc/<plugin>`; `GET /api/plugin/rpc` only reports
 * loaded plugins and their methods. Calling requires an authenticated administrator, is
 * blocked in read-only mode, and returns error `-32001` or `-32002` unless the plugin is
 * loaded and running.
 *
 * An array `params` is spread into handler arguments, an object is passed as the single
 * argument, and a missing or `null` value passes no arguments. A handler that throws or
 * rejects produces error `-32603`.
 */
export interface IRpc {
    /**
     * Registers a named RPC method callable by external clients.
     *
     * @remarks Binding an existing name replaces the previous handler.
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
     * Sends a JSON-RPC notification to every client connected to this plugin's RPC WebSocket.
     *
     * @remarks HTTP callers and private server WebSocket ports do not receive it. Resolves after
     * all writes finish.
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
 * JSON Schema echoed by {@link IRegisteredCapability}.
 *
 * @remarks The value wraps the schema parsed by the kernel. `JSON.stringify(schema)` returns the schema
 * exactly as registered, so use `JSON.parse(JSON.stringify(schema))` to obtain a plain
 * {@link JSONSchema.Schema}. Reading keywords directly only exposes the members below: unset keywords
 * read as `""`, `[]`, or `{}` instead of `undefined`, other keywords such as `description` or
 * `additionalProperties` read as `undefined`, and entries of `properties` omit keywords such as
 * `minLength`. When the kernel cannot parse the schema, for example because a property's `type` is an
 * array, every member except `type` reads as empty.
 */
export interface IRegisteredCapabilitySchema {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
    oneOf: IRegisteredCapabilitySchema[];
    anyOf: IRegisteredCapabilitySchema[];
    allOf: IRegisteredCapabilitySchema[];
    $ref: string;
    $defs: Record<string, IRegisteredCapabilitySchema>;
}

/**
 * The registration record returned by {@link IAgent.registerCapability}.
 *
 * @remarks Every field is present, even when the corresponding setting was omitted.
 */
export interface IRegisteredCapability {
    /** Stable capability identifier used by Agent configuration. */
    id: string;
    /**
     * The fully-qualified tool name exposed to the Agent.
     *
     * @example "plugin__plugin_name__capability_name__0123456789ab"
     */
    name: string;
    /** Display name, or an empty string when not provided. */
    title: string;
    /** Trimmed description. */
    description: string;
    /** Input schema; its `type` is always `"object"` because registration requires an object root. */
    inputSchema: IRegisteredCapabilitySchema;
    /** Output schema, or `null` when not provided. */
    outputSchema: IRegisteredCapabilitySchema | null;
    /** Default side effects with every flag present, or `null` when not provided. */
    effects: Required<IAgentCapabilityEffects> | null;
    /** Per-action side effects with every flag present; an empty object when not provided. */
    actionEffects: Record<string, Required<IAgentCapabilityEffects>>;
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
     * @remarks If a file part cannot be read, the kernel answers the request with `400`
     * before invoking the handler.
     */
    data: IDataObject;
}

/**
 * Parsed form data from a `multipart/form-data` request.
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
 * @remarks Exactly one of `form` or `data` is non-null: `form` is set only for
 * `multipart/form-data`; `data` is set for all other requests and yields empty
 * content when the request carries no body. For
 * `application/x-www-form-urlencoded` requests the body is consumed while parsing,
 * so `form` is `null`, `data` is empty, and the fields are not available.
 */
export interface IRequestBody {
    /**
     * Parsed form data.
     *
     * @remarks `null` for requests other than `multipart/form-data`.
     */
    form: IRequestForm | null;
    /**
     * Raw request body as a lazy {@link IDataObject}.
     *
     * @remarks `null` only when `form` is non-null.
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
    data: string | ArrayBuffer | Buffer;
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
 * A response body streamed from another HTTP server.
 *
 * @remarks The kernel requests `url` through an SSRF-safe dialer (30-second dial timeout,
 * up to 10 redirects), then streams back the upstream status, headers, and body.
 * Hop-by-hop and `Set-Cookie` headers are dropped in both directions. Invalid options are
 * answered with `400`, and a failed upstream request with `502`.
 */
export interface IResponseProxy {
    /** Absolute `http:` or `https:` URL to request. */
    url: string;
    /** `"GET"` or `"HEAD"`; defaults to the incoming request method, and other methods are rejected. */
    method?: string;
    /** Request headers forwarded to the target. */
    headers?: Record<string, string[]>;
}

/**
 * The body of an HTTP response returned by a server handler.
 *
 * @remarks Set exactly one field; the kernel inspects `data`, `file`,
 * `string`, `raw`, `redirect`, and `proxy` in that order and uses the first
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
    /** Response streamed from another HTTP server. */
    proxy?: IResponseProxy | null;
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
    /** `Max-Age` in seconds. `0` omits the attribute; negative values delete the cookie (`Max-Age=0`). */
    MaxAge?: number;
    /** Restricts the cookie to HTTPS connections. */
    Secure?: boolean;
    /** Hides the cookie from JavaScript (`HttpOnly` flag). */
    HttpOnly?: boolean;
    /**
     * `SameSite` cookie policy.
     *
     * @remarks Maps to Go `http.SameSite` constants:
     * `0` = unset and `1` = default (both omit the attribute), `2` = Lax, `3` = Strict, `4` = None.
     */
    SameSite?: 0 | 1 | 2 | 3 | 4;
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
    /**
     * HTTP status code to send, e.g. `200`, `404`.
     *
     * @remarks Ignored for `file` bodies, where the file server decides the status, and for
     * `proxy` bodies, which use the upstream status.
     */
    statusCode: number;
    /**
     * Additional response headers.
     *
     * @remarks Each header name maps to an array of values, but the values are applied in
     * order and each one replaces the previous, so only the last value is sent. Use `cookies`
     * to send several `Set-Cookie` headers.
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
     * the kernel's SSE write buffer; the actual flush is asynchronous. It throws if
     * `event` is not an object or `event.data` is `undefined`.
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
     * `port.send({ event, data })` inside `onopen` to emit SSE events.
     */
    readonly port: IEventSourcePort;
}

/**
 * Handler slot for one request type within a server scope.
 *
 * @remarks
 * The object is sealed by the kernel; only the `handler` property may be
 * reassigned. Set `handler` to `null` to leave the slot empty — the kernel
 * will return `500 Internal Server Error` for any unhandled HTTP request, and
 * closes an unhandled WebSocket right after the upgrade.
 *
 * WebSocket upgrade requests are routed to `ws`, requests whose `Accept` header is
 * exactly `text/event-stream` to `es`, and all other requests to `http`.
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
     * authentication and admin role before the request reaches the handler, and
     * are rejected in read-only mode; WebSocket upgrades must also pass the session
     * Origin check. The `<name>` segment must match the running plugin's `name`:
     * an unknown plugin is answered with `404`, and a plugin that is not running with `503`.
     */
    readonly private: IServerScope;
}

// ── Web Crypto ────────────────────────────────────────────────────────────────

/**
 * Binary input accepted by {@link ISubtleCrypto} operations.
 *
 * @remarks Strings and plain arrays are rejected with a `TypeError`; encode text
 * yourself, e.g. `Buffer.from(text, "utf8")`. The sandbox has no `TextEncoder`.
 * The kernel copies the bytes before computing, so modifying the buffer afterwards
 * does not affect the pending operation.
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
 * Cryptography exposed as `siyuan.crypto`.
 *
 * @remarks Mirrors the browser `Crypto` interface. It is not installed as
 * `globalThis.crypto`, so libraries that look for that global need an adapter.
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

// ── Top-level interface ───────────────────────────────────────────────────────

/**
 * The root `siyuan` global exposed to every kernel plugin script.
 *
 * @remarks Available as the global constant `siyuan`. All async operations
 * return `Promise`s resolved on the plugin's JavaScript runtime event loop.
 * They reject with a {@link GoError} whose `message` is the kernel's error text;
 * invalid arguments are also reported as rejections rather than synchronous throws.
 * {@link IEventSourcePort.send} is the only method that throws synchronously.
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
    /** Resolves `{{secrets.NAME}}` placeholders from the workspace secret store. */
    readonly secrets: ITemplateResolver;
    /** Resolves `{{vars.NAME}}` placeholders from the workspace variable store. */
    readonly vars: ITemplateResolver;
    /** Web Crypto primitives. */
    readonly crypto: ICrypto;
}

/**
 * Placeholder resolver exposed as `siyuan.secrets` and `siyuan.vars`.
 *
 * @remarks Names cannot be listed; only placeholders in the given template are replaced.
 */
export interface ITemplateResolver {
    /**
     * Replaces the placeholders in `template` synchronously.
     *
     * @returns The resolved string, or an empty string if `template` is not a string.
     */
    resolve(template: string): string;
}
