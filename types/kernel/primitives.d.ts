import type { TBlob } from "./formData";
import type { TReadableStream } from "./streams";

/**
 * WebSocket connection ready-state values.
 *
 * @remarks Mirrors the browser `WebSocket.readyState` constants:
 * - `0`: CONNECTING
 * - `1`: OPEN
 * - `2`: CLOSING
 * - `3`: CLOSED
 */
export type TWebSocketReadyState = 0 | 1 | 2 | 3;

/**
 * Server-Sent Events connection ready-state values.
 *
 * @remarks Mirrors the browser `EventSource.readyState` constants:
 * - `0`: CONNECTING
 * - `1`: OPEN
 * - `2`: CLOSED
 */
export type TEventSourceReadyState = 0 | 1 | 2;

/** An absolute URL path that must start with `/`. */
export type TRequestPath = `/${string}`;

/** A standard UUID in hyphenated 8-4-4-4-12 format. */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * A single directory entry returned by {@link IStorage.list}.
 */
export interface IStorageEntry {
    /** File or directory name (not the full path). */
    name: string;
    /** `true` if this entry is a directory. */
    isDir: boolean;
    /** `true` if this entry is a symbolic link. */
    isSymlink: boolean;
    /** Last-modified time as a Unix timestamp (seconds since epoch). */
    updated: number;
}

/**
 * A lazy data accessor returned by {@link IStorage.get} and {@link IFetchResponse}.
 *
 * @remarks Each method decodes the same underlying byte slice; call at most once per method per
 * instance. The results of {@link IDataObject.buffer}, {@link IDataObject.arrayBuffer}, and
 * {@link IDataObject.bytes} share that memory, so changes made through one of them are visible to the
 * others and to later calls, whereas {@link IDataObject.blob} returns a copy.
 */
export interface IDataObject {
    /**
     * Decodes the data as a UTF-8 string.
     *
     * @returns The text content.
     */
    text(): Promise<string>;
    /**
     * Parses the data as JSON.
     *
     * @returns The parsed value.
     */
    json(): Promise<any>;
    /**
     * Returns the raw bytes as a node.js compatible `Buffer`.
     *
     * @remarks The global `Buffer` type comes from `@dop251/types-goja_nodejs-buffer`, which declares a larger
     * surface than the sandbox actually implements (`github.com/dop251/goja_nodejs/buffer`). Only
     * `Buffer.from`, `Buffer.alloc`, `Buffer.concat`, and `Buffer.poolSize` exist as statics — `isBuffer`,
     * `isEncoding`, `byteLength`, `compare`, and `allocUnsafe`/`allocUnsafeSlow` are declared but not defined,
     * so calling one throws `TypeError: ... is not a function`. On instances, the full `read*`/`write*` numeric
     * family and `equals` are genuinely Buffer-specific; `copy` and `toJSON` are declared but not defined, so
     * calling either also throws. `slice`, `fill`, `indexOf`, `includes`, and `subarray` are declared with
     * Node's Buffer-specific signatures but are not actually defined on the Buffer prototype either — because a
     * Buffer is built on `Uint8Array`, calling one instead silently runs `Uint8Array.prototype`'s version with
     * `Uint8Array`'s own (different) parameter meaning and return type, rather than throwing or matching the
     * declared signature. The supported encodings are exactly `"hex"`, `"utf8"`, `"utf-8"`, `"base64"`, and
     * `"base64Url"` (capital `U`) — the declared type's lowercase `"base64url"` does not match and is rejected
     * at runtime.
     *
     * @returns The binary content.
     */
    buffer(): Promise<Buffer>;
    /**
     * Returns the raw bytes as an `ArrayBuffer`.
     *
     * @returns The binary content.
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Returns the raw bytes as a `Uint8Array`.
     *
     * @returns The binary content.
     */
    bytes(): Promise<Uint8Array>;
    /**
     * Returns a copy of the raw bytes as a blob that is not a file.
     *
     * @remarks The blob's `type` is the `Content-Type` header of the response for {@link IFetchResponse},
     * of the request for {@link IRequestBody.data}, and of the part for {@link IRequestFile.data},
     * normalized as described for {@link IBlobPropertyBag.type}. It is `""` for {@link IStorage.get} and
     * when the header is absent. Unlike the Fetch Standard, the header is not parsed as a MIME type, so
     * whitespace is kept and a value that is not a valid MIME type is not replaced with `""`:
     * `Text/HTML; Charset=UTF-8` becomes `text/html; charset=utf-8`.
     *
     * @returns The binary content.
     */
    blob(): Promise<TBlob>;
}

/**
 * Response object returned by {@link ISiyuan.fetch}.
 *
 * @remarks Extends {@link IDataObject} so the response body can be read as text, JSON, raw bytes,
 * or a blob; {@link body} additionally exposes it as a stream.
 *
 * Unlike the general {@link IDataObject} contract (which allows each method to be called
 * repeatedly), a fetch response body can only be claimed once in total: at most one of `body`,
 * `text()`, `json()`, `buffer()`, `arrayBuffer()`, `bytes()`, or `blob()` may be used across the
 * whole response, matching the standard Fetch API's `Response.bodyUsed` behavior. `fetch()` itself
 * resolves as soon as the response headers arrive; the body is then read incrementally from the
 * network rather than buffered eagerly, so a second attempt to claim it rejects with a `TypeError`
 * instead of replaying cached bytes.
 */
export interface IFetchResponse extends IDataObject {
    /** The final URL after any redirects. */
    url: string;
    /** `true` when `status` is in the range 200–299. */
    ok: boolean;
    /** HTTP status code, e.g. `200`. */
    status: number;
    /** HTTP status text, e.g. `"OK"`. */
    statusText: string;
    /** Response headers as a flat string-to-string map. */
    headers: Record<string, string>;
    /**
     * The response body as a stream of `Uint8Array` chunks, delivered incrementally as they arrive
     * over the network.
     *
     * @remarks Claims the body the first time its reader actually reads from it (not merely by
     * accessing this property); see the claim-once remarks on {@link IFetchResponse} itself.
     */
    body: TReadableStream<Uint8Array>;
}
