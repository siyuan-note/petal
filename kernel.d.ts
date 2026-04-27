/// <reference types="@dop251/types-goja_nodejs-buffer" />
/// <reference types="@dop251/types-goja_nodejs-global" />
/// <reference types="@dop251/types-goja_nodejs-url" />

export { };

declare global {
    const siyuan: ISiyuan;
}

// ── Primitives ────────────────────────────────────────────────────────────────

/** WebSocket ready-state constants (mirrors browser WebSocket). */
type TWebSocketReadyState = 0 | 1 | 2 | 3;

type TRequestPath = `/${string}`;
type UUID = `${string}-${string}-${string}-${string}-${string}`;

/** A single directory-entry returned by siyuan.storage.list(). */
interface IStorageEntry {
    /** The name of the entry. */
    name: string;
    /** Whether the entry is a directory. */
    isDir: boolean;
    /** Whether the entry is a symbolic link. */
    isSymlink: boolean;
    /** Unix timestamp (seconds). */
    updated: number;
}

/** Object returned by siyuan.storage.get() and siyuan.fetch() body accessors. */
interface IDataObject {
    /** Returns the text content of the data. */
    text(): Promise<string>;
    /** Returns the JSON content of the data. */
    json(): Promise<any>;
    /** Returns the array buffer content of the data. */
    arrayBuffer(): Promise<ArrayBuffer>;
}

