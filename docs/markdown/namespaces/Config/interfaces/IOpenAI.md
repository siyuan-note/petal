[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IOpenAI

# Interface: IOpenAI

Open AI related configuration

## Properties

### apiBaseURL

> **apiBaseURL**: `string`

API base URL

#### Defined in

[types/config.d.ts:107](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L107)

---

### apiKey

> **apiKey**: `string`

API key

#### Defined in

[types/config.d.ts:111](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L111)

---

### apiMaxContexts

> **apiMaxContexts**: `number`

The maximum number of contexts passed when requesting the API

#### Defined in

[types/config.d.ts:115](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L115)

---

### apiMaxTokens

> **apiMaxTokens**: `number`

Maximum number of tokens (0 means no limit)

#### Defined in

[types/config.d.ts:119](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L119)

---

### apiModel

> **apiModel**: [`TOpenAIAPIModel`](../type-aliases/TOpenAIAPIModel.md)

The model name called by the API

#### Defined in

[types/config.d.ts:123](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L123)

---

### apiProvider

> **apiProvider**: [`TOpenAIAPIProvider`](../type-aliases/TOpenAIAPIProvider.md)

API Provider
OpenAI, Azure

#### Defined in

[types/config.d.ts:128](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L128)

---

### apiProxy

> **apiProxy**: `string`

API request proxy address

#### Defined in

[types/config.d.ts:132](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L132)

---

### apiTemperature

> **apiTemperature**: `number`

Parameter `temperature` that controls the randomness of the generated text

#### Defined in

[types/config.d.ts:136](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L136)

---

### apiTimeout

> **apiTimeout**: `number`

API request timeout (unit: seconds)

#### Defined in

[types/config.d.ts:140](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L140)

---

### apiUserAgent

> **apiUserAgent**: `string`

API request additional user agent field

#### Defined in

[types/config.d.ts:144](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L144)

---

### apiVersion

> **apiVersion**: `string`

API version number

#### Defined in

[types/config.d.ts:148](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L148)
