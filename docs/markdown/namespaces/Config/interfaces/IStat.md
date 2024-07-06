[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IStat

# Interface: IStat

SiYuan workspace content statistics

## Properties

| Property      | Type     | Description                                                                | Defined in                                                                                       |
| ------------- | -------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `assetsSize`  | `number` | Asset file size (unit: bytes)                                              | [types/config.d.ts:1200](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1200) |
| `blockCount`  | `number` | Number of content blocks                                                   | [types/config.d.ts:1204](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1204) |
| `cAssetsSize` | `number` | Size of resource files after chunk encryption (unit: bytes)                | [types/config.d.ts:1208](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1208) |
| `cBlockCount` | `number` | Number of content blocks after chunk encryption                            | [types/config.d.ts:1212](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1212) |
| `cDataSize`   | `number` | Size of the data directory after chunk encryption (unit: bytes)            | [types/config.d.ts:1216](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1216) |
| `cTreeCount`  | `number` | Number of content block trees after chunk encryption (number of documents) | [types/config.d.ts:1220](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1220) |
| `dataSize`    | `number` | Data directory size (unit: bytes)                                          | [types/config.d.ts:1224](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1224) |
| `treeCount`   | `number` | Number of content block trees (number of documents)                        | [types/config.d.ts:1228](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1228) |
