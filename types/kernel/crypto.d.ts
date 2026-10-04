/**
 * Binary input accepted by {@link ISubtleCrypto} operations and {@link ITextDecoder.decode}.
 *
 * @remarks {@link ISubtleCrypto} rejects strings and plain arrays with a `TypeError`;
 * encode text yourself, e.g. `new TextEncoder().encode(text)`. The kernel copies the
 * bytes before computing, so modifying the buffer afterwards does not affect the
 * pending operation.
 */
export type TBufferSource = ArrayBuffer | ArrayBufferView;

/** Integer `TypedArray` accepted by {@link ICrypto.getRandomValues}. */
export type TIntegerArray =
    | Int8Array | Uint8Array | Uint8ClampedArray
    | Int16Array | Uint16Array
    | Int32Array | Uint32Array
    | BigInt64Array | BigUint64Array;

/** Digest algorithms defined by the Web Crypto specification. */
export type TStandardHashAlgorithmName = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

/**
 * Digest algorithms the kernel supports beyond the Web Crypto specification.
 *
 * @remarks NOT part of the Web Crypto API. A browser rejects `"MD5"` with
 * `NotSupportedError`, so code using it only runs in the kernel sandbox.
 *
 * MD5 is accepted where a digest acts as a pseudorandom function: by
 * {@link ISubtleCrypto.digest} and as the `hash` of HMAC, HKDF, and PBKDF2. It exists
 * for interoperating with existing systems that cannot be changed. Signature algorithms
 * reject it with `NotSupportedError`, because their security depends on collision
 * resistance and practical MD5 collisions make such signatures forgeable. Do not use it
 * in new designs.
 */
export type TLegacyHashAlgorithmName = "MD5";

/** Digest algorithms supported by the kernel, including the non-standard extension. */
export type THashAlgorithmName = TStandardHashAlgorithmName | TLegacyHashAlgorithmName;

/**
 * Cipher algorithms the kernel supports beyond the Web Crypto specification.
 *
 * @remarks NOT part of the Web Crypto API. A browser rejects `"AES-ECB"` with
 * `NotSupportedError`, so code using it only runs in the kernel sandbox.
 *
 * ECB encrypts every block independently, so identical plaintext blocks yield identical
 * ciphertext blocks and the ciphertext leaks the structure of the plaintext. It takes no
 * IV, which makes encryption deterministic, and it provides no authentication, so
 * tampering is not detected. It exists for decrypting data produced by existing systems.
 * Prefer AES-GCM for anything new.
 *
 * Only `"encrypt"` and `"decrypt"` are permitted. Requesting `"wrapKey"` or
 * `"unwrapKey"` rejects with `SyntaxError`, because wrapping a key under a
 * deterministic, unauthenticated mode would expose the wrapped key's block structure.
 * The kernel applies PKCS#7 padding, matching OpenSSL's default, so ciphertext
 * interoperates with `openssl enc -aes-256-ecb` and Node's `createCipheriv`.
 */
export type TLegacyAlgorithmName = "AES-ECB";

/** Named elliptic curves supported by the kernel. */
export type TNamedCurve = "P-256" | "P-384" | "P-521";

/** Key usages recognized by {@link ISubtleCrypto}. */
export type TKeyUsage =
    | "encrypt" | "decrypt" | "sign" | "verify"
    | "deriveKey" | "deriveBits" | "wrapKey" | "unwrapKey";

/**
 * Key data formats recognized by {@link ISubtleCrypto}.
 *
 * @remarks Which formats an algorithm accepts differs: symmetric and HMAC keys use
 * `"raw"` and `"jwk"`, HKDF and PBKDF2 only `"raw"`, RSA `"spki"` / `"pkcs8"` / `"jwk"`,
 * and the curve algorithms additionally accept `"raw"` for public keys. Requesting an
 * unsupported combination rejects with `NotSupportedError`.
 */
export type TKeyFormat = "raw" | "pkcs8" | "spki" | "jwk";

/** A hash algorithm given either by name or as an object with a `name`. */
export type THashAlgorithmIdentifier = THashAlgorithmName | { name: THashAlgorithmName };

