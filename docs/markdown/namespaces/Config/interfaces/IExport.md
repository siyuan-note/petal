[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IExport

# Interface: IExport

SiYuan export related configuration

## Properties

### addTitle

> **addTitle**: `boolean`

Add article title (insert the article title as a first-level title at the beginning of
the document)

#### Defined in

[types/config.d.ts:444](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L444)

---

### blockEmbedMode

> **blockEmbedMode**: `number`

Embedded block export mode

- `0`: Original block content
- `1`: Quotation block

#### Defined in

[types/config.d.ts:450](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L450)

---

### blockRefMode

> **blockRefMode**: `number`

Content block reference export mode

- `0`: Original text (deprecated)
- `1`: Quotation block (deprecated)
- `2`: Anchor text block link
- `3`: Anchor text only
- `4`: Footnote
- `5`: Anchor hash

#### Defined in

[types/config.d.ts:460](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L460)

---

### blockRefTextLeft

> **blockRefTextLeft**: `string`

The symbol on the left side of the block reference anchor text during export

#### Defined in

[types/config.d.ts:464](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L464)

---

### blockRefTextRight

> **blockRefTextRight**: `string`

The symbol on the right side of the block reference anchor text during export

#### Defined in

[types/config.d.ts:468](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L468)

---

### docxTemplate

> **docxTemplate**: `string`

The path of the template file used when exporting to Docx

#### Defined in

[types/config.d.ts:472](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L472)

---

### fileAnnotationRefMode

> **fileAnnotationRefMode**: `number`

File annotation reference export mode

- `0`: File name - page number - anchor text
- `1`: Anchor text only

#### Defined in

[types/config.d.ts:478](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L478)

---

### imageWatermarkDesc

> **imageWatermarkDesc**: `string`

Custom watermark position, size, style, etc. when exporting to an image

#### Defined in

[types/config.d.ts:482](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L482)

---

### imageWatermarkStr

> **imageWatermarkStr**: `string`

The watermark text or watermark file path used when exporting to an image

#### Defined in

[types/config.d.ts:486](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L486)

---

### markdownYFM

> **markdownYFM**: `boolean`

Whether to add YAML Front Matter when exporting to Markdown

#### Defined in

[types/config.d.ts:490](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L490)

---

### pandocBin

> **pandocBin**: `string`

Pandoc executable file path

#### Defined in

[types/config.d.ts:494](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L494)

---

### paragraphBeginningSpace

> **paragraphBeginningSpace**: `boolean`

Whether the beginning of the paragraph is empty two spaces.
Insert two full-width spaces `U+3000` at the beginning of the paragraph.

#### Defined in

[types/config.d.ts:499](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L499)

---

### pdfFooter

> **pdfFooter**: `string`

Custom footer content when exporting to PDF

#### Defined in

[types/config.d.ts:503](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L503)

---

### pdfWatermarkDesc

> **pdfWatermarkDesc**: `string`

Custom watermark position, size, style, etc. when exporting to PDF

#### Defined in

[types/config.d.ts:507](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L507)

---

### pdfWatermarkStr

> **pdfWatermarkStr**: `string`

The watermark text or watermark file path used when exporting to PDF

#### Defined in

[types/config.d.ts:511](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L511)

---

### tagCloseMarker

> **tagCloseMarker**: `string`

Tag close marker symbol

#### Defined in

[types/config.d.ts:515](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L515)

---

### tagOpenMarker

> **tagOpenMarker**: `string`

Tag start marker symbol

#### Defined in

[types/config.d.ts:519](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L519)
