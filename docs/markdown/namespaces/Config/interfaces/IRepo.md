[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IRepo

# Interface: IRepo

Snapshot repository related configuration

## Properties

### key

> **key**: `string`

Snapshot encryption key (base64 encoded 256-bit key)

#### Defined in

[types/config.d.ts:1033](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1033)

---

### syncIndexTiming

> **syncIndexTiming**: `number`

Synchronous index timing, if it exceeds this time, the user is prompted that the index
performance is degraded (unit: milliseconds)

#### Defined in

[types/config.d.ts:1038](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1038)
