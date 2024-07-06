[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IUILayoutWnd

# Interface: IUILayoutWnd

SiYuan window layout

## Properties

| Property   | Type                                                          | Description                                                                                                                        | Defined in                                                                                       |
| ---------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `children` | [`IUILayoutTab`](IUILayoutTab.md)[]                           | Internal elements                                                                                                                  | [types/config.d.ts:1644](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1644) |
| `height?`  | `string`                                                      | Panel height                                                                                                                       | [types/config.d.ts:1648](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1648) |
| `instance` | `"Wnd"`                                                       | Object name                                                                                                                        | [types/config.d.ts:1652](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1652) |
| `resize?`  | [`TUILayoutDirection`](../type-aliases/TUILayoutDirection.md) | The direction in which the size can be adjusted - `tb`: Can adjust the size up and down - `lr`: Can adjust the size left and right | [types/config.d.ts:1658](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1658) |
| `width?`   | `string`                                                      | Panel width                                                                                                                        | [types/config.d.ts:1662](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1662) |
