[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IUILayoutLayout

# Interface: IUILayoutLayout

SiYuan panel layout

## Properties

### children

> **children**: ([`IUILayoutLayout`](IUILayoutLayout.md) \| [`IUILayoutWnd`](IUILayoutWnd.md))[]

Internal elements

#### Defined in

[types/config.d.ts:1604](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1604)

---

### direction?

> `optional` **direction**: [`TUILayoutDirection`](../type-aliases/TUILayoutDirection.md)

Panel content layout direction

- `tb`: Top and bottom layout
- `lr`: Left and right layout

#### Defined in

[types/config.d.ts:1610](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1610)

---

### instance

> **instance**: `"Layout"`

Object name

#### Defined in

[types/config.d.ts:1614](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1614)

---

### resize?

> `optional` **resize**: [`TUILayoutDirection`](../type-aliases/TUILayoutDirection.md)

The direction in which the size can be adjusted

- `tb`: Can adjust the size up and down
- `lr`: Can adjust the size left and right

#### Defined in

[types/config.d.ts:1620](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1620)

---

### size?

> `optional` **size**: `string`

Panel size

#### Defined in

[types/config.d.ts:1624](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1624)

---

### type?

> `optional` **type**: [`TUILayoutType`](../type-aliases/TUILayoutType.md)

Layout type

- `normal`: Normal panel
- `center`: Center panel
- `top`: Top panel
- `bottom`: Bottom panel
- `left`: Left panel
- `right`: Right panel

#### Defined in

[types/config.d.ts:1634](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1634)
