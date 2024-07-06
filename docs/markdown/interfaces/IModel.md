[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IModel

# Interface: IModel

## Extended by

- [`ICustomModel`](ICustomModel.md)

## Properties

| Property | Type                                                                                         | Defined in                                                                         |
| -------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `app`    | [`App`](../classes/App.md)                                                                   | [siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264) |
| `parent` | `any`                                                                                        | [siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266) |
| `reqId`  | `number`                                                                                     | [siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265) |
| `send`   | (`cmd`: `string`, `param`: `Record`\<`string`, `unknown`\>, `process`?: `boolean`) => `void` | [siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268) |
| `ws`     | `WebSocket`                                                                                  | [siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263) |
