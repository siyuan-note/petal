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
    onopen: ((event: IWebSocketOpenEvent) => void) | null;
    onclose: ((event: IWebSocketCloseEvent) => void) | null;
    onerror: ((event: IWebSocketErrorEvent) => void) | null;
    onping: ((event: IWebSocketPingEvent) => void) | null;
    onpong: ((event: IWebSocketPongEvent) => void) | null;
    onmessage: ((event: IWebSocketMessageEvent) => void) | null;
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
     * Return `true` (strictly) to signal that the plugin will await a
     * follow-up event on a specific topic before the kernel proceeds.
     */
    handler: ((event: IEventMessage) => boolean | Promise<boolean>) | null;
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
    subscribe(
        name: string,
        fn: (...args: any[]) => any | Promise<any>,
        ...descriptions: string[]
    ): Promise<void>;
    /** Unregister a previously registered RPC method. */
    unsubscribe(name: string): Promise<void>;
    /**
     * Broadcast a JSON-RPC notification to all connected clients.
     * @param method - Notification method name.
     * @param params - Optional notification parameters.
     */
    broadcast(method: string, params?: any): Promise<void>;
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
