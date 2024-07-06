[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IFileTree

# Interface: IFileTree

Document tree related configuration

## Properties

### allowCreateDeeper

> **allowCreateDeeper**: `boolean`

Whether to allow the creation of sub-documents deeper than 7 levels

#### Defined in

[types/config.d.ts:529](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L529)

---

### alwaysSelectOpenedFile

> **alwaysSelectOpenedFile**: `boolean`

Whether to automatically locate the currently open document in the document tree

#### Defined in

[types/config.d.ts:533](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L533)

---

### closeTabsOnStart

> **closeTabsOnStart**: `boolean`

Whether to close all tabs when starting

#### Defined in

[types/config.d.ts:537](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L537)

---

### docCreateSaveBox

> **docCreateSaveBox**: `string`

#### Defined in

[types/config.d.ts:559](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L559)

---

### docCreateSavePath

> **docCreateSavePath**: `string`

The storage path of the new document

#### Defined in

[types/config.d.ts:541](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L541)

---

### maxListCount

> **maxListCount**: `number`

The maximum number of documents listed

#### Defined in

[types/config.d.ts:545](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L545)

---

### maxOpenTabCount

> **maxOpenTabCount**: `number`

The maximum number of open tabs

#### Defined in

[types/config.d.ts:549](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L549)

---

### openFilesUseCurrentTab

> **openFilesUseCurrentTab**: `boolean`

Whether to open the file in the current tab

#### Defined in

[types/config.d.ts:553](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L553)

---

### refCreateSaveBox

> **refCreateSaveBox**: `string`

#### Defined in

[types/config.d.ts:558](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L558)

---

### refCreateSavePath

> **refCreateSavePath**: `string`

The storage path of the new document created using block references

#### Defined in

[types/config.d.ts:557](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L557)

---

### removeDocWithoutConfirm

> **removeDocWithoutConfirm**: `boolean`

Close the secondary confirmation when deleting a document

#### Defined in

[types/config.d.ts:563](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L563)

---

### sort

> **sort**: `number`

Document sorting method

- `0`: File name ascending
- `1`: File name descending
- `2`: File update time ascending
- `3`: File update time descending
- `4`: File name natural number ascending
- `5`: File name natural number descending
- `6`: Custom sorting
- `7`: Reference count ascending
- `8`: Reference count descending
- `9`: File creation time ascending
- `10`: File creation time descending
- `11`: File size ascending
- `12`: File size descending
- `13`: Sub-document count ascending
- `14`: Sub-document count descending
- `15`: Use document tree sorting rules
- `256`: Unspecified sorting rules, according to the notebook priority over the document
  tree to obtain sorting rules

#### Defined in

[types/config.d.ts:585](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L585)

---

### useSingleLineSave

> **useSingleLineSave**: `boolean`

Whether to save the content of the .sy file as a single-line JSON object

#### Defined in

[types/config.d.ts:589](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L589)