/** Response object returned by siyuan.fetch(). */
interface IFetchResponse extends IDataObject {
    /** The URL of the request. */
    url: string;
    ok: boolean;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

/** Options accepted by siyuan.fetch(). */
interface IRequestInit {
    /** The HTTP method used to make the request. */
    method?: string;
    /** The headers to include in the request. */
    headers?: Record<string, string>;
    /** The body of the request. */
    body?: string | ArrayBuffer;
}

/** Event object passed to siyuan.event.handler. */
interface IEventMessage {
    id: UUID;
    type: string;
    detail: any;
}

// ── WebSocket ─────────────────────────────────────────────────────────────────

interface IWebSocketOpenEvent {
    type: 'open';
}

interface IWebSocketCloseEvent {
    type: 'close';
    code: number;
    reason: string;
}

interface IWebSocketErrorEvent {
    type: 'error';
    error: Error;
}

interface IWebSocketPingEvent {
    type: 'ping';
    data: string;
}

interface IWebSocketPongEvent {
    type: 'pong';
    data: string;
}

interface IWebSocketMessageEvent {
    type: 'message';
    /** string for text frames, ArrayBuffer for binary frames. */
    data: string | ArrayBuffer;
}

/** Browser-compatible WebSocket handle returned by siyuan.socket(). */
interface IWebSocket {
    readyState: TWebSocketReadyState;
    onopen: ((event: IWebSocketOpenEvent) => void | Promise<void>) | null;
    onclose: ((event: IWebSocketCloseEvent) => void | Promise<void>) | null;
    onerror: ((event: IWebSocketErrorEvent) => void | Promise<void>) | null;
    onping: ((event: IWebSocketPingEvent) => void | Promise<void>) | null;
    onpong: ((event: IWebSocketPongEvent) => void | Promise<void>) | null;
    onmessage: ((event: IWebSocketMessageEvent) => void | Promise<void>) | null;
    send(data: string | ArrayBuffer): Promise<void>;
    ping(data?: string): Promise<void>;
    pong(data?: string): Promise<void>;
    close(code?: number, reason?: string): Promise<void>;
}

// ── Sub-namespaces ────────────────────────────────────────────────────────────

/** siyuan.plugin — static metadata about the running plugin. */
interface IPlugin {
    /** The name of the plugin. */
    readonly name: string;
    /** The version of the plugin. */
    readonly version: string;
    /** The display name of the plugin. */
    readonly displayName: string;
    /** Current backend platform identifier. */
    readonly platform: string;
    /** Internationalisation strings. */
    readonly i18n: Record<string, any>;
    /** Lifecycle hooks. */
    readonly lifecycle: IPluginLifecycle;
}

/**
 * siyuan.plugin.lifecycle — optional hooks called by the kernel.
 * Set each property to a function to receive the callback.
 */
interface IPluginLifecycle {
    onload: (() => void | Promise<void>) | null;
    onloaded: (() => void | Promise<void>) | null;
    onrunning: (() => void | Promise<void>) | null;
    onunload: (() => void | Promise<void>) | null;
}

/** siyuan.event — pub/sub event bridge. */
interface IEvent {
    /**
     * Assign a handler to receive all inbound kernel events.
     * If the handler returns a Promise, the kernel awaits its resolution before proceeding.
     */
    handler: ((event: IEventMessage) => void | Promise<void>) | null;
    /**
     * Publish an event to the in-process event bus.
     * @param topic - Event topic string.
     * @param event - Arbitrary serialisable payload.
     */
    emit(topic: string, event: IEventMessage): Promise<void>;
}

/** siyuan.logger — structured log helpers (mirrors console levels). */
interface ILogger {
    readonly trace: (...args: any[]) => Promise<void>;
    readonly debug: (...args: any[]) => Promise<void>;
    readonly info: (...args: any[]) => Promise<void>;
    readonly warn: (...args: any[]) => Promise<void>;
    readonly error: (...args: any[]) => Promise<void>;
}

/** siyuan.storage — scoped file CRUD under the plugin's data directory. */
interface IStorage {
    /** Read a file; rejects if the path does not exist. */
    get(path: string): Promise<IDataObject>;
    /** Write (create or overwrite) a file with UTF-8 string content. */
    put(path: string, content: string): Promise<void>;
    /** Delete a file or directory tree. */
    remove(path: string): Promise<void>;
    /** List entries in a directory. */
    list(path: string): Promise<IStorageEntry[]>;
}

/** siyuan.rpc — JSON-RPC method registry. */
interface IRpc {
    /**
     * Register a named RPC method callable by external clients.
     * @param name         - Method name.
     * @param fn           - Handler function (may return a Promise).
     * @param descriptions - Optional human-readable descriptions.
     */
    bind(
        name: string,
        fn: (...args: any[]) => any | Promise<any>,
        ...descriptions: string[]
    ): Promise<void>;
    /** Unregister a previously registered RPC method. */
    unbind(name: string): Promise<void>;
    /**
     * Broadcast a JSON-RPC notification to all connected clients.
     * @param method - Notification method name.
     * @param params - Optional notification parameters.
     */
    broadcast(method: string, params?: any): Promise<void>;
}

// ── Server request types ─────────────────────────────────────────────────────

/** Serialization format for structured response bodies. */
type TSerializedType =
    | 'JSON' | 'JSONP' | 'AsciiJSON' | 'IndentedJSON' | 'PureJSON' | 'SecureJSON'
    | 'XML' | 'YAML' | 'TOML' | 'ProtoBuf';

/** Basic-auth credentials extracted from the request URL. */
interface IRequestUser {
    username: string;
    password: string;
}

/** Parsed URL components of an incoming server request. */
interface IRequestUrl {
    /** Basic-auth credentials, or null if absent. */
    user: IRequestUser | null;
    /** Host header value, e.g. `"127.0.0.1:6806"`. */
    host: string;
    /** URL-decoded path, e.g. `"/plugin/private/sample/api/hello/a space"`. */
    path: string;
    /** URL-encoded path, e.g. `"/plugin/private/sample/api/hello/a%20space"`. */
    pathname: string;
    /** URL-decoded fragment. */
    fragment: string;
    /** URL-encoded fragment. */
    hash: string;
    /** Raw query string, e.g. `"a=1&b=2"`. */
    search: string;
    /** Parsed query parameters, e.g. `{ a: ["1"], b: ["2"] }`. */
    query: Record<string, string[]>;
}

/** Uploaded file in a multipart/form-data request. */
interface IRequestFile {
    filename: string;
    headers: Record<string, string[]>;
    size: number;
    /** File contents; null if unavailable. */
    data: IDataObject | null;
}

/** Parsed form data (application/x-www-form-urlencoded or multipart/form-data). */
interface IRequestForm {
    values: Record<string, string[]>;
    files: Record<string, IRequestFile[]>;
}

/** Body of an incoming server request. */
interface IRequestBody {
    /** Parsed form data, or null for non-form requests. */
    form: IRequestForm | null;
    /**
     * Raw request body.
     * Null when `form` is non-null or the request has no body.
     */
    data: IDataObject | null;
}

/** HTTP request-line and header fields. */
interface IRequestContent {
    /** HTTP method, e.g. `"GET"`. */
    method: string;
    /** Full request URI including query string, e.g. `"/plugin/private/sample/api/hello?a=1"`. */
    uri: string;
    /** Protocol string, e.g. `"HTTP/1.1"`. */
    proto: string;
    protoMajor: number;
    protoMinor: number;
    /** Request headers (Cookie and Authorization are stripped). */
    headers: Record<string, string[]>;
    cookies: Record<string, string[]>;
    contentType: string;
    contentLength: number;
    referer: string;
    userAgent: string;
    body: IRequestBody;
}

/** Gin routing context for an incoming server request. */
interface IRequestContext {
    /** Matched sub-path after the plugin name, e.g. `"/api/hello"`. */
    path: string;
    /** Full gin route template, e.g. `"/plugin/private/:name/*path"`. */
    fullPath: string;
    clientIp: string;
    remoteIp: string;
    remoteAddr: string;
    /** Named route parameters, e.g. `{ name: ["plugin-sample"], path: ["/api/hello"] }`. */
    params: Record<string, string[]>;
}

/** Complete request object passed to server handlers. */
interface IServerRequest {
    url: IRequestUrl;
    request: IRequestContent;
    context: IRequestContext;
}

// ── Server response types ─────────────────────────────────────────────────────

/** Structured-data response body; serialized by the kernel using the specified format. */
interface IResponseSerializedData {
    type: TSerializedType;
    data: any;
}

/**
 * File response body.
 * If `name` is set the file is sent as an attachment (`Content-Disposition: attachment`);
 * otherwise it is served inline.
 */
interface IResponseFile {
    /** Attachment filename; omit to serve the file inline. */
    name?: string;
    /** Absolute filesystem path to the file. */
    path: string;
}

/** Formatted string response body (Go `fmt.Sprintf`-style template). */
interface IResponseString {
    format: string;
    values?: any[];
}

/** Raw bytes response body. */
interface IResponseRawData {
    contentType: string;
    data: string | ArrayBuffer;
}

/** Redirect response body. */
interface IResponseRedirect {
    location: string;
}

/**
 * Response body — exactly one field should be set.
 * The kernel dispatches to the appropriate gin writer based on which field is non-null.
 */
interface IResponseBody {
    /** Serialize `data` as JSON / XML / YAML / etc. */
    data?: IResponseSerializedData | null;
    /** Send a file from the local filesystem. */
    file?: IResponseFile | null;
    /** Send a formatted string. */
    string?: IResponseString | null;
    /** Send raw bytes with an explicit Content-Type. */
    raw?: IResponseRawData | null;
    /** Issue an HTTP redirect. */
    redirect?: IResponseRedirect | null;
}

/** HTTP cookie descriptor returned in a response (mirrors Go `net/http.Cookie`). */
interface IResponseCookie {
    Name: string;
    Value: string;
    Quoted?: boolean;
    Path?: string;
    Domain?: string;
    /** ISO 8601 date string. */
    Expires?: string;
    RawExpires?: string;
    MaxAge?: number;
    Secure?: boolean;
    HttpOnly?: boolean;
    /** Maps to Go `http.SameSite` constants (0 = default). */
    SameSite?: number;
    Partitioned?: boolean;
    Raw?: string;
    Unparsed?: string[] | null;
}

/** Return value from an HTTP request handler. */
interface IHttpResponse {
    statusCode: number;
    headers?: Record<string, string[]>;
    cookies?: IResponseCookie[];
    body?: IResponseBody | null;
}

// ── Server handler interfaces ─────────────────────────────────────────────────

/** Wraps the handler function for one request type. Assign `handler` to register. */
interface IServerRequestHandler<TRes> {
    handler: ((request: IServerRequest) => TRes | Promise<TRes>) | null;
}

/** All handler slots for one access scope. */
interface IServerScope {
    /** HTTP request handler. Route: `/plugin/private/<name>/*path`. */
    readonly http: IServerRequestHandler<IHttpResponse>;
    /** WebSocket handler (reserved — not yet implemented by the kernel). */
    readonly ws: IServerRequestHandler<void>;
    /** Server-Sent Events handler (reserved — not yet implemented by the kernel). */
    readonly sse: IServerRequestHandler<void>;
}

/** siyuan.server — Web request handler registry. */
interface IServer {
    /**
     * Private-scope handlers.
     * Incoming requests at `/plugin/private/<name>/*path` require kernel authentication
     * and admin role before reaching the handler.
     */
    readonly private: IServerScope;
}

// ── Top-level interface ───────────────────────────────────────────────────────

interface ISiyuan {
    /** Static metadata about this plugin instance. */
    readonly plugin: IPlugin;
    /** Kernel event bridge. */
    readonly event: IEvent;
    /** Structured logging. */
    readonly logger: ILogger;
    /** Scoped persistent file storage. */
    readonly storage: IStorage;
    /** JSON-RPC method registry. */
    readonly rpc: IRpc;
    /** Web request handler registry. */
    readonly server: IServer;

    /**
     * Tunnel an HTTP request through the kernel's REST API.
     * @param path - Absolute path starting with `/`.
     * @param init - Optional request options.
     */
    fetch(path: TRequestPath, init?: IRequestInit): Promise<IFetchResponse>;
    /**
     * Open a WebSocket connection via the kernel.
     * @param path      - Absolute path starting with `/`.
     * @param protocols - Optional sub-protocol(s).
     */
    socket(path: TRequestPath, protocols?: string | string[]): Promise<IWebSocket>;
}
