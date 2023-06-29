# Changelog

## v0.7.6

* [Add `open-menu-xxx` event bus for plugins ](https://github.com/siyuan-note/siyuan/issues/8617)

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
