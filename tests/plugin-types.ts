import {Constants, Menu, ProtyleMethod, openDocTreeMenu} from "../siyuan";
import type {APIPOSTRoutes, AVRenderData, AVTable, AVValueLocation, AVView, Config, IAV, IBlock, IPosition, IProtyle, IScrollAttr, ISiyuan, TransactionOperationRequest} from "../siyuan";
import type {IAVNewItemTemplate} from "../types";
import type {Files} from "../types/layout/dock/Files";

const iconPaths: APIPOSTRoutes["/api/filetree/getDocPaths"]["request"] = {notebook: "notebook", ids: ["document"], includeIcons: true};
const defaultPaths: APIPOSTRoutes["/api/filetree/getDocPaths"]["request"] = {notebook: "notebook", ids: ["document"]};
// @ts-expect-error 图标开关只接受布尔值。
const invalidIconPaths: APIPOSTRoutes["/api/filetree/getDocPaths"]["request"] = {notebook: "notebook", ids: ["document"], includeIcons: "true"};
declare const iconPathsResult: APIPOSTRoutes["/api/filetree/getDocPaths"]["response"];
if (iconPathsResult.code === 0) {
    const icons: Record<string, string> | undefined = iconPathsResult.data.icons;
    void icons;
}

const collectionRemovalPreview: APIPOSTRoutes["/api/av/previewCollectionRemoval"]["request"] = {
    operations: [{action: "update", id: "20260101000000-source1", data: "<div>Reference text</div>"}],
    tagChanges: [{id: "20260101000000-source1", tags: ["removed"]}],
};
declare const collectionRemovalResult: APIPOSTRoutes["/api/av/previewCollectionRemoval"]["response"];
if (collectionRemovalResult.code === 0 && collectionRemovalResult.data) {
    const sourceVersions: Record<string, string> = collectionRemovalResult.data.sourceVersions;
    const removalTransaction: APIPOSTRoutes["/api/transactions"]["request"] = {
        reqId: 1,
        transactions: [{collectionRemovalSourceVersions: sourceVersions, doOperations: collectionRemovalPreview.operations}],
    };
    void removalTransaction;
}
// @ts-expect-error Source versions must contain hashes, not numeric revisions.
const invalidCollectionRemovalVersion: APIPOSTRoutes["/api/transactions"]["request"] = {reqId: 1, transactions: [{collectionRemovalSourceVersions: {root: 1}}]};
// @ts-expect-error A source preview must include the proposed operations.
const incompleteCollectionRemovalPreview: APIPOSTRoutes["/api/av/previewCollectionRemoval"]["request"] = {tagChanges: []};

declare const memoryOverview: APIPOSTRoutes["/api/ai/memory/overview"]["response"];
if (memoryOverview.code === 0) {
    const usableMemoryCount: number = memoryOverview.data.count;
    const completeMemoryCount: boolean = memoryOverview.data.countComplete;
    const unifiedMemory: string = memoryOverview.data.memory;
    // @ts-expect-error The completeness flag is not a count.
    const invalidMemoryCount: number = memoryOverview.data.countComplete;
}
const memoryDisplay: APIPOSTRoutes["/api/ai/memory/translate"]["request"] = {memory: "Current overview", language: "zh-CN"};
// @ts-expect-error A display request must identify the current interface language.
const incompleteMemoryDisplay: APIPOSTRoutes["/api/ai/memory/translate"]["request"] = {memory: "Current overview"};
declare const memoryDisplayResult: APIPOSTRoutes["/api/ai/memory/translate"]["response"];
if (memoryDisplayResult.code === 0) {
    const displayMarkdown: string = memoryDisplayResult.data.memory;
    const displayLanguage: string = memoryDisplayResult.data.language;
}

declare const documentTree: Files;
const documentTreeItems: {id: string; path: string; notebookId: string}[] = documentTree.getSelectedItems();
const documentTreeRows: NodeListOf<HTMLElement> = documentTree.getSelectionElements();

