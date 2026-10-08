import type { TBufferSource } from "./crypto";
import type { TReadableStream } from "./streams";

/**
 * Serialization format for a structured {@link IResponseBody.data} payload.
 *
 * @remarks The kernel delegates to the corresponding Gin writer:
 * JSON variants map to `c.JSON` / `c.JSONP` / `c.AsciiJSON` / etc.;
 * `XML` → `c.XML`; `YAML` → `c.YAML`; `TOML` → `c.TOML`;
 * `ProtoBuf` → `c.ProtoBuf`.
 */
export type TSerializedType =
    | 'JSON' | 'JSONP' | 'AsciiJSON' | 'IndentedJSON' | 'PureJSON' | 'SecureJSON'
    | 'XML' | 'YAML' | 'TOML' | 'ProtoBuf';

/**
 * A structured-data response body serialized by the kernel.
 *
 * @remarks The kernel selects the Gin writer that corresponds to `type`
 * (e.g. `c.JSON` for `"JSON"`, `c.XML` for `"XML"`).
 */
export interface IResponseSerializedData {
    /** Serialization format to use. */
    type: TSerializedType;
    /** The value to serialize; must be compatible with the chosen format. */
    data: any;
}

/**
 * A file response body served directly from the local filesystem.
 *
 * @remarks When `name` is non-empty the kernel sends the file as a
 * downloadable attachment (`Content-Disposition: attachment; filename="<name>"`).
 * When `name` is empty or omitted the file is served inline via `c.File`.
 *
 * The path must resolve inside the SiYuan workspace, matching the boundary the
 * kernel file APIs enforce. Absolute paths inside the workspace and
 * workspace-relative paths (a leading slash is allowed) are both accepted.
 * Symbolic links and directory junctions that resolve outside the workspace are
 * rejected. A path that resolves outside the workspace is answered with `404`,
 * the same response as a missing file.
 */
export interface IResponseFile {
    /**
     * Download filename for the `Content-Disposition` header.
     *
     * @remarks Omit or leave empty to serve the file inline.
     */
    name?: string;
    /**
     * Path of the file to serve.
     *
     * @remarks Must resolve inside the SiYuan workspace, for example
     * `/data/plugins/<plugin-name>/app/index.html`. A path outside the workspace
     * is answered with `404`.
     */
    path: string;
}

/**
 * A formatted-string response body.
 *
 * @remarks The kernel passes `format` and `values` to Go's `fmt.Sprintf`
 * and writes the resulting string via `c.String`.
 */
export interface IResponseString {
    /** Go `fmt.Sprintf`-style format string, e.g. `"Hello, %s!"`. */
    format: string;
    /** Positional arguments interpolated into `format`. */
    values?: any[];
}

/**
 * A raw-bytes response body with an explicit `Content-Type`.
 *
 * @remarks Written to the response via `c.Data`. `data` accepts a UTF-8
 * string, a Node.js `Buffer`, or an `ArrayBuffer`; the kernel converts all
 * three forms to `[]byte` before writing.
 */
export interface IResponseRawData {
    /** MIME type for the `Content-Type` response header, e.g. `"image/png"`. */
    contentType: string;
    /** Raw response body bytes. */
    data: string | ArrayBuffer;
}

/**
 * A redirect response body.
 *
 * @remarks The kernel issues the redirect via `c.Redirect` using the
 * `statusCode` from the enclosing {@link IHttpResponse}.
 */
export interface IResponseRedirect {
    /** Target URL; may be absolute or relative. */
    location: string;
}

/**
 * A streamed response body with an explicit `Content-Type`.
 *
 * @remarks Chunks are written to the response and flushed as they are read from `stream`, rather
 * than being buffered and sent all at once; each chunk must be a `BufferSource` (an `ArrayBuffer`
 * or a view onto one, e.g. `Uint8Array`) or a string (encoded as UTF-8), the same shape as
 * {@link IFetchResponse.body}'s chunks. If the client disconnects before the stream ends, the
 * kernel cancels its reader instead of letting the handler keep producing chunks nobody reads.
 */
export interface IResponseStream {
    /** MIME type for the `Content-Type` response header, e.g. `"text/event-stream"`. */
    contentType: string;
    /** The stream providing the response body. */
    stream: TReadableStream<TBufferSource | string>;
}

/**
 * The body of an HTTP response returned by a server handler.
 *
 * @remarks Set exactly one field; the kernel inspects `data`, `file`,
 * `string`, `raw`, `redirect`, `proxy`, and `stream` in that order and uses the first
 * non-null value. Returning an empty object (all fields absent or null)
 * results in a status-only response via `c.Status`.
 */
export interface IResponseBody {
    /** Structured data serialized by the kernel (JSON, XML, YAML, …). */
    data?: IResponseSerializedData | null;
    /** File served from the local filesystem. */
    file?: IResponseFile | null;
    /** Formatted string written via `fmt.Sprintf`. */
    string?: IResponseString | null;
    /** Raw bytes with an explicit `Content-Type`. */
    raw?: IResponseRawData | null;
    /** HTTP redirect. */
    redirect?: IResponseRedirect | null;
    /** Response body read incrementally from a {@link IReadableStream}. */
    stream?: IResponseStream | null;
}

/**
 * A `Set-Cookie` descriptor included in an {@link IHttpResponse}.
 *
 * @remarks Field names use PascalCase because they mirror Go's
 * `net/http.Cookie` struct, which has no JSON tags and therefore serializes
 * its exported field names verbatim.
 */
export interface IResponseCookie {
    /** Cookie name. */
    Name: string;
    /** Cookie value. */
    Value: string;
    /** `true` if the value should be wrapped in double-quotes in the header. */
    Quoted?: boolean;
    /** Cookie path scope, e.g. `"/plugin/private/my-plugin/"`. */
    Path?: string;
    /** Cookie domain scope. */
    Domain?: string;
    /** Absolute expiry time as an ISO 8601 string. */
    Expires?: string;
    /** Raw, unparsed `Expires` attribute string (informational). */
    RawExpires?: string;
    /** `Max-Age` in seconds. `0` deletes the cookie; negative values are not sent. */
    MaxAge?: number;
    /** Restricts the cookie to HTTPS connections. */
    Secure?: boolean;
    /** Hides the cookie from JavaScript (`HttpOnly` flag). */
    HttpOnly?: boolean;
    /**
     * `SameSite` cookie policy.
     *
     * @remarks Maps to Go `http.SameSite` constants:
     * `0` = default (browser-defined), `1` = None, `2` = Lax, `3` = Strict.
     */
    SameSite?: number;
    /** Sets the `Partitioned` (CHIPS) cookie attribute. */
    Partitioned?: boolean;
    /** Raw `Set-Cookie` line as sent by the server (informational). */
    Raw?: string;
    /** Unparsed attribute strings not recognized by the Go cookie parser. */
    Unparsed?: string[] | null;
}

/**
 * The return value expected from an HTTP server handler.
 */
export interface IHttpResponse {
    /** HTTP status code to send, e.g. `200`, `404`. */
    statusCode: number;
    /**
     * Additional response headers.
     *
     * @remarks Each header name maps to an array of values to support
     * multi-value headers such as `Link` or repeated `Set-Cookie` entries.
     */
    headers?: Record<string, string[]>;
    /** Cookies to attach to the response via `Set-Cookie` headers. */
    cookies?: IResponseCookie[];
    /** Response body. Omit or set to `null` for a header-only response. */
    body?: IResponseBody | null;
}
