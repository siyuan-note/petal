[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IMenuItemOption

# Interface: IMenuItemOption

## Properties

| Property       | Type                                                                                                         | Defined in                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `accelerator?` | `string`                                                                                                     | [siyuan.d.ts:378](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L378) |
| `action?`      | `string`                                                                                                     | [siyuan.d.ts:379](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L379) |
| `bind?`        | (`element`: `HTMLElement`) => `void`                                                                         | [siyuan.d.ts:386](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L386) |
| `click?`       | (`element`: `HTMLElement`, `event`: `MouseEvent`) => `boolean` \| `void` \| `Promise`\<`boolean` \| `void`\> | [siyuan.d.ts:373](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L373) |
| `current?`     | `boolean`                                                                                                    | [siyuan.d.ts:385](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L385) |
| `disabled?`    | `boolean`                                                                                                    | [siyuan.d.ts:382](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L382) |
| `element?`     | `HTMLElement`                                                                                                | [siyuan.d.ts:388](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L388) |
| `icon?`        | `string`                                                                                                     | [siyuan.d.ts:383](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L383) |
| `iconClass?`   | `string`                                                                                                     | [siyuan.d.ts:371](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L371) |
| `iconHTML?`    | `string`                                                                                                     | [siyuan.d.ts:384](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L384) |
| `id?`          | `string`                                                                                                     | [siyuan.d.ts:380](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L380) |
| `index?`       | `number`                                                                                                     | [siyuan.d.ts:387](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L387) |
| `label?`       | `string`                                                                                                     | [siyuan.d.ts:372](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L372) |
| `submenu?`     | [`IMenuItemOption`](IMenuItemOption.md)[]                                                                    | [siyuan.d.ts:381](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L381) |
| `type?`        | `"readonly"` \| `"separator"` \| `"submenu"`                                                                 | [siyuan.d.ts:374](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L374) |
