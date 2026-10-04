import type { TAbortSignal } from "./abort";
import type { TBufferSource } from "./crypto";

// Implements the default (non-byte) subset of the WHATWG Streams Standard: ReadableStream,
// WritableStream, TransformStream, and their default controllers/readers/writers, plus
// CountQueuingStrategy and ByteLengthQueuingStrategy. Byte streams are not supported
// (ReadableByteStreamController, ReadableStreamBYOBReader, ReadableStreamBYOBRequest, and
// `getReader({mode: "byob"})` do not exist); `WritableStreamDefaultController.signal` is not
// exposed either, so an underlying sink can only observe cancellation through the `reason`
// argument of its `abort` method. The sandbox has no native `Symbol.asyncIterator`, so
// `ReadableStream.prototype.values()` is reachable but `for await...of` does not work; drive a
// stream with `getReader()` and `read()` instead.

/**
 * The result of {@link IReadableStreamDefaultReader.read} or
 * {@link IReadableStreamAsyncIterator.next} for a chunk that has not ended the stream.
 */
export interface IReadableStreamReadValueResult<T> {
    done: false;
    value: T;
}

/** The result of {@link IReadableStreamDefaultReader.read} once the stream has closed. */
export interface IReadableStreamReadDoneResult {
    done: true;
    value?: undefined;
}

export type TReadableStreamReadResult<T> = IReadableStreamReadValueResult<T> | IReadableStreamReadDoneResult;

/** Passed to {@link IUnderlyingDefaultSource}'s methods to control a {@link IReadableStream}. */
export interface IReadableStreamDefaultController<R = any> {
    /**
     * The stream's internal queue size, in units set by the queuing strategy, subtracted from its
     * `highWaterMark`; `null` once the stream has errored.
     */
    readonly desiredSize: number | null;
    /** Closes the stream: no more chunks may be enqueued, and pending reads resolve as `done`. */
    close(): void;
    /** Appends a chunk to the stream's internal queue. */
    enqueue(chunk?: R): void;
    /** Errors the stream: pending and future reads reject with `e`. */
    error(e?: any): void;
}

/** The `underlyingSource` argument accepted by {@link IReadableStreamConstructor}. */
export interface IUnderlyingDefaultSource<R = any> {
    /** Called once when the stream is constructed, before any `pull` call. */
    start?(controller: IReadableStreamDefaultController<R>): void | PromiseLike<void>;
    /**
     * Called whenever the stream's internal queue has room (and once eagerly after `start`
     * settles); called again only after the returned value settles.
     */
    pull?(controller: IReadableStreamDefaultController<R>): void | PromiseLike<void>;
    /** Called when the stream's consumer cancels it, e.g. via {@link IReadableStream.cancel}. */
    cancel?(reason?: any): void | PromiseLike<void>;
}

/** A sizing strategy accepted by {@link IReadableStreamConstructor} and {@link IWritableStreamConstructor}. */
export interface IQueuingStrategy<T = any> {
    /** The queue size, in the strategy's own units, above which backpressure is signaled. */
    highWaterMark?: number;
    /** Returns the size of `chunk` in the strategy's own units; defaults to `1` per chunk. */
    size?(chunk: T): number;
}

/** A reader acquired from a {@link IReadableStream} via {@link IReadableStream.getReader}. */
export interface IReadableStreamDefaultReader<R = any> {
    /** Resolves when the stream closes, or rejects with its error. */
    readonly closed: Promise<void>;
    /** Cancels the stream, as if calling {@link IReadableStream.cancel} on its owner. */
    cancel(reason?: any): Promise<void>;
    /** Reads the next chunk, resolving `{done: true}` once the stream closes. */
    read(): Promise<TReadableStreamReadResult<R>>;
    /** Releases this reader's lock on the stream, allowing another reader to be acquired. */
    releaseLock(): void;
}

/**
 * Options accepted by {@link IReadableStream.getReader}.
 *
 * @remarks `mode` is typed as `never` because `"byob"` (the only other value defined by the
 * Streams Standard) is not supported; passing it throws at runtime.
 */
export interface IReadableStreamGetReaderOptions {
    mode?: never;
}

/** Options accepted by {@link IReadableStream.pipeTo} and {@link IReadableStream.pipeThrough}. */
export interface IStreamPipeOptions {
    /** Do not close `destination` when this stream closes. */
    preventClose?: boolean;
    /** Do not abort `destination` when this stream errors. */
    preventAbort?: boolean;
    /** Do not cancel this stream when `destination` errors or becomes closed/errored unexpectedly. */
    preventCancel?: boolean;
    /** Aborts the pipe (and, per the two flags above, the source and/or destination) when triggered. */
    signal?: TAbortSignal;
}

/** A `{readable, writable}` pair, such as a {@link ITransformStream}, accepted by {@link IReadableStream.pipeThrough}. */
export interface IReadableWritablePair<O = any, I = any> {
    readable: IReadableStream<O>;
    writable: IWritableStream<I>;
}

