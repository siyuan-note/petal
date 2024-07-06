[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IProtyle

# Interface: IProtyle

## Properties

| Property                     | Type                                     | Defined in                                                                                       |
| ---------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `app`                        | [`App`](../classes/App.md)               | [types/protyle.d.ts:79](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L79)   |
| `background?`                | `object`                                 | [types/protyle.d.ts:111](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L111) |
| `background.element`         | `HTMLElement`                            | [types/protyle.d.ts:112](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L112) |
| `background.ial`             | `Record`\<`string`, `string`\>           | [types/protyle.d.ts:113](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L113) |
| `background.iconElement`     | `HTMLElement`                            | [types/protyle.d.ts:114](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L114) |
| `background.imgElement`      | `HTMLElement`                            | [types/protyle.d.ts:115](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L115) |
| `background.tagsElement`     | `HTMLElement`                            | [types/protyle.d.ts:116](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L116) |
| `background.transparentData` | `string`                                 | [types/protyle.d.ts:117](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L117) |
| `block`                      | `object`                                 | [types/protyle.d.ts:82](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L82)   |
| `block.action?`              | `string`[]                               | [types/protyle.d.ts:91](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L91)   |
| `block.blockCount?`          | `number`                                 | [types/protyle.d.ts:90](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L90)   |
| `block.id?`                  | `string`                                 | [types/protyle.d.ts:83](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L83)   |
| `block.mode?`                | `number`                                 | [types/protyle.d.ts:89](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L89)   |
| `block.parent2ID?`           | `string`                                 | [types/protyle.d.ts:86](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L86)   |
| `block.parentID?`            | `string`                                 | [types/protyle.d.ts:85](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L85)   |
| `block.rootID?`              | `string`                                 | [types/protyle.d.ts:87](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L87)   |
| `block.scroll?`              | `boolean`                                | [types/protyle.d.ts:84](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L84)   |
| `block.showAll?`             | `boolean`                                | [types/protyle.d.ts:88](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L88)   |
| `breadcrumb?`                | `object`                                 | [types/protyle.d.ts:103](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L103) |
| `breadcrumb.element`         | `HTMLElement`                            | [types/protyle.d.ts:105](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L105) |
| `breadcrumb.id`              | `string`                                 | [types/protyle.d.ts:104](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L104) |
| `contentElement?`            | `HTMLElement`                            | [types/protyle.d.ts:119](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L119) |
| `disabled`                   | `boolean`                                | [types/protyle.d.ts:93](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L93)   |
| `element`                    | `HTMLElement`                            | [types/protyle.d.ts:100](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L100) |
| `getInstance`                | () => [`Protyle`](../classes/Protyle.md) | [types/protyle.d.ts:78](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L78)   |
| `gutter?`                    | `any`                                    | [types/protyle.d.ts:102](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L102) |
| `hint?`                      | `any`                                    | [types/protyle.d.ts:124](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L124) |
| `id`                         | `string`                                 | [types/protyle.d.ts:81](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L81)   |
| `lute?`                      | [`Lute`](../classes/Lute.md)             | [types/protyle.d.ts:121](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L121) |
| `model?`                     | `any`                                    | [types/protyle.d.ts:98](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L98)   |
| `notebookId?`                | `string`                                 | [types/protyle.d.ts:96](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L96)   |
| `options`                    | `any`                                    | [types/protyle.d.ts:120](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L120) |
| `path?`                      | `string`                                 | [types/protyle.d.ts:97](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L97)   |
| `preview?`                   | `any`                                    | [types/protyle.d.ts:123](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L123) |
| `scroll?`                    | `any`                                    | [types/protyle.d.ts:101](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L101) |
| `selectElement?`             | `HTMLElement`                            | [types/protyle.d.ts:94](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L94)   |
| `title?`                     | `object`                                 | [types/protyle.d.ts:107](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L107) |
| `title.editElement`          | `HTMLElement`                            | [types/protyle.d.ts:108](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L108) |
| `title.element`              | `HTMLElement`                            | [types/protyle.d.ts:109](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L109) |
| `toolbar?`                   | [`Toolbar`](../classes/Toolbar.md)       | [types/protyle.d.ts:122](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L122) |
| `transactionTime`            | `number`                                 | [types/protyle.d.ts:80](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L80)   |
| `undo?`                      | `any`                                    | [types/protyle.d.ts:126](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L126) |
| `updated`                    | `boolean`                                | [types/protyle.d.ts:99](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L99)   |
| `upload?`                    | `any`                                    | [types/protyle.d.ts:125](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L125) |
| `ws?`                        | `any`                                    | [types/protyle.d.ts:95](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L95)   |
| `wysiwyg?`                   | `any`                                    | [types/protyle.d.ts:127](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L127) |
