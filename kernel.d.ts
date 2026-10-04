/// <reference types="@dop251/types-goja_nodejs-buffer" />
/// <reference types="@dop251/types-goja_nodejs-global" />
/// <reference types="@dop251/types-goja_nodejs-url" />

// ── ECMAScript conformance ────────────────────────────────────────────────────
//
// The kernel plugin sandbox runs on `github.com/dop251/goja`, a from-scratch Go implementation of
// ECMAScript, not a browser or Node.js engine. Confirmed against goja's own source tree and README
// at the pinned commit (`kernel/go.mod`):
//
// `Promise`, `Symbol`, `Proxy`, `Reflect`, `Map`/`Set`/`WeakMap`/`WeakSet`, the typed array family,
// `BigInt`, classes, generators, `async`/`await`, destructuring, template literals, optional
// chaining, nullish coalescing, and logical assignment operators are all implemented and match
// their TypeScript `lib.es*.d.ts` declarations — nothing further needs declaring for these here.
//
// `Intl`, `Atomics`, `SharedArrayBuffer`, `WeakRef`, and `FinalizationRegistry` are NOT
// implemented — there is no corresponding source file anywhere in goja's tree, unlike the sibling
// `WeakMap`/`WeakSet` implementations that do exist. `Atomics`/`SharedArrayBuffer` are additionally
// unlikely to ever land: goja's own documentation states a `goja.Runtime` is not goroutine-safe and
// values cannot cross between runtime instances, which rules out the cross-thread shared memory
// these two exist for. Despite this, a TypeScript project targeting `lib: "ES2022"` or higher (as
// well as plain `lib: "ES5"` for `Intl` specifically, which TypeScript has always declared
// unconditionally) type-checks code using all five as if they existed; such code compiles but
// throws `ReferenceError` at runtime in this sandbox. There is no way to retract a global that an
// already-loaded `lib` tier declares, so this is a correctness note for plugin authors rather than
// something expressible as a type here.
//
// Two further spec deviations, both inherited from Go's standard library and documented in goja's
// own README: `JSON.parse` cannot correctly round-trip a lone (unpaired) UTF-16 surrogate, because
// it is implemented on top of Go's UTF-8-based `encoding/json`; and converting a calendar date to
// a `Date` epoch timestamp uses Go's `int` rather than the specification's `float`, so arguments
// large enough to overflow `int` produce an incorrect result instead of the IEEE 754 value a
// browser or Node.js would give.

import type {
    ISiyuan,
    ICrypto,
    ITextEncoderConstructor,
    ITextDecoderConstructor,
    IAbortControllerConstructor,
    IAbortSignalConstructor,
    IBlobConstructor,
    IFileConstructor,
    IFormDataConstructor,
    IReadableStreamConstructor,
    IWritableStreamConstructor,
    ITransformStreamConstructor,
    ICountQueuingStrategyConstructor,
    IByteLengthQueuingStrategyConstructor,
    IConsole,
    IURLConstructor,
    IURLSearchParamsConstructor,
    ISetTimeout,
    IClearTimeout,
    ISetInterval,
    IClearInterval,
    ISetImmediate,
    IClearImmediate,
} from "./types/kernel/index";

export * from "./types/kernel/index";

