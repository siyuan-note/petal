[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / ISync

# Interface: ISync

SiYuan synchronization related configuration

## Properties

| Property              | Type                            | Description                                                                                                                                                                                | Defined in                                                                                       |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `cloudName`           | `string`                        | Cloud workspace name                                                                                                                                                                       | [types/config.d.ts:1238](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1238) |
| `enabled`             | `boolean`                       | Whether to enable synchronization                                                                                                                                                          | [types/config.d.ts:1242](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1242) |
| `generateConflictDoc` | `boolean`                       | Whether to create a conflict document when a conflict occurs during synchronization                                                                                                        | [types/config.d.ts:1246](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1246) |
| `mode`                | `number`                        | Synchronization mode - `0`: Not set - `1`: Automatic synchronization - `2`: Manual synchronization - `3`: Completely manual synchronization                                                | [types/config.d.ts:1254](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1254) |
| `perception`          | `boolean`                       | Whether to enable synchronization perception                                                                                                                                               | [types/config.d.ts:1258](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1258) |
| `provider`            | `number`                        | Cloud storage service provider - `0`: SiYuan official cloud storage service - `2`: Object storage service compatible with S3 protocol - `3`: Network storage service using WebDAV protocol | [types/config.d.ts:1265](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1265) |
| `s3`                  | [`ISyncS3`](ISyncS3.md)         | -                                                                                                                                                                                          | [types/config.d.ts:1266](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1266) |
| `stat`                | `string`                        | The prompt information of the last synchronization                                                                                                                                         | [types/config.d.ts:1270](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1270) |
| `synced`              | `number`                        | The time of the last synchronization (Unix timestamp)                                                                                                                                      | [types/config.d.ts:1274](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1274) |
| `webdav`              | [`ISyncWebDAV`](ISyncWebDAV.md) | -                                                                                                                                                                                          | [types/config.d.ts:1275](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1275) |
