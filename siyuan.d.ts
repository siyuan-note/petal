import type {
    IAssetUploadDecision,
    IAssetUploadInput,
    IAssetUploadPosition,
    IAssetUploadResult,
    IBlock,
    IClipboardData,
    IGetDocInfo,
    IGetTreeStat,
    IKernelPlugin,
    IKernelPluginState,
    IMenu,
    IMenuBaseDetail,
    IMenuItem,
    IModels,
    IObject,
    IPosition,
    IProtyle,
    IProtyleOptions,
    IRefDefs,
    ISiyuan,
    IWebSocketData,
    TAssetUploadSource,
    TAssetUploadTarget,
    TEditorMode,
    TProtyleAction,
} from "./types";
import {App, Config, Custom, Files, Lute, MobileCustom, Model, Protyle, subMenu, Tab, Toolbar,} from "./types";
import type {FetchGet, FetchPost, FetchSyncPost} from "./types/api";

export * from "./types";
export * from "./types/api";

declare global {
    export interface Window extends Global {
    }
}

export type TDock = "file" | "outline" | "inbox" | "bookmark" | "tag" | "graph" | "globalGraph" | "backlink" | "agentChat"

export type TTab = "Outline" | "Graph" | "Backlink" | "Asset" | "Editor" | "Search" | "siyuan-card"

export type TCardType = "doc" | "notebook" | "all"

export interface IFlashcardQueryExpression {
    operator: "matchAll" | "and" | "or" | "not" | "predicate";
    children?: IFlashcardQueryExpression[];
    field?: string;
    comparator?: string;
    value?: unknown;
}

export interface IFlashcardQueryAST {
    version: number;
    root: IFlashcardQueryExpression;
}

export type TEventBus = keyof IEventBusMap

export type TPluginDockPosition = "LeftTop" | "LeftBottom" | "RightTop" | "RightBottom" | "BottomLeft" | "BottomRight"
export type TPluginDataChangeReason = "sync" | "overwrite"

export type TOperation = import("./types").IOperation["action"];

export interface Global {
    Lute: typeof Lute;
    siyuan: ISiyuan;
}

