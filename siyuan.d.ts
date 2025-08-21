import {
    IGetDocInfo,
    IGetTreeStat,
    IMenuBaseDetail,
    Config,
    Custom,
    Dock,
    IMenu,
    IObject,
    IPosition,
    ISiyuan,
    IWebSocketData,
    IProtyle,
    Lute,
    Protyle,
    Toolbar,
    IProtyleOptions,
    TProtyleAction,
    subMenu,
    App,
    Files,
    Tab, Model,
    IMenuItem, IRefDefs, MobileCustom,
} from "./types";

export * from "./types";

declare global {
    export interface Window extends Global {
    }
}

export type TDock = "file" | "outline" | "inbox" | "bookmark" | "tag" | "graph" | "globalGraph" | "backlink"

export type TCardType = "doc" | "notebook" | "all"

export type TEventBus = keyof IEventBusMap

export type TPluginDockPosition = "LeftTop" | "LeftBottom" | "RightTop" | "RightBottom" | "BottomLeft" | "BottomRight"

export type TOperation =
    "insert"
    | "update"
    | "delete"
    | "move"
    | "foldHeading"
    | "unfoldHeading"
    | "setAttrs"
    | "updateAttrs"
    | "append"
    | "insertAttrViewBlock"
    | "removeAttrViewBlock"
    | "addAttrViewCol"
    | "removeAttrViewCol"
    | "addFlashcards"
    | "removeFlashcards"
    | "updateAttrViewCell"
    | "updateAttrViewCol"
    | "updateAttrViewColTemplate"
    | "sortAttrViewRow"
    | "sortAttrViewCol"
    | "sortAttrViewKey"
    | "setAttrViewColPin"
    | "setAttrViewColHidden"
    | "setAttrViewColWrap"
    | "setAttrViewColWidth"
    | "updateAttrViewColOptions"
    | "removeAttrViewColOption"
    | "updateAttrViewColOption"
    | "setAttrViewName"
    | "doUpdateUpdated"
    | "duplicateAttrViewKey"
    | "setAttrViewColIcon"
    | "setAttrViewFilters"
    | "setAttrViewSorts"
    | "setAttrViewColCalc"
    | "updateAttrViewColNumberFormat"
    | "replaceAttrViewBlock"
    | "addAttrViewView"
    | "setAttrViewViewName"
    | "removeAttrViewView"
    | "setAttrViewViewIcon"
    | "duplicateAttrViewView"
    | "sortAttrViewView"
    | "setAttrViewPageSize"
    | "updateAttrViewColRelation"
    | "moveOutlineHeading"
    | "updateAttrViewColRollup"
    | "hideAttrViewName"
    | "setAttrViewCardSize"
    | "setAttrViewCardAspectRatio"
    | "setAttrViewCoverFrom"
    | "setAttrViewCoverFromAssetKeyID"
    | "setAttrViewFitImage"
    | "setAttrViewShowIcon"
    | "setAttrViewWrapField"
    | "setAttrViewColDate"
    | "unbindAttrViewBlock"
    | "setAttrViewViewDesc"
    | "setAttrViewColDesc"
    | "setAttrViewBlockView"
    | "setAttrViewGroup"
    | "syncAttrViewTableColWidth"

export interface Global {
    Lute: typeof Lute;
    siyuan: ISiyuan;
}

