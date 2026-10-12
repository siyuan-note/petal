import {Config} from "../config";
import {App, Layout} from "../index";
import {Tab} from "./Tab";

export declare class Wnd {
    private app;
    id: string;
    parent?: Layout;
    element: HTMLElement;
    headersElement: HTMLElement;
    children: Tab[];
    resize?: Config.TUILayoutDirection;

    constructor(app: App, resize?: Config.TUILayoutDirection, parentType?: Config.TUILayoutType);

    showHeading(): void;

    /**
     * @param {boolean} [focusEditor] - 是否聚焦切换后的编辑器，默认仅在非手机和平板设备上聚焦
     */
    switchTab(target: HTMLElement, pushBack?: boolean, update?: boolean, resize?: boolean, isSaveLayout?: boolean,
              focusEditor?: boolean): void;

    addTab(tab: Tab, keepCursor?: boolean, isSaveLayout?: boolean, activeTime?: string): void;

    /** 切换当前分屏的页签列表菜单，默认定位到页签栏的切换按钮；focus 为 true 时启用键盘焦点 */
    renderTabList(target?: HTMLElement, focus?: boolean): void;
    private removeOverCounter;
    private destroyModel;
    private removeTabAction;

    removeTab(id: string, isBatchClose?: boolean, animate?: boolean, isSaveLayout?: boolean): void;

    moveTab(tab: Tab, nextId?: string): void;

    split(direction: Config.TUILayoutDirection, after?: boolean): Wnd;

    private remove;
}
