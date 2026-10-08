import type { UUID } from "./primitives";
import type { TAbortSignal } from "./abort";
import type { TFormData } from "./formData";

/**
 * Options accepted by {@link ISiyuan.fetch}.
 */
export interface IRequestInit {
    /** HTTP method. Defaults to `"GET"` when omitted. */
    method?: string;
    /** Additional request headers. */
    headers?: Record<string, string>;
    /**
     * Request body. Omit for methods that carry no body (e.g. GET, HEAD).
     *
     * @remarks A {@link TFormData} is encoded as `multipart/form-data` when {@link IClient.fetch} is
     * called, so later changes to it do not affect the request, and `Content-Type` is set to
     * `multipart/form-data` with the generated boundary unless {@link headers} already sets one.
     * Values of other types, such as typed arrays and blobs, are ignored and no body is sent.
     */
    body?: string | ArrayBuffer | TFormData;
    /**
     * Timeout in milliseconds for the whole request, from connecting until the response body is read.
     * Defaults to `60000` when omitted; `0` disables the timeout. Must be a non-negative finite
     * number, otherwise the request is rejected without being sent.
     *
     * @remarks Pending requests are cancelled when the plugin stops, but only after
     * {@link IPluginLifecycle.onunload} settles, so awaiting a request without a timeout in
     * `onunload` can block stopping the plugin and a normal kernel shutdown indefinitely.
     */
    timeout?: number;
    /**
     * Aborts the request when the signal is aborted, independently of {@link timeout}.
     *
     * @remarks If already aborted when {@link IClient.fetch} is called, the request is rejected
     * with the signal's `reason` without being sent. Aborting later rejects the pending request
     * with that same `reason`, which can be any value and is not wrapped into an `Error`.
     */
    signal?: TAbortSignal;
}

/**
 * An event message delivered to {@link IEvent.handler}.
 */
export interface IEventMessage {
    /** Unique event identifier. */
    id: UUID;
    /** Event type name, e.g. `"ws"`. */
    type: string;
    /** Event-specific payload; the shape depends on `type`. */
    detail: any;
}

/**
 * Published on the runtime event bus after the plugin starts successfully
 * and enters the running state.
 */
export interface IStartEventMessage extends IEventMessage {
    type: 'start';
    detail: null;
}

/**
 * Published on the runtime event bus at the beginning of a clean plugin
 * shutdown, before the runtime is torn down.
 */
export interface IStopEventMessage extends IEventMessage {
    type: 'stop';
    detail: null;
}

/** File-system event kind emitted by the kernel storage watcher. */
export type TFsNotifyOperation = 'CREATE' | 'WRITE' | 'RENAME' | 'REMOVE';

/**
 * Published on the runtime event bus when a watched storage path is
 * created, written, renamed, or removed.
 *
 * Watching is managed via {@link IStorage.watcher}.
 */
export interface IFsNotifyEventMessage extends IEventMessage {
    type: 'fs-notify';
    detail: {
        /** The type of file-system change that triggered this event. */
        operation: TFsNotifyOperation;
        /** Path relative to the plugin's storage directory. */
        path: string;
    }
}

export type TEventMessage = IStartEventMessage | IStopEventMessage | IFsNotifyEventMessage | IEventMessage;
