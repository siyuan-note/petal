[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / ICommandOption

# Interface: ICommandOption

## Properties

### callback()?

> `optional` **callback**: () => `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:406](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L406)

---

### customHotkey?

> `optional` **customHotkey**: `string`

#### Defined in

[siyuan.d.ts:405](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L405)

---

### dockCallback()?

> `optional` **dockCallback**: (`element`) => `void`

#### Parameters

| Parameter | Type          |
| --------- | ------------- |
| `element` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:410](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L410)

---

### editorCallback()?

> `optional` **editorCallback**: (`protyle`) => `void`

#### Parameters

| Parameter | Type  |
| --------- | ----- |
| `protyle` | `any` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:409](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L409)

---

### fileTreeCallback()?

> `optional` **fileTreeCallback**: (`file`) => `void`

#### Parameters

| Parameter | Type  |
| --------- | ----- |
| `file`    | `any` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:408](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L408)

---

### globalCallback()?

> `optional` **globalCallback**: () => `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:407](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L407)

---

### hotkey

> **hotkey**: `string`

目前需使用 MacOS 符号标识，顺序按照 ⌥⇧⌘，入 ⌥⇧⌘A
"Ctrl": "⌘",
"Shift": "⇧",
"Alt": "⌥",
"Tab": "⇥",
"Backspace": "⌫",
"Delete": "⌦",
"Enter": "↩",

#### Defined in

[siyuan.d.ts:404](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L404)

---

### langKey

> **langKey**: `string`

#### Defined in

[siyuan.d.ts:392](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L392)

---

### langText?

> `optional` **langText**: `string`

#### Defined in

[siyuan.d.ts:393](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L393)