export interface IEventBusMap {
    "before-hide-tooltip": {
        tooltipElement: HTMLElement,
    };
    /** 在桌面端搜索结果渲染前同步触发，blocks 仅包含当前页结果。 */
    "before-search-results-render": {
        protyle: Protyle,
        config: Config.IUILayoutTabSearchConfig,
        searchElement: HTMLInputElement,
        blocks: IBlock[],
    };
    "before-show-tooltip": {
        message: string,
        target: Element,
        tooltipElement: HTMLElement,
    };
    /** 不得在该事件上调用 `preventDefault()`，取消上传应使用 `respondWith({action: "cancel"})`；未取得全部资源路径时，HTML 粘贴将停止正文提交。 */
    "before-upload-assets": {
        requestId: string,
        /** PDF 标注等无编辑器上传场景不提供该字段。 */
        protyle?: IProtyle,
        source: TAssetUploadSource,
        target: TAssetUploadTarget,
        position?: IAssetUploadPosition,
        /** 替换输入必须保持的精确文件数量；各项还须与原输入按下标一一对应。 */
        requiredFileCount?: number,
        /** 当前目标支持的输入类型；未提供时支持 files 和 local-files。 */
        allowedInputKinds?: Array<IAssetUploadInput["kind"]>,
        input: IAssetUploadInput,
        /**
         * 插件处理阶段的取消信号；自定义 upload.handler 执行期间也会在编辑器销毁或超时时触发。
         * 标准传输开始后不再因编辑器销毁触发。
         */
        signal: AbortSignal,
        /** 必须同步调用且每次事件只允许调用一次；替换项须保持逻辑顺序，异步处理应传入 Promise，每个插件默认 120 秒超时。 */
        respondWith(response: IAssetUploadDecision | PromiseLike<IAssetUploadDecision>): void,
        /**
         * 必须同步注册，经思源前端上传协调层发起的资源写入成功、失败或取消时执行一次。
         * 注册该回调的插件卸载后不再执行。
         * 回调结果不表示父级正文或属性视图已完成写入，也不覆盖 HTTP API、CLI、MCP、同步、导入、历史恢复等内核写入。
         */
        onComplete(callback: (result: IAssetUploadResult) => void): void,
    };
    "common-menu-closed": {
        menu: HTMLElement,
        name: string | null,
        from: string | null,
    };
    "common-menu-open": {
        menu: HTMLElement,
        name: string | null,
        from: string | null,
        mode: "popup" | "fullscreen",
    };
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
        type: "doc" | "docs" | "notebook" | "notebooks" | "items",
        items: { id: string, path: string, notebookId: string }[],
    };
    "open-menu-inbox": {
        menu: subMenu,
        element: HTMLElement,
        ids: string[],
    };
    /**
     * 桌面端和桌面浏览器顶栏右键菜单事件，支持自定义顶栏元素，不扩展停靠栏或状态栏菜单。
     * 所有订阅者都会收到事件，插件应按自己的顶栏元素过滤；空白处的 element 和 entryPath 均为 null。
     * 必须在同步回调中添加项目，异步数据应提前准备；项目显示在内置显隐操作之前。
     * 宿主在可见插件项目之后添加分隔线，并移除此组首尾及连续的分隔线。
     * 使用此事件时应移除自行打开菜单或阻止传播的 contextmenu 监听器，宿主不会强制拦截已有监听器。
     */
    "open-menu-topbar": {
        // 在同步事件回调中添加项目，显示于显隐操作之前。
        menu: subMenu,
        // 顶栏空白处为 null，否则为注册的顶栏元素。
        element: Element | null,
        // 完整可见性配置路径，例如 topBar.barSync；空白处为 null。
        entryPath: string | null,
    };
    "open-asset": {
        path: string,
        action: Config.TAssetOpenAction,
        event?: MouseEvent,
    };
    "open-link": {
        href: string,
        originalHref: string,
        event?: MouseEvent | KeyboardEvent,
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
        /** 调用 `preventDefault()` 接管粘贴后必须在 120 秒内完成。 */
        resolve: (value: IClipboardData | PromiseLike<IClipboardData | undefined> | undefined) => void,
        textHTML: string,
        textPlain: string,
        siyuanHTML: string,
        localFiles: {
            path: string,
            size: number
        }[]
        files: FileList | DataTransferItemList
    };
    "ws-main": IWebSocketData;
    "sync-start": IWebSocketData;
    "sync-end": IWebSocketData;
    "sync-fail": IWebSocketData;
    "mobile-keyboard-show": void;
    "mobile-keyboard-hide": void;
    "code-language-update": { languages: string[], type: "init" | "match", listElement: HTMLElement, value: string };
    "code-language-change": {
        language: string,
        languageElements: HTMLElement[],
        protyle: IProtyle
    };
    "kernel-plugin-state-change": IKernelPluginState;
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

export interface ICommandContext {
    source: "commandPanel" | "shortcut" | "editorShortcut" | "fileTreeShortcut" | "dockShortcut" |
        "globalShortcut" | "keymap" | "menu" | "api",
    focus: "global" | "editor" | "fileTree" | "dock",
    protyle?: IProtyle,
    range?: Range,
    fileTree?: Files,
    dock?: HTMLElement,
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
    hotkey?: string,
    customHotkey?: string,
    hotkeys?: string[], // 默认快捷键列表，优先于 hotkey
    when?: (context: ICommandContext) => boolean,
    enabled?: (context: ICommandContext) => boolean,
    execute?: (context: ICommandContext) => void | Promise<void>
    callback?: (context?: ICommandContext) => void   // 其余回调存在时将不会触发
    globalCallback?: (context?: ICommandContext) => void // 焦点不在应用内时执行的回调
    fileTreeCallback?: (
        file: Files,
        context?: ICommandContext
    ) => void // 焦点在文档树上时执行的回调
    editorCallback?: (protyle: IProtyle, context?: ICommandContext) => void // 焦点在编辑器上时执行的回调
    dockCallback?: (element: HTMLElement, context?: ICommandContext) => void // 焦点在 dock 上时执行的回调
}

