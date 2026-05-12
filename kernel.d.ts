/// <reference types="@dop251/types-goja_nodejs-buffer" />
/// <reference types="@dop251/types-goja_nodejs-global" />
/// <reference types="@dop251/types-goja_nodejs-url" />

export { };

declare global {
    const siyuan: ISiyuan;
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
 * @remarks Each method decodes the same underlying byte slice; call at most
 * once per method per instance.
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
}

/**
 * Response object returned by {@link ISiyuan.fetch}.
 *
 * @remarks Extends {@link IDataObject} so the response body can be read
 * as text, JSON, or raw bytes.
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
     * @param path - Absolute path starting with `/`, e.g. `"/api/system/version"`.
     * @param init - Optional request options (method, headers, body).
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
    /** Called when the plugin script is first evaluated (before the runtime is fully ready). */
    onload: (() => void | Promise<void>) | null;
    /** Called after the plugin has fully loaded and its runtime is initialized. */
    onloaded: (() => void | Promise<void>) | null;
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
     * @remarks Assign a function to receive every kernel broadcast event.
     * If the function returns a `Promise`, the kernel awaits its resolution
     * before delivering the next event. Set to `null` to stop receiving events.
     */
    handler: ((event: IEventMessage) => void | Promise<void>) | null;
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
}

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
     * @param fn           - Handler function; may be async.
     * @param descriptions - Optional human-readable description strings.
     */
    bind(
        name: string,
        fn: (...args: any[]) => any | Promise<any>,
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
 */
export interface IResponseFile {
    /**
     * Download filename for the `Content-Disposition` header.
     *
     * @remarks Omit or leave empty to serve the file inline.
     */
    name?: string;
    /** Absolute filesystem path to the file on the server host. */
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
 * The body of an HTTP response returned by a server handler.
 *
 * @remarks Set exactly one field; the kernel inspects `data`, `file`,
 * `string`, `raw`, and `redirect` in that order and uses the first
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
    /** Network client utilities (HTTP, WebSocket, SSE). */
    readonly client: IClient;
    /** Web request handler registry. */
    readonly server: IServer;
}
