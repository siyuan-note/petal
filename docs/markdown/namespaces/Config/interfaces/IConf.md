[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IConf

# Interface: IConf

Configuration object

## Properties

### accessAuthCode

> **accessAuthCode**: [`TAccessAuthCode`](../type-aliases/TAccessAuthCode.md)

Access authorization code

#### Defined in

[types/config.d.ts:12](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L12)

---

### account

> **account**: [`IAccount`](IAccount.md)

#### Defined in

[types/config.d.ts:13](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L13)

---

### ai

> **ai**: [`IAI`](IAI.md)

#### Defined in

[types/config.d.ts:14](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L14)

---

### api

> **api**: [`IAPI`](IAPI.md)

#### Defined in

[types/config.d.ts:15](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L15)

---

### appearance

> **appearance**: [`IAppearance`](IAppearance.md)

#### Defined in

[types/config.d.ts:16](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L16)

---

### bazaar

> **bazaar**: [`IBazaar`](IBazaar.md)

#### Defined in

[types/config.d.ts:17](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L17)

---

### cloudRegion

> **cloudRegion**: `number`

Cloud Service Provider Region

- `0`: Chinese mainland
- `1`: North America

#### Defined in

[types/config.d.ts:23](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L23)

---

### editor

> **editor**: [`IEditor`](IEditor.md)

#### Defined in

[types/config.d.ts:24](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L24)

---

### export

> **export**: [`IExport`](IExport.md)

#### Defined in

[types/config.d.ts:25](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L25)

---

### fileTree

> **fileTree**: [`IFileTree`](IFileTree.md)

#### Defined in

[types/config.d.ts:26](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L26)

---

### flashcard

> **flashcard**: [`IFlashCard`](IFlashCard.md)

#### Defined in

[types/config.d.ts:27](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L27)

---

### graph

> **graph**: [`IGraph`](IGraph.md)

#### Defined in

[types/config.d.ts:28](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L28)

---

### keymap

> **keymap**: [`IKeymap`](IKeymap.md)

#### Defined in

[types/config.d.ts:29](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L29)

---

### lang

> **lang**: [`TLang`](../type-aliases/TLang.md)

User interface language
Same as [IAppearance.lang](IAppearance.md#lang)

#### Defined in

[types/config.d.ts:34](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L34)

---

### langs

> **langs**: [`ILang`](ILang.md)[]

List of supported languages

#### Defined in

[types/config.d.ts:38](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L38)

---

### localIPs

> **localIPs**: `string`[]

A list of the IP addresses of the devices on which the kernel resides

#### Defined in

[types/config.d.ts:42](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L42)

---

### logLevel

> **logLevel**: [`TLogLevel`](../type-aliases/TLogLevel.md)

Log level

#### Defined in

[types/config.d.ts:46](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L46)

---

### openHelp

> **openHelp**: `boolean`

Whether to open the user guide after startup

#### Defined in

[types/config.d.ts:50](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L50)

---

### readonly

> **readonly**: `boolean`

Whether it is running in read-only mode
全局只读

#### Defined in

[types/config.d.ts:55](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L55)

---

### repo

> **repo**: [`IRepo`](IRepo.md)

#### Defined in

[types/config.d.ts:56](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L56)

---

### search

> **search**: [`ISearch`](ISearch.md)

#### Defined in

[types/config.d.ts:57](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L57)

---

### showChangelog

> **showChangelog**: `boolean`

Whether to display the changelog for this release version

#### Defined in

[types/config.d.ts:61](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L61)

---

### snippet

> **snippet**: [`ISnippet`](ISnippet.md)

#### Defined in

[types/config.d.ts:62](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L62)

---

### stat

> **stat**: [`IStat`](IStat.md)

#### Defined in

[types/config.d.ts:63](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L63)

---

### sync

> **sync**: [`ISync`](ISync.md)

#### Defined in

[types/config.d.ts:64](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L64)

---

### system

> **system**: [`ISystem`](ISystem.md)

#### Defined in

[types/config.d.ts:65](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L65)

---

### tag

> **tag**: [`ITag`](ITag.md)

#### Defined in

[types/config.d.ts:66](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L66)

---

### uiLayout

> **uiLayout**: [`IUiLayout`](IUiLayout.md)

#### Defined in

[types/config.d.ts:67](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L67)

---

### userData

> **userData**: `string`

Community user data (Encrypted)

#### Defined in

[types/config.d.ts:71](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L71)
