import type { IPlugin, IEvent, ILogger, IStorage, IRpc, IAgent, IPlaceholderResolver } from "./plugin";
import type { IClient } from "./client";
import type { IServer } from "./server";

/**
 * The root `siyuan` global exposed to every kernel plugin script.
 *
 * @remarks Available as the global constant `siyuan`. All async operations
 * return `Promise`s resolved on the plugin's JavaScript runtime event loop.
 * They reject with an {@link IGoError} whose `message` is the kernel's error text, and invalid
 * arguments are reported as rejections rather than synchronous throws;
 * {@link IEventSourcePort.send} is the only member of this API that throws synchronously. The
 * sandbox globals outside `siyuan`, such as `crypto` and the WebIDL constructors, keep throwing
 * synchronously as their standards require.
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
