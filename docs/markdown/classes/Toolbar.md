[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / Toolbar

# Class: Toolbar

## Constructors

### new Toolbar()

> **new Toolbar**(`protyle`): [`Toolbar`](Toolbar.md)

#### Parameters

| Parameter | Type                                    |
| --------- | --------------------------------------- |
| `protyle` | [`IProtyle`](../interfaces/IProtyle.md) |

#### Returns

[`Toolbar`](Toolbar.md)

#### Defined in

[types/protyle.d.ts:185](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L185)

## Properties

### element

> **element**: `HTMLElement`

#### Defined in

[types/protyle.d.ts:180](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L180)

---

### range

> **range**: `Range`

#### Defined in

[types/protyle.d.ts:183](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L183)

---

### subElement

> **subElement**: `HTMLElement`

#### Defined in

[types/protyle.d.ts:181](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L181)

---

### subElementCloseCB()

> **subElementCloseCB**: () => `void`

#### Returns

`void`

#### Defined in

[types/protyle.d.ts:182](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L182)

## Methods

### getCurrentType()

> **getCurrentType**(`range`): `string`[]

#### Parameters

| Parameter | Type    |
| --------- | ------- |
| `range`   | `Range` |

#### Returns

`string`[]

#### Defined in

[types/protyle.d.ts:204](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L204)

---

### render()

> **render**(`protyle`, `range`, `event`?): `any`

#### Parameters

| Parameter | Type                                    |
| --------- | --------------------------------------- |
| `protyle` | [`IProtyle`](../interfaces/IProtyle.md) |
| `range`   | `Range`                                 |
| `event`?  | `KeyboardEvent`                         |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:187](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L187)

---

### setInlineMark()

> **setInlineMark**(`protyle`, `type`, `action`, `textObj`?): `any`

#### Parameters

| Parameter        | Type                                    |
| ---------------- | --------------------------------------- |
| `protyle`        | [`IProtyle`](../interfaces/IProtyle.md) |
| `type`           | `string`                                |
| `action`         | `"range"` \| `"toolbar"`                |
| `textObj`?       | `object`                                |
| `textObj.color`? | `string`                                |
| `textObj.type`?  | `string`                                |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:199](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L199)

---

### showAssets()

> **showAssets**(`protyle`, `position`, `avCB`?): `any`

#### Parameters

| Parameter  | Type                                      |
| ---------- | ----------------------------------------- |
| `protyle`  | [`IProtyle`](../interfaces/IProtyle.md)   |
| `position` | [`IPosition`](../interfaces/IPosition.md) |
| `avCB`?    | (`url`) => `void`                         |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:206](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L206)

---

### showCodeLanguage()

> **showCodeLanguage**(`protyle`, `languageElement`): `any`

#### Parameters

| Parameter         | Type                                    |
| ----------------- | --------------------------------------- |
| `protyle`         | [`IProtyle`](../interfaces/IProtyle.md) |
| `languageElement` | `HTMLElement`                           |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:195](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L195)

---

### showContent()

> **showContent**(`protyle`, `range`, `nodeElement`): `any`

#### Parameters

| Parameter     | Type                                    |
| ------------- | --------------------------------------- |
| `protyle`     | [`IProtyle`](../interfaces/IProtyle.md) |
| `range`       | `Range`                                 |
| `nodeElement` | `Element`                               |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:189](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L189)

---

### showRender()

> **showRender**(`protyle`, `renderElement`, `updateElements`?, `oldHTML`?): `any`

#### Parameters

| Parameter         | Type                                    |
| ----------------- | --------------------------------------- |
| `protyle`         | [`IProtyle`](../interfaces/IProtyle.md) |
| `renderElement`   | `Element`                               |
| `updateElements`? | `Element`[]                             |
| `oldHTML`?        | `string`                                |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:197](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L197)

---

### showTpl()

> **showTpl**(`protyle`, `nodeElement`, `range`): `any`

#### Parameters

| Parameter     | Type                                    |
| ------------- | --------------------------------------- |
| `protyle`     | [`IProtyle`](../interfaces/IProtyle.md) |
| `nodeElement` | `HTMLElement`                           |
| `range`       | `Range`                                 |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:193](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L193)

---

### showWidget()

> **showWidget**(`protyle`, `nodeElement`, `range`): `any`

#### Parameters

| Parameter     | Type                                    |
| ------------- | --------------------------------------- |
| `protyle`     | [`IProtyle`](../interfaces/IProtyle.md) |
| `nodeElement` | `HTMLElement`                           |
| `range`       | `Range`                                 |

#### Returns

`any`

#### Defined in

[types/protyle.d.ts:191](https://github.com/siyuan-note/petal/tree/main/types/protyle.d.ts#L191)
