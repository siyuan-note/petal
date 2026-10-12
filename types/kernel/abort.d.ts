/**
 * A single listener callback registered through {@link IAbortSignal.addEventListener}.
 *
 * @remarks `this` inside the callback is the {@link IAbortSignal} it was registered on.
 */
export type TAbortEventListener = (this: IAbortSignal, event: IAbortSignalEvent) => void;

/** An object with a `handleEvent` method, usable wherever {@link TAbortEventListener} is accepted. */
export interface IAbortEventListenerObject {
    handleEvent(event: IAbortSignalEvent): void;
}

/** Options accepted by {@link IAbortSignal.addEventListener}. */
export interface IAbortSignalAddEventListenerOptions {
    /**
     * Automatically removes the listener after it runs once.
     *
     * @defaultValue `false`
     */
    once?: boolean;
}

/**
 * The event delivered to `"abort"` listeners.
 *
 * @remarks A plain object shaped like a DOM `Event`, not an instance of one; `preventDefault`,
 * `stopPropagation`, and `stopImmediatePropagation` are no-ops because the event never bubbles
 * and is never cancelable.
 */
export interface IAbortSignalEvent {
    readonly type: "abort";
    readonly target: IAbortSignal;
    readonly currentTarget: IAbortSignal;
    readonly bubbles: false;
    readonly cancelable: false;
    readonly composed: false;
    readonly defaultPrevented: false;
    readonly isTrusted: true;
    /**
     * Event creation time in milliseconds since the Unix epoch.
     *
     * @remarks The DOM measures this from the time origin instead; the sandbox exposes no
     * `performance` object, so the Unix epoch is used.
     */
    readonly timeStamp: number;
    preventDefault(): void;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
}

/**
 * A cancellation signal, created by {@link IAbortControllerConstructor} or the static methods of
 * {@link IAbortSignalConstructor}, and accepted by {@link IClient.fetch} as `init.signal`.
 *
 * @remarks Mirrors the browser `AbortSignal` interface over a reduced event mechanism: instances
 * are plain objects, so `instanceof IAbortSignal` behaves correctly only through the exposed
 * `AbortSignal` global, and `dispatchEvent` only recognizes the `"abort"` type. `addEventListener`
 * ignores the `capture`/`passive`/`signal` options; only `once` is honored.
 */
export interface IAbortSignal {
    /** `true` once the signal has been aborted. */
    readonly aborted: boolean;
    /** The abort reason, or `undefined` before `aborted` becomes `true`. */
    readonly reason: unknown;
    /** Throws `reason` if `aborted` is `true`; otherwise does nothing. */
    throwIfAborted(): void;
    /** Shorthand for a single `"abort"` listener; replaces any previously assigned handler. */
    onabort: TAbortEventListener | null;
    addEventListener(type: "abort", listener: TAbortEventListener | IAbortEventListenerObject,
        options?: IAbortSignalAddEventListenerOptions): void;
    removeEventListener(type: "abort", listener: TAbortEventListener | IAbortEventListenerObject): void;
    /** Only an event with `type === "abort"` triggers the registered listeners. */
    dispatchEvent(event: Pick<IAbortSignalEvent, "type">): boolean;
}

/**
 * The global `AbortSignal` constructor.
 *
 * @remarks Calling it, with or without `new`, throws `TypeError: Illegal constructor`; obtain an
 * instance from {@link IAbortControllerConstructor} or one of the static methods below.
 */
export interface IAbortSignalConstructor {
    readonly prototype: IAbortSignal;
    /** Returns a signal that is already aborted, optionally with `reason` (defaults to an `AbortError`). */
    abort(reason?: unknown): IAbortSignal;
    /** Returns a signal that aborts itself after `milliseconds` with a `TimeoutError` reason. */
    timeout(milliseconds: number): IAbortSignal;
    /**
     * Returns a signal that aborts as soon as any of `signals` does, with the same reason.
     *
     * @remarks Only accepts an array; other iterables are not supported.
     */
    any(signals: readonly IAbortSignal[]): IAbortSignal;
}

/**
 * The `AbortSignal` instance type usable across APIs such as {@link IRequestInit.signal}.
 *
 * @remarks Resolves to the DOM `AbortSignal` type when the DOM library is loaded, matching what
 * `new AbortController().signal` and `AbortSignal.timeout(...)` actually produce in that case;
 * otherwise resolves to {@link IAbortSignal}.
 */
export type TAbortSignal = typeof globalThis extends { AbortSignal: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IAbortSignal
    : IAbortSignal;

/** Created by {@link IAbortControllerConstructor}; aborts its {@link IAbortController.signal}. */
export interface IAbortController {
    /** The signal to pass as `init.signal`, e.g. to {@link IClient.fetch}. */
    readonly signal: IAbortSignal;
    /**
     * Aborts {@link IAbortController.signal}, optionally with `reason` (defaults to an `AbortError`).
     *
     * @remarks A no-op if the signal is already aborted; the original reason is kept.
     */
    abort(reason?: unknown): void;
}

/** The global `AbortController` constructor. */
export interface IAbortControllerConstructor {
    readonly prototype: IAbortController;
    new(): IAbortController;
}