declare global {
    const siyuan: ISiyuan;
    /**
     * The same object as {@link ISiyuan.crypto}, installed for code that uses the standard
     * Web Crypto global.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `Crypto` type; use
     * `siyuan.crypto` for the kernel's own typing.
     */
    var crypto: typeof globalThis extends { crypto: infer T; onmessage: any } ? T : ICrypto;
    /**
     * Encodes strings as UTF-8; see {@link ITextEncoderConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `TextEncoder` type.
     */
    var TextEncoder: typeof globalThis extends { TextEncoder: infer T; onmessage: any } ? T : ITextEncoderConstructor;
    /**
     * Decodes UTF-8 and UTF-16 bytes; see {@link ITextDecoderConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `TextDecoder` type.
     */
    var TextDecoder: typeof globalThis extends { TextDecoder: infer T; onmessage: any } ? T : ITextDecoderConstructor;
    /**
     * Creates an {@link IAbortSignal} that can be aborted on demand; see {@link IAbortControllerConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `AbortController` type.
     */
    var AbortController: typeof globalThis extends { AbortController: infer T; onmessage: any } ? T : IAbortControllerConstructor;
    /**
     * A cancellation signal usable with {@link IClient.fetch}; see {@link IAbortSignalConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `AbortSignal` type.
     */
    var AbortSignal: typeof globalThis extends { AbortSignal: infer T; onmessage: any } ? T : IAbortSignalConstructor;
    /**
     * Creates immutable binary data; see {@link IBlobConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `Blob` type.
     */
    var Blob: typeof globalThis extends { Blob: infer T; onmessage: any } ? T : IBlobConstructor;
    /**
     * Creates a {@link IBlob} with a file name and a modification time; see {@link IFileConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `File` type.
     */
    var File: typeof globalThis extends { File: infer T; onmessage: any } ? T : IFileConstructor;
    /**
     * Builds `multipart/form-data` request bodies for {@link IClient.fetch}; see {@link IFormDataConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `FormData` type.
     */
    var FormData: typeof globalThis extends { FormData: infer T; onmessage: any } ? T : IFormDataConstructor;
    /**
     * Creates a {@link IReadableStream}, such as {@link IFetchResponse.body}; see
     * {@link IReadableStreamConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `ReadableStream` type.
     */
    var ReadableStream: typeof globalThis extends { ReadableStream: infer T; onmessage: any } ? T : IReadableStreamConstructor;
    /**
     * Creates a {@link IWritableStream}, such as {@link IResponseStream.stream}; see
     * {@link IWritableStreamConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `WritableStream` type.
     */
    var WritableStream: typeof globalThis extends { WritableStream: infer T; onmessage: any } ? T : IWritableStreamConstructor;
    /**
     * Creates a {@link ITransformStream}; see {@link ITransformStreamConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `TransformStream` type.
     */
    var TransformStream: typeof globalThis extends { TransformStream: infer T; onmessage: any } ? T : ITransformStreamConstructor;
    /**
     * A {@link IQueuingStrategy} that counts each chunk as size `1`; see
     * {@link ICountQueuingStrategyConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `CountQueuingStrategy` type.
     */
    var CountQueuingStrategy: typeof globalThis extends { CountQueuingStrategy: infer T; onmessage: any } ? T : ICountQueuingStrategyConstructor;
    /**
     * A {@link IQueuingStrategy} that sizes each chunk by its `byteLength`; see
     * {@link IByteLengthQueuingStrategyConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `ByteLengthQueuingStrategy` type.
     */
    var ByteLengthQueuingStrategy: typeof globalThis extends { ByteLengthQueuingStrategy: infer T; onmessage: any } ? T : IByteLengthQueuingStrategyConstructor;
    /**
     * Logs to the kernel log; see {@link IConsole}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `Console` type, which declares methods
     * the sandbox does not implement (`table`, `group`, `trace`, etc.); see {@link IConsole} for the real
     * surface.
     */
    var console: typeof globalThis extends { console: infer T; onmessage: any } ? T : IConsole;
    /**
     * Parses and manipulates a URL; see {@link IURLConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `URL` type.
     */
    var URL: typeof globalThis extends { URL: infer T; onmessage: any } ? T : IURLConstructor;
    /**
     * Parses and serializes a URL's query string; see {@link IURLSearchParamsConstructor}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `URLSearchParams` type.
     */
    var URLSearchParams: typeof globalThis extends { URLSearchParams: infer T; onmessage: any } ? T : IURLSearchParamsConstructor;
    /**
     * Schedules a one-off callback; see {@link ISetTimeout}.
     *
     * @remarks Unlike the other DOM-coexisting globals in this block, this cannot fall back to the DOM
     * `setTimeout` type when the DOM library is also loaded: `lib.dom.d.ts` declares `setTimeout` as an
     * unconditional `declare function`, not as a `Window`-shaped property, so there is no way to detect and
     * defer to it the way `crypto` or `Blob` do; loading this declaration together with `lib: dom` produces a
     * duplicate-identifier error on `setTimeout`/`setInterval`/`clearTimeout`/`clearInterval`, the same
     * long-standing conflict `@types/node` has with `lib: dom` for the same four globals.
     */
    var setTimeout: ISetTimeout;
    /** Cancels a callback scheduled by {@link setTimeout}; see {@link IClearTimeout}. */
    var clearTimeout: IClearTimeout;
    /**
     * Schedules a repeating callback; see {@link ISetInterval}.
     *
     * @remarks See the {@link setTimeout} remarks: this has the same unconditional-`declare function` conflict
     * with the DOM library.
     */
    var setInterval: ISetInterval;
    /** Cancels a callback scheduled by {@link setInterval}; see {@link IClearInterval}. */
    var clearInterval: IClearInterval;
    /**
     * Schedules a callback to run as soon as the event loop is next free; see {@link ISetImmediate}.
     *
     * @remarks Not part of any web standard; also absent from `lib.dom.d.ts`, so no DOM-coexistence fallback
     * is needed here, unlike the other globals in this block.
     */
    var setImmediate: ISetImmediate;
    /** Cancels a callback scheduled by {@link setImmediate}; see {@link IClearImmediate}. */
    var clearImmediate: IClearImmediate;
}
