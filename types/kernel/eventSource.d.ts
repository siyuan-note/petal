import type { TEventSourceReadyState } from "./primitives";

/**
 * Event fired when the EventSource connection is established.
 *
 * @see {@link IEventSource.onopen}
 */
export interface IEventSourceOpenEvent {
    type: 'open';
}

/**
 * Event fired when an SSE message is received.
 *
 * @remarks The `type` field reflects the SSE `event:` field value;
 * defaults to `"message"` when the field is absent.
 *
 * @see {@link IEventSource.onmessage}
 */
export interface IEventSourceMessageEvent {
    /** Event type; mirrors the SSE `event:` field, defaulting to `"message"`. */
    type: string;
    /** UTF-8 decoded SSE `data:` field value. */
    data: string;
    /** Value of the SSE `id:` field, or an empty string if absent. */
    lastEventId: string;
}

/**
 * Event fired when the EventSource connection is closed.
 *
 * @see {@link IEventSource.onclose}
 */
export interface IEventSourceCloseEvent {
    type: 'close';
}

/**
 * Event fired when an EventSource transport error occurs.
 *
 * @see {@link IEventSource.onerror}
 */
export interface IEventSourceErrorEvent {
    type: 'error';
    /** The underlying error. */
    error: Error;
}

/**
 * A kernel-proxied Server-Sent Events connection returned by {@link IClient.event}.
 *
 * @remarks The object is returned in {@link TEventSourceReadyState | CONNECTING} state
 * immediately; the kernel starts the SSE subscription in the background and
 * fires {@link IEventSource.onopen} once the stream is established.
 * Call {@link IEventSource.close} to cancel the subscription.
 */
export interface IEventSource {
    /** Current connection state. See {@link TEventSourceReadyState}. */
    readonly readyState: TEventSourceReadyState;
    /** The original path passed to {@link IClient.event}, e.g. `"/api/…"`. */
    readonly url: string;
    /** Called when the connection is established. */
    onopen: ((event: IEventSourceOpenEvent) => void | Promise<void>) | null;
    /** Called when a message is received. */
    onmessage: ((event: IEventSourceMessageEvent) => void | Promise<void>) | null;
    /** Called when the connection is closed by the server or after {@link IEventSource.close}. */
    onclose: ((event: IEventSourceCloseEvent) => void | Promise<void>) | null;
    /** Called when a transport error occurs. */
    onerror: ((event: IEventSourceErrorEvent) => void | Promise<void>) | null;
    /** Cancels the subscription and closes the connection. */
    close(): void;
}