export interface IEventBusMap {
    "click-flashcard-action": {
        card: ICard,
        type: string,   // 1 - 重来；2 - 困难；3 - 良好；4 - 简单；-1 - 显示答案；-2 - 上一个 ；-3 - 跳过
    };
    "click-blockicon": {
        menu: subMenu,
        protyle: IProtyle,
        blockElements: HTMLElement[],
    };
    "click-editorcontent": {
        protyle: IProtyle,
        event: MouseEvent,
    };
    "click-editortitleicon": {
        menu: subMenu,
        protyle: IProtyle,
        data: IGetDocInfo,
    };
    "click-pdf": {
        event: MouseEvent,
    };
    "closed-notebook": IWebSocketData;
    "destroy-protyle": {
        protyle: IProtyle,
    };
    "input-search": {
        protyle: Protyle,
        config: Config.IUILayoutTabSearchConfig,
        searchElement: HTMLInputElement,
    };
    "loaded-protyle-dynamic": {
        protyle: IProtyle,
        position: "afterend" | "beforebegin",
    };
    "loaded-protyle-static": {
        protyle: IProtyle,
    };
    "lock-screen": void;
    "switch-protyle": {
        protyle: IProtyle,
    };
    "switch-protyle-mode": {
        protyle: IProtyle,
    };
    "open-menu-av": IMenuBaseDetail & { selectRowElements: HTMLElement[] };
    "open-menu-blockref": IMenuBaseDetail;
    "open-menu-breadcrumbmore": {
        menu: subMenu,
        protyle: IProtyle,
        data: IGetTreeStat,
    };
    "open-menu-content": IMenuBaseDetail & { range: Range };
    "open-menu-fileannotationref": IMenuBaseDetail;
    "open-menu-image": IMenuBaseDetail;
    "open-menu-link": IMenuBaseDetail;
    "open-menu-tag": IMenuBaseDetail;
    "open-menu-doctree": {
        menu: subMenu,
        elements: NodeListOf<HTMLElement>,
        type: "doc" | "docs" | "notebook",
    };
    "open-menu-inbox": {
        menu: subMenu,
        element: HTMLElement,
        ids: string[],
    };
    "open-noneditableblock": {
        protyle: IProtyle,
        toolbar: Toolbar,
        blockElement: HTMLElement,
        renderElement: HTMLElement,
    };
    "open-siyuan-url-block": {
        url: string,
        id: string,
        focus: boolean,
        exist: boolean,
    };
    "open-siyuan-url-plugin": {
        url: string,
    };
    "opened-notebook": IWebSocketData;
    "paste": {
        protyle: IProtyle,
        resolve: new <T>(value: T | PromiseLike<T>) => void,
        textHTML: string,
        textPlain: string,
        siyuanHTML: string,
        files: FileList | DataTransferItemList | string[]; // 读取本地文件时为 string[]
    };
    "ws-main": IWebSocketData;
    "sync-start": IWebSocketData;
    "sync-end": IWebSocketData;
    "sync-fail": IWebSocketData;
    "mobile-keyboard-show": void;
    "mobile-keyboard-hide": void;
}

export interface IPluginDockTab {
    position: TPluginDockPosition,
    size: Config.IUILayoutDockPanelSize,
    icon: string,
    hotkey?: string,
    title: string,
    index?: number
    show?: boolean
}

export interface ICommand {
    langKey: string, // 用于区分不同快捷键的 key, 同时作为 i18n 的字段名
    langText?: string, // 显示的文本, 指定后不再使用 langKey 对应的 i18n 文本
    /**
     * 目前需使用 MacOS 符号标识，顺序按照 ⌥⇧⌘，入 ⌥⇧⌘A
     * "Ctrl": "⌘",
     * "Shift": "⇧",
     * "Alt": "⌥",
     * "Tab": "⇥",
     * "Backspace": "⌫",
     * "Delete": "⌦",
     * "Enter": "↩",
     */
    hotkey: string,
    customHotkey?: string,
    callback?: () => void   // 其余回调存在时将不会触
    globalCallback?: () => void // 焦点不在应用内时执行的回调
    fileTreeCallback?: (file: Files) => void // 焦点在文档树上时执行的回调
    editorCallback?: (protyle: IProtyle) => void     // 焦点在编辑器上时执行的回调
    dockCallback?: (element: HTMLElement) => void    // 焦点在 dock 上时执行的回调
}

export interface ICard {
    deckID: string;
    cardID: string;
    blockID: string;
    nextDues: IObject;
    lapses: number;  // 遗忘次数
    lastReview: number;  // 最后复习时间
    reps: number;  // 复习次数
    state: number;   // 卡片状态 0：新卡
}

export interface ICardData {
    cards: ICard[],
    unreviewedCount: number
    unreviewedNewCardCount: number
    unreviewedOldCardCount: number
}

export function adaptHotkey(hotkey: string): string

export function confirm(title: string, text: string, confirmCallback?: (dialog: Dialog) => void, cancelCallback?: (dialog: Dialog) => void): void;

export function fetchPost(url: string, data?: any, callback?: (response: IWebSocketData) => void, headers?: IObject): void;

