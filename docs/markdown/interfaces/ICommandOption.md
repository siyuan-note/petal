[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / ICommandOption

# Interface: ICommandOption

## Properties

| Property            | Type                                 | Description                                                                                                                                        | Defined in                                                                         |
| ------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `callback?`         | () => `void`                         | -                                                                                                                                                  | [siyuan.d.ts:406](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L406) |
| `customHotkey?`     | `string`                             | -                                                                                                                                                  | [siyuan.d.ts:405](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L405) |
| `dockCallback?`     | (`element`: `HTMLElement`) => `void` | -                                                                                                                                                  | [siyuan.d.ts:410](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L410) |
| `editorCallback?`   | (`protyle`: `any`) => `void`         | -                                                                                                                                                  | [siyuan.d.ts:409](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L409) |
| `fileTreeCallback?` | (`file`: `any`) => `void`            | -                                                                                                                                                  | [siyuan.d.ts:408](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L408) |
| `globalCallback?`   | () => `void`                         | -                                                                                                                                                  | [siyuan.d.ts:407](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L407) |
| `hotkey`            | `string`                             | 目前需使用 MacOS 符号标识，顺序按照 ⌥⇧⌘，入 ⌥⇧⌘A "Ctrl": "⌘", "Shift": "⇧", "Alt": "⌥", "Tab": "⇥", "Backspace": "⌫", "Delete": "⌦", "Enter": "↩", | [siyuan.d.ts:404](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L404) |
| `langKey`           | `string`                             | -                                                                                                                                                  | [siyuan.d.ts:392](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L392) |
| `langText?`         | `string`                             | -                                                                                                                                                  | [siyuan.d.ts:393](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L393) |
