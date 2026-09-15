# SiYuan Plugin API

Here is the API declaration of SiYuan Plugin System, usages please refer to  [SiYuan plugin sample](https://github.com/siyuan-note/plugin-sample).

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
