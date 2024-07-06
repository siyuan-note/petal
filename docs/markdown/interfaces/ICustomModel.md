[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / ICustomModel

# Interface: ICustomModel

## Extends

- [`IModel`](IModel.md)

## Extended by

- [`ITabModel`](ITabModel.md)

## Properties

### app

> **app**: [`App`](../classes/App.md)

#### Inherited from

[`IModel`](IModel.md).[`app`](IModel.md#app)

#### Defined in

[siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264)

---

### beforeDestroy()?

> `optional` **beforeDestroy**: () => `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:284](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L284)

---

### data

> **data**: `any`

#### Defined in

[siyuan.d.ts:273](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L273)

---

### destroy()?

> `optional` **destroy**: () => `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:286](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L286)

---

### editors

> **editors**: [`Protyle`](../classes/Protyle.md)[]

#### Defined in

[siyuan.d.ts:276](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L276)

---

### element

> **element**: `HTMLElement`

#### Defined in

[siyuan.d.ts:275](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L275)

---

### init()

> **init**: () => `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:278](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L278)

---

### parent

> **parent**: `any`

#### Inherited from

[`IModel`](IModel.md).[`parent`](IModel.md#parent)

#### Defined in

[siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266)

---

### reqId

> **reqId**: `number`

#### Inherited from

[`IModel`](IModel.md).[`reqId`](IModel.md#reqid)

#### Defined in

[siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265)

---

### resize()?

> `optional` **resize**: () => `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:282](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L282)

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

#### Inherited from

[`IModel`](IModel.md).[`send`](IModel.md#send)

#### Defined in

[siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268)

---

### tab

> **tab**: [`ITab`](ITab.md)

#### Defined in

[siyuan.d.ts:272](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L272)

---

### type

> **type**: `string`

#### Defined in

[siyuan.d.ts:274](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L274)

---

### update()?

> `optional` **update**: () => `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:280](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L280)

---

### ws

> **ws**: `WebSocket`

#### Inherited from

[`IModel`](IModel.md).[`ws`](IModel.md#ws)

#### Defined in

[siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263)
