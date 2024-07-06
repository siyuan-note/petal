[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / ITabModel

# Interface: ITabModel

## Extends

- [`ICustomModel`](ICustomModel.md)

## Properties

### app

> **app**: [`App`](../classes/App.md)

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`app`](ICustomModel.md#app)

#### Defined in

[siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264)

---

### beforeDestroy()?

> `optional` **beforeDestroy**: () => `void`

#### Returns

`void`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`beforeDestroy`](ICustomModel.md#beforedestroy)

#### Defined in

[siyuan.d.ts:284](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L284)

---

### data

> **data**: `any`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`data`](ICustomModel.md#data)

#### Defined in

[siyuan.d.ts:273](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L273)

---

### destroy()?

> `optional` **destroy**: () => `void`

#### Returns

`void`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`destroy`](ICustomModel.md#destroy)

#### Defined in

[siyuan.d.ts:286](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L286)

---

### editors

> **editors**: [`Protyle`](../classes/Protyle.md)[]

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`editors`](ICustomModel.md#editors)

#### Defined in

[siyuan.d.ts:276](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L276)

---

### element

> **element**: `HTMLElement`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`element`](ICustomModel.md#element)

#### Defined in

[siyuan.d.ts:275](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L275)

---

### init()

> **init**: () => `void`

#### Returns

`void`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`init`](ICustomModel.md#init)

#### Defined in

[siyuan.d.ts:278](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L278)

---

### parent

> **parent**: `any`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`parent`](ICustomModel.md#parent)

#### Defined in

[siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266)

---

### reqId

> **reqId**: `number`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`reqId`](ICustomModel.md#reqid)

#### Defined in

[siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265)

---

### resize()?

> `optional` **resize**: () => `void`

#### Returns

`void`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`resize`](ICustomModel.md#resize)

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

[`ICustomModel`](ICustomModel.md).[`send`](ICustomModel.md#send)

#### Defined in

[siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268)

---

### tab

> **tab**: [`ITab`](ITab.md)

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`tab`](ICustomModel.md#tab)

#### Defined in

[siyuan.d.ts:272](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L272)

---

### type

> **type**: `string`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`type`](ICustomModel.md#type)

#### Defined in

[siyuan.d.ts:274](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L274)

---

### update()?

> `optional` **update**: () => `void`

#### Returns

`void`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`update`](ICustomModel.md#update)

#### Defined in

[siyuan.d.ts:280](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L280)

---

### ws

> **ws**: `WebSocket`

#### Inherited from

[`ICustomModel`](ICustomModel.md).[`ws`](ICustomModel.md#ws)

#### Defined in

[siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263)
