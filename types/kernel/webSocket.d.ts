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
    /** `true` if no outgoing data was still buffered when the connection closed. */
    wasClean: boolean;
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
 * @remarks Unlike the browser `WebSocket`, `type` is not `"message"`: it distinguishes text frames
 * from binary frames, so narrowing on it also narrows `data`.
 *
 * @see {@link IWebSocket.onmessage}
 */
export type IWebSocketMessageEvent = {
    type: 'text';
    /** Payload of a text frame. */
    data: string;
} | {
    type: 'binary';
    /** Payload of a binary frame. */
    data: ArrayBuffer;
};

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
    /** Always an empty string; negotiated extensions are not reported. */
    readonly extensions: string;
    /** Negotiated sub-protocol, or an empty string if none was negotiated. */
    readonly protocol: string;
    /** Current connection state. See {@link TWebSocketReadyState}. */
    readonly readyState: TWebSocketReadyState;
    /** The WebSocket server URL (e.g. `"ws://127.0.0.1:6806/ws/…"`). */
    readonly url: string;
    /** Called when the connection is established. */
    onopen: ((event: IWebSocketOpenEvent) => void | Promise<void>) | null;
    /**
     * Called only when the remote peer sends a Close frame, after {@link IWebSocket.onerror}.
     *
     * @remarks Not called for a local {@link IWebSocket.close} or an abrupt disconnect.
     * `readyState` is `2` during the callback and `3` afterwards.
     */
    onclose: ((event: IWebSocketCloseEvent) => void | Promise<void>) | null;
    /**
     * Called when a connection attempt fails and whenever an established connection terminates,
     * including clean closes and a local {@link IWebSocket.close}.
     *
     * @remarks `error.message` is the kernel's close or transport error text, so a normal closure
     * also arrives here rather than only in {@link IWebSocket.onclose}.
     */
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
     * @remarks The returned `Promise` resolves once the upgrade to the local kernel is confirmed,
     * before {@link IWebSocket.onopen} runs. While a connection attempt is pending, further calls
     * share its result; once the connection is open, calls resolve immediately. After a failed
     * attempt or after {@link IWebSocket.close}, calls reject and the handle cannot be reopened.
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
     * Sends a Close frame and closes the connection immediately, without waiting for the peer's
     * reply.
     *
     * @param code   - WebSocket close code (default `1000` — normal closure); codes below `1000` become `1000`.
     * @param reason - Optional human-readable reason string, truncated to 123 bytes.
     */
    close(code?: number, reason?: string): Promise<void>;
}
