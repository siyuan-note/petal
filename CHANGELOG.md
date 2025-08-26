# Changelog

## v1.1.3 2025-08-26

* [Add plugin function `getActiveEditor`](https://github.com/siyuan-note/siyuan/issues/15641)
* [Add plugin function `getActiveTab`](https://github.com/siyuan-note/siyuan/issues/15415)
* [Add plugin event bus `switch-protyle-mode`](https://github.com/siyuan-note/siyuan/issues/15516)
* [Add plugin function `hideMessage`](https://github.com/siyuan-note/siyuan/issues/15485)
* [Update Constants](https://github.com/siyuan-note/petal/pull/39)
* [Add plugin function `IProtyleOptions.handleEmptyContent`](https://github.com/siyuan-note/siyuan/issues/15398)

## v1.1.2 2025-07-22

* [Add plugin option `IProtyleOptions.click.preventInsetEmptyBlock`](https://github.com/siyuan-note/siyuan/issues/15303)
* [Add plugin function `saveLayout`](https://github.com/siyuan-note/siyuan/issues/15308)
* [Add config.query to `input-search` event bus](https://github.com/siyuan-note/siyuan/issues/15285)
* [Update plugin `addDock` callback parameter scope](https://github.com/siyuan-note/siyuan/issues/14752)
* [Add `cb-get-outline` to `TProtyleAction`](https://github.com/siyuan-note/siyuan/issues/14725)

## v1.1.1 2025-04-08

* [Add plugin function `globalCommand`](https://github.com/siyuan-note/siyuan/issues/14499)
* [Add plugin function `openAttributePanel`](https://github.com/siyuan-note/siyuan/issues/14276)

## v1.1.0 2025-03-04

* [Support floating window `Open in New Tab`](https://github.com/siyuan-note/siyuan/issues/11801)
* [Add `data-id` attribute to the buttons](https://github.com/siyuan-note/siyuan/pull/14182)
* [Upgrade to Graphviz v3.11.0](https://github.com/siyuan-note/siyuan/issues/13852)
* [Add parameter `nodeElement` to `protyleSlash.callback`](https://github.com/siyuan-note/siyuan/issues/14036)

## v1.0.9 2025-02-11

* [Backlink count at the doc block title including sub-blocks](https://github.com/siyuan-note/siyuan/issues/13791)
* [Improve list item, super block and blockquote backlink propagation](https://github.com/siyuan-note/siyuan/issues/13776)
* [Add plugin function `openSetting`](https://github.com/siyuan-note/siyuan/pull/13761)

## v1.0.8 2024-12-24

* [Add plugin function `getAllModels`](https://github.com/siyuan-note/siyuan/issues/13579)
* [Add `renderAVAttribute` method to Protyle](https://github.com/siyuan-note/siyuan/pull/13547)
* [Remove Sentry reporting diagnostic data](https://github.com/siyuan-note/siyuan/issues/13522)

## v1.0.7 2024-12-10

* [Support HarmonyOS NEXT system](https://github.com/siyuan-note/siyuan/issues/13184)
* [Add `disable`, `enable` method to Protyle](https://github.com/siyuan-note/siyuan/issues/13391)

## v1.0.6 2024-11-19

* [Add plugin method `updateProtyleToolbar`](https://github.com/siyuan-note/plugin-sample/issues/24)

## v1.0.5 2024-11-05

* [Add `renderElement` and `blockElement` for `open-noneditableblock`](https://github.com/siyuan-note/siyuan/issues/12955)
* [Add plugin util `platformUtils`](https://github.com/siyuan-note/siyuan/issues/12930)
* [Added reading local files to `on-paste`](https://github.com/siyuan-note/siyuan/issues/12917)
* [Add plugin function `getAllEditor`](https://github.com/siyuan-note/siyuan/issues/12884)
* [Add plugin function `getModelByDockType`](https://github.com/siyuan-note/siyuan/issues/11782)
* [Replace `any` in IProtyle with the corresponding type](https://github.com/siyuan-note/petal/issues/34)

## v1.0.4 2024-10-15

* [Add plugin method `exitSiYuan`](https://github.com/siyuan-note/siyuan/pull/12767)

## v1.0.3 2024-09-27

* [Add plugin event bus `opened-notebook` & `closed-notebook`](https://github.com/siyuan-note/siyuan/issues/11974)

## v1.0.2 2024-06-04

* [Add `dialog` object to `Setting` property](https://github.com/siyuan-note/petal/issues/28)

## v0.9.9 2024-05-14

* Update Config.d.ts
* [Update plugin `loaded-protyle-dynamic` parameter positon to position](https://github.com/siyuan-note/siyuan/pull/11298)

## v0.9.8 2024-04-30

* [Add `editors` to the plugin's `Custom` class](https://github.com/siyuan-note/siyuan/issues/11072)
* [Add `direction` to plugin method `Setting.addItem`](https://github.com/siyuan-note/siyuan/issues/11183)

## v0.9.7 2024-04-02

* [Add `global.siyuan.config` type definition](https://github.com/siyuan-note/petal/pull/27)

## 0.9.6 2024-03-19

* [Add method `getInstance` to IProtyle](https://github.com/siyuan-note/petal/pull/25)

## 0.9.5 2024-03-05

* [Update `Dialog`](https://github.com/siyuan-note/petal/issues/24)

## 0.9.4 2024-02-20

* [Add plugin event bus `click-flashcard-action`](https://github.com/siyuan-note/siyuan/issues/10318)

## 0.9.3 2024-01-30

* [Improve Global.Lute type](https://github.com/siyuan-note/petal/issues/23)

## 0.9.2 2024-01-09

* [Add plugin `protyleOptions`](https://github.com/siyuan-note/siyuan/issues/10090)
* [Add plugin api `uninstall`](https://github.com/siyuan-note/siyuan/issues/10063)
* [Add plugin method `updateCards`](https://github.com/siyuan-note/siyuan/issues/10065)
* [Add plugin function `lockScreen`](https://github.com/siyuan-note/siyuan/issues/10063)
* [Add plugin event bus `lock-screen`](https://github.com/siyuan-note/siyuan/pull/9967)
* [Add plugin event bus `open-menu-inbox`](https://github.com/siyuan-note/siyuan/pull/9967)

## 0.9.1 2023-12-26

* [Set `plugin.name` to read-only](https://github.com/siyuan-note/siyuan/issues/9943)
* [Support `Dock Plugin` and `Command Palette` on mobile](https://github.com/siyuan-note/siyuan/issues/9926)

## 0.9.0 2023-12-05

* [Add plugin event bus `sync-start`, `sync-end`, and `sync-fail`](https://github.com/siyuan-note/siyuan/issues/9798)
* [Add plugin event bus `mobile-keyboard-show` and `mobile-keyboard-hide`](https://github.com/siyuan-note/siyuan/issues/9773)
* [Add some `Protyle` methods to the plugin API](https://github.com/siyuan-note/petal/issues/21)

## 0.8.9 2023-11-28

* [Add plugin method `openMobileFileById`](https://github.com/siyuan-note/siyuan/issues/9738)
* [Update openTab return value](https://github.com/siyuan-note/petal/pull/20/files)

## 0.8.8 2023-10-31

* [Export `Constants` to plugin](https://github.com/siyuan-note/siyuan/issues/9555)
* [Add plugin `app.appId`](https://github.com/siyuan-note/siyuan/issues/9538)
* [Add plugin event bus `switch-protyle`](https://github.com/siyuan-note/siyuan/issues/9454)

## 0.8.7 2023-10-24

* [Deprecated `loaded-protyle` use `loaded-protyle-static` instead](https://github.com/siyuan-note/siyuan/issues/9468)
* [Fix event defail for `loaded-protyle`](https://github.com/siyuan-note/petal/pull/18)
* [Add plugin event bus `paste`](https://github.com/siyuan-note/siyuan/issues/9452)

## 0.8.6 2023-10-17

* [Update some definitions](https://github.com/siyuan-note/petal/pull/17)

## 0.8.5 2023-10-10

* [Add plugin event bus `open-menu-doctree`](https://github.com/siyuan-note/siyuan/issues/9351)

## 0.8.4 2023-09-19

* [Improve `Menu`](https://github.com/siyuan-note/petal/pull/16)
* [Add plugin function `transaction`](https://github.com/siyuan-note/siyuan/issues/9172)
* [Add `CustomEvent` type definition](https://github.com/siyuan-note/petal/pull/15)

## 0.8.3 2023-09-05

* [Plugin API add openWindow and command.globalCallback](https://github.com/siyuan-note/siyuan/issues/9032)

## 0.8.2 2023-08-29

* [Improve IModel type definitions](https://github.com/siyuan-note/petal/pull/14)
* [Add plugin type `TProtyleAction`](https://github.com/siyuan-note/siyuan/issues/8988)
* [Add plugin event bus `destroy-protyle`](https://github.com/siyuan-note/siyuan/issues/9033)
* [Add plugin event bus `loaded-protyle-dynamic`](https://github.com/siyuan-note/siyuan/issues/9021)

## 0.8.1 2023-08-21

* [Plugin API add getOpenedTab method](https://github.com/siyuan-note/siyuan/issues/9002)
* [Plugin API custom.fn => custom.id in openTab](https://github.com/siyuan-note/siyuan/issues/8944)

## 0.8.0 2023-08-15

* [Add plugin event bus `open-siyuan-url-plugin` and `open-siyuan-url-block`](https://github.com/siyuan-note/siyuan/pull/8927)

## 0.7.9 2023-08-01

* [Add parameter dialog to the "confirm" callback](https://github.com/siyuan-note/siyuan/issues/8851)
* [Add protyle to the Protyle class](https://github.com/siyuan-note/petal/issues/12)

## 0.7.8 2023-07-18

* [Add `input-search` event bus to plugins](https://github.com/siyuan-note/siyuan/issues/8725)

## v0.7.7

* [Add `open-menu-breadcrumbmore` event bus to plugins](https://github.com/siyuan-note/siyuan/issues/8666)

## v0.7.6

* [Add plugin name to command palette](https://github.com/siyuan-note/siyuan/issues/8644)
* [Add `open-menu-xxx` event bus for plugins](https://github.com/siyuan-note/siyuan/issues/8617)

## v0.7.5

* [Add protyleSlash to the plugin](https://github.com/siyuan-note/siyuan/issues/8599)
* [Add plugin API protyle ](https://github.com/siyuan-note/siyuan/issues/8445)
* [Add ICommand.langText and change the type of i18n](https://github.com/siyuan-note/petal/pull/11)

## v0.7.4 2023-06-13

1. [Add `beforeDestroy`](https://github.com/siyuan-note/siyuan/issues/8467)

## v0.7.2

1. 更换为 SiYuan 官方 API

## v0.7.0

1. 添加版本自动判断
2. 添加插件系统内置配置页面支持插件注入
3. 修复export classes

## v0.5.0

1. 插件系统国际化
2. 插件支持卸载
3. 插件商店预览功能

## v0.4.0

1. 插件系统已支持浏览器使用，需思源2.8.1及以上版本。 **注意：大量插件目前对web的支持并不好，需要等待插件开发者进行适配。建议还是在桌面端使用。**
2. 升级过程中将原版代码挂件loader迁移到挂件版路径，但不会下载挂件。
3. 挂件版用户记得更新到最新版本挂件

## v0.3.21

+ 挂件版本不进行自动升级，即使勾选了自动升级功能

## v0.3.20

+ 新增功能：命令面板
+ 重构：修改vite构建脚本，移除dist

## v0.3.19

+ 修改图标
+ eslint重构代码

## v0.3.13

+ 增加插件商店，并可配置插件商店地址
+ 暴露PluginSystem及Ioc容器到window对象

## v0.3.12

+ 重构API接口，支持自动化导出api类型声明

## v0.3.11

+ 增加通过Plugin继承调用registerCommand，实现插件快捷键注册。未来将通过此方式开发命令面板。

## v0.3.10

+ 修复没有plugins时初次安装遇到的问题

## v0.3.9

+ 适配思源2.7.7，调整配置界面布局