const documentMenuOpened: Promise<boolean> = openDocTreeMenu({
    position: {x: 20, y: 40, w: 12, h: 16},
    items: [{notebookId: "notebook", id: "document"}],
});
const notebookMenuOpened: Promise<boolean> = openDocTreeMenu({items: [{notebookId: "notebook"}]});
const notebooksMenuOpened: Promise<boolean> = openDocTreeMenu({
    items: [{notebookId: "notebook"}, {notebookId: "other"}],
});
const documentsMenuOpened: Promise<boolean> = openDocTreeMenu({
    position: {x: 20, y: 40},
    items: [{notebookId: "notebook", id: "first"}, {notebookId: "notebook", id: "second"}],
});
const mixedMenuOpened: Promise<boolean> = openDocTreeMenu({
    position: {x: 20, y: 40},
    items: [{notebookId: "notebook"}, {notebookId: "notebook", id: "notebook"},
        {notebookId: "other", id: "document"}],
});
// @ts-expect-error 每个目标必须指定笔记本。
openDocTreeMenu({items: [{id: "document"}]});
// @ts-expect-error 文档 ID 必须为字符串。
openDocTreeMenu({items: [{notebookId: "notebook", id: 1}]});
// @ts-expect-error 弹出位置使用 client 坐标，不接受文档树行。
openDocTreeMenu({position: {x: 20, y: 40, target: document.body}, items: [{notebookId: "notebook"}]});
// @ts-expect-error 打开结果为异步布尔值。
const synchronousMenuOpened: boolean = openDocTreeMenu({items: [{notebookId: "notebook"}]});

declare const editor: Config.IEditor;
const headings: boolean = editor.headingNumber;
const loaded: boolean = editor.keepLoadedContent;
const database: boolean = editor.databaseAttrShow;
declare const web: Config.IAIWeb;
const exaKey: string = web.exaApiKey;
const setExaKey: APIPOSTRoutes["/api/setting/setAI"]["request"] = {web: {exaApiKey: "exa-key"}};
const clearExaKey: APIPOSTRoutes["/api/setting/setAI"]["request"] = {web: {exaApiKey: null}};
// @ts-expect-error Exa 密钥必须为字符串或 null。
const invalidExaKey: APIPOSTRoutes["/api/setting/setAI"]["request"] = {web: {exaApiKey: 1}};
declare const sync: Config.ISync;
const lan: boolean = sync.lan.enabled;
declare const appearance: Config.IAppearance;
const activeProfile: string = appearance.entryVisibility.active;
declare const bazaarAppearanceResponse: APIPOSTRoutes[
    "/api/bazaar/installBazaarIcon" | "/api/bazaar/uninstallBazaarIcon" |
    "/api/bazaar/installBazaarTheme" | "/api/bazaar/uninstallBazaarTheme"
]["response"];
if (bazaarAppearanceResponse.code === 0 && bazaarAppearanceResponse.data.appearance) {
    const bazaarAppearance = bazaarAppearanceResponse.data.appearance;
    const compactMode: boolean = bazaarAppearance.compactMode;
    const menuMouseScroll: boolean = bazaarAppearance.menuMouseScroll;
    const outlineKeepCurrentExpand: boolean = bazaarAppearance.outlineKeepCurrentExpand;
    const pdfTheme: {light: string; dark: string; annoColor: string} | null = bazaarAppearance.pdfTheme;
    const mobileBars: {autoHide: boolean | null; sidebarSwipe: boolean | null; sidebarButtons: boolean | null} | null = bazaarAppearance.mobileBars;
    // @ts-expect-error Appearance preferences retain boolean response types.
    const numericCompactMode: number = bazaarAppearance.compactMode;
}
declare const tab: Config.IUILayoutTabEditor;
const scroll: IScrollAttr | undefined = tab.scrollAttr;
declare const siyuan: ISiyuan;
const ready: boolean | undefined = siyuan.isReady;
const dragging: boolean | undefined = siyuan.dragTab?.pin;
declare const block: IBlock;
const number: string | undefined = block.number;
declare const position: IPosition;
const target: HTMLElement | undefined = position.target;
declare const menuButton: HTMLButtonElement;
ProtyleMethod.tabsRender(menuButton, {
    prepare: () => {},
    restore: tabs => {
        const element: HTMLElement = tabs;
        return element.dataset.active || "";
    },
    remember: (tabs, id) => {
        const element: HTMLElement = tabs;
        const activeID: string = id;
        element.dataset.active = activeID;
    },
});
ProtyleMethod.tabsRender(menuButton, {
    // @ts-expect-error 恢复回调必须返回页签 ID 字符串。
    restore: () => 1,
});
Menu.toggle({
    target: menuButton,
    build: menu => { menu.addItem({label: "Action"}); },
    show: menu => menu.open({...position, target: menuButton}),
});
Menu.toggle({
    target: menuButton,
    toggle: false,
    build: menu => { menu.addSeparator(); },
    show: menu => menu.fullscreen("bottom"),
});
const headingAttribute: string = Constants.CUSTOM_SY_HEADING_NUMBER;
const mindmapViewports: string = Constants.LOCAL_MINDMAP_VIEWPORTS;
declare const titleEditor: IProtyle;
const openTitle: Promise<void> = titleEditor.title.openEditor();
const openCurrentTitle: Promise<void> = titleEditor.title.openEditor(() => true);
// @ts-expect-error 异步标题聚焦必须使用返回布尔值的有效性检查。
titleEditor.title.openEditor(() => "stale");
const newItemTemplate: IAVNewItemTemplate = {id: "template", name: "Document", targetType: "document", openAfterCreate: false};
declare const legacyPathResponse: APIPOSTRoutes["/api/filetree/getIDsByHPath"]["response"];
if (legacyPathResponse.data && "reason" in legacyPathResponse.data && legacyPathResponse.data.reason === "pathAmbiguous") {
    const cleanIDs: string[] | undefined = legacyPathResponse.data.cleanIDs;
    const unsupportedIDs: string[] | undefined = legacyPathResponse.data.unsupportedIDs;
}
// @ts-expect-error 内核不再提供旧的 AI 配置常量。
Constants.LOCAL_AI;
// @ts-expect-error AI 配置中没有独立视觉模型配置。
declare const removedVision: Config.IAI["vision"];

