type TEventBus = "ws-main" |
    "click-blockicon" | "click-editorcontent" | "click-pdf" | "click-editortitleicon" |
    "open-noneditableblock" |
    "open-menu-blockref" | "open-menu-fileannotationref" | "open-menu-tag" | "open-menu-link" | "open-menu-image" |
    "open-menu-av" | "open-menu-content" | "open-menu-breadcrumbmore" |
    "open-siyuan-url-plugin" | "open-siyuan-url-block" |
    "input-search" |
    "loaded-protyle" | "loaded-protyle-dynamic" |
    "destroy-protyle"

type TCardType = "doc" | "notebook" | "all"

type TProtyleAction = "cb-get-append" | // 向下滚动加载
    "cb-get-before" | // 向上滚动加载
    "cb-get-unchangeid" | // 上下滚动，定位时不修改 blockid
    "cb-get-hl" | // 高亮
    "cb-get-focus" | // 光标定位
    "cb-get-focusfirst" | // 动态定位到第一个块
    "cb-get-setid" | // 重置 blockid
    "cb-get-all" | // 获取所有块
    "cb-get-backlink" | // 悬浮窗为传递型需展示上下文
    "cb-get-unundo" | // 不需要记录历史
    "cb-get-scroll" | // 滚动到指定位置
    "cb-get-context" | // 包含上下文
    "cb-get-html" | // 直接渲染，不需要再 /api/block/getDocInfo，否则搜索表格无法定位
    "cb-get-history" // 历史渲染

declare global {
    interface Window {
        Lute: Lute
    }
}

interface ITab {
    id: string;
    headElement: HTMLElement;
    panelElement: HTMLElement;
    model: IModel;
    title: string;
    icon: string;
    docIcon: string;
    updateTitle: (title: string) => void;
    pin: () => void;
    unpin: () => void;
    setDocIcon: (icon: string) => void;
    close: () => void;
}

interface IModel {
    ws: WebSocket;
    app: App;
    reqId: number;
    parent: ITab | any;
    send(cmd: string, param: Record<string, unknown>, process?: boolean): void;
}

interface ICustomModel extends IModel {
    tab: ITab;
    data: any;
    type: string;
    element: HTMLElement;
    init(): void;
    update?(): void;
    resize?(): void;
    beforeDestroy?(): void;
    destroy?(): void;

    [key: string]: any;
}

interface IDockModel extends Omit<ICustomModel, "beforeDestroy"> {
}

interface ITabModel extends ICustomModel {
}

interface IObject {
    [key: string]: string;
}

interface I18N {
    [key: string]: any;
}

interface ILuteNode {
    TokensStr: () => string;
    __internal_object__: {
        Parent: {
            Type: number,
        },
        HeadingLevel: string,
    };
}

interface ISearchOption {
    page?: number
    group?: number,  // 0：不分组，1：按文档分组
    hasReplace?: boolean,
    method?: number //  0：文本，1：查询语法，2：SQL，3：正则表达式
    hPath?: string
    idPath?: string[]
    k: string
    r?: string
    types?: {
        mathBlock: boolean
        table: boolean
        blockquote: boolean
        superBlock: boolean
        paragraph: boolean
        document: boolean
        heading: boolean
        list: boolean
        listItem: boolean
        codeBlock: boolean
        htmlBlock: boolean
        embedBlock: boolean
    }
}

interface IWebSocketData {
    cmd: string
    callback?: string
    data: any
    msg: string
    code: number
    sid: string
}

interface IPluginDockTab {
    position: "LeftTop" | "LeftBottom" | "RightTop" | "RightBottom" | "BottomLeft" | "BottomRight",
    size: { width: number, height: number },
    icon: string,
    hotkey?: string,
    title: string,
    index?: number,
    show?: boolean
}

interface IMenuItemOption {
    label?: string,
    click?: (element: HTMLElement) => void,
    type?: "separator" | "submenu" | "readonly",
    accelerator?: string,
    action?: string,
    id?: string,
    submenu?: IMenuItemOption[]
    disabled?: boolean
    icon?: string
    iconHTML?: string
    current?: boolean
    bind?: (element: HTMLElement) => void
    index?: number
    element?: HTMLElement
}

interface ICommandOption {
    langKey: string, // 用于区分不同快捷键的 key
    langText?: string, // 快捷键功能描述文本
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
    callback?: () => void
    fileTreeCallback?: (file: any) => void
    editorCallback?: (protyle: any) => void
    dockCallback?: (element: HTMLElement) => void
}

