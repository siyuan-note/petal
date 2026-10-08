import type { TBufferSource } from "./crypto";

/** Canonical encoding names reported by {@link ITextDecoder.encoding}. */
export type TTextDecoderEncoding = "utf-8" | "utf-16le" | "utf-16be";

/** Options of the global `TextDecoder` constructor. */
export interface ITextDecoderOptions {
    /**
     * Throw a `TypeError` on malformed input instead of decoding it as U+FFFD.
     *
     * @defaultValue `false`
     */
    fatal?: boolean;
    /**
     * Keep a leading byte order mark in the output instead of removing it.
     *
     * @defaultValue `false`
     */
    ignoreBOM?: boolean;
}

/** Options of {@link ITextDecoder.decode}. */
export interface ITextDecodeOptions {
    /**
     * Hold back an incomplete trailing byte sequence for the next call instead of
     * decoding it as U+FFFD.
     *
     * @defaultValue `false`
     */
    stream?: boolean;
}

/** An encoder created by the global `TextEncoder`. */
export interface ITextEncoder {
    /** Always `"utf-8"`. */
    readonly encoding: "utf-8";
    /**
     * Encodes `input` as UTF-8.
     *
     * @remarks `undefined` and `null` encode as an empty array; lone surrogates encode
     * as U+FFFD.
     */
    encode(input?: string): Uint8Array;
}

/**
 * The global `TextEncoder` constructor of the WHATWG Encoding Standard.
 *
 * @remarks Instances are plain objects carrying their members as own read-only
 * properties, so `instanceof TextEncoder` is `false`. `encodeInto` is not available.
 */
export interface ITextEncoderConstructor {
    new(): ITextEncoder;
}

/** A decoder created by the global `TextDecoder`. */
export interface ITextDecoder {
    /** Canonical name of the encoding selected by the constructor label. */
    readonly encoding: TTextDecoderEncoding;
    /** Whether malformed input throws instead of decoding as U+FFFD. */
    readonly fatal: boolean;
    /** Whether a leading byte order mark is kept in the output. */
    readonly ignoreBOM: boolean;
    /**
     * Decodes `input` and returns the text.
     *
     * @remarks Omitting `input` decodes nothing and flushes the bytes held back by a
     * previous `{ stream: true }` call. With {@link ITextDecoderOptions.fatal}, malformed
     * input throws a `TypeError` and discards the held-back bytes.
     */
    decode(input?: TBufferSource, options?: ITextDecodeOptions): string;
}

/**
 * The global `TextDecoder` constructor of the WHATWG Encoding Standard.
 *
 * @remarks Instances are plain objects carrying their members as own read-only
 * properties, so `instanceof TextDecoder` is `false`.
 */
export interface ITextDecoderConstructor {
    /**
     * @param label - Encoding label, matched case-insensitively after trimming ASCII
     * whitespace; defaults to `"utf-8"`. Only UTF-8 and UTF-16 labels are supported,
     * such as `"utf8"`, `"utf-16"` (little-endian), and `"utf-16be"`; any other label,
     * including valid ones such as `"gbk"`, throws a `RangeError`.
     * @param options - Decoding options.
     */
    new(label?: string, options?: ITextDecoderOptions): ITextDecoder;
}
