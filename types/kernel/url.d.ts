/**
 * An iterator entry returned by {@link IURLSearchParams.entries}, {@link IURLSearchParams.keys}, and
 * {@link IURLSearchParams.values}.
 *
 * @remarks The sandbox has no native `Symbol.asyncIterator` or iterator helper methods beyond
 * `[Symbol.iterator]`; this is a plain synchronous iterator.
 */
export interface IURLSearchParamsIterator<T> {
    next(): { done: false; value: T } | { done: true; value?: undefined };
    [Symbol.iterator](): IURLSearchParamsIterator<T>;
}

/**
 * A mutable collection of URL query parameters, created by {@link IURLSearchParamsConstructor} or read from
 * {@link IURL.searchParams}.
 *
 * @remarks Backed by `github.com/dop251/goja_nodejs/url`. Percent-encoding follows the WHATWG URL Standard's
 * `application/x-www-form-urlencoded` serializer, which differs from {@link IURL}'s own percent-encoding (for
 * example `~` is encoded as `%7E` here but not in a `URL` path or query written directly).
 */
export interface IURLSearchParams {
    /** Appends a new `name`/`value` entry without removing existing entries with the same name. */
    append(name: string, value: string): void;
    /**
     * Removes entries named `name`.
     *
     * @param value - When given, only removes entries whose value also matches.
     */
    delete(name: string, value?: string): void;
    /** Returns the value of the first entry named `name`, or `null` if there is none. */
    get(name: string): string | null;
    /** Returns the values of all entries named `name`, in order. */
    getAll(name: string): string[];
    /**
     * Whether an entry named `name` exists.
     *
     * @param value - When given, only matches an entry whose value also matches.
     */
    has(name: string, value?: string): boolean;
    /**
     * Replaces the first entry named `name` and removes the other entries with that name, or appends the entry
     * if there is none.
     */
    set(name: string, value: string): void;
    /** Sorts entries in place by name, using a stable sort on UTF-16 code unit order. */
    sort(): void;
    /** The number of name/value entries. */
    readonly size: number;
    entries(): IURLSearchParamsIterator<[string, string]>;
    keys(): IURLSearchParamsIterator<string>;
    values(): IURLSearchParamsIterator<string>;
    /**
     * Calls `callback` once per entry, in order.
     *
     * @remarks Unlike the WHATWG Standard, `thisArg` is not supported; `callback` is always invoked with
     * `this` set to `undefined`.
     */
    forEach(callback: (value: string, name: string, searchParams: IURLSearchParams) => void): void;
    /** Serializes all entries as an `application/x-www-form-urlencoded` query string, without a leading `?`. */
    toString(): string;
    [Symbol.iterator](): IURLSearchParamsIterator<[string, string]>;
}

/**
 * Constructs a {@link IURLSearchParams}, parsing or copying `init` depending on its shape.
 *
 * @remarks `init` is dispatched on by JS type rather than coerced through a single WebIDL union, which produces
 * a few deviations from browsers: a plain object without `Symbol.iterator` is read as a record of one entry per
 * own key, so a key whose value is an array is NOT expanded into repeated entries (each value is read with
 * `.toString()`, i.e. an array becomes its comma-joined string). An iterable (an array of 2-element tuples, a
 * `Map`, a `Set` of tuples, another {@link IURLSearchParams}, or any object with `Symbol.iterator`) is read as
 * pairs, and throws a `TypeError` if any element is not itself a 2-element tuple.
 */
export interface IURLSearchParamsConstructor {
    readonly prototype: IURLSearchParams;
    new(
        init?:
            | IURLSearchParams
            | string
            | Record<string, string>
            | Iterable<readonly [string, string]>
            | readonly (readonly [string, string])[],
    ): IURLSearchParams;
}

/**
 * A parsed and mutable URL, created by {@link IURLConstructor}.
 *
 * @remarks Backed by `github.com/dop251/goja_nodejs/url`, which wraps Go's `net/url`. Every property below is an
 * accessor on the prototype (not an own property), so `delete someURL.protocol` has no effect but still returns
 * `true`. There is no `createObjectURL`/`revokeObjectURL` and no `canParse` static method.
 */
export interface IURL {
    /** The whole URL, re-serialized; setting it re-parses the given string and throws `TypeError` if invalid. */
    href: string;
    /** `href` without a trailing path, query, or fragment, e.g. `"https://example.com"`; read-only. */
    readonly origin: string;
    /** The scheme including the trailing colon, e.g. `"https:"`. Setting an invalid or mismatched scheme is ignored. */
    protocol: string;
    /** The username portion of the authority, percent-decoded on read and percent-encoded on write. */
    username: string;
    /** The password portion of the authority, percent-decoded on read and percent-encoded on write. */
    password: string;
    /** `hostname` plus `:port` when `port` is non-empty. Setting an invalid value is ignored. */
    host: string;
    /** The host without the port. Setting an invalid value is ignored. */
    hostname: string;
    /**
     * The port as a string, or `""` when absent or equal to the scheme's default port.
     *
     * @remarks Setting accepts an out-of-range value by ignoring it, a non-integer by truncating it, and a
     * leading-numeric string by using only the leading digits; setting the scheme's default port stores `""`.
     */
    port: string;
    /** The path, percent-encoded, starting with `/`. */
    pathname: string;
    /** The query string including a leading `?` when non-empty, or `""`. Kept in sync with {@link searchParams}. */
    search: string;
    /** A live {@link IURLSearchParams} view over {@link search}; read-only (always the same object per `URL`). */
    readonly searchParams: IURLSearchParams;
    /** The fragment including a leading `#` when non-empty, or `""`. */
    hash: string;
    /** Equivalent to reading {@link href}. */
    toString(): string;
    /** Equivalent to reading {@link href}; used implicitly by `JSON.stringify`. */
    toJSON(): string;
}

/**
 * Constructs a {@link IURL} by parsing `input`, optionally resolved against `base`.
 */
export interface IURLConstructor {
    readonly prototype: IURL;
    /**
     * @param input - An absolute URL. Throws if it cannot be parsed as one.
     */
    new(input: string): IURL;
    /**
     * @param input - A URL, absolute or relative to `base`.
     * @param base  - An absolute URL that `input` is resolved against. Throws if `base` cannot be parsed as an
     *                absolute URL.
     */
    new(input: string, base: string | IURL): IURL;
}
