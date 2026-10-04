/**
 * An instance of goja's built-in `GoError`, the error type for failures that originate in kernel (Go) code.
 *
 * @remarks Not part of any web or Node.js standard. `GoError.prototype` inherits from `Error.prototype`, so
 * `instanceof Error` holds and {@link name} defaults to `"GoError"`. Rejections of {@link IClient.fetch} and of
 * `crypto.subtle`, as well as failed `require` calls, are `GoError` instances; Web Crypto rejections overwrite
 * {@link name} with the specification's error name (such as `NotSupportedError`), so branch on {@link name} when
 * that distinction matters. Argument validation failures are often a plain `TypeError` instead.
 */
export interface IGoError extends Error {
    /**
     * The wrapped Go error, present only on errors raised by the kernel.
     *
     * @remarks Exposes at least an `error()` method, which returns the Go error text, the same as
     * {@link IGoError.message}; other members depend on the concrete Go error type.
     */
    readonly value?: { error(): string };
}

/**
 * The constructor of {@link IGoError}, available as the global `GoError`.
 *
 * @remarks Works with or without `new` and accepts the same arguments as `Error`, including the `cause` option.
 * An instance constructed by script has no {@link IGoError.value}.
 */
export interface IGoErrorConstructor extends ErrorConstructor {
    new (message?: string, options?: { cause?: unknown }): IGoError;
    (message?: string, options?: { cause?: unknown }): IGoError;
    readonly prototype: IGoError;
}
