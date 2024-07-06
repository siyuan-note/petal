[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / Lute

# Class: Lute

## Properties

### Caret

> `static` **Caret**: `string`

#### Defined in

[types/protyle.d.ts:214](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L214)

---

### Version

> `static` **Version**: `string`

#### Defined in

[types/protyle.d.ts:213](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L213)

---

### WalkContinue

> `static` **WalkContinue**: `number`

#### Defined in

[types/protyle.d.ts:212](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L212)

---

### WalkSkipChildren

> `static` **WalkSkipChildren**: `number`

#### Defined in

[types/protyle.d.ts:211](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L211)

---

### WalkStop

> `static` **WalkStop**: `number`

#### Defined in

[types/protyle.d.ts:210](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L210)

## Methods

### BlockDOM2Content()

> **BlockDOM2Content**(`text`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `text`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:234](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L234)

---

### BlockDOM2EscapeMarkerContent()

> **BlockDOM2EscapeMarkerContent**(`text`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `text`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:236](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L236)

---

### BlockDOM2HTML()

> **BlockDOM2HTML**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:312](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L312)

---

### BlockDOM2InlineBlockDOM()

> **BlockDOM2InlineBlockDOM**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:310](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L310)

---

### BlockDOM2Md()

> **BlockDOM2Md**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:260](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L260)

---

### BlockDOM2StdMd()

> **BlockDOM2StdMd**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:262](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L262)

---

### IsValidLinkDest()

> **IsValidLinkDest**(`text`): `boolean`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `text`    | `string` |

#### Returns

`boolean`

#### Defined in

[types/protyle.d.ts:308](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L308)

---

### MarkdownStr()

> **MarkdownStr**(`name`, `md`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `name`    | `string` |
| `md`      | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:306](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L306)

---

### Md2BlockDOM()

> **Md2BlockDOM**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:302](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L302)

---

### PutEmojis()

> **PutEmojis**(`emojis`): `void`

#### Parameters

| Parameter | Type                                  |
| --------- | ------------------------------------- |
| `emojis`  | [`IObject`](../interfaces/IObject.md) |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:298](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L298)

---

### SetBlockRef()

> **SetBlockRef**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:276](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L276)

---

### SetChineseParagraphBeginningSpace()

> **SetChineseParagraphBeginningSpace**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:252](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L252)

---

### SetEmojiSite()

> **SetEmojiSite**(`emojiSite`): `void`

#### Parameters

| Parameter   | Type     |
| ----------- | -------- |
| `emojiSite` | `string` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:296](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L296)

---

### SetFileAnnotationRef()

> **SetFileAnnotationRef**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:246](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L246)

---

### SetFootnotes()

> **SetFootnotes**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:292](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L292)

---

### SetGitConflict()

> **SetGitConflict**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:264](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L264)

---

### SetHeadingAnchor()

> **SetHeadingAnchor**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:280](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L280)

---

### SetHeadingID()

> **SetHeadingID**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:240](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L240)

---

### SetImageLazyLoading()

> **SetImageLazyLoading**(`imagePath`): `void`

#### Parameters

| Parameter   | Type     |
| ----------- | -------- |
| `imagePath` | `string` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:282](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L282)

---

### SetImgPathAllowSpace()

> **SetImgPathAllowSpace**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:256](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L256)

---

### SetIndentCodeBlock()

> **SetIndentCodeBlock**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:288](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L288)

---

### SetInlineMathAllowDigitAfterOpenMarker()

> **SetInlineMathAllowDigitAfterOpenMarker**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:284](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L284)

---

### SetKramdownIAL()

> **SetKramdownIAL**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:258](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L258)

---

### SetLinkRef()

> **SetLinkRef**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:294](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L294)

---

### SetMark()

> **SetMark**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:270](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L270)

---

### SetParagraphBeginningSpace()

> **SetParagraphBeginningSpace**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:290](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L290)

---

### SetProtyleMarkNetImg()

> **SetProtyleMarkNetImg**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:242](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L242)

---

### SetProtyleWYSIWYG()

> **SetProtyleWYSIWYG**(`wysiwyg`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `wysiwyg` | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:304](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L304)

---

### SetRenderListStyle()

> **SetRenderListStyle**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:254](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L254)

---

### SetSanitize()

> **SetSanitize**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:278](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L278)

---

### SetSetext()

> **SetSetext**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:248](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L248)

---

### SetSpellcheck()

> **SetSpellcheck**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:244](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L244)

---

### SetSub()

> **SetSub**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:272](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L272)

---

### SetSup()

> **SetSup**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:274](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L274)

---

### SetSuperBlock()

> **SetSuperBlock**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:266](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L266)

---

### SetTag()

> **SetTag**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:268](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L268)

---

### SetTextMark()

> **SetTextMark**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:238](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L238)

---

### SetToC()

> **SetToC**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:286](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L286)

---

### SetYamlFrontMatter()

> **SetYamlFrontMatter**(`enable`): `void`

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `enable`  | `boolean` |

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:250](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L250)

---

### SpinBlockDOM()

> **SpinBlockDOM**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:300](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L300)

---

### BlockDOM2Content()

> `static` **BlockDOM2Content**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:230](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L230)

---

### EChartsMindmapStr()

> `static` **EChartsMindmapStr**(`text`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `text`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:218](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L218)

---

### EscapeHTMLStr()

> `static` **EscapeHTMLStr**(`str`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `str`     | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:224](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L224)

---

### GetHeadingID()

> `static` **GetHeadingID**(`node`): `string`

#### Parameters

| Parameter | Type                                      |
| --------- | ----------------------------------------- |
| `node`    | [`ILuteNode`](../interfaces/ILuteNode.md) |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:228](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L228)

---

### New()

> `static` **New**(): [`Lute`](Lute.md)

#### Returns

[`Lute`](Lute.md)

#### Defined in

[types/protyle.d.ts:216](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L216)

---

### NewNodeID()

> `static` **NewNodeID**(): `string`

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:220](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L220)

---

### Sanitize()

> `static` **Sanitize**(`html`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `html`    | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:222](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L222)

---

### UnEscapeHTMLStr()

> `static` **UnEscapeHTMLStr**(`str`): `string`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `str`     | `string` |

#### Returns

`string`

#### Defined in

[types/protyle.d.ts:226](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L226)
