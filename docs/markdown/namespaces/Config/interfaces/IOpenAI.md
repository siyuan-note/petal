[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IOpenAI

# Interface: IOpenAI

Open AI related configuration

## Properties

| Property         | Type                                                          | Description                                                                | Defined in                                                                                     |
| ---------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `apiBaseURL`     | `string`                                                      | API base URL                                                               | [types/config.d.ts:107](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L107) |
| `apiKey`         | `string`                                                      | API key                                                                    | [types/config.d.ts:111](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L111) |
| `apiMaxContexts` | `number`                                                      | The maximum number of contexts passed when requesting the API              | [types/config.d.ts:115](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L115) |
| `apiMaxTokens`   | `number`                                                      | Maximum number of tokens (0 means no limit)                                | [types/config.d.ts:119](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L119) |
| `apiModel`       | [`TOpenAIAPIModel`](../type-aliases/TOpenAIAPIModel.md)       | The model name called by the API                                           | [types/config.d.ts:123](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L123) |
| `apiProvider`    | [`TOpenAIAPIProvider`](../type-aliases/TOpenAIAPIProvider.md) | API Provider OpenAI, Azure                                                 | [types/config.d.ts:128](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L128) |
| `apiProxy`       | `string`                                                      | API request proxy address                                                  | [types/config.d.ts:132](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L132) |
| `apiTemperature` | `number`                                                      | Parameter `temperature` that controls the randomness of the generated text | [types/config.d.ts:136](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L136) |
| `apiTimeout`     | `number`                                                      | API request timeout (unit: seconds)                                        | [types/config.d.ts:140](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L140) |
| `apiUserAgent`   | `string`                                                      | API request additional user agent field                                    | [types/config.d.ts:144](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L144) |
| `apiVersion`     | `string`                                                      | API version number                                                         | [types/config.d.ts:148](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L148) |
