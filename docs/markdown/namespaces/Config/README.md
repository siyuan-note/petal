[**SiYuan Plugin API v1.0.2**](../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../README.md) / Config

# Config

## Index

### Interfaces

| Interface                                                                                  | Description                                        |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| [IAI](interfaces/IAI.md)                                                                   | Artificial Intelligence (AI) related configuration |
| [IAPI](interfaces/IAPI.md)                                                                 | SiYuan API related configuration                   |
| [IAccount](interfaces/IAccount.md)                                                         | Account configuration                              |
| [IAppearance](interfaces/IAppearance.md)                                                   | SiYuan appearance related configuration            |
| [IBazaar](interfaces/IBazaar.md)                                                           | SiYuan bazaar related configuration                |
| [IConf](interfaces/IConf.md)                                                               | Configuration object                               |
| [IEditor](interfaces/IEditor.md)                                                           | SiYuan editor related configuration                |
| [IExport](interfaces/IExport.md)                                                           | SiYuan export related configuration                |
| [IFileTree](interfaces/IFileTree.md)                                                       | Document tree related configuration                |
| [IFlashCard](interfaces/IFlashCard.md)                                                     | Flashcard related configuration                    |
| [IGraph](interfaces/IGraph.md)                                                             | SiYuan graph related configuration                 |
| [IGraphD3](interfaces/IGraphD3.md)                                                         | d3.js graph configuration                          |
| [IGraphGlobal](interfaces/IGraphGlobal.md)                                                 | Global graph configuration                         |
| [IGraphLocal](interfaces/IGraphLocal.md)                                                   | Local graph configuration                          |
| [IGraphType](interfaces/IGraphType.md)                                                     | SiYuan node type filter                            |
| [IKey](interfaces/IKey.md)                                                                 | SiYuan shortcut key                                |
| [IKeymap](interfaces/IKeymap.md)                                                           | SiYuan keymap related configuration                |
| [IKeymapEditor](interfaces/IKeymapEditor.md)                                               | SiYuan editor shortcut keys                        |
| [IKeymapEditorGeneral](interfaces/IKeymapEditorGeneral.md)                                 | SiYuan editor general shortcut keys                |
| [IKeymapEditorHeading](interfaces/IKeymapEditorHeading.md)                                 | SiYuan editor heading shortcut keys                |
| [IKeymapEditorInsert](interfaces/IKeymapEditorInsert.md)                                   | SiYuan editor insert shortcut keys                 |
| [IKeymapEditorList](interfaces/IKeymapEditorList.md)                                       | SiYuan editor list shortcut keys                   |
| [IKeymapEditorTable](interfaces/IKeymapEditorTable.md)                                     | SiYuan editor table shortcut keys                  |
| [IKeymapGeneral](interfaces/IKeymapGeneral.md)                                             | SiYuan general shortcut keys                       |
| [IKeymapPlugin](interfaces/IKeymapPlugin.md)                                               | SiYuan plugin shortcut keys                        |
| [IKeys](interfaces/IKeys.md)                                                               | SiYuan shortcut keys                               |
| [ILang](interfaces/ILang.md)                                                               | Supported language                                 |
| [IMarkdown](interfaces/IMarkdown.md)                                                       | SiYuan editor markdown related configuration       |
| [INetworkProxy](interfaces/INetworkProxy.md)                                               | SiYuan Network proxy configuration                 |
| [IOpenAI](interfaces/IOpenAI.md)                                                           | Open AI related configuration                      |
| [IRepo](interfaces/IRepo.md)                                                               | Snapshot repository related configuration          |
| [ISearch](interfaces/ISearch.md)                                                           | SiYuan search related configuration                |
| [ISnippet](interfaces/ISnippet.md)                                                         | SiYuan code snippets related configuration         |
| [IStat](interfaces/IStat.md)                                                               | SiYuan workspace content statistics                |
| [ISync](interfaces/ISync.md)                                                               | SiYuan synchronization related configuration       |
| [ISyncS3](interfaces/ISyncS3.md)                                                           | S3 compatible object storage related configuration |
| [ISyncWebDAV](interfaces/ISyncWebDAV.md)                                                   | WebDAV related configuration                       |
| [ISystem](interfaces/ISystem.md)                                                           | System related information                         |
| [ITag](interfaces/ITag.md)                                                                 | SiYuan tag dock related configuration              |
| [IUILayoutDock](interfaces/IUILayoutDock.md)                                               | SiYuan dock related configuration                  |
| [IUILayoutDockPanelSize](interfaces/IUILayoutDockPanelSize.md)                             | SiYuan dock tab size                               |
| [IUILayoutDockTab](interfaces/IUILayoutDockTab.md)                                         | SiYuan dock tab data                               |
| [IUILayoutLayout](interfaces/IUILayoutLayout.md)                                           | SiYuan panel layout                                |
| [IUILayoutTab](interfaces/IUILayoutTab.md)                                                 | -                                                  |
| [IUILayoutTabAsset](interfaces/IUILayoutTabAsset.md)                                       | Tab content                                        |
| [IUILayoutTabBacklink](interfaces/IUILayoutTabBacklink.md)                                 | SiYuan back link tab                               |
| [IUILayoutTabBookmark](interfaces/IUILayoutTabBookmark.md)                                 | SiYuan bookmark tab                                |
| [IUILayoutTabCustom](interfaces/IUILayoutTabCustom.md)                                     | SiYuan custom tab                                  |
| [IUILayoutTabEditor](interfaces/IUILayoutTabEditor.md)                                     | SiYuan editor tab                                  |
| [IUILayoutTabFiles](interfaces/IUILayoutTabFiles.md)                                       | SiYuan filetree tab                                |
| [IUILayoutTabGraph](interfaces/IUILayoutTabGraph.md)                                       | SiYuan graph tab                                   |
| [IUILayoutTabOutline](interfaces/IUILayoutTabOutline.md)                                   | SiYuan outline tab                                 |
| [IUILayoutTabSearch](interfaces/IUILayoutTabSearch.md)                                     | SiYuan search tab                                  |
| [IUILayoutTabSearchConfig](interfaces/IUILayoutTabSearchConfig.md)                         | SiYuan search tab configuration                    |
| [IUILayoutTabSearchConfigReplaceTypes](interfaces/IUILayoutTabSearchConfigReplaceTypes.md) | Replace type filtering                             |
| [IUILayoutTabSearchConfigTypes](interfaces/IUILayoutTabSearchConfigTypes.md)               | Search type filtering                              |
| [IUILayoutTabTag](interfaces/IUILayoutTabTag.md)                                           | SiYuan tag tab                                     |
| [IUILayoutWnd](interfaces/IUILayoutWnd.md)                                                 | SiYuan window layout                               |
| [IUiLayout](interfaces/IUiLayout.md)                                                       | SiYuan UI layout related configuration             |

