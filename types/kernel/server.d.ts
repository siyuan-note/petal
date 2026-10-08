import type { IWebSocket } from "./webSocket";
import type { IEventSourceOpenEvent, IEventSourceCloseEvent } from "./eventSource";
import type { IServerRequest } from "./serverRequest";
import type { IHttpResponse } from "./serverResponse";

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
