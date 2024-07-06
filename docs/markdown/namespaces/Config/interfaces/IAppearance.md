[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IAppearance

# Interface: IAppearance

SiYuan appearance related configuration

## Properties

| Property              | Type                                | Description                                                              | Defined in                                                                                     |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `closeButtonBehavior` | `number`                            | Close button behavior - `0`: Exit application - `1`: Minimize to pallets | [types/config.d.ts:180](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L180) |
| `codeBlockThemeDark`  | `string`                            | Dark code block theme                                                    | [types/config.d.ts:184](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L184) |
| `codeBlockThemeLight` | `string`                            | Light code block theme                                                   | [types/config.d.ts:188](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L188) |
| `darkThemes`          | `string`[]                          | List of installed dark themes                                            | [types/config.d.ts:192](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L192) |
| `hideStatusBar`       | `boolean`                           | Whether to hide status bar                                               | [types/config.d.ts:196](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L196) |
| `icon`                | `string`                            | The name of the icon currently in use                                    | [types/config.d.ts:200](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L200) |
| `iconVer`             | `string`                            | The version number of the icon currently in use                          | [types/config.d.ts:208](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L208) |
| `icons`               | `string`[]                          | List of installed icon names                                             | [types/config.d.ts:204](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L204) |
| `lang`                | [`TLang`](../type-aliases/TLang.md) | The language used by the current user                                    | [types/config.d.ts:212](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L212) |
| `lightThemes`         | `string`[]                          | List of installed light themes                                           | [types/config.d.ts:216](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L216) |
| `mode`                | `number`                            | The current theme mode - `0`: Light theme - `1`: Dark theme              | [types/config.d.ts:222](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L222) |
| `modeOS`              | `boolean`                           | Whether the theme mode follows the system theme                          | [types/config.d.ts:226](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L226) |
| `themeDark`           | `string`                            | The name of the dark theme currently in use                              | [types/config.d.ts:230](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L230) |
| `themeJS`             | `boolean`                           | Whether the current theme has enabled theme JavaScript                   | [types/config.d.ts:234](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L234) |
| `themeLight`          | `string`                            | The name of the light theme currently in use                             | [types/config.d.ts:238](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L238) |
| `themeVer`            | `string`                            | The version number of the theme currently in use                         | [types/config.d.ts:242](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L242) |
