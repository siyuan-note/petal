# SiYuan Plugin API

Here is the API declaration of SiYuan Plugin System, usages please refer to  [SiYuan plugin sample](https://github.com/siyuan-note/plugin-sample).

## Top bar context menus

Subscribe to `open-menu-topbar` to insert actions before the built-in visibility controls in desktop and browser top bar context menus. `element` is the registered top bar element and `entryPath` is its full visibility configuration path; both are `null` when opening the menu on blank space. All subscribers receive the event, so filter by your own element when appropriate. Custom top bar elements are supported too.

```typescript
const button = this.addTopBar({
    id: "tools",
    icon: "iconPlugin",
    title: this.i18n.tools,
});
this.eventBus.on("open-menu-topbar", ({detail}) => {
    if (detail.element !== button) {
        return;
    }
    detail.menu.addItem({
        id: "my-plugin-settings",
        icon: "iconSettings",
        label: this.i18n.settings,
        click: () => this.openSetting(),
    });
});
```

Add items synchronously during the callback; prepare asynchronous data beforehand. SiYuan inserts a separator after visible plugin actions and removes leading, trailing, and consecutive separators from this group. When migrating an existing button, remove its independent `contextmenu` handler that opens another menu or stops propagation. Existing handlers are not forcibly intercepted. This event does not extend dock or status bar menus.

## Plugin publishing

Use `Plugin.savePublishData` in the administrator environment to replace a snapshot of explicitly selected public scalar fields. Published pages read that snapshot with `Plugin.loadPublishData`; `loadData` continues to access private storage. Declare fields in `plugin.json` under `publish.data` and obtain the administrator's separate data grant. Declare extra frontend files under `publish.resources`. See [Plugin publishing](https://github.com/siyuan-note/siyuan/blob/master/docs/PLUGIN-PUBLISH.md) for authorization, lifecycle, limits, HTTP contracts, and migration examples.

## Flashcard review tabs

```typescript
openTab({
    app,
    card: {
        type: "all",
        reviewSetIDs: ["history-set-id", "language-set-id", "math-set-id"],
        reviewMode: "normal",
    },
});
```

`reviewSetIDs` selects the union of the specified decks, with duplicate cards removed. An empty array is rejected. Each card retains its own scheduler preset and daily allowance. The mixed session uses workspace queue limits and the default priority/due ordering, rather than combining deck limits or ordering.

Optional `card.query` uses the version 1 flashcard query AST and intersects with the selected decks and the scope specified by `type`/`id`. For example, select several documents using `{version: 1, root: {operator: "predicate", field: "rootID", comparator: "in", value: ["doc-a", "doc-b"]}}`. Existing `type`, `id`, and `title` calls remain supported. New calls open the v2 review UI. Closing a tab ends its session; restoring its layout starts a fresh session using the saved selection.

Legacy saved flashcard tabs are also converted to v2 sessions with the same global, document, or notebook scope. Stale card queues and cursors are discarded; the legacy tab renderer is no longer used.
