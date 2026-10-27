import type { IJSONSchema, TJSONSchemaType } from "./jsonSchema";
import type { IStorageEntry, IDataObject } from "./primitives";
import type { IEventMessage, TEventMessage } from "./events";

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
     * Backend platform identifier: the operating system on desktop (`"windows"`, `"linux"`,
     * `"darwin"`), otherwise the container (`"docker"`, `"android"`, `"ios"`, `"harmony"`).
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
 * are logged and do not abort the transition. A callback left unset (`null`) is
 * not invoked, but the kernel still logs it as a hook error whose message ends
 * with `not bound to a function`.
 */
export interface IPluginLifecycle {
    /**
     * Called after the top-level code of `kernel.js` finishes, while the plugin is still
     * `loading`; RPC and private server requests are rejected until it becomes `running`.
     */
    onload: (() => void | Promise<void>) | null;
    /**
     * Called after the plugin enters the `running` state; the `start` event is published
     * once this hook settles.
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
     * runtime 主题允许任意载荷，读取字段前必须验证事件结构；内置事件结构见 {@link TEventMessage}。
     */
    handler: ((event: unknown) => void | Promise<void>) | null;
    /**
     * Publishes a payload to this plugin's in-process event bus.
     *
     * @remarks Only the `"runtime"` topic is delivered, asynchronously, to {@link IEvent.handler};
     * the `"plugin"` topic is only written to the debug log, and other topics have no subscribers.
     * Rejects if `topic` is empty or `event` is omitted.
     *
     * @param topic - Event topic string used to route the event to subscribers.
     * @param event - Payload to publish; any value, not only an {@link IEventMessage}.
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
 * spaces: strings as-is, `null` and `undefined` as their `String()` form, and every
 * other value serialized as JSON, which logs `NaN`, `±Infinity`, and functions as
 * `null` and falls back to `[object Object]` for a value JSON cannot serialize, such
 * as a circular structure. Each call is written on its own goroutine, so consecutive
 * calls may appear out of order in the log.
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
     *
     * @param path - Path relative to the storage directory to start watching.
     */
    add(path: string): Promise<void>;
    /**
     * Resolves `path` and unregisters it from the file-system watcher.
     *
     * @remarks Rejects on mobile, or when no path has been added yet.
     *
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
 * blocked in read-only mode, and answers with error `-32001` (plugin not loaded) or
 * `-32002` (plugin not running) until the plugin is running.
 *
 * An array `params` is spread into handler arguments, an object is passed as the single
 * argument, and a missing or `null` value passes no arguments. A handler that throws or
 * rejects produces error `-32603`.
 *
 * Idle RPC WebSockets do not hold a workspace write lease. Each handler execution,
 * including notifications, obtains its own lease and keeps it until its return value or
 * Promise settles, or the plugin runtime stops. Canceling an HTTP waiter does not release
 * an unfinished handler's lease. Sync application, data import, read-only mode or failed
 * import recovery may reject invocation with `-32603`; notifications still produce no reply.
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
    inputSchema: IJSONSchema & {type: "object"};
    /** JSON Schema describing the capability's output. */
    outputSchema?: IJSONSchema & {type: TJSONSchemaType};
    /** Default side effects for the capability. */
    effects?: IAgentCapabilityEffects;
    /** Side effects for individual values of the input `action` property. */
    actionEffects?: Record<string, IAgentCapabilityEffects>;
}

/**
 * A JSON Schema echoed back by {@link IRegisteredCapability}.
 *
 * @remarks The value wraps the schema parsed by the kernel rather than being the plain object that
 * was registered. `JSON.stringify(schema)` returns the schema exactly as registered, so use
 * `JSON.parse(JSON.stringify(schema))` to obtain a plain {@link IJSONSchema}. Reading keywords
 * directly only exposes the members below: unset keywords read as `""`, `[]`, or `{}` instead of
 * `undefined`, other keywords such as `description` or `additionalProperties` read as `undefined`,
 * and entries of `properties` omit keywords such as `minLength`. When the kernel cannot parse the
 * schema, for example because a property's `type` is an array, every member except `type` reads as
 * empty.
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

/**
 * Resolves placeholders in a string against one of the workspace's configured value stores.
 *
 * @remarks Exposed as `siyuan.secrets` (configured secrets) and `siyuan.vars` (configured variables). Each store
 * is consulted only by its own resolver, and neither exposes the list of configured names.
 */
export interface IPlaceholderResolver {
    /**
     * Replaces placeholders in `template` with configured values.
     *
     * @remarks Synchronous. Replaces `{{secrets.NAME}}` (for `siyuan.secrets`) or `{{vars.NAME}}` (for
     * `siyuan.vars`), as well as the unprefixed shell-style `$NAME` and `${NAME}`, where a shell-style `NAME` is
     * a letter or underscore followed by letters, digits, or underscores. A placeholder whose name is not
     * configured is left unchanged. Returns `""` when `template` is missing or is not itself a `string` (unlike
     * most of this API, a non-`string` is not converted, even when it has a `toString` method).
     *
     * @param template - The string containing placeholders.
     * @returns `template` with every placeholder whose name is configured replaced by its value.
     */
    resolve(template: string): string;
}
