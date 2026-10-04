/// <reference types="@dop251/types-goja_nodejs-buffer" />
/// <reference types="@dop251/types-goja_nodejs-global" />
/// <reference types="@dop251/types-goja_nodejs-url" />

// ── ECMAScript conformance ────────────────────────────────────────────────────
//
// The kernel plugin sandbox runs on `github.com/dop251/goja`, a from-scratch Go implementation of
// ECMAScript, not a browser or Node.js engine. Confirmed against goja's own source tree and README
// at the pinned commit (`kernel/go.mod`):
//
// `Promise`, `Symbol`, `Proxy`, `Reflect`, `Map`/`Set`/`WeakMap`/`WeakSet`, `ArrayBuffer`,
// `DataView`, the typed array family, and `BigInt` are all implemented, but some lack members that
// later editions added to their standard `lib.es*.d.ts` types. Each is redeclared below with its
// standard type unchanged (so a missing member still type-checks) purely to attach a comment listing
// what is missing at runtime; the lists come from checking every member that TypeScript 6.0's
// `lib.esnext` declares for these globals against a running sandbox. Syntax-only ES6+ features with
// no corresponding global object — classes, generators, `async`/`await`, destructuring, template
// literals, optional chaining, nullish coalescing, and logical assignment operators — are fully
// implemented but have nothing to redeclare.
//
// `Intl`, `Atomics`, `SharedArrayBuffer`, `WeakRef`, and `FinalizationRegistry`, the ES2025
// `Iterator` (and with it every iterator helper method) and `Float16Array`, and the ESNext
// `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`, and `Temporal` are NOT implemented.
// `Atomics`/`SharedArrayBuffer` are additionally unlikely to ever land: goja's own documentation
// states a `goja.Runtime` is not goroutine-safe and values cannot cross between runtime instances,
// which rules out the cross-thread shared memory these two exist for. Despite this, a TypeScript
// project whose `lib` includes the edition that declares one of them (`Intl` is declared even by
// plain `lib: "ES5"`) type-checks code using it as if it existed; such code compiles but throws
// `ReferenceError` at runtime in this sandbox. There is no way to retract a global that an
// already-loaded `lib` tier declares, so this is a correctness note for plugin authors rather than
// something expressible as a type here.
//
// Running the same member check against the built-in globals that are not redeclared below found
// these missing: `Object.groupBy` and `String.prototype.isWellFormed`/`toWellFormed` (ES2024),
// `RegExp.escape` and `Math.f16round` (ES2025), `Array.fromAsync`, `Error.isError` (also absent
// from every error subclass), and
// `Date.prototype.toTemporalInstant` (ESNext), as well as legacy members that TypeScript still
// declares: the `RegExp` statics `$1`–`$9`, `input`, `lastMatch`, `lastParen`, `leftContext`, and
// `rightContext` with their `$_`, `$&`, `$+`, `` $` ``, and `$'` aliases, and the HTML methods of
// `String.prototype` such as `anchor`, `bold`, and `link`.
//
// Some syntax is not supported: async generators and `for await...of` (ES2018), `using` and
// `await using` declarations (ESNext), and dynamic `import()` fail with a `SyntaxError` when the
// script is compiled, and the RegExp `d` (ES2022) and `v` (ES2024) flags throw a `SyntaxError` when
// the regular expression is created. Unicode property escapes such as `\p{L}` (ES2018) are worse:
// they are accepted, but matched as literal text even with the `u` flag, so `/\p{L}/u.test("a")` is
// `false` while `/\p{L}/u.test("p{L}")` is `true`.
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
    IRequire,
    IGoErrorConstructor,
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
     * Web Crypto primitives; see {@link ICrypto}.
     *
     * @remarks When the DOM library is also loaded, this keeps the DOM `Crypto` type.
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
     * Creates a Node.js-compatible `Buffer`; redeclared purely to attach this comment, not because the type
     * itself differs from the ambient `@dop251/types-goja_nodejs-buffer` package's.
     *
     * @remarks `BufferConstructor` declares a larger surface than the sandbox actually implements; see the
     * `@remarks` on {@link IDataObject.buffer} for exactly which statics and instance methods are missing or
     * behave differently. Not part of any web standard, so no DOM-coexistence fallback is needed; `lib.dom.d.ts`
     * does not declare `Buffer`.
     */
    var Buffer: BufferConstructor;
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
     * Loads a CommonJS module from the plugin's directory or a built-in module; see {@link IRequire}.
     *
     * @remarks Absent from `lib.dom.d.ts`, so no DOM-coexistence fallback is needed.
     */
    var require: IRequire;
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
    /**
     * goja's built-in error type for failures that originate in kernel (Go) code; see {@link IGoError}.
     *
     * @remarks Not part of any web or Node.js standard, so no DOM-coexistence fallback is needed.
     */
    var GoError: IGoErrorConstructor;
    /**
     * Implemented by the kernel plugin sandbox, but `Promise.withResolvers` (ES2024) and `Promise.try` (ES2025) are
     * missing at runtime although the standard type declares them; see the top-of-file ECMAScript-conformance note.
     */
    var Promise: PromiseConstructor;
    /**
     * Implemented by the kernel plugin sandbox, but `Symbol.asyncIterator` (ES2018) and the ESNext `Symbol.dispose`,
     * `Symbol.asyncDispose`, and `Symbol.metadata` are missing at runtime although the standard type declares them;
     * see the top-of-file ECMAScript-conformance note.
     */
    var Symbol: SymbolConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Proxy: ProxyConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard namespace declares; see the
     * top-of-file ECMAScript-conformance note.
     *
     * @remarks `lib.es2015.reflect.d.ts` declares `Reflect` as a `namespace`, not a `var` of a `*Constructor`
     * type, so this is an empty namespace merge rather than a `var` redeclaration like the other entries below.
     */
    namespace Reflect {}
    /**
     * Implemented by the kernel plugin sandbox, but `Map.groupBy` (ES2024) and the ESNext `Map.prototype.getOrInsert`
     * and `Map.prototype.getOrInsertComputed` are missing at runtime although the standard type declares them; see
     * the top-of-file ECMAScript-conformance note.
     */
    var Map: MapConstructor;
    /**
     * Implemented by the kernel plugin sandbox, but the ES2025 set methods `union`, `intersection`, `difference`,
     * `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, and `isDisjointFrom` are missing from `Set.prototype` at
     * runtime although the standard type declares them; see the top-of-file ECMAScript-conformance note.
     */
    var Set: SetConstructor;
    /**
     * Implemented by the kernel plugin sandbox, but the ESNext `WeakMap.prototype.getOrInsert` and
     * `WeakMap.prototype.getOrInsertComputed` are missing at runtime although the standard type declares them; see
     * the top-of-file ECMAScript-conformance note.
     */
    var WeakMap: WeakMapConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var WeakSet: WeakSetConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var BigInt: BigIntConstructor;
    /**
     * Implemented by the kernel plugin sandbox except for resizable and transferable buffers (ES2024): the
     * `ArrayBuffer.prototype` members `resize`, `resizable`, `maxByteLength`, `transfer`, `transferToFixedLength`, and
     * `detached` are missing at runtime although the standard type declares them; see the top-of-file
     * ECMAScript-conformance note.
     */
    var ArrayBuffer: ArrayBufferConstructor;
    /**
     * Implemented by the kernel plugin sandbox, but `DataView.prototype.getFloat16` and `setFloat16` (ES2025) are
     * missing at runtime although the standard type declares them; see the top-of-file ECMAScript-conformance note.
     */
    var DataView: DataViewConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Int8Array: Int8ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox, but the ESNext base64 and hex conversions `Uint8Array.fromBase64`,
     * `Uint8Array.fromHex`, and the `Uint8Array.prototype` methods `toBase64`, `toHex`, `setFromBase64`, and
     * `setFromHex` are missing at runtime although the standard type declares them; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Uint8Array: Uint8ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Uint8ClampedArray: Uint8ClampedArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Int16Array: Int16ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Uint16Array: Uint16ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Int32Array: Int32ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Uint32Array: Uint32ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Float32Array: Float32ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var Float64Array: Float64ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var BigInt64Array: BigInt64ArrayConstructor;
    /**
     * Implemented by the kernel plugin sandbox with every member its standard type declares; see the top-of-file
     * ECMAScript-conformance note.
     */
    var BigUint64Array: BigUint64ArrayConstructor;
}