export function fetchSyncPost(url: string, data?: any): Promise<IWebSocketData>;

export function fetchGet(url: string, callback: (response: IWebSocketData) => void): void;

export function openWindow(options: {
    position?: {
        x: number,
        y: number,
    },
    height?: number,
    width?: number,
    tab?: Tab,
    doc?: {
        id: string; // 块 id
    },
}): void;

/**
 * 不支持移动端
 * @param {boolean} [wndActive=true] - 当前活动窗口是否为激活状态
 */
export function getActiveTab(wndActive?: boolean): Tab;

/**
 * @param {boolean} [wndActive=true] - 当前活动窗口是否为激活状态
 */
export function getActiveEditor(wndActive?: boolean): Protyle;

export function openMobileFileById(app: App, id: string, action?: TProtyleAction[]): void;

export function openTab(options: {
    app: App,
    doc?: {
        id: string, // 块 id
        action?: TProtyleAction[],
        zoomIn?: boolean, // 是否缩放
    };
    pdf?: {
        path: string,
        page?: number,  // pdf 页码
        id?: string,    // File Annotation id
    };
    asset?: {
        path: string,
    };
    search?: Config.IUILayoutTabSearchConfig;
    card?: {
        type: TCardType,
        id?: string, //  cardType 为 all 时不传，否则传文档或笔记本 id
        title?: string, //  cardType 为 all 时不传，否则传文档或笔记本名称
    };
    custom?: {
        id: string, // 插件名称+页签类型：plugin.name + tab.type
        icon: string,
        title: string,
        data?: any,
    };
    position?: "right" | "bottom";
    keepCursor?: boolean; // 是否跳转到新 tab 上
    removeCurrentTab?: boolean; // 在当前页签打开时需移除原有页签
    openNewTab?: boolean // 使用新页签打开
    afterOpen?: () => void; // 打开后回调
}): Promise<Tab>

export function getFrontend(): "desktop" | "desktop-window" | "mobile" | "browser-desktop" | "browser-mobile";

export function getBackend(): "windows" | "linux" | "darwin" | "docker" | "android" | "ios" | "harmony";

export function lockScreen(app: App): void

export function exitSiYuan(): void

export function getAllEditor(): Protyle[]

export function getAllModels(): {
    editor: [],
    graph: [],
    asset: [],
    outline: [],
    backlink: [],
    search: [],
    inbox: [],
    files: [],
    bookmark: [],
    tag: [],
    custom: [],
}

export function openSetting(app: App): Dialog | undefined;

export function getModelByDockType(type: TDock | string): Model | any;

/**
 * @param {IObject} [options.data] - 块属性值
 * @param {HTMLElement} [options.nodeElement] - 块元素
 * @param {"bookmark" | "name" | "alias" | "memo" | "av" | "custom"} [options.focusName="bookmark"] - av 为数据库页签，custom 为自定义页签，其余为内置输入框
 * @param {IProtyle} [options.protyle] - 有数据库时需要传入 protyle
 */
export function openAttributePanel(options: {
    data?: IObject
    nodeElement?: HTMLElement,
    focusName: "bookmark" | "name" | "alias" | "memo" | "av" | "custom",
    protyle?: IProtyle,
}): void;

/**
 * 保存布局
 * @param {function} [cb] - 保存后的回调函数
 */
export function saveLayout(cb: () => void): void;

/**
 * 全局命令
 * @param {string} command - 命令名称 https://github.com/siyuan-note/siyuan/blob/master/app/src/boot/globalEvent/command/global.ts#L71
 * @param {App} app
 */
export function globalCommand(command: string, app: App): void;

/**
 * @param {number} [timeout=6000] - ms. 0: manual close；-1: always show;
 * @param {string} [type=info]
 */
export function showMessage(text: string, timeout?: number, type?: "info" | "error", id?: string): void;

export function hideMessage(id?: string): void;

export abstract class Plugin {
    eventBus: EventBus;
    i18n: IObject;
    data: any;
    displayName: string;
    readonly name: string;
    app: App;
    commands: ICommand[];
    setting: Setting;
    protyleSlash: {
        filter: string[],
        html: string,
        id: string,
        callback(protyle: Protyle, nodeElement: HTMLElement): void,
    }[];
    protyleOptions: IProtyleOptions;