const location: AVValueLocation = {name: "Office", longitude: 120, latitude: 0};
const tableLayout: AVView["type"] = "table";
// @ts-expect-error 地图布局不再属于数据库视图类型。
const removedMapLayout: AVView["type"] = "map";
// @ts-expect-error 表格数据不再提供地图设置。
declare const removedMapSettings: AVTable["map"];
// @ts-expect-error 内核不再提供地图运行时接口。
declare const removedMapRuntime: APIPOSTRoutes["/api/map/getRuntime"];
// @ts-expect-error 内核不再提供地图未定位条目接口。
declare const removedMapUnplaced: APIPOSTRoutes["/api/av/getAttributeViewMapUnplaced"];

const groupedImages: APIPOSTRoutes["/api/av/getCurrentAttrViewImages"]["request"] = {id: "av", groupID: "group"};
const allImages: APIPOSTRoutes["/api/av/getCurrentAttrViewImages"]["request"] = {id: "av"};
const nullImageGroup: APIPOSTRoutes["/api/av/getCurrentAttrViewImages"]["request"] = {id: "av", groupID: null};
// @ts-expect-error 分组 ID 必须为字符串。
const invalidImageGroup: APIPOSTRoutes["/api/av/getCurrentAttrViewImages"]["request"] = {id: "av", groupID: 1};

const nestedRead: APIPOSTRoutes["/api/av/renderAttributeView"]["request"] = {
    id: "av", nested: {expandedIDs: ["parent"], groupExpandedIDs: {group: ["parent"]},
        childPaging: {"group/parent": {page: 2, pageSize: 50}}},
};
// @ts-expect-error 展开条目必须使用条目 ID 数组。
const invalidNestedRead: APIPOSTRoutes["/api/av/renderAttributeView"]["request"] = {id: "av", nested: {expandedIDs: [1]}};
const enableSubItems: TransactionOperationRequest = {
    action: "setAttrViewSubItems", avID: "av", data: {enabled: true, parentName: "Parent", childrenName: "Children"},
};
const moveSubItems: TransactionOperationRequest = {
    action: "reparentAttrViewItems", avID: "av", srcIDs: ["child"], parentID: "parent", nextID: "sibling",
};
// @ts-expect-error 启用状态必须为布尔值。
const invalidSubItemsConfig: TransactionOperationRequest = {action: "setAttrViewSubItems", data: {enabled: "true"}};
declare const nestedResponse: AVRenderData;
const pluginDatabase: IAV = nestedResponse;
const nestedDisplay: "flat" | "nested" | undefined = pluginDatabase.views[0].subItemsDisplay;
const ancestorIDs: string[] | undefined = pluginDatabase.target?.ancestorIDs;
const nestedStatuses: APIPOSTRoutes["/api/av/getAttributeViewItemStatuses"]["request"] = {
    id: "av", itemIDs: ["child"], nested: {},
};
const visiblePasteRows: APIPOSTRoutes["/api/av/getAttributeViewPasteRows"]["request"] = {
    avID: "av", blockID: "carrier", startItemID: "child", count: 2, itemIDs: ["child", "sibling"],
};

