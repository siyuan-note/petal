[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / EventBus

# Class: EventBus

## Constructors

### new EventBus()

> **new EventBus**(): [`EventBus`](EventBus.md)

#### Returns

[`EventBus`](EventBus.md)

## Methods

### emit()

> **emit**\<`K`, `D`\>(`type`, `detail`?): `boolean`

#### Type Parameters

| Type Parameter                                                      | Default type                                           |
| ------------------------------------------------------------------- | ------------------------------------------------------ |
| `K` _extends_ keyof [`IEventBusMap`](../interfaces/IEventBusMap.md) | -                                                      |
| `D`                                                                 | [`IEventBusMap`](../interfaces/IEventBusMap.md)\[`K`\] |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `type`    | `K`  |
| `detail`? | `D`  |

#### Returns

`boolean`

#### Defined in

[siyuan.d.ts:677](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L677)

---

### off()

> **off**\<`K`, `D`\>(`type`, `listener`): `void`

#### Type Parameters

| Type Parameter                                                      | Default type                                           |
| ------------------------------------------------------------------- | ------------------------------------------------------ |
| `K` _extends_ keyof [`IEventBusMap`](../interfaces/IEventBusMap.md) | -                                                      |
| `D`                                                                 | [`IEventBusMap`](../interfaces/IEventBusMap.md)\[`K`\] |

#### Parameters

| Parameter  | Type               |
| ---------- | ------------------ |
| `type`     | `K`                |
| `listener` | (`event`) => `any` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:672](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L672)

---

### on()

> **on**\<`K`, `D`\>(`type`, `listener`): `void`

#### Type Parameters

| Type Parameter                                                      | Default type                                           |
| ------------------------------------------------------------------- | ------------------------------------------------------ |
| `K` _extends_ keyof [`IEventBusMap`](../interfaces/IEventBusMap.md) | -                                                      |
| `D`                                                                 | [`IEventBusMap`](../interfaces/IEventBusMap.md)\[`K`\] |

#### Parameters

| Parameter  | Type               |
| ---------- | ------------------ |
| `type`     | `K`                |
| `listener` | (`event`) => `any` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:662](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L662)

---

### once()

> **once**\<`K`, `D`\>(`type`, `listener`): `void`

#### Type Parameters

| Type Parameter                                                      | Default type                                           |
| ------------------------------------------------------------------- | ------------------------------------------------------ |
| `K` _extends_ keyof [`IEventBusMap`](../interfaces/IEventBusMap.md) | -                                                      |
| `D`                                                                 | [`IEventBusMap`](../interfaces/IEventBusMap.md)\[`K`\] |

#### Parameters

| Parameter  | Type               |
| ---------- | ------------------ |
| `type`     | `K`                |
| `listener` | (`event`) => `any` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:667](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L667)
