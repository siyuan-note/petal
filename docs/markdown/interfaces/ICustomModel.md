[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / ICustomModel

# Interface: ICustomModel

## Extends

- [`IModel`](IModel.md)

## Extended by

- [`ITabModel`](ITabModel.md)

## Properties

| Property         | Type                                                                                         | Inherited from                 | Defined in                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| `app`            | [`App`](../classes/App.md)                                                                   | [`IModel`](IModel.md).`app`    | [siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264) |
| `beforeDestroy?` | () => `void`                                                                                 | -                              | [siyuan.d.ts:284](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L284) |
| `data`           | `any`                                                                                        | -                              | [siyuan.d.ts:273](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L273) |
| `destroy?`       | () => `void`                                                                                 | -                              | [siyuan.d.ts:286](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L286) |
| `editors`        | [`Protyle`](../classes/Protyle.md)[]                                                         | -                              | [siyuan.d.ts:276](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L276) |
| `element`        | `HTMLElement`                                                                                | -                              | [siyuan.d.ts:275](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L275) |
| `init`           | () => `void`                                                                                 | -                              | [siyuan.d.ts:278](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L278) |
| `parent`         | `any`                                                                                        | [`IModel`](IModel.md).`parent` | [siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266) |
| `reqId`          | `number`                                                                                     | [`IModel`](IModel.md).`reqId`  | [siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265) |
| `resize?`        | () => `void`                                                                                 | -                              | [siyuan.d.ts:282](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L282) |
| `send`           | (`cmd`: `string`, `param`: `Record`\<`string`, `unknown`\>, `process`?: `boolean`) => `void` | [`IModel`](IModel.md).`send`   | [siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268) |
| `tab`            | [`ITab`](ITab.md)                                                                            | -                              | [siyuan.d.ts:272](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L272) |
| `type`           | `string`                                                                                     | -                              | [siyuan.d.ts:274](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L274) |
| `update?`        | () => `void`                                                                                 | -                              | [siyuan.d.ts:280](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L280) |
| `ws`             | `WebSocket`                                                                                  | [`IModel`](IModel.md).`ws`     | [siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263) |
