[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / Protyle

# Class: Protyle

## Constructors

### new Protyle()

> **new Protyle**(`app`, `element`, `options`?): [`Protyle`](Protyle.md)

#### Parameters

| Parameter  | Type                                                |
| ---------- | --------------------------------------------------- |
| `app`      | [`App`](App.md)                                     |
| `element`  | `HTMLElement`                                       |
| `options`? | [`IProtyleOption`](../interfaces/IProtyleOption.md) |

#### Returns

[`Protyle`](Protyle.md)

#### Defined in

[types/protyle.d.ts:133](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L133)

## Properties

| Property  | Modifier | Type                                    | Defined in                                                                                       |
| --------- | -------- | --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `protyle` | `public` | [`IProtyle`](../interfaces/IProtyle.md) | [types/protyle.d.ts:131](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L131) |

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:137](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L137)

---

### focusBlock()

> **focusBlock**(`element`, `toStart`?): `false` \| `Range`

#### Parameters

| Parameter  | Type      | Description |
| ---------- | --------- | ----------- |
| `element`  | `Element` | -           |
| `toStart`? | `boolean` |             |

#### Returns

`false` \| `Range`

#### Defined in

[types/protyle.d.ts:176](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L176)

---

### getRange()

> **getRange**(`element`): `Range`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `element` | `Element` |

#### Returns

`Range`

#### Defined in

[types/protyle.d.ts:169](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L169)

---

### hasClosestBlock()

> **hasClosestBlock**(`element`): `false` \| `HTMLElement`

#### Parameters

| Parameter | Type   |
| --------- | ------ |
| `element` | `Node` |

#### Returns

`false` \| `HTMLElement`

#### Defined in

[types/protyle.d.ts:171](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L171)

---

### insert()

> **insert**(`html`, `isBlock`?, `useProtyleRange`?): `void`

#### Parameters

| Parameter          | Type      | Description |
| ------------------ | --------- | ----------- |
| `html`             | `string`  | -           |
| `isBlock`?         | `boolean` |             |
| `useProtyleRange`? | `boolean` |             |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:147](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L147)

---

### isUploading()

> **isUploading**(): `boolean`

#### Returns

`boolean`

#### Defined in

[types/protyle.d.ts:135](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L135)

---

### reload()

> **reload**(`focus`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `focus`   | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:141](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L141)

---

### resize()

> **resize**(): `void`

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:139](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L139)

---

### transaction()

> **transaction**(`doOperations`, `undoOperations`?): `void`

#### Parameters

| Parameter         | Type                                          |
| ----------------- | --------------------------------------------- |
| `doOperations`    | [`IOperation`](../interfaces/IOperation.md)[] |
| `undoOperations`? | [`IOperation`](../interfaces/IOperation.md)[] |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:149](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L149)

---

### turnIntoOneTransaction()

> **turnIntoOneTransaction**(`selectsElement`, `type`, `subType`?): `void`

多个块转换为一个块

#### Parameters

| Parameter        | Type                                                    | Description                            |
| ---------------- | ------------------------------------------------------- | -------------------------------------- |
| `selectsElement` | `Element`[]                                             | -                                      |
| `type`           | [`TTurnIntoOne`](../type-aliases/TTurnIntoOne.md)       | -                                      |
| `subType`?       | [`TTurnIntoOneSub`](../type-aliases/TTurnIntoOneSub.md) | type 为 "BlocksMergeSuperBlock" 时必传 |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:155](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L155)

---

### turnIntoTransaction()

> **turnIntoTransaction**(`nodeElement`?, `type`?, `subType`?): `void`

多个块转换

#### Parameters

| Parameter      | Type                                        | Description                                                          |
| -------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| `nodeElement`? | `Element`                                   | 优先使用包含 protyle-wysiwyg--select 的块，否则使用 nodeElement 单块 |
| `type`?        | [`TTurnInto`](../type-aliases/TTurnInto.md) |                                                                      |
| `subType`?     | `number`                                    | type 为 "Blocks2Hs" 时必传                                           |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:163](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L163)

---

### updateBatchTransaction()

> **updateBatchTransaction**(`nodeElements`, `cb`): `void`

#### Parameters

| Parameter      | Type            |
| -------------- | --------------- |
| `nodeElements` | `Element`[]     |
| `cb`           | (`e`) => `void` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:167](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L167)

---

### updateTransaction()

> **updateTransaction**(`id`, `newHTML`, `html`): `void`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `id`      | `string` |
| `newHTML` | `string` |
| `html`    | `string` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:165](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L165)
