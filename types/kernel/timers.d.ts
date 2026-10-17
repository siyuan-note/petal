/**
 * An opaque handle to a pending {@link ISetTimeout | setTimeout} callback, accepted by
 * {@link IClearTimeout | clearTimeout}.
 *
 * @remarks Carries no own properties and cannot be constructed directly; only a value returned by `setTimeout`
 * is accepted by `clearTimeout`.
 */
export interface ITimeoutHandle {
}

/**
 * An opaque handle to a pending {@link ISetInterval | setInterval} callback, accepted by
 * {@link IClearInterval | clearInterval}.
 *
 * @remarks Carries no own properties and cannot be constructed directly; only a value returned by `setInterval`
 * is accepted by `clearInterval`.
 */
export interface IIntervalHandle {
}

/**
 * An opaque handle to a pending {@link ISetImmediate | setImmediate} callback, accepted by
 * {@link IClearImmediate | clearImmediate}.
 *
 * @remarks Carries no own properties and cannot be constructed directly; only a value returned by `setImmediate`
 * is accepted by `clearImmediate`.
 */
export interface IImmediateHandle {
}

/**
 * Schedules `callback` to run once after at least `delay` milliseconds.
 *
 * @remarks Backed by `github.com/dop251/goja_nodejs/eventloop`, driven by the plugin's own event loop rather
 * than a browser or Node timer wheel: `callback` runs on that loop, interleaved with other pending work, never
 * before the loop next becomes free. If `callback` is not a function, nothing is scheduled and the call returns
 * `undefined` instead of throwing — a deviation from both browsers and Node.
 *
 * @param callback - Invoked with no `this` value (`undefined`), with `args` forwarded as its arguments.
 * @param delay    - Milliseconds to wait before running `callback`; omitted or non-numeric is treated as `0`.
 * @param args     - Forwarded as `callback`'s own arguments, as in the browser and Node signature.
 */
export type ISetTimeout = (callback: (...args: any[]) => void, delay?: number, ...args: any[]) => ITimeoutHandle;

/** Cancels a pending {@link ISetTimeout | setTimeout} callback; a no-op if it already fired or was cleared. */
export type IClearTimeout = (handle: ITimeoutHandle) => void;

/**
 * Schedules `callback` to run repeatedly, at least `delay` milliseconds apart, until cleared.
 *
 * @remarks Same event-loop-driven timing and non-function-callback behavior as {@link ISetTimeout}. `delay` is
 * clamped to a minimum of 1 millisecond when zero or negative. An uncleared interval keeps the plugin's event
 * loop running indefinitely, which can block the plugin from stopping; always clear intervals in
 * `onunload`.
 *
 * @param callback - Invoked with no `this` value (`undefined`), with `args` forwarded as its arguments.
 * @param delay    - Minimum milliseconds between invocations; omitted or non-numeric is treated as `0`, then
 *                   clamped to `1`.
 * @param args     - Forwarded as `callback`'s own arguments on every invocation.
 */
export type ISetInterval = (callback: (...args: any[]) => void, delay?: number, ...args: any[]) => IIntervalHandle;

/** Cancels a pending {@link ISetInterval | setInterval} callback; a no-op if it was already cleared. */
export type IClearInterval = (handle: IIntervalHandle) => void;

/**
 * Schedules `callback` to run once, as soon as the event loop is next free (without an explicit delay).
 *
 * @remarks Same event-loop-driven timing and non-function-callback behavior as {@link ISetTimeout}.
 *
 * @param callback - Invoked with no `this` value (`undefined`), with `args` forwarded as its arguments.
 * @param args     - Forwarded as `callback`'s own arguments.
 */
export type ISetImmediate = (callback: (...args: any[]) => void, ...args: any[]) => IImmediateHandle;

/** Cancels a pending {@link ISetImmediate | setImmediate} callback; a no-op if it already ran or was cleared. */
export type IClearImmediate = (handle: IImmediateHandle) => void;