    constructor(options: {
        app: App,
        name: string,
        i18n: IObject,
    });

    onload(): void;

    onunload(): void;

    uninstall(): void;

    onLayoutReady(): void;

    /**
     * Must be executed before the synchronous function.
     * @param {string} [options.position=right]
     * @param {string} options.icon - Support svg id or svg tag.
     */
    addTopBar(options: {
        icon: string,
        title: string,
        callback: (event: MouseEvent) => void
        position?: "right" | "left"
    }): HTMLElement;

    /**
     * Must be executed before the synchronous function.
     * @param {string} [options.position=right]
     */
    addStatusBar(options: {
        element: HTMLElement,
        position?: "right" | "left",
    }): HTMLElement;

    openSetting(): void;

    loadData(storageName: string): Promise<any>;

    saveData(storageName: string, content: any): Promise<void>;

    removeData(storageName: string): Promise<any>;

    addIcons(svg: string): void;

    getOpenedTab(): { [key: string]: Custom[] };

    /**
     * Must be executed before the synchronous function.
     */
    addTab(options: {
        type: string,
        beforeDestroy?: (this: Custom) => void,
        destroy?: (this: Custom) => void,
        resize?: (this: Custom) => void,
        update?: (this: Custom) => void,
        init: (this: Custom) => void,
    }): () => Custom;

    /**
     * Add Custom to Dock.
     * Must be executed before the synchronous function.
     */
    addDock(options: {
        config: IPluginDockTab,
        data: any,
        type: string,
        destroy?: (this: Custom | MobileCustom) => void,
        resize?: (this: Custom | MobileCustom) => void,
        update?: (this: Custom | MobileCustom) => void,
        init: (this: Custom | MobileCustom, dock: Custom | MobileCustom) => void,
    }): { config: IPluginDockTab, model: Custom | MobileCustom };

    addCommand(options: ICommand): void;

    addFloatLayer(options: {
        refDefs: IRefDefs[],
        x?: number,
        y?: number,
        targetElement?: HTMLElement,
        originalRefBlockIDs?: IObject,
        isBacklink: boolean,
    }): void;

    updateCards(options: ICardData): Promise<ICardData> | ICardData;

    updateProtyleToolbar(toolbar: Array<string | IMenuItem>): Array<string | IMenuItem>;
}

export class Setting {
    constructor(options: {
        height?: string,
        width?: string,
        destroyCallback?: () => void,
        confirmCallback?: () => void,
    });

    addItem(options: {
        title: string,
        direction?: "column" | "row"
        description?: string,
        actionElement?: HTMLElement,
        createActionElement?(): HTMLElement,
    }): void;

    open(name: string): void;
}

export class EventBus {
    on<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, listener: (event: CustomEvent<D>) => any): void;

    once<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, listener: (event: CustomEvent<D>) => any): void;

    off<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, listener: (event: CustomEvent<D>) => any): void;

    emit<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, detail?: D): boolean;
}

export class Dialog {

    element: HTMLElement;
    editors: { [key: string]: Protyle };
    data: any;

    constructor(options: {
        positionId?: string,
        title?: string,
        transparent?: boolean,
        content: string,
        width?: string,
        height?: string,
        destroyCallback?: (options?: IObject) => void,
        disableClose?: boolean,
        hideCloseIcon?: boolean,
        disableAnimation?: boolean,
        resizeCallback?: (type: string) => void
    });

    destroy(options?: IObject): void;

    bindInput(inputElement: HTMLInputElement | HTMLTextAreaElement, enterEvent?: () => void): void;
}

export class Menu {
    private menu;
    isOpen: boolean;
    element: HTMLElement;

    constructor(id?: string, closeCB?: () => void);

    showSubMenu(subMenuElement: HTMLElement): void;

    addItem(option: IMenu): HTMLElement;

    addSeparator(options?: {
        index?: number,
        id?: string,
        ignore?: boolean
    }): HTMLElement;

    open(options: IPosition): void;

    /**
     * @param {string} [position=all]
     */
    fullscreen(position?: "bottom" | "all"): void;

    close(): void;
}
