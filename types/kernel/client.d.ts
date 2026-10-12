import type { TRequestPath, IFetchResponse } from "./primitives";
import type { IRequestInit } from "./events";
import type { IWebSocket } from "./webSocket";
import type { IEventSource } from "./eventSource";

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
