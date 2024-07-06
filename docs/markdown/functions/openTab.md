[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / openTab

# Function: openTab()

> **openTab**(`options`): `Promise`\<[`ITab`](../interfaces/ITab.md)\>

## Parameters

| Parameter                   | Type                                                    |
| --------------------------- | ------------------------------------------------------- |
| `options`                   | `object`                                                |
| `options.afterOpen`?        | () => `void`                                            |
| `options.app`               | [`App`](../classes/App.md)                              |
| `options.asset`?            | `object`                                                |
| `options.asset.path`        | `string`                                                |
| `options.card`?             | `object`                                                |
| `options.card.id`?          | `string`                                                |
| `options.card.title`?       | `string`                                                |
| `options.card.type`         | [`TCardType`](../type-aliases/TCardType.md)             |
| `options.custom`?           | `object`                                                |
| `options.custom.data`?      | `any`                                                   |
| `options.custom.icon`       | `string`                                                |
| `options.custom.id`         | `string`                                                |
| `options.custom.title`      | `string`                                                |
| `options.doc`?              | `object`                                                |
| `options.doc.action`?       | [`TProtyleAction`](../type-aliases/TProtyleAction.md)[] |
| `options.doc.id`            | `string`                                                |
| `options.doc.zoomIn`?       | `boolean`                                               |
| `options.keepCursor`?       | `boolean`                                               |
| `options.pdf`?              | `object`                                                |
| `options.pdf.id`?           | `string`                                                |
| `options.pdf.page`?         | `number`                                                |
| `options.pdf.path`          | `string`                                                |
| `options.position`?         | `"right"` \| `"bottom"`                                 |
| `options.removeCurrentTab`? | `boolean`                                               |
| `options.search`?           | [`ISearchOption`](../interfaces/ISearchOption.md)       |

## Returns

`Promise`\<[`ITab`](../interfaces/ITab.md)\>

## Defined in

[siyuan.d.ts:470](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L470)