interface IProtyleOption {
    action?: TProtyleAction[],
    mode?: "preview" | "wysiwyg",
    blockId: string
    key?: string
    scrollAttr?: {
        rootId: string,
        startId: string,
        endId: string
        scrollTop: number,
        focusId?: string,
        focusStart?: number
        focusEnd?: number
        zoomInId?: string
    }
    defId?: string
    render?: {
        background?: boolean
        title?: boolean
        gutter?: boolean
        scroll?: boolean
        breadcrumb?: boolean
        breadcrumbDocName?: boolean
    }
    typewriterMode?: boolean;

    after?(protyle: Protyle): void;
}

export function fetchPost(url: string, data?: any, callback?: (response: IWebSocketData) => void, headers?: IObject): void;

export function fetchSyncPost(url: string, data?: any): Promise<IWebSocketData>;

export function fetchGet(url: string, callback: (response: IWebSocketData) => void): void;

export function openTab(options: {
    app: App,
    doc?: {
        id: string,     // 块 id
        action?: string[] // cb-get-all：获取所有内容；cb-get-focus：打开后光标定位在 id 所在的块；cb-get-hl: 打开后 id 块高亮
        zoomIn?: boolean // 是否缩放
    },
    pdf?: {
        path: string,
        page?: number,  // pdf 页码
        id?: string,    // File Annotation id
    },
    asset?: {
        path: string,
    },
    search?: ISearchOption
    card?: {
        type: TCardType,
        id?: string, //  cardType 为 all 时不传，否则传文档或笔记本 id
        title?: string //  cardType 为 all 时不传，否则传文档或笔记本名称
    },
    custom?: {
        title: string,
        icon: string,
        data?: any
        id: string, // 插件名称+页签类型：plugin.name + tab.type
    }
    position?: "right" | "bottom",
    keepCursor?: boolean // 是否跳转到新 tab 上
    removeCurrentTab?: boolean // 在当前页签打开时需移除原有页签
    afterOpen?: () => void // 打开后回调
}): ITab

export function getFrontend(): "desktop" | "desktop-window" | "mobile" | "browser-desktop" | "browser-mobile";

export function getBackend(): "windows" | "linux" | "darwin" | "docker" | "android" | "ios"

export function adaptHotkey(hotkey: string): string;

export function confirm(title: string, text: string, confirmCallback?: (dialog: Dialog) => void, cancelCallback?: (dialog: Dialog) => void): void;

/**
 * @param timeout - ms. 0: manual close；-1: always show; 6000: default
 * @param {string} [type=info]
 */
export function showMessage(text: string, timeout?: number, type?: "info" | "error", id?: string): void;

export class App {
    plugins: Plugin[];
}

export abstract class Plugin {
    eventBus: EventBus;
    i18n: I18N;
    data: any;
    displayName: string;
    name: string;
    app: App;
    commands: ICommandOption[];
    setting: Setting;
    protyleSlash: {
        filter: string[],
        html: string,
        id: string
        callback(protyle: Protyle): void
    }[];

    constructor(options: {
        app: App,
        name: string,
        i18n: I18N
    })

    onload(): void;

    onunload(): void;

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
        position?: "right" | "left"
    }): HTMLElement

    openSetting(): void

    loadData(storageName: string): Promise<any>;

    saveData(storageName: string, content: any): Promise<void>;

    removeData(storageName: string): Promise<any>;

    addIcons(svg: string): void;

    getOpenedTab(): { [key: string]: ICustomModel[] };

    /**
     * Must be executed before the synchronous function.
     */
    addTab(options: {
        type: string,
        beforeDestroy?: (this: ITabModel) => void,
        destroy?: (this: ITabModel) => void,
        resize?: (this: ITabModel) => void,
        update?: (this: ITabModel) => void,
        init: (this: ITabModel) => void
    }): () => ITabModel

    /**
     * Must be executed before the synchronous function.
     */
    addDock(options: {
        config: IPluginDockTab,
        data: any,
        type: string,
        destroy?: (this: IDockModel) => void,
        resize?: (this: IDockModel) => void,
        update?: (this: IDockModel) => void,
        init: (this: IDockModel) => void
    }): { config: IPluginDockTab, model: IDockModel }

    addCommand(options: ICommandOption): void

    addFloatLayer(options: {
        ids: string[],
        defIds?: string[],
        x?: number,
        y?: number,
        targetElement?: HTMLElement
    }): void
}

export class Protyle {

    public protyle: any;

    constructor(app: App, element: HTMLElement, options?: IProtyleOption)

    isUploading(): boolean

    destroy(): void

    resize(): void

