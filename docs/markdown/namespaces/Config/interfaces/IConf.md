[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IConf

# Interface: IConf

Configuration object

## Properties

| Property         | Type                                                    | Description                                                                | Defined in                                                                                   |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `accessAuthCode` | [`TAccessAuthCode`](../type-aliases/TAccessAuthCode.md) | Access authorization code                                                  | [types/config.d.ts:12](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L12) |
| `account`        | [`IAccount`](IAccount.md)                               | -                                                                          | [types/config.d.ts:13](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L13) |
| `ai`             | [`IAI`](IAI.md)                                         | -                                                                          | [types/config.d.ts:14](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L14) |
| `api`            | [`IAPI`](IAPI.md)                                       | -                                                                          | [types/config.d.ts:15](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L15) |
| `appearance`     | [`IAppearance`](IAppearance.md)                         | -                                                                          | [types/config.d.ts:16](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L16) |
| `bazaar`         | [`IBazaar`](IBazaar.md)                                 | -                                                                          | [types/config.d.ts:17](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L17) |
| `cloudRegion`    | `number`                                                | Cloud Service Provider Region - `0`: Chinese mainland - `1`: North America | [types/config.d.ts:23](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L23) |
| `editor`         | [`IEditor`](IEditor.md)                                 | -                                                                          | [types/config.d.ts:24](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L24) |
| `export`         | [`IExport`](IExport.md)                                 | -                                                                          | [types/config.d.ts:25](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L25) |
| `fileTree`       | [`IFileTree`](IFileTree.md)                             | -                                                                          | [types/config.d.ts:26](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L26) |
| `flashcard`      | [`IFlashCard`](IFlashCard.md)                           | -                                                                          | [types/config.d.ts:27](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L27) |
| `graph`          | [`IGraph`](IGraph.md)                                   | -                                                                          | [types/config.d.ts:28](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L28) |
| `keymap`         | [`IKeymap`](IKeymap.md)                                 | -                                                                          | [types/config.d.ts:29](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L29) |
| `lang`           | [`TLang`](../type-aliases/TLang.md)                     | User interface language Same as [IAppearance.lang](IAppearance.md)         | [types/config.d.ts:34](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L34) |
| `langs`          | [`ILang`](ILang.md)[]                                   | List of supported languages                                                | [types/config.d.ts:38](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L38) |
| `localIPs`       | `string`[]                                              | A list of the IP addresses of the devices on which the kernel resides      | [types/config.d.ts:42](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L42) |
| `logLevel`       | [`TLogLevel`](../type-aliases/TLogLevel.md)             | Log level                                                                  | [types/config.d.ts:46](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L46) |
| `openHelp`       | `boolean`                                               | Whether to open the user guide after startup                               | [types/config.d.ts:50](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L50) |
| `readonly`       | `boolean`                                               | Whether it is running in read-only mode 全局只读                           | [types/config.d.ts:55](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L55) |
| `repo`           | [`IRepo`](IRepo.md)                                     | -                                                                          | [types/config.d.ts:56](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L56) |
| `search`         | [`ISearch`](ISearch.md)                                 | -                                                                          | [types/config.d.ts:57](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L57) |
| `showChangelog`  | `boolean`                                               | Whether to display the changelog for this release version                  | [types/config.d.ts:61](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L61) |
| `snippet`        | [`ISnippet`](ISnippet.md)                               | -                                                                          | [types/config.d.ts:62](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L62) |
| `stat`           | [`IStat`](IStat.md)                                     | -                                                                          | [types/config.d.ts:63](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L63) |
| `sync`           | [`ISync`](ISync.md)                                     | -                                                                          | [types/config.d.ts:64](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L64) |
| `system`         | [`ISystem`](ISystem.md)                                 | -                                                                          | [types/config.d.ts:65](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L65) |
| `tag`            | [`ITag`](ITag.md)                                       | -                                                                          | [types/config.d.ts:66](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L66) |
| `uiLayout`       | [`IUiLayout`](IUiLayout.md)                             | -                                                                          | [types/config.d.ts:67](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L67) |
| `userData`       | `string`                                                | Community user data (Encrypted)                                            | [types/config.d.ts:71](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L71) |
