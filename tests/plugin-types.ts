import {Constants, Menu, ProtyleMethod} from "../siyuan";
import type {APIPOSTRoutes, AVTable, AVValueLocation, AVView, Config, IBlock, IPosition, IProtyle, IScrollAttr, ISiyuan} from "../siyuan";
import type {IAVNewItemTemplate} from "../types";

declare const editor: Config.IEditor;
const headings: boolean = editor.headingNumber;
const loaded: boolean = editor.keepLoadedContent;
const database: boolean = editor.databaseAttrShow;
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