### Type Aliases

| Type alias                                                             | Description                                                                                                                                                                                     |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [TAccessAuthCode](type-aliases/TAccessAuthCode.md)                     | Access authorization code                                                                                                                                                                       |
| [TLang](type-aliases/TLang.md)                                         | The language used by the current user                                                                                                                                                           |
| [TLogLevel](type-aliases/TLogLevel.md)                                 | Log level                                                                                                                                                                                       |
| [TOpenAIAPIModel](type-aliases/TOpenAIAPIModel.md)                     | The model name called by the API                                                                                                                                                                |
| [TOpenAIAPIProvider](type-aliases/TOpenAIAPIProvider.md)               | API Provider                                                                                                                                                                                    |
| [TSystemContainer](type-aliases/TSystemContainer.md)                   | Kernel operating environment - `docker`: Docker container - `android`: Android device - `ios`: iOS device - `std`: Desktop Electron environment                                                 |
| [TSystemNetworkProxyScheme](type-aliases/TSystemNetworkProxyScheme.md) | The protocol used by the proxy server - Empty String: Use the system proxy settings - `http`: HTTP - `https`: HTTPS - `socks5`: SOCKS5                                                          |
| [TSystemOS](type-aliases/TSystemOS.md)                                 | The operating system name determined at compile time (obtained using the command `go tool dist list`) - `android`: Android - `darwin`: macOS - `ios`: iOS - `linux`: Linux - `windows`: Windows |
| [TUILayoutDirection](type-aliases/TUILayoutDirection.md)               | Panel content layout direction - `tb`: Top and bottom layout - `lr`: Left and right layout                                                                                                      |
| [TUILayoutItem](type-aliases/TUILayoutItem.md)                         | SiYuan layout item                                                                                                                                                                              |
| [TUILayoutTabBacklinkType](type-aliases/TUILayoutTabBacklinkType.md)   | (Backlink) Tab type - `pin`: Pinned panel - `local`: The panel of the current document                                                                                                          |
| [TUILayoutTabGraphType](type-aliases/TUILayoutTabGraphType.md)         | (Graph) Tab type - `pin`: Pinned graph - `local`: Graph of the current editor - `global`: Global graph                                                                                          |
| [TUILayoutTabOutlineType](type-aliases/TUILayoutTabOutlineType.md)     | (Outline) Tab type - `pin`: Pinned outline panel - `local`: The outline panel of the current editor                                                                                             |
| [TUILayoutType](type-aliases/TUILayoutType.md)                         | Layout type - `normal`: Normal panel - `center`: Center panel - `top`: Top panel - `bottom`: Bottom panel - `left`: Left panel - `right`: Right panel                                           |
