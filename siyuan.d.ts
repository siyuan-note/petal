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
    ILocalFiles,
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
import type {APIGETRoutes, APIPOSTRoutes, FetchGet, FetchPost, FetchSyncPost} from "./types/api";

export * from "./types";
export * from "./types/api";
/**
 * 以下类只描述运行时对象的形状，`siyuan` 模块在运行时不导出它们，因此只能作为类型使用。
 * 需要实例时请通过已有对象获取，例如 `window.Lute`、`plugin.app`、`window.siyuan.layout`。
 */
export type {
    App,
    AVAttributePanel,
    Background,
    BlockPanel,
    Breadcrumb,
    Custom,
    Dock,
    Editor,
    Files,
    Gutter,
    Highlight,
    Hint,
    Inbox,
    Layout,
    LocalUndo,
    Lute,
    Menus,
    MobileBacklinks,
    MobileBookmarks,
    MobileCustom,
    MobileFiles,
    MobileOutline,
    MobileTags,
    Model,
    Preview,
    Scroll,
    subMenu,
    Tab,
    Title,
    Toolbar,
    Tree,
    Undo,
    Upload,
    Viewer,
    Viz,
    webkitAudioContext,
    Wnd,
    WYSIWYG,
} from "./types";

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
        searchElement: HTMLInputElement | HTMLTextAreaElement,
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
    /** 仅在具备实际编辑器上下文时触发，关系图按文档信息构造的菜单不触发此事件 */
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
    "open-menu-av": IMenuBaseDetail & {
        /** 选中的行或卡片元素，来自 `querySelectorAll`，不是数组。 */
        selectRowElements: NodeListOf<Element>,
        selectRowIds: string[],
        selectRowPoints: { itemID: string, groupID: string }[],
    };
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
    /** 打开资源文件前按插件顺序触发；调用 `preventDefault()` 会取消默认打开方式，后续插件不再收到该事件。 */
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
        /** 粘贴本地文件路径时提供，此时 textHTML、textPlain 和 siyuanHTML 为空字符串且没有 files。 */
        localFiles?: ILocalFiles[],
        /** 其他粘贴场景提供，此时没有 localFiles。 */
        files?: FileList | DataTransferItemList,
    };
    "ws-main": IWebSocketData;
    "sync-start": IWebSocketData;
    "sync-end": IWebSocketData;
    "sync-fail": IWebSocketData;
    "mobile-keyboard-show": void;
    "mobile-keyboard-hide": void;
    /** 可替换 detail.languages 来调整候选语言列表；init 为打开列表时触发，match 为输入筛选时触发。 */
    "code-language-update": {
        languages: string[],
        type: "init",
        listElement: HTMLElement,
    } | {
        languages: string[],
        type: "match",
        listElement: HTMLElement,
        value: string,
    };
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
    /**
     * 设置后，命令被任一方式触发时都改为执行此函数；命令能否被某种方式触发仍取决于下列回调是否存在。
     * 未设置其他回调时，可通过快捷键和命令面板触发。
     */
    execute?: (context: ICommandContext) => void | Promise<void>
    /**
     * 快捷键触发时，存在 globalCallback、fileTreeCallback、editorCallback 或 dockCallback 则不会执行；
     * 在命令面板中优先于其他回调执行。
     */
    callback?: (context?: ICommandContext) => void
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

/**
 * title 和 text 均为空时不打开对话框，直接以无参数形式调用 confirmCallback。
 * @param {boolean} [isDelete=false] - 为 true 时确认按钮使用删除样式和删除文案
 * @param extraAction - 在按钮区额外添加的操作按钮
 * @param confirmLabel - 确认按钮文字，优先于 isDelete 的默认文案
 */
export function confirm(title: string, text: string, confirmCallback?: (dialog?: Dialog) => void,
                        cancelCallback?: (dialog: Dialog) => void, isDelete?: boolean,
                        extraAction?: { label: string, callback: () => void }, confirmLabel?: string): void;

export type TEditorFontSizeAction = "increase" | "decrease" | "reset";

