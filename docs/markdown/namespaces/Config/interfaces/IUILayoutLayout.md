[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IUILayoutLayout

# Interface: IUILayoutLayout

SiYuan panel layout

## Properties

| Property     | Type                                                                             | Description                                                                                                                                           | Defined in                                                                                       |
| ------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `children`   | ([`IUILayoutLayout`](IUILayoutLayout.md) \| [`IUILayoutWnd`](IUILayoutWnd.md))[] | Internal elements                                                                                                                                     | [types/config.d.ts:1604](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1604) |
| `direction?` | [`TUILayoutDirection`](../type-aliases/TUILayoutDirection.md)                    | Panel content layout direction - `tb`: Top and bottom layout - `lr`: Left and right layout                                                            | [types/config.d.ts:1610](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1610) |
| `instance`   | `"Layout"`                                                                       | Object name                                                                                                                                           | [types/config.d.ts:1614](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1614) |
| `resize?`    | [`TUILayoutDirection`](../type-aliases/TUILayoutDirection.md)                    | The direction in which the size can be adjusted - `tb`: Can adjust the size up and down - `lr`: Can adjust the size left and right                    | [types/config.d.ts:1620](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1620) |
| `size?`      | `string`                                                                         | Panel size                                                                                                                                            | [types/config.d.ts:1624](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1624) |
| `type?`      | [`TUILayoutType`](../type-aliases/TUILayoutType.md)                              | Layout type - `normal`: Normal panel - `center`: Center panel - `top`: Top panel - `bottom`: Bottom panel - `left`: Left panel - `right`: Right panel | [types/config.d.ts:1634](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1634) |
