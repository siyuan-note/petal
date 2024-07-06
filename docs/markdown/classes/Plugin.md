[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / Plugin

# Class: `abstract` Plugin

## Constructors

### new Plugin()

> **new Plugin**(`options`): [`Plugin`](Plugin.md)

#### Parameters

| Parameter      | Type                            |
| -------------- | ------------------------------- |
| `options`      | `object`                        |
| `options.app`  | [`App`](App.md)                 |
| `options.i18n` | [`I18N`](../interfaces/I18N.md) |
| `options.name` | `string`                        |

#### Returns

[`Plugin`](Plugin.md)

#### Defined in

[siyuan.d.ts:557](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L557)

## Properties

### app

> **app**: [`App`](App.md)

#### Defined in

[siyuan.d.ts:545](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L545)

---

### commands

> **commands**: [`ICommandOption`](../interfaces/ICommandOption.md)[]

#### Defined in

[siyuan.d.ts:546](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L546)

---

### data

> **data**: `any`

#### Defined in

[siyuan.d.ts:542](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L542)

---

### displayName

> **displayName**: `string`

#### Defined in

[siyuan.d.ts:543](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L543)

---

### eventBus

> **eventBus**: [`EventBus`](EventBus.md)

#### Defined in

[siyuan.d.ts:540](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L540)

---

### i18n

> **i18n**: [`I18N`](../interfaces/I18N.md)

#### Defined in

[siyuan.d.ts:541](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L541)

---

### name

> `readonly` **name**: `string`

#### Defined in

[siyuan.d.ts:544](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L544)

---

### protyleOptions

> **protyleOptions**: [`IProtyleOption`](../interfaces/IProtyleOption.md)

#### Defined in

[siyuan.d.ts:555](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L555)

---

### protyleSlash

> **protyleSlash**: `object`[]

#### Defined in

[siyuan.d.ts:548](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L548)

---

### setting

> **setting**: [`Setting`](Setting.md)

#### Defined in

[siyuan.d.ts:547](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L547)

## Methods

### addCommand()

> **addCommand**(`options`): `void`

#### Parameters

| Parameter | Type                                                |
| --------- | --------------------------------------------------- |
| `options` | [`ICommandOption`](../interfaces/ICommandOption.md) |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:629](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L629)

---

### addDock()

> **addDock**(`options`): `object`

Must be executed before the synchronous function.

#### Parameters

| Parameter          | Type                                                |
| ------------------ | --------------------------------------------------- |
| `options`          | `object`                                            |
| `options.config`   | [`IPluginDockTab`](../interfaces/IPluginDockTab.md) |
| `options.data`     | `any`                                               |
| `options.destroy`? | (`this`) => `void`                                  |
| `options.init`     | (`this`, `dock`) => `void`                          |
| `options.resize`?  | (`this`) => `void`                                  |
| `options.type`     | `string`                                            |
| `options.update`?  | (`this`) => `void`                                  |

#### Returns

`object`

##### config

> **config**: [`IPluginDockTab`](../interfaces/IPluginDockTab.md)

##### model

> **model**: [`IDockModel`](../interfaces/IDockModel.md)

#### Defined in

[siyuan.d.ts:619](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L619)

---

### addFloatLayer()

> **addFloatLayer**(`options`): `void`

#### Parameters

| Parameter                | Type          |
| ------------------------ | ------------- |
| `options`                | `object`      |
| `options.defIds`?        | `string`[]    |
| `options.ids`            | `string`[]    |
| `options.targetElement`? | `HTMLElement` |
| `options.x`?             | `number`      |
| `options.y`?             | `number`      |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:631](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L631)

---

### addIcons()

> **addIcons**(`svg`): `void`

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `svg`     | `string` |

#### Returns

`void`

#### Defined in

[siyuan.d.ts:600](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L600)

---

### addStatusBar()

> **addStatusBar**(`options`): `HTMLElement`

Must be executed before the synchronous function.

#### Parameters

| Parameter           | Type                  | Description |
| ------------------- | --------------------- | ----------- |
| `options`           | `object`              | -           |
| `options.element`   | `HTMLElement`         | -           |
| `options.position`? | `"left"` \| `"right"` |             |

#### Returns

`HTMLElement`

#### Defined in

[siyuan.d.ts:587](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L587)

---

### addTab()

> **addTab**(`options`): () => [`ITabModel`](../interfaces/ITabModel.md)

Must be executed before the synchronous function.

#### Parameters

| Parameter                | Type               |
| ------------------------ | ------------------ |
| `options`                | `object`           |
| `options.beforeDestroy`? | (`this`) => `void` |
| `options.destroy`?       | (`this`) => `void` |
| `options.init`           | (`this`) => `void` |
| `options.resize`?        | (`this`) => `void` |
| `options.type`           | `string`           |
| `options.update`?        | (`this`) => `void` |

#### Returns

`Function`

##### Returns

[`ITabModel`](../interfaces/ITabModel.md)

#### Defined in

[siyuan.d.ts:607](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L607)

---

### addTopBar()

> **addTopBar**(`options`): `HTMLElement`

Must be executed before the synchronous function.

#### Parameters

| Parameter           | Type                  | Description                |
| ------------------- | --------------------- | -------------------------- |
| `options`           | `object`              | -                          |
| `options.callback`  | (`event`) => `void`   | -                          |
| `options.icon`      | `string`              | Support svg id or svg tag. |
| `options.position`? | `"left"` \| `"right"` |                            |
| `options.title`     | `string`              | -                          |

#### Returns

`HTMLElement`

#### Defined in

[siyuan.d.ts:576](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L576)

---

### getOpenedTab()

> **getOpenedTab**(): `object`

#### Returns

`object`

#### Defined in

[siyuan.d.ts:602](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L602)

---

### loadData()

> **loadData**(`storageName`): `Promise`\<`any`\>

#### Parameters

| Parameter     | Type     |
| ------------- | -------- |
| `storageName` | `string` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[siyuan.d.ts:594](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L594)

---

### onLayoutReady()

> **onLayoutReady**(): `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:569](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L569)

---

### onload()

> **onload**(): `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:563](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L563)

---

### onunload()

> **onunload**(): `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:565](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L565)

---

### openSetting()

> **openSetting**(): `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:592](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L592)

---

### removeData()

> **removeData**(`storageName`): `Promise`\<`any`\>

#### Parameters

| Parameter     | Type     |
| ------------- | -------- |
| `storageName` | `string` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[siyuan.d.ts:598](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L598)

---

### saveData()

> **saveData**(`storageName`, `content`): `Promise`\<`void`\>

#### Parameters

| Parameter     | Type     |
| ------------- | -------- |
| `storageName` | `string` |
| `content`     | `any`    |

#### Returns

`Promise`\<`void`\>

#### Defined in

[siyuan.d.ts:596](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L596)

---

### uninstall()

> **uninstall**(): `void`

#### Returns

`void`

#### Defined in

[siyuan.d.ts:567](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L567)

---

### updateCards()

> **updateCards**(`options`): [`ICardData`](../interfaces/ICardData.md) \| `Promise`\<[`ICardData`](../interfaces/ICardData.md)\>

#### Parameters

| Parameter | Type                                      |
| --------- | ----------------------------------------- |
| `options` | [`ICardData`](../interfaces/ICardData.md) |

#### Returns

[`ICardData`](../interfaces/ICardData.md) \| `Promise`\<[`ICardData`](../interfaces/ICardData.md)\>

#### Defined in

[siyuan.d.ts:639](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L639)