export interface IEditorFontSizeOptions {
    notify?: boolean;
}

export function adjustEditorFontSize(action: TEditorFontSizeAction, options?: IEditorFontSizeOptions): number;

export function setEditorFontSize(fontSize: number, options?: IEditorFontSizeOptions): number;

/**
 * 异步发送 POST 请求，通过回调接收响应；请求参数和响应类型按接口路径推导。
 * 具体接口说明见 {@link APIPOSTRoutes}。
 */
export const fetchPost: FetchPost<IWebSocketData>;

/**
 * 发送 POST 请求并返回响应 Promise；请求参数和响应类型按接口路径推导。
 * 具体接口说明见 {@link APIPOSTRoutes}。
 */
export const fetchSyncPost: FetchSyncPost<IWebSocketData>;

/**
 * 发送 GET 请求，通过回调接收响应。
 * 具体接口说明见 {@link APIGETRoutes}。
 */
export const fetchGet: FetchGet<IWebSocketData | IObject | string>;

/**
 * 在新窗口中打开文档或页签，同时传入 doc 和 tab 时只处理 doc。
 * 仅桌面客户端会打开新窗口：移动端为空操作；浏览器中不会打开窗口，但传入 tab 时仍会将该页签从当前布局移除。
 */
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
 * 不支持移动端，移动端未导出此函数
 * @param {boolean} [wndActive=true] - 当前活动窗口是否为激活状态
 * @returns 没有找到页签时返回 undefined
 */
export function getActiveTab(wndActive?: boolean): Tab | undefined;

/**
 * 移动端也可使用，返回当前文档的编辑器
 * @param {boolean} [wndActive=true] - 当前活动窗口是否为激活状态，移动端忽略此参数
 * @returns 没有找到编辑器时返回 undefined
 */
export function getActiveEditor(wndActive?: boolean): Protyle | undefined;

export interface IInsertContentOptions {
    /** 待插入的内容，不是思源块 DOM；不自动上传其中的资源 */
    data: string;
    /** 默认 markdown */
    dataType?: "markdown" | "html";
    /** 默认选择当前窗口最近活动的可见文档正文，不自动选择搜索、反链或辅助输入框 */
    editor?: Protyle;
    /** 指定编辑器内的选区；异步操作可使用 resolveTrackedRange 得到的有效 Range */
    range?: Range;
}

export interface IInsertContentResult {
    status: "inserted" | "no-editor" | "readonly" | "invalid-range" | "unsupported-range" |
        "unsupported-content" | "empty-content";
}

/**
 * 在调用时确定目标编辑器和选区，支持桌面端和移动端；显式 editor 可以指定辅助编辑器。
 * 优先使用正文当前选区，否则使用离开正文前记忆的选区，不回退到文档开头。
 * 有选区时替换选区，无选区时插入；插入后聚焦正文，光标位于插入内容末尾，块级内容遵循编辑器粘贴规则。
 * 代码上下文中的内容作为原文插入；嵌入块、数据库和非正文边界返回 unsupported-range。
 * 受限编辑器沿用其粘贴内容约束；不支持的块返回 unsupported-content，不修改正文。
 * 无目标、只读、位置失效或空内容分别返回对应状态；无效参数抛出 TypeError。
 * inserted 表示已交给编辑器处理，不表示内核持久化已经完成；沿用编辑器事务和撤销行为。
 * 记忆位置仅在当前编辑器实例内有效，DOM 重建或边界内容变化后可能失效；异步固定原位置请使用 trackRange。
 */
export function insertContent(options: IInsertContentOptions): IInsertContentResult;

export function expandDocTree(options: {
    id: string,
    isSetCurrent?: boolean
}): Promise<void>;

/**
 * 以移动端的方式打开文档，桌面端也导出此函数，但只有移动端布局会生效
 * @param {TProtyleAction[]} [action=[Constants.CB_GET_HL]]
 * @param {boolean} [forceReload=false] - 文档已打开时是否仍重新加载
 */
