[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IProtyleOption

# Interface: IProtyleOption

## Properties

| Property                    | Type                                                      | Defined in                                                                                     |
| --------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `action?`                   | [`TProtyleAction`](../type-aliases/TProtyleAction.md)[]   | [types/protyle.d.ts:47](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L47) |
| `after?`                    | (`protyle`: [`Protyle`](../classes/Protyle.md)) => `void` | [types/protyle.d.ts:73](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L73) |
| `blockId?`                  | `string`                                                  | [types/protyle.d.ts:50](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L50) |
| `defId?`                    | `string`                                                  | [types/protyle.d.ts:62](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L62) |
| `key?`                      | `string`                                                  | [types/protyle.d.ts:51](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L51) |
| `mode?`                     | [`TEditorMode`](../type-aliases/TEditorMode.md)           | [types/protyle.d.ts:48](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L48) |
| `render?`                   | `object`                                                  | [types/protyle.d.ts:63](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L63) |
| `render.background?`        | `boolean`                                                 | [types/protyle.d.ts:64](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L64) |
| `render.breadcrumb?`        | `boolean`                                                 | [types/protyle.d.ts:68](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L68) |
| `render.breadcrumbDocName?` | `boolean`                                                 | [types/protyle.d.ts:69](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L69) |
| `render.gutter?`            | `boolean`                                                 | [types/protyle.d.ts:66](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L66) |
| `render.scroll?`            | `boolean`                                                 | [types/protyle.d.ts:67](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L67) |
| `render.title?`             | `boolean`                                                 | [types/protyle.d.ts:65](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L65) |
| `scrollAttr?`               | `object`                                                  | [types/protyle.d.ts:52](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L52) |
| `scrollAttr.endId`          | `string`                                                  | [types/protyle.d.ts:55](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L55) |
| `scrollAttr.focusEnd?`      | `number`                                                  | [types/protyle.d.ts:59](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L59) |
| `scrollAttr.focusId?`       | `string`                                                  | [types/protyle.d.ts:57](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L57) |
| `scrollAttr.focusStart?`    | `number`                                                  | [types/protyle.d.ts:58](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L58) |
| `scrollAttr.rootId`         | `string`                                                  | [types/protyle.d.ts:53](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L53) |
| `scrollAttr.scrollTop`      | `number`                                                  | [types/protyle.d.ts:56](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L56) |
| `scrollAttr.startId`        | `string`                                                  | [types/protyle.d.ts:54](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L54) |
| `scrollAttr.zoomInId?`      | `string`                                                  | [types/protyle.d.ts:60](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L60) |
| `toolbar?`                  | (`string` \| [`IToolbarItem`](IToolbarItem.md))[]         | [types/protyle.d.ts:49](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L49) |
| `typewriterMode?`           | `boolean`                                                 | [types/protyle.d.ts:71](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L71) |
