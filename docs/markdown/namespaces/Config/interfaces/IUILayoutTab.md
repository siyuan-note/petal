[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IUILayoutTab

# Interface: IUILayoutTab

## Properties

| Property   | Type                                                                                                                                                                                                   | Description                 | Defined in                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------ |
| `active?`  | `boolean`                                                                                                                                                                                              | Whether the tab is active   | [types/config.d.ts:1669](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1669) |
| `children` | ([`IUILayoutTabAsset`](IUILayoutTabAsset.md) \| [`IUILayoutTabBacklink`](IUILayoutTabBacklink.md) \| [`IUILayoutTabCustom`](IUILayoutTabCustom.md) \| [`IUILayoutTabEditor`](IUILayoutTabEditor.md))[] | Tab content                 | [types/config.d.ts:1673](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1673) |
| `docIcon?` | `string`                                                                                                                                                                                               | Tab icon                    | [types/config.d.ts:1677](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1677) |
| `icon?`    | `string`                                                                                                                                                                                               | Icon reference ID           | [types/config.d.ts:1681](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1681) |
| `instance` | `"Tab"`                                                                                                                                                                                                | Object name                 | [types/config.d.ts:1685](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1685) |
| `lang?`    | `string`                                                                                                                                                                                               | Localization field key name | [types/config.d.ts:1689](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1689) |
| `pin?`     | `boolean`                                                                                                                                                                                              | Whether the tab is pinned   | [types/config.d.ts:1693](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1693) |
| `title?`   | `string`                                                                                                                                                                                               | Tab title                   | [types/config.d.ts:1697](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1697) |