export function openMobileFileById(app: App, id: string, action?: TProtyleAction[], scrollPosition?: ScrollLogicalPosition,
                                   notebookId?: string, afterOpen?: (protyle: IProtyle) => void,
                                   forceReload?: boolean): void;

/**
 * 移动端为空操作，直接返回 undefined 而非 Promise。
 * @param {string} [options.doc.mode="wysiwyg"] - 只在首次打开时生效，切换可调用 switchMode 方法
 * @returns 打开或切换到的页签；未产生页签时为 undefined
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
    openNewTab?: boolean // 使用新页签打开，仅对 custom 生效
    afterOpen?: (model?: Model) => void; // 打开后回调，参数为页签内的模型
}): Promise<Tab | undefined> | undefined

export function getFrontend(): "desktop" | "desktop-window" | "mobile" | "browser-desktop" | "browser-mobile";

export function getBackend(): "windows" | "linux" | "darwin" | "docker" | "android" | "ios" | "harmony";

/**
 * 只读模式或发布服务下不执行。
 * @param app - 已不再使用，仅为兼容旧调用保留
 */
export function lockScreen(app?: App): Promise<void>

/**
 * @param {boolean} [setCurrentWorkspace=true] - 是否将当前工作空间设为下次启动时打开的工作空间
 */
export function exitSiYuan(setCurrentWorkspace?: boolean): Promise<void>

export function getAllEditor(): Protyle[]

export function saveExportFile(uri: string, msgId?: string): Promise<{
    status: "success" | "canceled" | "error",
    name?: string,
    message?: string,
}>;

/** 不支持移动端，移动端未导出此函数 */
export function getAllTabs(type?: TTab | string): Tab[]

/** 不支持移动端，移动端未导出此函数 */
export function getAllModels(): IModels

/**
 * 在当前窗口打开设置对话框并返回该对话框，不受独立设置窗口偏好影响；移动端打开主菜单并返回 undefined。
 * 插件 API 绑定的是 openPluginSetting，只接受 app，不支持指定设置页签。
 */
export function openSetting(app: App): Dialog | undefined;

export function openEmoji(options: {
    position: IPosition,
    selectedCB?: (emoji: string) => void,
    dynamicIconURL?: string
    hideDynamicIcon?: boolean
    hideCustomIcon?: boolean
    /** 选择需要绑定块的动态图标时使用的目标块 ID */
    targetID?: string
}): void ;

export interface IAssetPickerOptions {
    /** 省略或传入空数组时不限制类型；扩展名可以带点或不带点，匹配时不区分大小写 */
    exts?: string[];
    /** 与扩展名和选择器中的普通关键词搜索取交集 */
    match?: {
        /** 默认匹配去掉资源 ID 的文件名；path 匹配返回的 assets/ 相对路径 */
        field?: "name" | "path";
        /** 前后缀匹配不区分大小写；正则使用 Go 语法，默认区分大小写，可用 (?i) 忽略大小写 */
        mode: "prefix" | "suffix" | "regex";
        /** 最多 1024 字节；空字符串不额外筛选，无效正则会使 Promise 拒绝 */
        value: string;
    };
}

/**
 * 打开原生资源选择界面，无需活动文档或编辑器。选中后返回 assets/ 相对路径，取消时返回 null。
 * 搜索结果可逐页加载；选择操作不插入文档或修改资源。搜索沿用内核接口的管理员和非只读权限。
 * 关键词匹配文件名、路径以及普通笔记本中图片的标题、提示文本和已有 OCR 文本，不搜索加密笔记本。
 */
export function openAssetPicker(options?: IAssetPickerOptions): Promise<{path: string} | null>;

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
 * @param {Record<string, string>} [options.data] - 块属性值，提供时忽略 nodeElement
 * @param {HTMLElement} [options.nodeElement] - 块元素
 * @param {"bookmark" | "name" | "alias" | "memo" | "av" | "custom"} [options.focusName="bookmark"] - av 为数据库页签，custom 为自定义页签，其余为内置输入框
 * @param {IProtyle} [options.protyle] - 有数据库时需要传入 protyle
 */
