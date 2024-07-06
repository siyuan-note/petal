[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IEventBusMap

# Interface: IEventBusMap

## Properties

### click-blockicon

> **click-blockicon**: `object`

#### blockElements

> **blockElements**: `HTMLElement`[]

#### menu

> **menu**: [`EventMenu`](../classes/EventMenu.md)

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:152](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L152)

---

### click-editorcontent

> **click-editorcontent**: `object`

#### event

> **event**: `MouseEvent`

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:157](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L157)

---

### click-editortitleicon

> **click-editortitleicon**: `object`

#### data

> **data**: [`IGetDocInfo`](IGetDocInfo.md)

#### menu

> **menu**: [`EventMenu`](../classes/EventMenu.md)

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:161](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L161)

---

### click-flashcard-action

> **click-flashcard-action**: `object`

#### card

> **card**: [`ICard`](ICard.md)

#### type

> **type**: `string`

#### Defined in

[siyuan.d.ts:148](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L148)

---

### click-pdf

> **click-pdf**: `object`

#### event

> **event**: `MouseEvent`

#### Defined in

[siyuan.d.ts:166](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L166)

---

### destroy-protyle

> **destroy-protyle**: `object`

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:169](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L169)

---

### input-search

> **input-search**: `object`

#### config

> **config**: [`ISearchOption`](ISearchOption.md)

#### protyle

> **protyle**: [`Protyle`](../classes/Protyle.md)

#### searchElement

> **searchElement**: `HTMLInputElement`

#### Defined in

[siyuan.d.ts:172](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L172)

---

### loaded-protyle-dynamic

> **loaded-protyle-dynamic**: `object`

#### position

> **position**: `"afterend"` \| `"beforebegin"`

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:177](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L177)

---

### loaded-protyle-static

> **loaded-protyle-static**: `object`

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:181](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L181)

---

### lock-screen

> **lock-screen**: `void`

#### Defined in

[siyuan.d.ts:234](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L234)

---

### mobile-keyboard-hide

> **mobile-keyboard-hide**: `void`

#### Defined in

[siyuan.d.ts:236](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L236)

---

### mobile-keyboard-show

> **mobile-keyboard-show**: `void`

#### Defined in

[siyuan.d.ts:235](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L235)

---

### open-menu-av

> **open-menu-av**: [`IMenuBaseDetail`](IMenuBaseDetail.md) & `object`

#### Type declaration

##### selectRowElements

> **selectRowElements**: `HTMLElement`[]

#### Defined in

[siyuan.d.ts:187](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L187)

---

### open-menu-blockref

> **open-menu-blockref**: [`IMenuBaseDetail`](IMenuBaseDetail.md)

#### Defined in

[siyuan.d.ts:188](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L188)

---

### open-menu-breadcrumbmore

> **open-menu-breadcrumbmore**: `object`

#### data

> **data**: [`IGetTreeStat`](IGetTreeStat.md)

#### menu

> **menu**: [`EventMenu`](../classes/EventMenu.md)

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:189](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L189)

---

### open-menu-content

> **open-menu-content**: [`IMenuBaseDetail`](IMenuBaseDetail.md) & `object`

#### Type declaration

##### range

> **range**: `Range`

#### Defined in

[siyuan.d.ts:194](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L194)

---

### open-menu-doctree

> **open-menu-doctree**: `object`

#### elements

> **elements**: `NodeListOf`\<`HTMLElement`\>

#### menu

> **menu**: [`EventMenu`](../classes/EventMenu.md)

#### type

> **type**: `"doc"` \| `"notebook"` \| `"docs"`

#### Defined in

[siyuan.d.ts:199](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L199)

---

### open-menu-fileannotationref

> **open-menu-fileannotationref**: [`IMenuBaseDetail`](IMenuBaseDetail.md)

#### Defined in

[siyuan.d.ts:195](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L195)

---

### open-menu-image

> **open-menu-image**: [`IMenuBaseDetail`](IMenuBaseDetail.md)

#### Defined in

[siyuan.d.ts:196](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L196)

---

### open-menu-inbox

> **open-menu-inbox**: `object`

#### element

> **element**: `HTMLElement`

#### ids

> **ids**: `string`[]

#### menu

> **menu**: [`EventMenu`](../classes/EventMenu.md)

#### Defined in

[siyuan.d.ts:204](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L204)

---

### open-menu-link

> **open-menu-link**: [`IMenuBaseDetail`](IMenuBaseDetail.md)

#### Defined in

[siyuan.d.ts:197](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L197)

---

### open-menu-tag

> **open-menu-tag**: [`IMenuBaseDetail`](IMenuBaseDetail.md)

#### Defined in

[siyuan.d.ts:198](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L198)

---

### open-noneditableblock

> **open-noneditableblock**: `object`

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### toolbar

> **toolbar**: [`Toolbar`](../classes/Toolbar.md)

#### Defined in

[siyuan.d.ts:209](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L209)

---

### open-siyuan-url-block

> **open-siyuan-url-block**: `object`

#### exist

> **exist**: `boolean`

#### focus

> **focus**: `boolean`

#### id

> **id**: `string`

#### url

> **url**: `string`

#### Defined in

[siyuan.d.ts:213](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L213)

---

### open-siyuan-url-plugin

> **open-siyuan-url-plugin**: `object`

#### url

> **url**: `string`

#### Defined in

[siyuan.d.ts:219](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L219)

---

### paste

> **paste**: `object`

#### files

> **files**: `DataTransferItemList` \| `FileList`

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### resolve()

> **resolve**: \<`T`\>(`value`) => `void`

##### Parameters

| Parameter | Type                        |
| --------- | --------------------------- |
| `value`   | `T` \| `PromiseLike`\<`T`\> |

##### Returns

`void`

#### siyuanHTML

> **siyuanHTML**: `string`

#### textHTML

> **textHTML**: `string`

#### textPlain

> **textPlain**: `string`

#### Defined in

[siyuan.d.ts:222](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L222)

---

### switch-protyle

> **switch-protyle**: `object`

#### protyle

> **protyle**: [`IProtyle`](IProtyle.md)

#### Defined in

[siyuan.d.ts:184](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L184)

---

### sync-end

> **sync-end**: [`IWebSocketData`](IWebSocketData.md)

#### Defined in

[siyuan.d.ts:232](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L232)

---

### sync-fail

> **sync-fail**: [`IWebSocketData`](IWebSocketData.md)

#### Defined in

[siyuan.d.ts:233](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L233)

---

### sync-start

> **sync-start**: [`IWebSocketData`](IWebSocketData.md)

#### Defined in

[siyuan.d.ts:231](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L231)

---

### ws-main

> **ws-main**: [`IWebSocketData`](IWebSocketData.md)

#### Defined in

[siyuan.d.ts:230](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L230)