/** Options accepted by {@link IReadableStream.values}. */
export interface IReadableStreamIteratorOptions {
    /** Do not cancel the stream when iteration ends early (e.g. via `break` or `return()`). */
    preventCancel?: boolean;
}

/**
 * The async-iterator-shaped object returned by {@link IReadableStream.values}.
 *
 * @remarks Because the sandbox has no native `Symbol.asyncIterator`, this object cannot be used
 * with `for await...of`; call `next()` directly instead.
 */
export interface IReadableStreamAsyncIterator<R = any> {
    /** Equivalent to a reader's `read()`. */
    next(): Promise<TReadableStreamReadResult<R>>;
    /** Equivalent to releasing the reader, optionally cancelling the stream first. */
    return(value?: any): Promise<IReadableStreamReadDoneResult>;
}

/** A readable stream of chunks of type `R`, such as {@link IFetchResponse.body}. */
export interface IReadableStream<R = any> {
    /** `true` once a reader has been acquired via {@link getReader} and not yet released. */
    readonly locked: boolean;
    /** Cancels the stream; throws if it is {@link locked}. */
    cancel(reason?: any): Promise<void>;
    /** Acquires the stream's single reader; throws if it is already {@link locked}. */
    getReader(options?: IReadableStreamGetReaderOptions): IReadableStreamDefaultReader<R>;
    /** Pipes this stream through `transform`, returning its readable side. */
    pipeThrough<O>(transform: IReadableWritablePair<O, R>, options?: IStreamPipeOptions): IReadableStream<O>;
    /** Pipes this stream's chunks into `destination` until it closes, errors, or is cancelled. */
    pipeTo(destination: IWritableStream<R>, options?: IStreamPipeOptions): Promise<void>;
    /** Splits this stream into two independently readable branches over the same chunks. */
    tee(): [IReadableStream<R>, IReadableStream<R>];
    /** Returns an async-iterator-shaped object over this stream's chunks; see the remarks on {@link IReadableStreamAsyncIterator}. */
    values(options?: IReadableStreamIteratorOptions): IReadableStreamAsyncIterator<R>;
}

/** Constructs a {@link IReadableStream}. */
export interface IReadableStreamConstructor {
    new <R = any>(underlyingSource?: IUnderlyingDefaultSource<R>, strategy?: IQueuingStrategy<R>): IReadableStream<R>;
    /** Wraps an iterable or async iterable as a {@link IReadableStream} that yields its values. */
    from<R = any>(iterable: Iterable<R> | AsyncIterable<R>): IReadableStream<R>;
}

/** Passed to {@link IUnderlyingSink}'s methods to control a {@link IWritableStream}. */
export interface IWritableStreamDefaultController {
    /** Errors the stream; equivalent to calling this from outside, e.g. in response to another failure. */
    error(e?: any): void;
}

/** The `underlyingSink` argument accepted by {@link IWritableStreamConstructor}. */
export interface IUnderlyingSink<W = any> {
    /** Called once when the stream is constructed. */
    start?(controller: IWritableStreamDefaultController): void | PromiseLike<void>;
    /** Called once per queued chunk, in order; not called again until the returned value settles. */
    write?(chunk: W, controller: IWritableStreamDefaultController): void | PromiseLike<void>;
    /** Called once all queued writes have settled, when the stream is told to close. */
    close?(): void | PromiseLike<void>;
    /** Called when the stream is aborted; `reason` is whatever the caller passed to `abort()`. */
    abort?(reason?: any): void | PromiseLike<void>;
}

/** A writer acquired from a {@link IWritableStream} via {@link IWritableStream.getWriter}. */
export interface IWritableStreamDefaultWriter<W = any> {
    /** Resolves once the stream closes, or rejects with its error. */
    readonly closed: Promise<void>;
    /** The queue size headroom in the strategy's units; `null` once errored, `0` once closed. */
    readonly desiredSize: number | null;
    /** Resolves once {@link desiredSize} is positive again, i.e. backpressure has cleared. */
    readonly ready: Promise<void>;
    /** Aborts the stream, as if calling {@link IWritableStream.abort} on its owner. */
    abort(reason?: any): Promise<void>;
    /** Closes the stream, as if calling {@link IWritableStream.close} on its owner. */
    close(): Promise<void>;
    /** Releases this writer's lock on the stream, allowing another writer to be acquired. */
    releaseLock(): void;
    /** Queues `chunk` to be written; resolves once it has actually been written. */
    write(chunk?: W): Promise<void>;
}

/** A writable stream of chunks of type `W`, such as {@link IResponseStream.stream}. */
export interface IWritableStream<W = any> {
    /** `true` once a writer has been acquired via {@link getWriter} and not yet released. */
    readonly locked: boolean;
    /** Aborts the stream; throws if it is {@link locked}. */
    abort(reason?: any): Promise<void>;
    /** Closes the stream; throws if it is {@link locked} or already closing/closed. */
    close(): Promise<void>;
    /** Acquires the stream's single writer; throws if it is already {@link locked}. */
    getWriter(): IWritableStreamDefaultWriter<W>;
}