export function openAttributePanel(options: {
    data?: Record<string, string>,
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
 * @param {Range} [range] - 需要选区的命令使用的范围
 * @returns 命令是否已处理
 */
export function globalCommand(command: string, app: App, range?: Range): boolean;

/**
 * @param {number} [timeout=6000] - ms. 0: manual close；-1: always show;
 * @param {string} [type=info]
 * @returns 消息 id，可传给 hideMessage；未显示消息（如 text 为空）时为 undefined
 */
export function showMessage(text: string, timeout?: number, type?: "info" | "error", id?: string): string | undefined;

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
 * 普通前端窗口不会触发前端插件生命周期钩子。独立设置窗口销毁时会尽力调用 onunload 并立即释放宿主管理的资源，
 * 不等待异步钩子完成；窗口关闭后不能继续操作其文档。
 *
 * plugin.json 可声明 settingsWindow: true，允许已启用且兼容 desktop 的插件在内置和插件的独立设置窗口中运行。
 * 省略或 false 不加载；该声明不会启用已禁用的插件，也不改变主窗口、文档窗口和移动端的 frontends 兼容性。
 * 每个设置窗口使用独立实例、事件总线和存储缓存，复用 onload、onLayoutReady、onDataChanged 和 onunload 生命周期。
 * 主窗口的配置写入通过现有数据变更通知同步；未覆盖 onDataChanged 时重载实例。插件应自行清理其样式和事件监听。
 * 设置窗口未提供编辑器、顶栏、状态栏和停靠栏，相关注册入口不生效，也不注册命令、全局快捷键或智能体能力。
 * 插件的 openSetting 调用交由所属宿主窗口处理；设置窗口在打开后启用、停用和重载插件时也更新本地实例。
 */
export abstract class Plugin {
    eventBus: EventBus;
    i18n: Record<string, import("./types/api").JSONValue>;
    kernel: IKernelPlugin;
    /**
     * 当前插件实例的存储数据会话缓存，以传入的 storageName 为键，也是 loadData 读取失败时的回退值。
     * 直接修改此对象不会写入磁盘；其他前端实例删除文件不会自动清除此实例中对应的缓存。
     */
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
    agentCapabilities: Array<{ id: string, generation: number }>;
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
     * @param options.contextMenu 桌面端或桌面浏览器中当前按钮的右键菜单回调，也支持自定义元素。
     * 其他按钮及顶栏空白处不会调用此回调；必须同步添加菜单项，异步数据应提前准备。
     * 操作显示在显隐控制之前，宿主在可见操作之后添加分隔线，并移除此组首尾及连续的分隔线。
     * 更新同一按钮时替换回调，省略此选项则清除回调。
     * 使用此选项时应移除阻止传播或单独打开菜单的 contextmenu 监听器。
     * @returns 条目元素；插件已卸载或运行在独立设置窗口中、在移动端或独立窗口中传入 element、未传 element 时 icon 无效，
     * 或 element 已注册到其他 id 时返回 undefined。
     */
    addTopBar(options: {
        id?: string,
        icon?: string,
        element?: HTMLElement,
        // 桌面端顶栏右键回调，同步添加该按钮的菜单操作；更新时省略则清除回调。
        contextMenu?: (menu: subMenu) => void,
        title: string,
        callback?: (event: MouseEvent) => void
        position?: "right" | "left"
    }): HTMLElement | undefined;

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
     * 移动端不支持状态栏，调用无效并返回 undefined；插件已卸载或运行在独立设置窗口中时不添加，直接返回传入的 element。
     * @param {string} [options.position=right]
     */
    addStatusBar(options: {
        element: HTMLElement,
        position?: "right" | "left",
    }): HTMLElement | undefined;

    openSetting(): void;

    /**
     * 读取 /data/storage/petal/ 插件私有目录中的文件，成功回调会更新 data[storageName]。
     * 缓存值为 undefined 时先初始化为 ""；文件不存在（HTTP 202）或触发请求失败回调时，
     * Promise 会兑现为当前缓存值，而非拒绝，因此可能返回其他窗口删除文件前的旧内容。
     * 如需避免旧缓存回退，应在调用前执行 delete this.data[storageName]；
     * 此时读取失败会返回 ""，仍无法区分文件缺失、读取失败与空文件，也不能据此确认磁盘状态。
     * 负数错误码被请求层拦截等未触发回调的情况会使 Promise 持续等待，需要调用方自行设置超时。
     * 只读或发布会话不会在此方法中直接拒绝，但私有文件读取仍受内核权限限制；公开快照应使用 loadPublishData。
     * @returns 文件内容（解析后的 JSON 值或文本），或读取失败时的缓存值，不是统一的内核响应封装。
     * @throws 调用时插件实例已销毁则拒绝 Promise，值为 {code: 410, msg, data: null}。
     */
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
     * 资源支持精确相对文件名及以 / 结尾的递归目录，例如 fonts/，不支持通配符。
     * 目录声明包含后续新增文件，私有文件应放在公开目录之外；链接、plugin.json 和 kernel.js 不可发布。
     * 权限、生命周期、限制及 HTTP 契约见 https://github.com/siyuan-note/siyuan/blob/master/docs/PLUGIN-PUBLISH.zh-CN.md
     */
    savePublishData(data: Record<string, string | number | boolean | null>): Promise<void>;

    /**
     * 写入 /data/storage/petal/ 插件私有目录中的文件；对象会序列化为 JSON，其他值作为文件内容写入。
     * 写入回调会将传入值存入 data[storageName] 并兑现 Promise；回调本身不检查响应 code。
     * 未设置请求失败回调，网络异常或内核负数错误码（如 -1、-3）可能使 Promise 持续等待；
     * 调用方需要自行设置超时，不能仅依赖捕获拒绝来处理写入失败。
     * @returns 内核响应 {code, msg, data}，调用方仍需检查 code，不能将兑现视为写入成功。
     * @throws 调用时插件实例已销毁为 410，只读或发布会话为 403，序列化或创建文件失败为 400；
     * 拒绝值均为 {code, msg, data: null}，生命周期检查优先于只读或发布会话检查。
     */
    saveData(storageName: string, content: any): Promise<any | IWebSocketData>;

    /**
     * 删除 /data/storage/petal/ 插件私有目录中的文件。
     * 删除回调会清除当前实例的 data[storageName] 并兑现 Promise；回调本身不检查响应 code。
     * 不会直接清除其他前端实例的缓存，这些实例再次 loadData 时可能回退到旧内容。
     * 未设置请求失败回调，网络异常或内核负数错误码可能使 Promise 持续等待，调用方需要自行设置超时。
     * @returns 内核响应 {code, msg, data}，调用方仍需检查 code，不能将兑现视为删除成功。
     * @throws 调用时插件实例已销毁为 410，只读或发布会话为 403，拒绝值为 {code, msg, data: null}；
     * 生命周期检查优先于只读或发布会话检查。
     */
    removeData(storageName: string): Promise<IWebSocketData>;

    addIcons(svg: string): void;

    getOpenedTab(): { [key: string]: Custom[] };

    /**
     * Must be executed before the synchronous function.
     * @returns 页签模型工厂；移动端不支持自定义页签，插件已卸载或运行在独立设置窗口中时也返回 undefined。
     */
    addTab(options: {
        type: string,
        destroy?: (this: Custom) => void,
        beforeDestroy?: (this: Custom) => void,
        resize?: (this: Custom) => void,
        update?: (this: Custom) => void,
        init: (this: Custom, custom: Custom) => void,
    }): ((options: { tab: Tab, data: any }) => Custom) | undefined;

    /**
     * Add Custom to Dock.
     * Must be executed before the synchronous function.
     * @param {string} [options.id] - Unique ID within the plugin. Defaults to options.type.
     * @returns 插件已卸载或运行在独立设置窗口中时返回 undefined。
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
    } | undefined;

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
    /** 最近一次打开时创建的对话框；首次打开前为 undefined，使用独立窗口时在窗口创建对话框前和窗口关闭后也为 undefined */
    dialog?: Dialog;

    constructor(options: {
        height?: string,
        width?: string,
        destroyCallback?: () => void,
        confirmCallback?: () => void,
        /**
         * 桌面客户端使用独立原生窗口，默认 false，浏览器和移动端仍使用原有设置界面。
         * 原插件实例保持在所属窗口；声明 settingsWindow: true 的插件可在原生设置窗口另建独立实例。
         * 控件回调在原插件所属窗口执行，原生窗口关闭或原插件卸载时触发一次销毁回调。
         * 控件会迁入独立窗口，应使用元素引用操作控件，避免依赖所属窗口的 document 查询或样式。
         * 在设置窗口中再次打开 Setting 使用普通对话框，关闭该对话框不会关闭整个设置窗口。
         */
        openInWindow?: boolean,
    });

    addItem(options: {
        title: string,
        direction?: "column" | "row"
        description?: string,
        actionElement?: HTMLElement,
        createActionElement?(): HTMLElement,
    }): void;

    open(name: string): void;

    /** 关闭设置并释放控件；独立窗口尚未创建时也会取消打开请求 */
    close(): void;
}

/** 插件事件总线，通过 `plugin.eventBus` 访问；`siyuan` 模块在运行时不导出该类，不能直接实例化。 */
export interface EventBus {
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
    type?: "text" | "number" | "password" | "date",
    /** 使用多行文本框，默认使用单行输入框。 */
    multiline?: boolean,
    resize?: "none" | "vertical",
    min?: string,
    max?: string,
    step?: string,
    placeholder?: string,
    /** 输入框下方的 HTML 说明，调用方应确保内容可信。 */
    description?: string,
    /** 显示在输入框上方的可信 HTML，调用方负责绑定交互。 */
    prefixContent?: string,
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
        resizeCallback?: (type: string) => void,
        /** 追加到 .b3-dialog__container 上的类名 */
        containerClassName?: string,
    });

    /** 窗口尺寸变化时调用；对话框未被手动调整宽度时以 "l" 调用 resizeCallback */
    resize(): void;

    destroy(options?: IObject): void;

    /**
     * @param {boolean} [bindEnter=true] - 为 false 时按 Enter 不调用 enterEvent
     */
    bindInput(inputElement: HTMLInputElement | HTMLTextAreaElement, enterEvent?: () => void, bindEnter?: boolean): void;
}

