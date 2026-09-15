# SiYuan Plugin API

[SiYuan plugin sample](https://github.com/siyuan-note/plugin-sample)

## Top bar context menus

Pass `contextMenu` to `addTopBar()` to add actions to that button's desktop or browser context menu. It also works with a custom `element`. Other buttons and blank top bar space do not invoke this callback.

```typescript
this.addTopBar({
    id: "tools",
    icon: "iconPlugin",
    title: this.i18n.tools,
    contextMenu: (menu) => {
        menu.addItem({
            id: "my-plugin-settings",
            icon: "iconSettings",
            label: this.i18n.settings,
            click: () => this.openSetting(),
        });
    },
});
```

Add items synchronously; prepare asynchronous data beforehand. Actions appear before the visibility controls, with an automatic separator after visible actions. Leading, trailing, and consecutive separators are removed from this group. Updating the same button replaces its callback; omitting `contextMenu` clears it. Remove independent `contextmenu` handlers that stop propagation or open a separate menu when adopting this API. The experimental `open-menu-topbar` event has been replaced by this button-specific callback.
