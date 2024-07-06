[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / ISearch

# Interface: ISearch

SiYuan search related configuration

## Properties

| Property                       | Type      | Description                                                                   | Defined in                                                                                       |
| ------------------------------ | --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `alias`                        | `boolean` | Whether to search in block aliases                                            | [types/config.d.ts:1048](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1048) |
| `audioBlock`                   | `boolean` | Whether to search in audio blocks                                             | [types/config.d.ts:1052](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1052) |
| `backlinkMentionAlias`         | `boolean` | Extract backlink mention keywords from block aliases                          | [types/config.d.ts:1056](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1056) |
| `backlinkMentionAnchor`        | `boolean` | Extract backlink mention keywords from block reference anchor text            | [types/config.d.ts:1060](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1060) |
| `backlinkMentionDoc`           | `boolean` | Extract backlink mention keywords from document names                         | [types/config.d.ts:1064](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1064) |
| `backlinkMentionKeywordsLimit` | `number`  | Maximum number of backlink mention keywords                                   | [types/config.d.ts:1068](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1068) |
| `backlinkMentionName`          | `boolean` | Extract backlink mention keywords from block names                            | [types/config.d.ts:1072](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1072) |
| `blockquote`                   | `boolean` | Whether to search quote blocks                                                | [types/config.d.ts:1076](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1076) |
| `caseSensitive`                | `boolean` | Whether to distinguish between uppercase and lowercase letters when searching | [types/config.d.ts:1080](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1080) |
| `codeBlock`                    | `boolean` | Whether to search code blocks                                                 | [types/config.d.ts:1084](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1084) |
| `databaseBlock`                | `boolean` | Whether to search database blocks                                             | [types/config.d.ts:1088](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1088) |
| `document`                     | `boolean` | Whether to search document blocks                                             | [types/config.d.ts:1092](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1092) |
| `embedBlock`                   | `boolean` | Whether to search embedded blocks                                             | [types/config.d.ts:1096](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1096) |
| `heading`                      | `boolean` | Whether to search heading blocks                                              | [types/config.d.ts:1100](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1100) |
| `htmlBlock`                    | `boolean` | Whether to search HTML blocks                                                 | [types/config.d.ts:1104](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1104) |
| `ial`                          | `boolean` | Whether to search block attributes                                            | [types/config.d.ts:1108](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1108) |
| `iframeBlock`                  | `boolean` | Whether to search in iframe blocks                                            | [types/config.d.ts:1112](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1112) |
| `indexAssetPath`               | `boolean` | Whether to search resource file paths                                         | [types/config.d.ts:1116](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1116) |
| `limit`                        | `number`  | Number of search results displayed                                            | [types/config.d.ts:1120](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1120) |
| `list`                         | `boolean` | Whether to search list blocks                                                 | [types/config.d.ts:1124](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1124) |
| `listItem`                     | `boolean` | Whether to search list items                                                  | [types/config.d.ts:1128](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1128) |
| `mathBlock`                    | `boolean` | Whether to search formula blocks                                              | [types/config.d.ts:1132](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1132) |
| `memo`                         | `boolean` | Whether to search block notes                                                 | [types/config.d.ts:1136](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1136) |
| `name`                         | `boolean` | Whether to search block names                                                 | [types/config.d.ts:1140](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1140) |
| `paragraph`                    | `boolean` | Whether to search paragraph blocks                                            | [types/config.d.ts:1144](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1144) |
| `superBlock`                   | `boolean` | Whether to search super blocks                                                | [types/config.d.ts:1148](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1148) |
| `table`                        | `boolean` | Whether to search table blocks                                                | [types/config.d.ts:1152](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1152) |
| `videoBlock`                   | `boolean` | Whether to search in video blocks                                             | [types/config.d.ts:1156](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1156) |
| `virtualRefAlias`              | `boolean` | Whether to get virtual reference keywords from block aliases                  | [types/config.d.ts:1160](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1160) |
| `virtualRefAnchor`             | `boolean` | Whether to get virtual reference keywords from block reference anchor text    | [types/config.d.ts:1164](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1164) |
| `virtualRefDoc`                | `boolean` | Whether to get virtual reference keywords from document names                 | [types/config.d.ts:1168](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1168) |
| `virtualRefName`               | `boolean` | Whether to get virtual reference keywords from block names                    | [types/config.d.ts:1172](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1172) |
| `widgetBlock`                  | `boolean` | Whether to search in widget blocks                                            | [types/config.d.ts:1176](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1176) |
