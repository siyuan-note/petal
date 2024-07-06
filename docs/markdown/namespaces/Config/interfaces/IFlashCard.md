[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IFlashCard

# Interface: IFlashCard

Flashcard related configuration

## Properties

| Property           | Type      | Description                                                                            | Defined in                                                                                     |
| ------------------ | --------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `deck`             | `boolean` | Whether to enable deck card making                                                     | [types/config.d.ts:599](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L599) |
| `heading`          | `boolean` | Whether to enable heading block card making                                            | [types/config.d.ts:603](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L603) |
| `list`             | `boolean` | Whether to enable list block card making                                               | [types/config.d.ts:607](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L607) |
| `mark`             | `boolean` | Whether to enable mark element card making                                             | [types/config.d.ts:611](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L611) |
| `maximumInterval`  | `number`  | Maximum interval days                                                                  | [types/config.d.ts:615](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L615) |
| `newCardLimit`     | `number`  | New card limit                                                                         | [types/config.d.ts:619](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L619) |
| `requestRetention` | `number`  | FSRS request retention parameter                                                       | [types/config.d.ts:623](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L623) |
| `reviewCardLimit`  | `number`  | Review card limit                                                                      | [types/config.d.ts:627](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L627) |
| `reviewMode`       | `number`  | Review mode - `0`: New and old mixed - `1`: New card priority - `2`: Old card priority | [types/config.d.ts:634](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L634) |
| `superBlock`       | `boolean` | Whether to enable super block card making                                              | [types/config.d.ts:638](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L638) |
| `weights`          | `string`  | FSRS weight parameter list                                                             | [types/config.d.ts:642](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L642) |
