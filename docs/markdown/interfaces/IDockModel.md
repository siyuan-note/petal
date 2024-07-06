[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IDockModel

# Interface: IDockModel

## Extends

- `Omit`\<[`ICustomModel`](ICustomModel.md), `"beforeDestroy"`\>

## Properties

| Property   | Type                                                                                         | Inherited from | Defined in                                                                         |
| ---------- | -------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| `app`      | [`App`](../classes/App.md)                                                                   | `Omit.app`     | [siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264) |
| `data`     | `any`                                                                                        | `Omit.data`    | [siyuan.d.ts:273](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L273) |
| `destroy?` | () => `void`                                                                                 | `Omit.destroy` | [siyuan.d.ts:286](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L286) |
| `editors`  | [`Protyle`](../classes/Protyle.md)[]                                                         | `Omit.editors` | [siyuan.d.ts:276](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L276) |
| `element`  | `HTMLElement`                                                                                | `Omit.element` | [siyuan.d.ts:275](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L275) |
| `init`     | () => `void`                                                                                 | `Omit.init`    | [siyuan.d.ts:278](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L278) |
| `parent`   | `any`                                                                                        | `Omit.parent`  | [siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266) |
| `reqId`    | `number`                                                                                     | `Omit.reqId`   | [siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265) |
| `resize?`  | () => `void`                                                                                 | `Omit.resize`  | [siyuan.d.ts:282](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L282) |
| `send`     | (`cmd`: `string`, `param`: `Record`\<`string`, `unknown`\>, `process`?: `boolean`) => `void` | `Omit.send`    | [siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268) |
| `tab`      | [`ITab`](ITab.md)                                                                            | `Omit.tab`     | [siyuan.d.ts:272](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L272) |
| `type`     | `string`                                                                                     | `Omit.type`    | [siyuan.d.ts:274](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L274) |
| `update?`  | () => `void`                                                                                 | `Omit.update`  | [siyuan.d.ts:280](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L280) |
| `ws`       | `WebSocket`                                                                                  | `Omit.ws`      | [siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263) |