// Related entry views keep item identity separate from physical block identity.
const relationDetailRender: APIPOSTRoutes["/api/av/renderAttributeView"]["request"] = {
    id: "target-av",
    relationContext: {sourceAvID: "source-av", sourceItemID: "source-item", relationKeyID: "relation-key"},
    temporaryFilters: [],
};
const relationDetailConfig: TransactionOperationRequest = {
    action: "setAttrViewRelationDetail", avID: "source-av", keyID: "relation-key",
    data: {spec: 1, enabled: true, viewID: "target-table"},
};
const relationMembershipChange: TransactionOperationRequest = {
    action: "updateAttrViewRelationItems", avID: "source-av", rowID: "source-item", keyID: "relation-key",
    data: {addItemIDs: ["target-item"], removeItemIDs: []},
};
// @ts-expect-error A relation context identifies the source item as well as its database and field.
const incompleteRelationContext: APIPOSTRoutes["/api/av/renderAttributeView"]["request"] = {id: "target", relationContext: {sourceAvID: "source", relationKeyID: "key"}};
// @ts-expect-error Related-view configuration is structured data, not a filter expression.
const invalidRelationDetailConfig: TransactionOperationRequest = {action: "setAttrViewRelationDetail", data: "filter"};

const relationDetailCandidates: APIPOSTRoutes["/api/av/getAttributeViewRelationCandidates"]["request"] = {
    avID: "source-av", keyID: "relation-key", includeNewItemPreview: true,
    relationContext: {sourceAvID: "source-av", sourceItemID: "source-item", relationKeyID: "relation-key"},
};

const relationDetailRow: APIPOSTRoutes["/api/av/getAttributeViewKeys"]["request"] = {
    avID: "target-av", itemID: "target-item", blockID: "source-carrier",
    relationContext: {sourceAvID: "source-av", sourceItemID: "source-item", relationKeyID: "relation-key"},
};
const relationFieldViews: APIPOSTRoutes["/api/av/getAttributeView"]["request"] = {
    id: "target-av", blockID: "source-carrier",
    relationFieldContext: {sourceAvID: "source-av", relationKeyID: "relation-key"},
};
const relationFilterLabels: APIPOSTRoutes["/api/av/getAttributeViewPrimaryKeyValues"]["request"] = {
    id: "dependency-av", blockID: "source-carrier",
    relationDependencyContext: {
        relationContext: {sourceAvID: "source-av", sourceItemID: "source-item", relationKeyID: "relation-key"},
        relationKeyIDs: ["target-relation-key"],
    },
};
const scopedEntryBacklinks: APIPOSTRoutes["/api/av/getAttributeViewBacklinks"]["request"] = {
    avID: "target-av", itemID: "target-item", blockID: "target-carrier",
};
const relatedCellCandidates: APIPOSTRoutes["/api/av/getAttributeViewRelationCandidates"]["request"] = {
    avID: "target-av", keyID: "target-relation-key", blockID: "root-carrier",
    relationCellContext: {
        relationContext: {sourceAvID: "root-av", sourceItemID: "root-item", relationKeyID: "root-key"},
        sourceItemIDs: ["member-item"],
    },
};
const relatedCellCreation: APIPOSTRoutes["/api/av/createAttributeViewRelationItem"]["request"] = {
    avID: "target-av", keyID: "target-relation-key", blockID: "root-carrier",
    cells: [{itemID: "member-item", relatedItemIDs: []}], preview: null,
    relationCellContext: {
        relationContext: {sourceAvID: "root-av", sourceItemID: "root-item", relationKeyID: "root-key"},
        sourceItemIDs: ["member-item"],
    },
};
// @ts-expect-error Dependency traversal uses actual relation field IDs.
const invalidDependencyPath: APIPOSTRoutes["/api/av/getAttributeView"]["request"] = {id: "target", relationDependencyContext: {relationContext: {sourceAvID: "source", sourceItemID: "item", relationKeyID: "key"}, relationKeyIDs: [1]}};