export class Menu {
    /**
     * 按触发元素切换共享菜单，在构造前判断归属；同一按钮关闭，其他按钮直接打开。
     * target 省略或 toggle 为 false 时仅打开，不改变既有构造器及独立菜单的行为。
     */
    static toggle(options: {
        target?: Element;
        toggle?: boolean;
        id?: string;
        closeCB?: () => void;
        build: (menu: Menu) => void;
        show: (menu: Menu) => void;
    }): void;

    private menu;
    isOpen: boolean;
    element: HTMLElement;

    /**
     * @param {boolean} [independent=false] - 是否创建独立的菜单元素，而不是复用共享的 `window.siyuan.menus.menu`
     */
    constructor(id?: string, closeCB?: () => void, independent?: boolean);

    showSubMenu(subMenuElement: HTMLElement): void;

    /** 菜单已打开时不添加并返回 undefined */
    addItem(option: IMenu): HTMLElement | undefined;

    /** ignore 为 true 或菜单已打开时不添加并返回 undefined */
    addSeparator(options?: {
        index?: number,
        id?: string,
        ignore?: boolean
    }): HTMLElement | undefined;
    /** @deprecated 请改用对象参数 */
    addSeparator(index?: number, ignore?: boolean): HTMLElement | undefined;

    open(options: IPosition): void;

    /**
     * @param {string} [position=all]
     */
    fullscreen(position?: "bottom" | "all"): void;

    close(): void;
}
