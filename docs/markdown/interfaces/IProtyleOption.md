[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IProtyleOption

# Interface: IProtyleOption

## Properties

### action?

> `optional` **action**: [`TProtyleAction`](../type-aliases/TProtyleAction.md)[]

#### Defined in

[types/protyle.d.ts:47](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L47)

---

### after()?

> `optional` **after**: (`protyle`) => `void`

#### Parameters

| Parameter | Type                               |
| --------- | ---------------------------------- |
| `protyle` | [`Protyle`](../classes/Protyle.md) |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:73](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L73)

---

### blockId?

> `optional` **blockId**: `string`

#### Defined in

[types/protyle.d.ts:50](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L50)

---

### defId?

> `optional` **defId**: `string`

#### Defined in

[types/protyle.d.ts:62](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L62)

---

### key?

> `optional` **key**: `string`

#### Defined in

[types/protyle.d.ts:51](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L51)

---

### mode?

> `optional` **mode**: [`TEditorMode`](../type-aliases/TEditorMode.md)

#### Defined in

[types/protyle.d.ts:48](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L48)

---

### render?

> `optional` **render**: `object`

#### background?

> `optional` **background**: `boolean`

#### breadcrumb?

> `optional` **breadcrumb**: `boolean`

#### breadcrumbDocName?

> `optional` **breadcrumbDocName**: `boolean`

#### gutter?

> `optional` **gutter**: `boolean`

#### scroll?

> `optional` **scroll**: `boolean`

#### title?

> `optional` **title**: `boolean`

#### Defined in

[types/protyle.d.ts:63](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L63)

---

### scrollAttr?

> `optional` **scrollAttr**: `object`

#### endId

> **endId**: `string`

#### focusEnd?

> `optional` **focusEnd**: `number`

#### focusId?

> `optional` **focusId**: `string`

#### focusStart?

> `optional` **focusStart**: `number`

#### rootId

> **rootId**: `string`

#### scrollTop

> **scrollTop**: `number`

#### startId

> **startId**: `string`

#### zoomInId?

> `optional` **zoomInId**: `string`

#### Defined in

[types/protyle.d.ts:52](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L52)

---

### toolbar?

> `optional` **toolbar**: (`string` \| [`IToolbarItem`](IToolbarItem.md))[]

#### Defined in

[types/protyle.d.ts:49](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L49)

---

### typewriterMode?

> `optional` **typewriterMode**: `boolean`

#### Defined in

[types/protyle.d.ts:71](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L71)
