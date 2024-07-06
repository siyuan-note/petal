[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IDockModel

# Interface: IDockModel

## Extends

- `Omit`\<[`ICustomModel`](ICustomModel.md), `"beforeDestroy"`\>

## Properties

### app

> **app**: [`App`](../classes/App.md)

#### Inherited from

`Omit.app`

#### Defined in

[siyuan.d.ts:264](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L264)

---

### data

> **data**: `any`

#### Inherited from

`Omit.data`

#### Defined in

[siyuan.d.ts:273](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L273)

---

### destroy()?

> `optional` **destroy**: () => `void`

#### Returns

`void`

#### Inherited from

`Omit.destroy`

#### Defined in

[siyuan.d.ts:286](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L286)

---

### editors

> **editors**: [`Protyle`](../classes/Protyle.md)[]

#### Inherited from

`Omit.editors`

#### Defined in

[siyuan.d.ts:276](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L276)

---

### element

> **element**: `HTMLElement`

#### Inherited from

`Omit.element`

#### Defined in

[siyuan.d.ts:275](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L275)

---

### init()

> **init**: () => `void`

#### Returns

`void`

#### Inherited from

`Omit.init`

#### Defined in

[siyuan.d.ts:278](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L278)

---

### parent

> **parent**: `any`

#### Inherited from

`Omit.parent`

#### Defined in

[siyuan.d.ts:266](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L266)

---

### reqId

> **reqId**: `number`

#### Inherited from

`Omit.reqId`

#### Defined in

[siyuan.d.ts:265](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L265)

---

### resize()?

> `optional` **resize**: () => `void`

#### Returns

`void`

#### Inherited from

`Omit.resize`

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

`Omit.send`

#### Defined in

[siyuan.d.ts:268](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L268)

---

### tab

> **tab**: [`ITab`](ITab.md)

#### Inherited from

`Omit.tab`

#### Defined in

[siyuan.d.ts:272](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L272)

---

### type

> **type**: `string`

#### Inherited from

`Omit.type`

#### Defined in

[siyuan.d.ts:274](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L274)

---

### update()?

> `optional` **update**: () => `void`

#### Returns

`void`

#### Inherited from

`Omit.update`

#### Defined in

[siyuan.d.ts:280](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L280)

---

### ws

> **ws**: `WebSocket`

#### Inherited from

`Omit.ws`

#### Defined in

[siyuan.d.ts:263](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L263)
