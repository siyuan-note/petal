/**
 * The kernel plugin sandbox's `console`, backed by `github.com/dop251/goja_nodejs/console` with a custom printer.
 *
 * @remarks Only `log`, `error`, `warn`, `info`, and `debug` exist; there is no `table`, `group`/`groupEnd`,
 * `trace`, `assert`, `count`, `time`/`timeEnd`, or `dir`. `info` and `debug` are literal aliases of `log` — all
 * three write through the same channel, so there is no way to distinguish an `info` call from a `debug` call on
 * the receiving end. `error` and `warn` each write through their own channel.
 *
 * When the first argument is a string, each method substitutes `%`-specifiers in it against the remaining
 * arguments before joining: `%s` converts the argument with `String()`, `%d` converts it with `Number()` then
 * `String()`, `%j` serializes it with `JSON.stringify`, and `%%` is a literal `%`. Any other specifier (for
 * example `%i`, `%f`, `%o`, `%O`, `%c`) and any placeholder with no remaining argument are left in the output
 * unchanged and do not consume an argument. Arguments left over after the format string is consumed are each
 * appended with a leading space, converted with `String()`. The result is forwarded to the kernel log, prefixed
 * with the plugin's name and split across multiple log lines for a multi-line message.
 */
export interface IConsole {
    /** Writes a log-level line. Aliased by {@link info} and {@link debug}. */
    log(...args: any[]): void;
    /** Writes an error-level line. */
    error(...args: any[]): void;
    /** Writes a warning-level line. */
    warn(...args: any[]): void;
    /** Alias of {@link log}; not a distinct severity level. */
    info(...args: any[]): void;
    /** Alias of {@link log}; not a distinct severity level. */
    debug(...args: any[]): void;
}
