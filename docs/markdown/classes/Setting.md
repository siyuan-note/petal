[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / Setting

# Class: Setting

## Constructors

### new Setting()

> **new Setting**(`options`): [`Setting`](Setting.md)

#### Parameters

| Parameter                  | Type         |
| -------------------------- | ------------ |
| `options`                  | `object`     |
| `options.confirmCallback`? | () => `void` |
| `options.destroyCallback`? | () => `void` |
| `options.height`?          | `string`     |
| `options.width`?           | `string`     |

#### Returns

[`Setting`](Setting.md)

#### Defined in

[siyuan.d.ts:643](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L643)

## Methods

### addItem()

> **addItem**(`options`): `void`

#### Parameters

| Parameter                      | Type                  |
| ------------------------------ | --------------------- |
| `options`                      | `object`              |
| `options.actionElement`?       | `HTMLElement`         |
| `options.createActionElement`? | () => `HTMLElement`   |
| `options.description`?         | `string`              |
| `options.direction`?           | `"column"` \| `"row"` |
| `options.title`                | `string`              |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:650](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L650)

---

### open()

> **open**(`name`): `void`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `name`    | `string` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:658](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L658)
