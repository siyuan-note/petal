import type { JSONSchema } from "zod/v4/core";
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