/**
 * An algorithm given either by name or as an object with parameters.
 *
 * @remarks Names are matched case-insensitively; unknown names reject with
 * `NotSupportedError`.
 */
export type TAlgorithmIdentifier = string | IAlgorithmParams;

/** Algorithm parameters; only the members an operation needs are read. */
export interface IAlgorithmParams {
    /**
     * Algorithm name, e.g. `"AES-GCM"`.
     *
     * @remarks Besides the Web Crypto algorithms, the kernel accepts the non-standard
     * `"AES-ECB"`; see {@link TLegacyAlgorithmName}.
     */
    name: string;
    /**
     * Digest algorithm, required by HMAC, RSA, ECDSA, HKDF, and PBKDF2.
     *
     * @remarks Signature algorithms accept only {@link TStandardHashAlgorithmName};
     * passing `"MD5"` to RSA or ECDSA rejects with `NotSupportedError`.
     */
    hash?: THashAlgorithmIdentifier;
    /**
     * Initialization vector for AES-CBC (16 bytes) and AES-GCM.
     *
     * @remarks AES-ECB takes no IV, which is why it is unsafe: the same plaintext
     * always produces the same ciphertext.
     */
    iv?: TBufferSource;
    /** Initial counter block for AES-CTR; must be 16 bytes. */
    counter?: TBufferSource;
    /** Additional authenticated data for AES-GCM. */
    additionalData?: TBufferSource;
    /** Label for RSA-OAEP. */
    label?: TBufferSource;
    /** Salt for HKDF and PBKDF2; required by both and may be empty. */
    salt?: TBufferSource;
    /** Context information for HKDF; required and may be empty. */
    info?: TBufferSource;
    /** Public exponent for RSA key generation; only `65537` is supported. */
    publicExponent?: TBufferSource;
    /**
     * Key length in bits for AES and HMAC; counter length in bits for AES-CTR.
     *
     * @remarks AES keys must be 128, 192, or 256 bits. `generateKey` and `deriveKey`
     * require this member for AES, while `importKey` and `unwrapKey` ignore it and take the
     * length from the key data, so the parameters passed to AES-CTR `encrypt` can be reused
     * for importing. HMAC imports still check it against the key data.
     */
    length?: number;
    /**
     * Authentication tag length in bits for AES-GCM.
     *
     * @remarks The kernel supports 96 to 128 bits. With an IV other than 12 bytes
     * only 128 is available, and 32 or 64 reject with `NotSupportedError`.
     * @defaultValue 128
     */
    tagLength?: number;
    /** Iteration count for PBKDF2; must be greater than zero. */
    iterations?: number;
    /**
     * Salt length in bytes for RSA-PSS.
     *
     * @remarks A value of `0` rejects with `NotSupportedError`.
     */
    saltLength?: number;
    /**
     * Modulus length in bits for RSA key generation.
     *
     * @remarks The kernel requires at least 1024 bits.
     */
    modulusLength?: number;
    /** Named curve for ECDSA and ECDH key generation and import. */
    namedCurve?: TNamedCurve;
    /** The other party's public key for ECDH and X25519 derivation. */
    public?: ICryptoKey;
}

/**
 * A JSON Web Key accepted by {@link ISubtleCrypto.importKey}.
 *
 * @remarks A private key must be consistent with its public members: an EC `d` outside
 * [1, n−1] or not matching `x` and `y`, an OKP `d` not matching `x`, or an inconsistent
 * RSA key rejects with `DataError`. Keys returned by {@link ISubtleCrypto.exportKey} have
 * the narrower shape {@link IExportedJsonWebKey}.
 */
