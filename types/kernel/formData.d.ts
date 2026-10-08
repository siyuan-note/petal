import type { TBufferSource } from "./crypto";

/** A part accepted by {@link IBlobConstructor} and {@link IFileConstructor}. */
export type TBlobPart = TBufferSource | IBlob | string;

/** Options of {@link IBlobConstructor}. */
export interface IBlobPropertyBag {
    /**
     * Media type of the blob, converted to ASCII lowercase; a type containing characters outside
     * U+0020 to U+007E becomes `""`.
     *
     * @defaultValue `""`
     */
    type?: string;
    /**
     * How line breaks in string parts are written: `"transparent"` keeps them as they are, while
     * `"native"` converts CRLF, CR, and LF to the line break of the kernel's platform (CRLF on
     * Windows, LF elsewhere). Bytes from buffer sources and blobs are never converted.
     *
     * @defaultValue `"transparent"`
     */
    endings?: "transparent" | "native";
}

/** Options of {@link IFileConstructor}. */
export interface IFilePropertyBag extends IBlobPropertyBag {
    /**
     * Last modification time in milliseconds since the Unix epoch; fractions are truncated.
     *
     * @defaultValue The time the file is created.
     */
    lastModified?: number;
}

/**
 * Immutable binary data with a media type, created by {@link IBlobConstructor} or {@link IBlob.slice}.
 *
 * @remarks `stream()` is not available because kernel plugins have no `ReadableStream`.
 */
export interface IBlob {
    /** Size in bytes. */
    readonly size: number;
    /** Media type in ASCII lowercase, or `""` when unknown. */
    readonly type: string;
    /**
     * Returns a new blob with the bytes from `start` up to but not including `end`.
     *
     * @remarks Negative positions count back from the end, positions are clamped to `[0, size]`, and
     * fractions are rounded to the nearest integer (ties to even). The result is never a
     * {@link IFile}, and its type is the normalized `contentType` or `""`; it does not inherit this
     * blob's type.
     */
    slice(start?: number, end?: number, contentType?: string): IBlob;
    /** Decodes the bytes as UTF-8; a leading byte order mark is removed and malformed input becomes U+FFFD. */
    text(): Promise<string>;
    /** Returns a copy of the bytes. */
    arrayBuffer(): Promise<ArrayBuffer>;
    /** Returns a copy of the bytes as a `Uint8Array`. */
    bytes(): Promise<Uint8Array>;
}

/**
 * The global `Blob` constructor of the File API.
 *
 * @remarks Supports subclassing with `extends`, and instances accept added properties, but they cannot
 * be frozen. Unlike in browsers, calling the constructor without `new` does not throw.
 */
export interface IBlobConstructor {
    readonly prototype: IBlob;
    /**
     * @param blobParts - Parts concatenated in order: strings are encoded as UTF-8 (lone surrogates
     * become U+FFFD), and buffer sources and blobs contribute a copy of their current bytes. Must be
     * an iterable object such as an array; a string throws a `TypeError`.
     * @param options - Media type and line-ending handling.
     */
    new(blobParts?: Iterable<TBlobPart>, options?: IBlobPropertyBag): IBlob;
}

/**
 * The `Blob` instance type returned by {@link IDataObject.blob}.
 *
 * @remarks Resolves to the DOM `Blob` type when the DOM library is loaded, matching what
 * `new Blob()` produces in that case; otherwise resolves to {@link IBlob}.
 */
export type TBlob = typeof globalThis extends { Blob: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IBlob
    : IBlob;

/** A {@link IBlob} with a file name and a modification time, created by {@link IFileConstructor}. */
export interface IFile extends IBlob {
    /** The file name exactly as given, including any `/`. */
    readonly name: string;
    /** Last modification time in milliseconds since the Unix epoch. */
    readonly lastModified: number;
}

/**
 * The global `File` constructor of the File API; `File` inherits from `Blob`.
 *
 * @remarks The caveats of {@link IBlobConstructor} apply.
 */
export interface IFileConstructor {
    readonly prototype: IFile;
    /**
     * @param fileBits - The contents, as for `blobParts` of {@link IBlobConstructor}, but required.
     * @param fileName - The file name.
     * @param options - Media type, line-ending handling, and modification time.
     */
    new(fileBits: Iterable<TBlobPart>, fileName: string, options?: IFilePropertyBag): IFile;
}

/** The value of a {@link IFormData} entry: a string or a file. */
export type TFormDataEntryValue = string | IFile;

/**
 * An ordered list of name/value entries, sent as `multipart/form-data` when used as
 * {@link IRequestInit.body}, for example to upload files through `/api/asset/upload`.
 *
 * @remarks Iteration, including `for...of`, `entries()`, `keys()`, `values()`, and `forEach()`, reads
 * the current entries, so entries added while iterating are visited.
 */
export interface IFormData {
    /**
     * Appends an entry.
     *
     * @remarks A blob is stored as a {@link IFile}: a blob that is not a file is named `"blob"`, and
     * `filename` renames it, keeping its type and, for a file, its `lastModified`. Other values are
     * converted to strings; passing `filename` with a value that is not a blob throws a `TypeError`.
     */
    append(name: string, value: string): void;
    append(name: string, blobValue: IBlob, filename?: string): void;
    /** Removes all entries named `name`. */
    delete(name: string): void;
    /** Returns the value of the first entry named `name`, or `null` if there is none. */
    get(name: string): TFormDataEntryValue | null;
    /** Returns the values of all entries named `name`, in order. */
    getAll(name: string): TFormDataEntryValue[];
    /** Whether an entry named `name` exists. */
    has(name: string): boolean;
    /**
     * Replaces the first entry named `name` and removes the other entries with that name, or appends
     * the entry if there is none.
     *
     * @remarks Values are handled as in {@link IFormData.append}.
     */
    set(name: string, value: string): void;
    set(name: string, blobValue: IBlob, filename?: string): void;
    entries(): IterableIterator<[string, TFormDataEntryValue]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<TFormDataEntryValue>;
    forEach(callback: (value: TFormDataEntryValue, key: string, parent: IFormData) => void, thisArg?: unknown): void;
    [Symbol.iterator](): IterableIterator<[string, TFormDataEntryValue]>;
}

/**
 * The global `FormData` constructor of the XMLHttpRequest Standard.
 *
 * @remarks Kernel plugins have no `HTMLFormElement`, so the constructor takes no form, and any argument
 * other than `undefined` throws a `TypeError`. The caveats of {@link IBlobConstructor} apply.
 */
export interface IFormDataConstructor {
    readonly prototype: IFormData;
    new(): IFormData;
}

/**
 * The `FormData` instance type accepted by {@link IRequestInit.body}.
 *
 * @remarks Resolves to the DOM `FormData` type when the DOM library is loaded, matching what
 * `new FormData()` produces in that case; otherwise resolves to {@link IFormData}.
 */
export type TFormData = typeof globalThis extends { FormData: infer T; onmessage: any }
    ? T extends new (...args: any) => infer Instance ? Instance : IFormData
    : IFormData;
