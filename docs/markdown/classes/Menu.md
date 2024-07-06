[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / Menu

# Class: Menu

## Constructors

### new Menu()

> **new Menu**(`id`?, `closeCallback`?): [`Menu`](Menu.md)

#### Parameters

| Parameter        | Type         |
| ---------------- | ------------ |
| `id`?            | `string`     |
| `closeCallback`? | () => `void` |

#### Returns

[`Menu`](Menu.md)

#### Defined in

[siyuan.d.ts:708](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L708)

## Properties

| Property  | Type          | Defined in                                                                         |
| --------- | ------------- | ---------------------------------------------------------------------------------- |
| `element` | `HTMLElement` | [siyuan.d.ts:710](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L710) |

## Methods

### addItem()

> **addItem**(`options`): `HTMLElement`

#### Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `options` | [`IMenuItemOption`](../interfaces/IMenuItemOption.md) |

#### Returns

`HTMLElement`

#### Defined in

[siyuan.d.ts:714](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L714)

---

### addSeparator()

> **addSeparator**(`index`?): `void`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `index`?  | `number` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:716](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L716)

---

### close()

> **close**(): `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:725](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L725)

---

### fullscreen()

> **fullscreen**(`position`?): `void`

#### Parameters

| Parameter   | Type                  | Description |
| ----------- | --------------------- | ----------- |
| `position`? | `"bottom"` \| `"all"` |             |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:723](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L723)

---

### open()

> **open**(`options`): `void`

#### Parameters

| Parameter         | Type      |
| ----------------- | --------- |
| `options`         | `object`  |
| `options.h`?      | `number`  |
| `options.isLeft`? | `boolean` |
| `options.w`?      | `number`  |
| `options.x`       | `number`  |
| `options.y`       | `number`  |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:718](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L718)

---

### showSubMenu()

> **showSubMenu**(`subMenuElement`): `void`

#### Parameters

| Parameter        | Type          |
| ---------------- | ------------- |
| `subMenuElement` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:712](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L712)