export interface IJsonWebKey {
    kty: string;
    crv?: string;
    alg?: string;
    /**
     * Intended use of the key, `"sig"` or `"enc"`.
     *
     * @remarks When `keyUsages` is not empty, a present value must be `"sig"` for HMAC,
     * RSASSA-PKCS1-v1_5, RSA-PSS, ECDSA, and Ed25519, and `"enc"` for the AES algorithms,
     * RSA-OAEP, ECDH, and X25519; otherwise the import rejects with `DataError`.
     */
    use?: string;
    /**
     * Operations the key may perform.
     *
     * @remarks When present, even as an empty array, it must contain every requested usage
     * and no repeated value, otherwise the import rejects with `DataError`. When absent,
     * it places no restriction on the requested usages.
     */
    key_ops?: TKeyUsage[];
    /**
     * Whether the key may be exported.
     *
     * @remarks `false` rejects an import that requests an extractable key with `DataError`.
     */
    ext?: boolean;
    /** Symmetric key material, base64url-encoded. */
    k?: string;
    /** RSA modulus and exponent, base64url-encoded. */
    n?: string;
    e?: string;
    /** EC and OKP public key coordinates, base64url-encoded. */
    x?: string;
    y?: string;
    /** Private key material, base64url-encoded. */
    d?: string;
    p?: string;
    q?: string;
    dp?: string;
    dq?: string;
    qi?: string;
}

/**
 * A JSON Web Key returned by {@link ISubtleCrypto.exportKey}.
 *
 * @remarks Always carries `key_ops` and `ext`. `key_ops` is an empty array for keys
 * without usages, such as the public half of an ECDH or X25519 pair, and `use` is never
 * set. The result can be passed back to {@link ISubtleCrypto.importKey} unchanged.
 */
export interface IExportedJsonWebKey extends IJsonWebKey {
    key_ops: TKeyUsage[];
    ext: boolean;
}

/**
 * The algorithm a {@link ICryptoKey} was created with.
 *
 * @remarks Only the members that apply to the key's algorithm are present. ECDSA
 * keys carry no `hash`, because the digest belongs to the sign and verify parameters.
 */
export interface IKeyAlgorithm {
    /** Normalized algorithm name, e.g. `"AES-GCM"`. */
    readonly name: string;
    /** Digest algorithm for HMAC and RSA keys. */
    readonly hash?: { readonly name: THashAlgorithmName };
    /** Key length in bits for AES and HMAC keys. */
    readonly length?: number;
    /** Modulus length in bits for RSA keys. */
    readonly modulusLength?: number;
    /** Public exponent for RSA keys. */
    readonly publicExponent?: Uint8Array;
    /** Named curve for ECDSA and ECDH keys. */
    readonly namedCurve?: TNamedCurve;
}

/**
 * An opaque handle to key material held by the kernel.
 *
 * @remarks The key material never enters the plugin runtime; retrieve it with
 * {@link ISubtleCrypto.exportKey}, which requires {@link ICryptoKey.extractable}.
 * All properties are read-only accessors, so the object exposes no own properties:
 * `Object.keys(key)` returns `[]` and `JSON.stringify(key)` returns `{}`. Only keys
 * created by the kernel are accepted; a plain object with the same shape is rejected
 * with a `TypeError`. The handle cannot be frozen or structured-cloned, and persists
 * only for the lifetime of the runtime — to keep a key across restarts, export it
 * and store the result with {@link IStorage.put}.
 */
export interface ICryptoKey {
    /** Which half of a key pair this is, or `"secret"` for symmetric keys. */
    readonly type: "secret" | "public" | "private";
    /** Whether {@link ISubtleCrypto.exportKey} may return the key material. */
    readonly extractable: boolean;
    /** The algorithm and its parameters. */
    readonly algorithm: IKeyAlgorithm;
    /**
     * The operations this key permits.
     *
     * @remarks Using the key for anything else rejects with `InvalidAccessError`.
     * Public keys of ECDH and X25519 carry an empty array, because only the private
     * key derives.
     */
    readonly usages: readonly TKeyUsage[];
}

/** A generated public and private key pair. */
export interface ICryptoKeyPair {
    readonly publicKey: ICryptoKey;
    readonly privateKey: ICryptoKey;
}

