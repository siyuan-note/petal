[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / Dialog

# Class: Dialog

## Constructors

### new Dialog()

> **new Dialog**(`options`): [`Dialog`](Dialog.md)

#### Parameters

| Parameter                   | Type                   |
| --------------------------- | ---------------------- |
| `options`                   | `object`               |
| `options.content`           | `string`               |
| `options.destroyCallback`?  | (`options`?) => `void` |
| `options.disableAnimation`? | `boolean`              |
| `options.disableClose`?     | `boolean`              |
| `options.height`?           | `string`               |
| `options.hideCloseIcon`?    | `boolean`              |
| `options.positionId`?       | `string`               |
| `options.resizeCallback`?   | (`type`) => `void`     |
| `options.title`?            | `string`               |
| `options.transparent`?      | `boolean`              |
| `options.width`?            | `string`               |

#### Returns

[`Dialog`](Dialog.md)

#### Defined in

[siyuan.d.ts:688](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L688)

## Properties

### data

> **data**: `any`

#### Defined in

[siyuan.d.ts:686](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L686)

---

### editors

> **editors**: `object`

#### Index Signature

\[`key`: `string`\]: [`Protyle`](Protyle.md)

#### Defined in

[siyuan.d.ts:685](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L685)

---

### element

> **element**: `HTMLElement`

#### Defined in

[siyuan.d.ts:684](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L684)

## Methods

### bindInput()

> **bindInput**(`inputElement`, `enterEvent`?): `void`

#### Parameters

| Parameter      | Type                                        |
| -------------- | ------------------------------------------- |
| `inputElement` | `HTMLInputElement` \| `HTMLTextAreaElement` |
| `enterEvent`?  | () => `void`                                |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:704](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L704)

---

### destroy()

> **destroy**(`options`?): `void`

#### Parameters

| Parameter  | Type                                  |
| ---------- | ------------------------------------- |
| `options`? | [`IObject`](../interfaces/IObject.md) |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:702](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L702)
