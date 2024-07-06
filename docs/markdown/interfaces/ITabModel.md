[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / ITabModel

# Interface: ITabModel

## Extends

- [`ICustomModel`](ICustomModel.md)

## Properties

| Property         | Type                                                                                         | Inherited from                                    | Defined in                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `app`            | [`App`](../classes/App.md)                                                                   | [`ICustomModel`](ICustomModel.md).`app`           | [siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264) |
| `beforeDestroy?` | () => `void`                                                                                 | [`ICustomModel`](ICustomModel.md).`beforeDestroy` | [siyuan.d.ts:284](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L284) |
| `data`           | `any`                                                                                        | [`ICustomModel`](ICustomModel.md).`data`          | [siyuan.d.ts:273](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L273) |
| `destroy?`       | () => `void`                                                                                 | [`ICustomModel`](ICustomModel.md).`destroy`       | [siyuan.d.ts:286](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L286) |
| `editors`        | [`Protyle`](../classes/Protyle.md)[]                                                         | [`ICustomModel`](ICustomModel.md).`editors`       | [siyuan.d.ts:276](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L276) |
| `element`        | `HTMLElement`                                                                                | [`ICustomModel`](ICustomModel.md).`element`       | [siyuan.d.ts:275](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L275) |
| `init`           | () => `void`                                                                                 | [`ICustomModel`](ICustomModel.md).`init`          | [siyuan.d.ts:278](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L278) |
| `parent`         | `any`                                                                                        | [`ICustomModel`](ICustomModel.md).`parent`        | [siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266) |
| `reqId`          | `number`                                                                                     | [`ICustomModel`](ICustomModel.md).`reqId`         | [siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265) |
| `resize?`        | () => `void`                                                                                 | [`ICustomModel`](ICustomModel.md).`resize`        | [siyuan.d.ts:282](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L282) |
| `send`           | (`cmd`: `string`, `param`: `Record`\<`string`, `unknown`\>, `process`?: `boolean`) => `void` | [`ICustomModel`](ICustomModel.md).`send`          | [siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268) |
| `tab`            | [`ITab`](ITab.md)                                                                            | [`ICustomModel`](ICustomModel.md).`tab`           | [siyuan.d.ts:272](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L272) |
| `type`           | `string`                                                                                     | [`ICustomModel`](ICustomModel.md).`type`          | [siyuan.d.ts:274](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L274) |
| `update?`        | () => `void`                                                                                 | [`ICustomModel`](ICustomModel.md).`update`        | [siyuan.d.ts:280](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L280) |
| `ws`             | `WebSocket`                                                                                  | [`ICustomModel`](ICustomModel.md).`ws`            | [siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263) |