/**
 * Cryptographic primitives exposed as `globalThis.crypto.subtle`.
 *
 * @remarks Mirrors the browser `SubtleCrypto` interface, computed by the kernel with
 * Go's standard library. Operations run off the event loop and resolve on it.
 *
 * Rejections carry the error name defined by the Web Crypto specification — for
 * example `NotSupportedError`, `InvalidAccessError`, `DataError`, or `OperationError`
 * — on an `Error` instance. The sandbox has no `DOMException`, so branch on
 * `error.name` rather than `instanceof`. Invalid argument types reject with a
 * `TypeError`.
 *
 * Every method returns a promise and never throws synchronously: an exception raised while
 * the arguments are read, for example by a getter, `valueOf`, or an iterator, rejects the
 * promise with the thrown value itself.
 */
export interface ISubtleCrypto {
    /**
     * Computes a message digest.
     *
     * @remarks Also accepts the non-standard `"MD5"`; see
     * {@link TLegacyHashAlgorithmName}.
     *
     * @param algorithm - One of {@link THashAlgorithmName}.
     * @param data      - The data to hash.
     * @returns The digest as an `ArrayBuffer`.
     */
    digest(algorithm: THashAlgorithmIdentifier, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Encrypts data.
     *
     * @remarks Supports AES-GCM, AES-CBC, AES-CTR, and RSA-OAEP, plus the non-standard
     * AES-ECB; see {@link TLegacyAlgorithmName}. AES-CBC and AES-ECB apply PKCS#7
     * padding. AES-CTR wraps the counter within the low `length` bits and rejects with
     * `DataError` when the counter space is too small for the data.
     */
    encrypt(algorithm: TAlgorithmIdentifier, key: ICryptoKey, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Decrypts data.
     *
     * @remarks Authentication and padding failures reject with `OperationError`
     * without distinguishing the cause.
     */
    decrypt(algorithm: TAlgorithmIdentifier, key: ICryptoKey, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Signs data.
     *
     * @remarks Supports HMAC, RSASSA-PKCS1-v1_5, RSA-PSS, ECDSA, and Ed25519.
     * ECDSA signatures are the fixed-length `r‖s` form, not DER.
     *
     * HMAC accepts `"MD5"` as its `hash`; the signature algorithms reject it with
     * `NotSupportedError`.
     */
    sign(algorithm: TAlgorithmIdentifier, key: ICryptoKey, data: TBufferSource): Promise<ArrayBuffer>;
    /**
     * Verifies a signature.
     *
     * @returns `true` when the signature is valid. A malformed or wrong-length
     * signature resolves with `false` rather than rejecting.
     */
    verify(algorithm: TAlgorithmIdentifier, key: ICryptoKey, signature: TBufferSource,
        data: TBufferSource): Promise<boolean>;
    /**
     * Generates a key or key pair.
     *
     * @param algorithm   - The algorithm and its generation parameters.
     * @param extractable - Whether the key material may be exported. Public keys of a
     *                      generated pair are always extractable.
     * @param keyUsages   - The operations the key may perform. Usages are split between
     *                      the public and private key; at least one private-key usage is
     *                      required, otherwise the call rejects with `SyntaxError`.
     * @returns A single {@link ICryptoKey} for symmetric algorithms, or an
     *          {@link ICryptoKeyPair} for asymmetric ones.
     */
    generateKey(algorithm: TAlgorithmIdentifier, extractable: boolean,
        keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey | ICryptoKeyPair>;
    /**
     * Imports a key from an external format.
     *
     * @remarks A JWK is checked as described on {@link IJsonWebKey}. AES keys take their
     * length from the key data; see {@link IAlgorithmParams.length}.
     *
     * @param format      - See {@link TKeyFormat}.
     * @param keyData     - An {@link IJsonWebKey} when `format` is `"jwk"`, otherwise bytes.
     * @param algorithm   - The algorithm the key is for. ECDSA and ECDH need only
     *                      `namedCurve`; the digest is supplied per operation.
     * @param extractable - Whether the key material may be exported. HKDF and PBKDF2
     *                      keys must not be extractable.
     * @param keyUsages   - The operations the key may perform.
     */
    importKey(format: TKeyFormat, keyData: TBufferSource | IJsonWebKey, algorithm: TAlgorithmIdentifier,
        extractable: boolean, keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey>;
    /**
     * Exports a key's material as a JSON Web Key.
     *
     * @remarks Rejects with `InvalidAccessError` when the key is not extractable.
     * @returns An {@link IExportedJsonWebKey}.
     */
    exportKey(format: "jwk", key: ICryptoKey): Promise<IExportedJsonWebKey>;
    /**
     * Exports a key's material as bytes.
     *
     * @remarks Rejects with `InvalidAccessError` when the key is not extractable,
     * or when the format does not match the key type — `"spki"` and `"raw"` export
     * public keys, `"pkcs8"` private keys.
     * @returns The encoded key as an `ArrayBuffer`.
     */
    exportKey(format: Exclude<TKeyFormat, "jwk">, key: ICryptoKey): Promise<ArrayBuffer>;
    /**
     * Exports a key's material in a format chosen at run time.
     *
     * @returns An {@link IExportedJsonWebKey} when `format` is `"jwk"`, otherwise an
     * `ArrayBuffer`.
     */
    exportKey(format: TKeyFormat, key: ICryptoKey): Promise<ArrayBuffer | IExportedJsonWebKey>;
    /**
     * Derives raw bits from a base key.
     *
     * @param algorithm - HKDF, PBKDF2, ECDH, or X25519 parameters.
     * @param baseKey   - The key to derive from.
     * @param length    - Number of bits to derive; must be a non-zero multiple of 8.
     *                    For ECDH and X25519, `null` returns the full shared secret.
     */
    deriveBits(algorithm: TAlgorithmIdentifier, baseKey: ICryptoKey,
        length?: number | null): Promise<ArrayBuffer>;
    /**
     * Derives a key from a base key.
     *
     * @remarks Derives the bits the target algorithm needs and imports them as a
     * `"raw"` key, so `derivedKeyAlgorithm` must be AES or HMAC.
     */
    deriveKey(algorithm: TAlgorithmIdentifier, baseKey: ICryptoKey,
        derivedKeyAlgorithm: TAlgorithmIdentifier, extractable: boolean,
        keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey>;
    /**
     * Exports a key and encrypts the result.
     *
     * @remarks The wrapping key needs the `wrapKey` usage and the wrapped key must be
     * extractable. Supports AES-KW as well as the AES encryption modes and RSA-OAEP.
     */
    wrapKey(format: TKeyFormat, key: ICryptoKey, wrappingKey: ICryptoKey,
        wrapAlgorithm: TAlgorithmIdentifier): Promise<ArrayBuffer>;
    /**
     * Decrypts a wrapped key and imports it.
     *
     * @remarks The unwrapping key needs the `unwrapKey` usage. A failed integrity
     * check rejects with `OperationError`.
     */
    unwrapKey(format: TKeyFormat, wrappedKey: TBufferSource, unwrappingKey: ICryptoKey,
        unwrapAlgorithm: TAlgorithmIdentifier, unwrappedKeyAlgorithm: TAlgorithmIdentifier,
        extractable: boolean, keyUsages: readonly TKeyUsage[]): Promise<ICryptoKey>;
}

/**
 * Cryptography exposed as `globalThis.crypto`.
 *
 * @remarks Mirrors the browser `Crypto` interface, so code that uses the standard
 * global needs no adapter. The `Crypto`, `SubtleCrypto`, and `CryptoKey` interfaces
 * have no global constructors, so `instanceof` checks against them throw a
 * `ReferenceError`.
 *
 * The kernel additionally accepts two algorithms that the Web Crypto specification does
 * not define, for interoperating with existing systems: see
 * {@link TLegacyHashAlgorithmName} for MD5 and {@link TLegacyAlgorithmName} for AES-ECB.
 * Code that uses either will not run in a browser.
 */
export interface ICrypto {
    /**
     * Fills an integer `TypedArray` with cryptographically strong random values.
     *
     * @remarks Writes in place and returns the same array. Float arrays and
     * `DataView` throw `TypeMismatchError`; more than 65536 bytes throws
     * `QuotaExceededError`.
     */
    getRandomValues<T extends TIntegerArray>(array: T): T;
    /** Returns a randomly generated version 4 UUID. */
    randomUUID(): string;
    /** Low-level cryptographic primitives. */
    readonly subtle: ISubtleCrypto;
}