    reload(focus: boolean): void

    /**
     * @param {boolean} [isBlock=false]
     * @param {boolean} [useProtyleRange=false]
     */
    insert(html: string, isBlock?: boolean, useProtyleRange?: boolean): void
}

export class Setting {
    constructor(options: {
        height?: string,
        width?: string,
        destroyCallback?: () => void
        confirmCallback?: () => void
    })

    addItem(options: {
        title: string
        description?: string
        actionElement?: HTMLElement
        createActionElement?(): HTMLElement
    }): void;

    open(name: string): void;
}

export class EventBus {
    on(type: TEventBus, listener: (event: CustomEvent<any>) => void): void;

    once(type: TEventBus, listener: (event: CustomEvent<any>) => void): void;

    off(type: TEventBus, listener: (event: CustomEvent<any>) => void): void;

    emit(type: TEventBus, detail?: any): boolean;
}

export class Dialog {

    element: HTMLElement;

    constructor(options: {
        title?: string,
        transparent?: boolean,
        content: string,
        width?: string
        height?: string,
        destroyCallback?: (options?: IObject) => void
        disableClose?: boolean
        disableAnimation?: boolean
    });

    destroy(options?: IObject): void;

    bindInput(inputElement: HTMLInputElement | HTMLTextAreaElement, enterEvent?: () => void): void;
}

export class Menu {
    constructor(id?: string, closeCallback?: () => void);

    showSubMenu(subMenuElement: HTMLElement): void;

    addItem(options: IMenuItemOption): HTMLElement;

    addSeparator(index?: number): void;

    open(options: { x: number, y: number, h?: number, w?: number, isLeft?: boolean }): void;

    /**
     * @param {string} [position=all]
     */
    fullscreen(position?: "bottom" | "all"): void;

    close(): void;
}

export class Lute {
    public static WalkStop: number;
    public static WalkSkipChildren: number;
    public static WalkContinue: number;
    public static Version: string;
    public static Caret: string;

    public static New(): Lute;

    public static EChartsMindmapStr(text: string): string;

    public static NewNodeID(): string;

    public static Sanitize(html: string): string;

    public static EscapeHTMLStr(str: string): string;

    public static UnEscapeHTMLStr(str: string): string;

    public static GetHeadingID(node: ILuteNode): string;

    public static BlockDOM2Content(html: string): string;

    private constructor();

    public BlockDOM2Content(text: string): string;

    public BlockDOM2EscapeMarkerContent(text: string): string;

    public SetTextMark(enable: boolean): void;

    public SetHeadingID(enable: boolean): void;

    public SetProtyleMarkNetImg(enable: boolean): void;

    public SetSpellcheck(enable: boolean): void;

    public SetFileAnnotationRef(enable: boolean): void;

    public SetSetext(enable: boolean): void;

    public SetYamlFrontMatter(enable: boolean): void;

    public SetChineseParagraphBeginningSpace(enable: boolean): void;

    public SetRenderListStyle(enable: boolean): void;

    public SetImgPathAllowSpace(enable: boolean): void;

    public SetKramdownIAL(enable: boolean): void;

    public BlockDOM2Md(html: string): string;

    public BlockDOM2StdMd(html: string): string;

    public SetGitConflict(enable: boolean): void;

    public SetSuperBlock(enable: boolean): void;

    public SetTag(enable: boolean): void;

    public SetMark(enable: boolean): void;

    public SetSub(enable: boolean): void;

    public SetSup(enable: boolean): void;

    public SetBlockRef(enable: boolean): void;

    public SetSanitize(enable: boolean): void;

    public SetHeadingAnchor(enable: boolean): void;

    public SetImageLazyLoading(imagePath: string): void;

    public SetInlineMathAllowDigitAfterOpenMarker(enable: boolean): void;

    public SetToC(enable: boolean): void;

    public SetIndentCodeBlock(enable: boolean): void;

    public SetParagraphBeginningSpace(enable: boolean): void;

    public SetFootnotes(enable: boolean): void;

    public SetLinkRef(enalbe: boolean): void;

    public SetEmojiSite(emojiSite: string): void;

    public PutEmojis(emojis: IObject): void;

    public SpinBlockDOM(html: string): string;

    public Md2BlockDOM(html: string): string;

    public SetProtyleWYSIWYG(wysiwyg: boolean): void;

    public MarkdownStr(name: string, md: string): string;

    public IsValidLinkDest(text: string): boolean;

    public BlockDOM2InlineBlockDOM(html: string): string;

    public BlockDOM2HTML(html: string): string;
}
