/// <reference types="@dop251/types-goja_nodejs-buffer" />
/// <reference types="@dop251/types-goja_nodejs-global" />
/// <reference types="@dop251/types-goja_nodejs-url" />

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
}
