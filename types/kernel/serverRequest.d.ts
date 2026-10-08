import type { IDataObject } from "./primitives";

/**
 * HTTP Basic authentication credentials extracted from the request URL.
 */
export interface IRequestUser {
    /** Decoded username. */
    username: string;
    /** Decoded password. */
    password: string;
}

/**
 * Parsed URL components of an incoming server request.
 *
 * @remarks Field names mirror the browser `URL` / `Location` API where
 * applicable (`pathname`, `hash`, `search`).
 */
export interface IRequestUrl {
    /** Basic-auth credentials, or `null` if the request carries none. */
    user: IRequestUser | null;
    /** Value of the `Host` request header, e.g. `"127.0.0.1:6806"`. */
    host: string;
    /** URL-decoded path, e.g. `"/plugin/private/sample/api/hello/a space"`. */
    path: string;
    /** Percent-encoded path, e.g. `"/plugin/private/sample/api/hello/a%20space"`. */
    pathname: string;
    /** URL-decoded fragment without the leading `#`. */
    fragment: string;
    /** Percent-encoded fragment without the leading `#`. */
    hash: string;
    /** Raw query string without the leading `?`, e.g. `"a=1&b=2"`. */
    search: string;
    /** Parsed query parameters, e.g. `{ a: ["1"], b: ["2"] }`. */
    query: Record<string, string[]>;
}

/**
 * An uploaded file part within a `multipart/form-data` request.
 */
export interface IRequestFile {
    /** Original filename provided by the client. */
    filename: string;
    /** MIME part headers (e.g. `Content-Disposition`, `Content-Type`). */
    headers: Record<string, string[]>;
    /** File size in bytes. */
    size: number;
    /**
     * File contents as a lazy {@link IDataObject}.
     *
     * @remarks `null` if the file could not be read during request parsing.
     */
    data: IDataObject | null;
}

/**
 * Parsed form data from an `application/x-www-form-urlencoded` or
 * `multipart/form-data` request.
 */
export interface IRequestForm {
    /**
     * String form fields keyed by field name.
     *
     * @remarks Each key maps to an array to support repeated fields with the
     * same name, e.g. `{ tags: ["a", "b"] }`.
     */
    values: Record<string, string[]>;
    /** Uploaded file parts keyed by field name. */
    files: Record<string, IRequestFile[]>;
}

/**
 * Body of an incoming server request.
 *
 * @remarks Exactly one of `form` or `data` is non-null:
 * `form` is set for `application/x-www-form-urlencoded` and
 * `multipart/form-data`; `data` is set for all other content types and is
 * `null` when the request carries no body.
 */
export interface IRequestBody {
    /**
     * Parsed form data.
     *
     * @remarks `null` for non-form requests.
     */
    form: IRequestForm | null;
    /**
     * Raw request body as a lazy {@link IDataObject}.
     *
     * @remarks `null` when `form` is non-null or the request carries no body.
     */
    data: IDataObject | null;
}

/**
 * HTTP request-line and header fields.
 *
 * @remarks The `Cookie` and `Authorization` headers are stripped from
 * `headers` before the request is forwarded to the plugin handler.
 */
export interface IRequestContent {
    /** HTTP method in upper-case, e.g. `"GET"`, `"POST"`. */
    method: string;
    /** Full request URI including the query string, e.g. `"/plugin/private/sample/api/hello?a=1"`. */
    uri: string;
    /** HTTP protocol version string, e.g. `"HTTP/1.1"`. */
    proto: string;
    /** Major protocol version number, e.g. `1`. */
    protoMajor: number;
    /** Minor protocol version number, e.g. `1`. */
    protoMinor: number;
    /**
     * Request headers with `Cookie` and `Authorization` redacted.
     *
     * @remarks Each header name maps to an array of values to handle
     * repeated headers, e.g. `{ "Accept-Encoding": ["gzip", "br"] }`.
     */
    headers: Record<string, string[]>;
    /**
     * Request cookies keyed by cookie name.
     *
     * @remarks Each name maps to an array to handle duplicate cookie names.
     */
    cookies: Record<string, string[]>;
    /** Media type from the `Content-Type` header (parameters stripped), e.g. `"application/json"`. */
    contentType: string;
    /** Value of the `Content-Length` header in bytes; `-1` if unknown. */
    contentLength: number;
    /** Value of the `Referer` header, or an empty string if absent. */
    referer: string;
    /** Value of the `User-Agent` header. */
    userAgent: string;
    /** Parsed request body. */
    body: IRequestBody;
}

/**
 * Gin routing context for an incoming server request.
 */
export interface IRequestContext {
    /**
     * The sub-path captured by the `*path` wildcard parameter.
     *
     * @example `"/api/hello"` for a request to `/plugin/private/sample/api/hello`.
     */
    path: string;
    /** Full Gin route template, e.g. `"/plugin/private/:name/*path"`. */
    fullPath: string;
    /** Best-guess client IP address (honors `X-Forwarded-For` / `X-Real-IP`). */
    clientIp: string;
    /** Remote IP of the TCP connection (proxy headers are not considered). */
    remoteIp: string;
    /** `host:port` of the remote TCP endpoint, e.g. `"127.0.0.1:54321"`. */
    remoteAddr: string;
    /**
     * Named route parameters extracted by Gin.
     *
     * @example `{ name: ["plugin-sample"], path: ["/api/hello"] }`
     */
    params: Record<string, string[]>;
}

/**
 * The complete request object passed as the sole argument to server handlers.
 */
export interface IServerRequest {
    /** Parsed URL components. */
    url: IRequestUrl;
    /** HTTP request-line, headers, and body. */
    request: IRequestContent;
    /** Gin routing context. */
    context: IRequestContext;
}