/** Constructs a {@link IWritableStream}. */
export interface IWritableStreamConstructor {
    new <W = any>(underlyingSink?: IUnderlyingSink<W>, strategy?: IQueuingStrategy<W>): IWritableStream<W>;
}

/** Passed to {@link ITransformer}'s methods to produce a {@link ITransformStream}'s readable side. */
export interface ITransformStreamDefaultController<O = any> {
    /** Same meaning as {@link IReadableStreamDefaultController.desiredSize} for the readable side. */
    readonly desiredSize: number | null;
    /** Appends a chunk to the readable side's internal queue. */
    enqueue(chunk?: O): void;
    /** Errors both sides of the transform stream. */
    error(reason?: any): void;
    /** Closes the readable side and errors the writable side with a `TypeError`. */
    terminate(): void;
}

/** The `transformer` argument accepted by {@link ITransformStreamConstructor}. */
export interface ITransformer<I = any, O = any> {
    /** Called once when the stream is constructed. */
    start?(controller: ITransformStreamDefaultController<O>): void | PromiseLike<void>;
    /**
     * Called once per chunk written to the writable side; defaults to enqueueing the chunk
     * unchanged (an identity transform) when omitted.
     */
    transform?(chunk: I, controller: ITransformStreamDefaultController<O>): void | PromiseLike<void>;
    /** Called once the writable side closes, before the readable side closes in turn. */
    flush?(controller: ITransformStreamDefaultController<O>): void | PromiseLike<void>;
    /**
     * Called when the writable side is aborted; its return value settling closes the readable
     * side. Not called when the readable side is cancelled instead (that only errors the writable
     * side, without invoking this method).
     */
    cancel?(reason?: any): void | PromiseLike<void>;
}

/** A linked `{readable, writable}` pair where writes to `writable` are transformed into `readable`'s chunks. */
export interface ITransformStream<I = any, O = any> {
    /** Yields the transformed chunks. */
    readonly readable: IReadableStream<O>;
    /** Accepts the chunks to transform. */
    readonly writable: IWritableStream<I>;
}

/** Constructs a {@link ITransformStream}. */
export interface ITransformStreamConstructor {
    new <I = any, O = any>(transformer?: ITransformer<I, O>, writableStrategy?: IQueuingStrategy<I>,
        readableStrategy?: IQueuingStrategy<O>): ITransformStream<I, O>;
}

/** A {@link IQueuingStrategy} that counts each chunk as size `1`, regardless of its contents. */
export interface ICountQueuingStrategy {
    readonly highWaterMark: number;
    size(chunk?: any): 1;
}

/** Constructs a {@link ICountQueuingStrategy}. */
export interface ICountQueuingStrategyConstructor {
    new (init: { highWaterMark: number }): ICountQueuingStrategy;
}

/** A {@link IQueuingStrategy} that sizes each chunk by its `byteLength`. */
export interface IByteLengthQueuingStrategy {
    readonly highWaterMark: number;
    size(chunk: TBufferSource): number;
}

/** Constructs a {@link IByteLengthQueuingStrategy}. */
export interface IByteLengthQueuingStrategyConstructor {
    new (init: { highWaterMark: number }): IByteLengthQueuingStrategy;
}

/**
 * The `ReadableStream` instance type produced by {@link IReadableStreamConstructor} and used by
 * {@link IFetchResponse.body}.
 *
 * @remarks Resolves to the DOM `ReadableStream` type when the DOM library is loaded, matching what
 * `new ReadableStream()` produces in that case; otherwise resolves to {@link IReadableStream}.
 * TypeScript cannot thread the chunk type parameter `R` through the DOM branch, so `R` is only
 * honored when the DOM library is not loaded.
 */
export type TReadableStream<R = any> = typeof globalThis extends { ReadableStream: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IReadableStream<R>
    : IReadableStream<R>;

/**
 * The `WritableStream` instance type produced by {@link IWritableStreamConstructor}.
 *
 * @remarks Resolves to the DOM `WritableStream` type when the DOM library is loaded, matching what
 * `new WritableStream()` produces in that case; otherwise resolves to {@link IWritableStream}. See
 * {@link TReadableStream} for the same caveat about the chunk type parameter `W`.
 */
export type TWritableStream<W = any> = typeof globalThis extends { WritableStream: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IWritableStream<W>
    : IWritableStream<W>;

/**
 * The `TransformStream` instance type produced by {@link ITransformStreamConstructor}.
 *
 * @remarks Resolves to the DOM `TransformStream` type when the DOM library is loaded, matching what
 * `new TransformStream()` produces in that case; otherwise resolves to {@link ITransformStream}. See
 * {@link TReadableStream} for the same caveat about the chunk type parameters `I`/`O`.
 */
export type TTransformStream<I = any, O = any> = typeof globalThis extends { TransformStream: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : ITransformStream<I, O>
    : ITransformStream<I, O>;
