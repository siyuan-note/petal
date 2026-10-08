import type { TWebSocketReadyState } from "./primitives";

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
