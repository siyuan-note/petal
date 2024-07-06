[**SiYuan Plugin API v1.0.2**](../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../README.md) / IEventBusMap

# Interface: IEventBusMap

## Properties

| Property                           | Type                                                    | Defined in                                                                         |
| ---------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `click-blockicon`                  | `object`                                                | [siyuan.d.ts:152](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L152) |
| `click-blockicon.blockElements`    | `HTMLElement`[]                                         | [siyuan.d.ts:155](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L155) |
| `click-blockicon.menu`             | [`EventMenu`](../classes/EventMenu.md)                  | [siyuan.d.ts:153](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L153) |
| `click-blockicon.protyle`          | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:154](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L154) |
| `click-editorcontent`              | `object`                                                | [siyuan.d.ts:157](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L157) |
| `click-editorcontent.event`        | `MouseEvent`                                            | [siyuan.d.ts:159](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L159) |
| `click-editorcontent.protyle`      | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:158](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L158) |
| `click-editortitleicon`            | `object`                                                | [siyuan.d.ts:161](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L161) |
| `click-editortitleicon.data`       | [`IGetDocInfo`](IGetDocInfo.md)                         | [siyuan.d.ts:164](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L164) |
| `click-editortitleicon.menu`       | [`EventMenu`](../classes/EventMenu.md)                  | [siyuan.d.ts:162](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L162) |
| `click-editortitleicon.protyle`    | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:163](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L163) |
| `click-flashcard-action`           | `object`                                                | [siyuan.d.ts:148](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L148) |
| `click-flashcard-action.card`      | [`ICard`](ICard.md)                                     | [siyuan.d.ts:149](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L149) |
| `click-flashcard-action.type`      | `string`                                                | [siyuan.d.ts:150](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L150) |
| `click-pdf`                        | `object`                                                | [siyuan.d.ts:166](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L166) |
| `click-pdf.event`                  | `MouseEvent`                                            | [siyuan.d.ts:167](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L167) |
| `destroy-protyle`                  | `object`                                                | [siyuan.d.ts:169](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L169) |
| `destroy-protyle.protyle`          | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:170](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L170) |
| `input-search`                     | `object`                                                | [siyuan.d.ts:172](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L172) |
| `input-search.config`              | [`ISearchOption`](ISearchOption.md)                     | [siyuan.d.ts:174](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L174) |
| `input-search.protyle`             | [`Protyle`](../classes/Protyle.md)                      | [siyuan.d.ts:173](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L173) |
| `input-search.searchElement`       | `HTMLInputElement`                                      | [siyuan.d.ts:175](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L175) |
| `loaded-protyle-dynamic`           | `object`                                                | [siyuan.d.ts:177](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L177) |
| `loaded-protyle-dynamic.position`  | `"afterend"` \| `"beforebegin"`                         | [siyuan.d.ts:179](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L179) |
| `loaded-protyle-dynamic.protyle`   | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:178](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L178) |
| `loaded-protyle-static`            | `object`                                                | [siyuan.d.ts:181](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L181) |
| `loaded-protyle-static.protyle`    | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:182](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L182) |
| `lock-screen`                      | `void`                                                  | [siyuan.d.ts:234](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L234) |
| `mobile-keyboard-hide`             | `void`                                                  | [siyuan.d.ts:236](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L236) |
| `mobile-keyboard-show`             | `void`                                                  | [siyuan.d.ts:235](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L235) |
| `open-menu-av`                     | [`IMenuBaseDetail`](IMenuBaseDetail.md) & `object`      | [siyuan.d.ts:187](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L187) |
| `open-menu-blockref`               | [`IMenuBaseDetail`](IMenuBaseDetail.md)                 | [siyuan.d.ts:188](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L188) |
| `open-menu-breadcrumbmore`         | `object`                                                | [siyuan.d.ts:189](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L189) |
| `open-menu-breadcrumbmore.data`    | [`IGetTreeStat`](IGetTreeStat.md)                       | [siyuan.d.ts:192](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L192) |
| `open-menu-breadcrumbmore.menu`    | [`EventMenu`](../classes/EventMenu.md)                  | [siyuan.d.ts:190](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L190) |
| `open-menu-breadcrumbmore.protyle` | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:191](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L191) |
| `open-menu-content`                | [`IMenuBaseDetail`](IMenuBaseDetail.md) & `object`      | [siyuan.d.ts:194](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L194) |
| `open-menu-doctree`                | `object`                                                | [siyuan.d.ts:199](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L199) |
| `open-menu-doctree.elements`       | `NodeListOf`\<`HTMLElement`\>                           | [siyuan.d.ts:201](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L201) |
| `open-menu-doctree.menu`           | [`EventMenu`](../classes/EventMenu.md)                  | [siyuan.d.ts:200](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L200) |
| `open-menu-doctree.type`           | `"doc"` \| `"notebook"` \| `"docs"`                     | [siyuan.d.ts:202](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L202) |
| `open-menu-fileannotationref`      | [`IMenuBaseDetail`](IMenuBaseDetail.md)                 | [siyuan.d.ts:195](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L195) |
| `open-menu-image`                  | [`IMenuBaseDetail`](IMenuBaseDetail.md)                 | [siyuan.d.ts:196](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L196) |
| `open-menu-inbox`                  | `object`                                                | [siyuan.d.ts:204](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L204) |
| `open-menu-inbox.element`          | `HTMLElement`                                           | [siyuan.d.ts:206](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L206) |
| `open-menu-inbox.ids`              | `string`[]                                              | [siyuan.d.ts:207](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L207) |
| `open-menu-inbox.menu`             | [`EventMenu`](../classes/EventMenu.md)                  | [siyuan.d.ts:205](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L205) |
| `open-menu-link`                   | [`IMenuBaseDetail`](IMenuBaseDetail.md)                 | [siyuan.d.ts:197](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L197) |
| `open-menu-tag`                    | [`IMenuBaseDetail`](IMenuBaseDetail.md)                 | [siyuan.d.ts:198](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L198) |
| `open-noneditableblock`            | `object`                                                | [siyuan.d.ts:209](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L209) |
| `open-noneditableblock.protyle`    | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:210](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L210) |
| `open-noneditableblock.toolbar`    | [`Toolbar`](../classes/Toolbar.md)                      | [siyuan.d.ts:211](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L211) |
| `open-siyuan-url-block`            | `object`                                                | [siyuan.d.ts:213](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L213) |
| `open-siyuan-url-block.exist`      | `boolean`                                               | [siyuan.d.ts:217](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L217) |
| `open-siyuan-url-block.focus`      | `boolean`                                               | [siyuan.d.ts:216](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L216) |
| `open-siyuan-url-block.id`         | `string`                                                | [siyuan.d.ts:215](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L215) |
| `open-siyuan-url-block.url`        | `string`                                                | [siyuan.d.ts:214](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L214) |
| `open-siyuan-url-plugin`           | `object`                                                | [siyuan.d.ts:219](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L219) |
| `open-siyuan-url-plugin.url`       | `string`                                                | [siyuan.d.ts:220](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L220) |
| `paste`                            | `object`                                                | [siyuan.d.ts:222](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L222) |
| `paste.files`                      | `DataTransferItemList` \| `FileList`                    | [siyuan.d.ts:228](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L228) |
| `paste.protyle`                    | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:223](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L223) |
| `paste.resolve`                    | \<`T`\>(`value`: `T` \| `PromiseLike`\<`T`\>) => `void` | [siyuan.d.ts:224](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L224) |
| `paste.siyuanHTML`                 | `string`                                                | [siyuan.d.ts:227](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L227) |
| `paste.textHTML`                   | `string`                                                | [siyuan.d.ts:225](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L225) |
| `paste.textPlain`                  | `string`                                                | [siyuan.d.ts:226](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L226) |
| `switch-protyle`                   | `object`                                                | [siyuan.d.ts:184](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L184) |
| `switch-protyle.protyle`           | [`IProtyle`](IProtyle.md)                               | [siyuan.d.ts:185](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L185) |
| `sync-end`                         | [`IWebSocketData`](IWebSocketData.md)                   | [siyuan.d.ts:232](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L232) |
| `sync-fail`                        | [`IWebSocketData`](IWebSocketData.md)                   | [siyuan.d.ts:233](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L233) |
| `sync-start`                       | [`IWebSocketData`](IWebSocketData.md)                   | [siyuan.d.ts:231](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L231) |
| `ws-main`                          | [`IWebSocketData`](IWebSocketData.md)                   | [siyuan.d.ts:230](https://github.com/siyuan-note/petal/tree/main/siyuan.d.ts#L230) |