export interface IAgentCapabilityEffects {
    localRead?: boolean;
    localWrite?: boolean;
    dataEgress?: boolean;
    externalCost?: boolean;
}

export interface ICard {
    deckID: string;
    cardID: string;
    blockID: string;
    nextDues: Record<string, string>;
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

export type TEditorFontSizeAction = "increase" | "decrease" | "reset";

export interface IEditorFontSizeOptions {
    notify?: boolean;
}

export function adjustEditorFontSize(action: TEditorFontSizeAction, options?: IEditorFontSizeOptions): number;

export function setEditorFontSize(fontSize: number, options?: IEditorFontSizeOptions): number;

export const fetchPost: FetchPost<IWebSocketData>;

export const fetchSyncPost: FetchSyncPost<IWebSocketData>;

export const fetchGet: FetchGet<IWebSocketData | IObject | string>;

export function openWindow(options: {
    position?: {
        x: number,
        y: number,
    },
    height?: number,
    width?: number,
    tab?: Tab,
    alwaysOnTop?: boolean,
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

export function expandDocTree(options: {
    id: string,
    isSetCurrent?: boolean
}): void;

export function openMobileFileById(app: App, id: string, action?: TProtyleAction[]): void;

/**
 * @param {string} [options.doc.mode="wysiwyg"] - 只在首次打开时生效，切换可调用 switchMode 方法
 */
export function openTab(options: {
    app: App,
    doc?: {
        id: string, // 块 id
        action?: TProtyleAction[],
        zoomIn?: boolean, // 是否缩放
        mode?: TEditorMode
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
    /**
     * 打开 v2 闪卡复习会话，兼容仅传 type、id、title 的调用。
     * 关闭页签会结束会话，恢复布局时按保存的选择新建会话。
     * 旧版闪卡页签恢复时保留全局、文档或笔记本范围，转换为 v2 会话，不复用旧队列和游标。
     */
    card?: {
        type: TCardType,
        id?: string, //  cardType 为 all 时不传，否则传文档或笔记本 id
        title?: string, //  cardType 为 all 时不传，否则传文档或笔记本名称
        // 多个卡包取并集并去重；与文档范围、查询条件取交集，不能传空数组
        // 每张卡保留自身调度预设和每日额度；混合会话采用工作空间队列限制及默认优先级、到期排序。
        // 不合并各卡包的队列限制或排序设置。
        reviewSetIDs?: string[];
        // 有序卡片 ID，按首次出现去重；与范围、查询取交集，仍受复习资格和额度限制，不能传空数组
        cardIDs?: string[];
        // 版本 1 查询 AST，与所选卡包及 type/id 范围取交集。
        query?: IFlashcardQueryAST;
        reviewMode?: "normal" | "reinforcement";
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

export function saveExportFile(uri: string, msgId?: string): Promise<void>;

export function getAllTabs(type?: TTab | string): Tab[]

export function getAllModels(): IModels

export function openSetting(app: App): Dialog | undefined;

export function openEmoji(options: {
    position: IPosition,
    selectedCB?: (emoji: string) => void,
    dynamicIconURL?: string
    hideDynamicIcon?: boolean
    hideCustomIcon?: boolean
}): void ;

export function getModelByDockType(type: TDock | string): Model | any;

/**
 * 显示、隐藏或切换左侧停靠栏面板。移动端、独立窗口或布局尚未初始化时调用无操作并返回 false。
 * @param {boolean} [visible] - 不传时切换显隐，传入时设置显隐
 * @returns 该组是否有活动工具且未被整体收起；空组返回 false，浮动面板暂时未悬停显示仍返回 true
 */
export function toggleLeftDock(visible?: boolean): boolean;

/**
 * 显示、隐藏或切换右侧停靠栏面板。移动端、独立窗口或布局尚未初始化时调用无操作并返回 false。
 * @param {boolean} [visible] - 不传时切换显隐，传入时设置显隐
 * @returns 该组是否有活动工具且未被整体收起；空组返回 false，浮动面板暂时未悬停显示仍返回 true
 */
export function toggleRightDock(visible?: boolean): boolean;

/**
 * 显示、隐藏或切换下侧停靠栏面板。移动端、独立窗口或布局尚未初始化时调用无操作并返回 false。
 * @param {boolean} [visible] - 不传时切换显隐，传入时设置显隐
 * @returns 该组是否有活动工具且未被整体收起；空组返回 false，浮动面板暂时未悬停显示仍返回 true
 */
export function toggleBottomDock(visible?: boolean): boolean;

/**
 * 移动端、独立窗口或布局尚未初始化时返回 false。
 * @returns 左侧组是否有活动工具且未被整体收起；浮动面板暂时未悬停显示仍返回 true
 */
export function isLeftDockVisible(): boolean;

/**
 * 移动端、独立窗口或布局尚未初始化时返回 false。
 * @returns 右侧组是否有活动工具且未被整体收起；浮动面板暂时未悬停显示仍返回 true
 */
export function isRightDockVisible(): boolean;

/**
 * 移动端、独立窗口或布局尚未初始化时返回 false。
 * @returns 下侧组是否有活动工具且未被整体收起；浮动面板暂时未悬停显示仍返回 true
 */
export function isBottomDockVisible(): boolean;

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

/**
 * 前端插件生命周期契约。
 *
 * 同一插件实例的 `onload`、`onLayoutReady`、`onDataChanged`、`onunload` 与 `uninstall` 在拆除截止时间前严格串行，
 * 并等待钩子返回的 Promise。`onDataChanged` 仅在插件实例就绪后运行；若插件未覆盖基类实现，数据变更会改为重载整个插件。
 * 禁用、重载或卸载会在首次收到拆除请求时建立一份共享的 5 秒预算。等待 `onload`、内核初始化、`onLayoutReady` 或已经开始的
 * `onDataChanged`，以及后续的 `onunload` 和仅在从工作空间移除插件时运行的 `uninstall`，均使用同一份预算。尚未开始的
 * `onDataChanged` 会在禁用或卸载时丢弃。
 *
 * 截止时间后，JavaScript Promise 无法取消，超时钩子可能继续运行。思源仍会尽力调用每个剩余的拆除钩子一次，但不再等待，
 * 随后拆除宿主管理的资源。这 5 秒只限制思源等待 Promise 的时间，无法中断同步 JavaScript。关闭窗口或退出思源时，
 * 该操作不会触发前端插件生命周期钩子。
 */
export abstract class Plugin {
    eventBus: EventBus;
    i18n: Record<string, import("./types/api").JSONValue>;
    kernel: IKernelPlugin;
    data: any;
    displayName: string;
    readonly name: string;
    app: App;
    commands: ICommand[];
    setting: Setting;
    /**
     * 自定义块渲染器。键为插件内部的块类型；块信息使用编码后的插件包名和块类型组成。
     * 渲染函数只应修改传入的挂载元素，并可返回清理函数，不支持在其中嵌套 Protyle。
     * setContent 应在渲染函数返回后调用；只读状态或内容中某行移除编辑器光标标记并去除首尾空白后等于 ;;; 时返回 false。
     */
    customBlockRenders: {
        [key: string]: {
            render: (options: {
                element: HTMLElement,
                content: string,
                setContent: (content: string) => boolean,
            }) => void | (() => void)
        }
    };
    topBarIcons: Element[];
    statusBarIcons: Element[];
    agentActions: string[];
    models: {
        [key: string]: (options: { tab: Tab, data: any }) => Custom
    };
    docks: {
        [key: string]: {
            id: string,
            config: IPluginDockTab,
            model?: (options: { tab: Tab }) => Custom,
            mobileModel?: (element: Element) => MobileCustom
        }
    };
    protyleSlash: {
        filter: string[],
        html: string,
        id: string,
        /** 是否在精简版中显示。默认值：false */
        showInLite?: boolean,
        callback(protyle: Protyle, nodeElement: HTMLElement): void,
    }[];
    protyleOptions: IProtyleOptions;

    constructor(options: {
        app: App,
        name: string,
        displayName: string,
        i18n: Record<string, import("./types/api").JSONValue>,
    });

    /** 当前端插件实例启动时运行。 */
    onload(): Promise<void> | void;

    /**
     * 插件实例就绪后收到数据变更时运行；思源会等待返回的 Promise，未覆盖该方法时则重载整个插件。
     * @param reason 数据变更来源，sync 为跨设备同步合并，overwrite 为其他前端实例通过文件接口写入
     */
    onDataChanged(reason?: TPluginDataChangeReason): Promise<void> | void;

    /** 当前端插件实例被禁用、重载或卸载前运行一次。 */
    onunload(): Promise<void> | void;

    /**
     * 仅在从工作空间移除插件时，于 `onunload` 完成或思源停止等待后运行一次。
     */
    uninstall(): Promise<void> | void;

    /** 布局就绪时，在 `onload` 与内核初始化完成后运行一次。 */
    onLayoutReady(): Promise<void> | void;

    /**
     * 添加顶栏条目，自定义元素与图标共用排序、显隐和移除机制。
     * @param options.id 插件内唯一标识，重复调用时更新条目；传入不同元素时替换原元素。
     * @param options.position 默认位于右侧。
     * @param options.element 自定义元素，仅桌面端主窗口支持；移动端和独立窗口忽略本次调用。
     * 提供时忽略 icon 和 callback，保留元素的样式、内容和事件绑定，布局及交互由插件负责。
     * 思源设置 id、data-id（提供 id 时）、data-topbar-entry、data-location 和 aria-label。
     * 同一元素不能注册到多个 id；不传 id 重复注册同一元素时更新现有条目。
     * @param options.icon 未提供 element 时必填，支持 SVG ID 或 SVG 标签。
     * @param options.callback 图标条目的点击回调。
     */
    addTopBar(options: {
        id?: string,
        icon?: string,
        element?: HTMLElement,
        title: string,
        callback?: (event: MouseEvent) => void
        position?: "right" | "left"
    }): HTMLElement;

    removeTopBar(id: string): void;

    addBreadcrumbButton(options: {
        id: string,
        icon: string,
        title: string,
        callback: (event: MouseEvent, protyle: IProtyle) => void,
    }): string;

    removeBreadcrumbButton(id: string): void;

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

    /**
     * 读取已获管理员授权的公开快照，供发布页面使用；未授权或尚未生成时拒绝 Promise。
     * loadData 仍访问私有存储，读取公开快照失败时不得回退到私有存储。
     * 权限、生命周期、限制及 HTTP 契约见 https://github.com/siyuan-note/siyuan/blob/master/docs/PLUGIN-PUBLISH.zh-CN.md
     */
    loadPublishData(): Promise<Record<string, string | number | boolean | null>>;

    /**
     * 在管理员环境中完整替换公开快照，仅支持 plugin.json 的 publish.data 声明并获单独授权的标量字段。
     * 应逐一选择适合公开的字段；值仅支持字符串、数字、布尔值或 null，省略的字段会被移除。
     * 发布端所需的额外前端文件应在 plugin.json 的 publish.resources 中声明。
     * 权限、生命周期、限制及 HTTP 契约见 https://github.com/siyuan-note/siyuan/blob/master/docs/PLUGIN-PUBLISH.zh-CN.md
     */
    savePublishData(data: Record<string, string | number | boolean | null>): Promise<void>;

    saveData(storageName: string, content: any): Promise<any | IWebSocketData>;

    removeData(storageName: string): Promise<IWebSocketData>;

    addIcons(svg: string): void;

    getOpenedTab(): { [key: string]: Custom[] };

    /**
     * Must be executed before the synchronous function.
     */
    addTab(options: {
        type: string,
        destroy?: (this: Custom) => void,
        beforeDestroy?: (this: Custom) => void,
        resize?: (this: Custom) => void,
        update?: (this: Custom) => void,
        init: (this: Custom, custom: Custom) => void,
    }): (options: { tab: Tab, data: any }) => Custom;

    /**
     * Add Custom to Dock.
     * Must be executed before the synchronous function.
     * @param {string} [options.id] - Unique ID within the plugin. Defaults to options.type.
     */
    addDock(options: {
        id?: string,
        config: IPluginDockTab,
        data: any,
        type: string,
        destroy?: (this: Custom | MobileCustom) => void,
        resize?: (this: Custom) => void,
        update?: (this: Custom | MobileCustom) => void,
        init: (this: Custom | MobileCustom, custom: Custom | MobileCustom) => void,
    }): {
        id: string,
        config: IPluginDockTab,
        model?: (options: { tab: Tab }) => Custom,
        mobileModel?: (element: Element) => MobileCustom
    };

    removeDock(id: string): void;

    addCommand(options: ICommand): void;

    /**
     * 动态添加或更新编辑器工具栏按钮。name 必须是插件内稳定且唯一的自定义标识，不能使用内置工具栏名称或分隔符。
     * 同名按钮会被更新，并保留用户已经配置的快捷键。
     */
    addToolbarItem(item: IMenuItem): void;

    /**
     * 移除动态注册的编辑器工具栏按钮，并保留其快捷键和入口配置。
     */
    removeToolbarItem(name: string): void;

    /**
     * 按名称取密钥值（来自「设置 → 密钥和变量」的密钥库）。找不到时返回空字符串。
     * 密钥在内核侧加密存储，此处读到的是运行时明文；仅在本地管理员身份下可用。
     */
    getSecret(name: string): string;

    /**
     * 按名称取变量值（来自「设置 → 密钥和变量」的变量库）。找不到时返回空字符串。
     * 变量以明文存储，用于非敏感配置。
     */
    getVariable(name: string): string;

    addAgentCapability(options: {
        name: string,
        title?: string,
        description: string,
        inputSchema: Record<string, unknown>,
        outputSchema?: Record<string, unknown>,
        effects?: IAgentCapabilityEffects,
        actionEffects?: Record<string, IAgentCapabilityEffects>,
        handler: (args: Record<string, unknown>, app: App) => Promise<{
            result?: string;
            structuredContent?: unknown;
            error?: string;
        }>,
    }): string;

    addFloatLayer(options: {
        refDefs: IRefDefs[],
        x?: number,
        y?: number,
        targetElement?: HTMLElement,
        originalRefBlockIDs?: Record<string, string>,
        isBacklink: boolean,
    }): void;

    updateCards(options: ICardData): Promise<ICardData>;

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

/**
 * 打开单输入框对话框，支持 Enter 确认和 Escape 关闭。
 * 确认时不自动关闭，由 onConfirm 处理校验、提交并调用 dialog.destroy()。
 */
export function openInputDialog(options: {
    title: string,
    value: string,
    /** 输入框上方的纯文本标签。 */
    label?: string,
    /** 默认桌面端 520px，移动端 92vw。 */
    width?: string,
    positionId?: string,
    maxLength?: number,
    type?: "text" | "number" | "password",
    /** 使用多行文本框，默认使用单行输入框。 */
    multiline?: boolean,
    resize?: "none" | "vertical",
    min?: string,
    max?: string,
    step?: string,
    placeholder?: string,
    /** 输入框下方的 HTML 说明，调用方应确保内容可信。 */
    description?: string,
    /** 附加控件的可信 HTML，调用方负责绑定交互。 */
    extraContent?: string,
    confirmText?: string,
    actions?: {
        text: string,
        position?: "beforeCancel" | "beforeConfirm" | "afterConfirm",
        danger?: boolean,
        onClick: (value: string, dialog: Dialog) => void,
    }[],
    /** 设置为 false 时，由调用方处理输入框键盘事件。 */
    bindInput?: boolean,
    onConfirm: (value: string, dialog: Dialog) => void,
    destroyCallback?: (options?: IObject) => void,
}): Dialog;

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
