[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IMenuItemOption

# Interface: IMenuItemOption

## Properties

### accelerator?

> `optional` **accelerator**: `string`

#### Defined in

[siyuan.d.ts:378](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L378)

---

### action?

> `optional` **action**: `string`

#### Defined in

[siyuan.d.ts:379](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L379)

---

### bind()?

> `optional` **bind**: (`element`) => `void`

#### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `element` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:386](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L386)

---

### click()?

> `optional` **click**: (`element`, `event`) => `boolean` \| `void` \| `Promise`\<`boolean` \| `void`\>

#### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `element` | `HTMLElement` |
| `event`   | `MouseEvent`  |

#### Returns

`boolean` \| `void` \| `Promise`\<`boolean` \| `void`\>

#### Defined in

[siyuan.d.ts:373](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L373)

---

### current?

> `optional` **current**: `boolean`

#### Defined in

[siyuan.d.ts:385](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L385)

---

### disabled?

> `optional` **disabled**: `boolean`

#### Defined in

[siyuan.d.ts:382](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L382)

---

### element?

> `optional` **element**: `HTMLElement`

#### Defined in

[siyuan.d.ts:388](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L388)

---

### icon?

> `optional` **icon**: `string`

#### Defined in

[siyuan.d.ts:383](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L383)

---

### iconClass?

> `optional` **iconClass**: `string`

#### Defined in

[siyuan.d.ts:371](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L371)

---

### iconHTML?

> `optional` **iconHTML**: `string`

#### Defined in

[siyuan.d.ts:384](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L384)

---

### id?

> `optional` **id**: `string`

#### Defined in

[siyuan.d.ts:380](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L380)

---

### index?

> `optional` **index**: `number`

#### Defined in

[siyuan.d.ts:387](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L387)

---

### label?

> `optional` **label**: `string`

#### Defined in

[siyuan.d.ts:372](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L372)

---

### submenu?

> `optional` **submenu**: [`IMenuItemOption`](IMenuItemOption.md)[]

#### Defined in

[siyuan.d.ts:381](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L381)

---

### type?

> `optional` **type**: `"readonly"` \| `"separator"` \| `"submenu"`

#### Defined in

[siyuan.d.ts:374](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L374)
