import type { IPlugin, IEvent, ILogger, IStorage, IRpc, IAgent, IPlaceholderResolver } from "./plugin";
import type { IClient } from "./client";
import type { IServer } from "./server";

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
    /** Resolves `{{secrets.NAME}}` placeholders against the workspace's configured secrets. */
    readonly secrets: IPlaceholderResolver;
    /** Resolves `{{vars.NAME}}` placeholders against the workspace's configured variables. */
    readonly vars: IPlaceholderResolver;
}
