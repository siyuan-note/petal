[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IModel

# Interface: IModel

## Extended by

- [`ICustomModel`](ICustomModel.md)

## Properties

### app

> **app**: [`App`](../classes/App.md)

#### Defined in

[siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264)

---

### parent

> **parent**: `any`

#### Defined in

[siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266)

---

### reqId

> **reqId**: `number`

#### Defined in

[siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265)

---

### send()

> **send**: (`cmd`, `param`, `process`?) => `void`

#### Parameters

| Parameter  | Type                            |
| ---------- | ------------------------------- |
| `cmd`      | `string`                        |
| `param`    | `Record`\<`string`, `unknown`\> |
| `process`? | `boolean`                       |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268)

---

### ws

> **ws**: `WebSocket`

#### Defined in

[siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263)
