import {
    Config, Dialog,
    IProtyle,
    Menu,
    Plugin,
    Protyle,
    TDock,
    TEditorMode,
    TOperation,
    TProtyleAction
} from "../siyuan";
import {Model} from "./layout/Model";
import {Wnd} from "./layout/Wnd";
import {Tab} from "./layout/Tab";
import {BlockPanel} from "./block/Panel";
import {Inbox} from "./layout/dock/Inbox";
import {MobileOutline} from "./mobile/dock/MobileOutline";
import {MobileFiles} from "./mobile/dock/MobileFiles";
import {MobileBookmarks} from "./mobile/dock/MobileBookmarks";
import {MobileTags} from "./mobile/dock/MobileTags";
import {MobileBacklinks} from "./mobile/dock/MobileBacklinks";

export * from "./config";
export * from "./events";
export * from "./protyle";
export * from "./response";
export * from "./constants";
export * from "./layout/Wnd";
export * from "./layout/Tab";
export * from "./layout/Model";
export * from "./layout/dock/Files";
export * from "./layout/dock/Inbox";
export * from "./block/Panel";
export * from "./mobile/dock/MobileTags";
export * from "./mobile/dock/MobileOutline";
export * from "./mobile/dock/MobileBacklinks";
export * from "./mobile/dock/MobileBookmarks";
export * from "./mobile/dock/MobileFiles";
export * as platformUtils from "./protyle/util/compatibility";


type TDockPosition = "Left" | "Right" | "Bottom"

export type TAVCol =
    "text"
    | "date"
    | "number"
    | "relation"
    | "rollup"
    | "select"
    | "block"
    | "mSelect"
    | "url"
    | "email"
    | "phone"
    | "mAsset"
    | "template"
    | "created"
    | "updated"
    | "checkbox"
    | "lineNumber"

interface ILayoutOptions {
    direction?: Config.TUILayoutDirection
    size?: string
    resize?: Config.TUILayoutDirection
    type?: Config.TUILayoutType
    element?: HTMLElement
}

interface IOperationSrcs {
    id: string,
    content?: string,
    isDetached: boolean
}

interface INotebook {
    name: string
    id: string
    closed: boolean
    icon: string
    sort: number
    dueFlashcardCount?: string;
    newFlashcardCount?: string;
    flashcardCount?: string;
    sortMode: number
}

interface IEmojiItem {
    unicode: string,
    description: string,
    description_zh_cn: string,
    description_ja_jp: string,
    keywords: string
}

interface IEmoji {
    id: string,
    title: string,
    title_zh_cn: string,
    title_ja_jp: string,
    items: IEmojiItem[]
}

interface IBackStack {
    id: string,
    // 仅移动端
    data?: {
        startId: string,
        endId: string
        path: string
        notebookId: string
    },
    scrollTop?: number,
    callback?: TProtyleAction[],
    position?: {
        start: number,
        end: number
    }
    // 仅桌面端
    protyle?: IProtyle,
    zoomId?: string
}

export interface IOperation {
    action: TOperation, // move， delete 不需要传 data
    id?: string,
    blockID?: string,
    isTwoWay?: boolean, // 是否双向关联
    backRelationKeyID?: string, // 双向关联的目标关联列 ID
    avID?: string,  // av
    format?: string // updateAttrViewColNumberFormat 专享
    keyID?: string // updateAttrViewCell 专享
    rowID?: string // updateAttrViewCell 专享
    data?: any, // updateAttr 时为  { old: IObject, new: IObject }, updateAttrViewCell 时为 {TAVCol: {content: string}}
    parentID?: string
    previousID?: string
    retData?: any
    nextID?: string // insert 专享
    isDetached?: boolean // insertAttrViewBlock 专享
    ignoreFillFilter?: boolean // insertAttrViewBlock 专享
    srcIDs?: string[] // removeAttrViewBlock 专享
    srcs?: IOperationSrcs[] // insertAttrViewBlock 专享
    name?: string // addAttrViewCol 专享
    type?: TAVCol // addAttrViewCol 专享
    deckID?: string // add/removeFlashcards 专享
    blockIDs?: string[] // add/removeFlashcards 专享
    removeDest?: boolean // removeAttrViewCol 专享
}

export interface IRefDefs {
    refID: string,
    defIDs?: string[]
}

export interface IPosition {
    x: number,
    y: number,
    w?: number,
    h?: number,
    isLeft?: boolean
}

export interface ISiyuan {
    zIndex: number
    storage?: {
        [key: string]: any
    },
    transactions?: {
        protyle: IProtyle,
        doOperations: IOperation[],
        undoOperations: IOperation[]
    }[]
    reqIds: {
        [key: string]: number
    },
    editorIsFullscreen?: boolean,
    hideBreadcrumb?: boolean,
    notebooks?: INotebook[],
    emojis?: IEmoji[],
    backStack?: IBackStack[],
    mobile?: {
        editor?: Protyle
        popEditor?: Protyle
        docks?: {
            outline: MobileOutline | null,
            file: MobileFiles | null,
            bookmark: MobileBookmarks | null,
            tag: MobileTags | null,
            backlink: MobileBacklinks | null,
            inbox: Inbox | null,
        } & { [key: string]: Model | boolean };
    },
    user?: {
        userId: string
        userName: string
        userAvatarURL: string
        userHomeBImgURL: string
        userIntro: string
        userNickname: string
        userSiYuanOneTimePayStatus: number  // 0 未付费；1 已付费
        userSiYuanProExpireTime: number // -1 终身会员；0 普通用户；> 0 过期时间
        userSiYuanSubscriptionPlan: number // 0 年付订阅/终生；1 教育优惠；2 订阅试用
        userSiYuanSubscriptionType: number // 0 年付；1 终生；2 月付
        userSiYuanSubscriptionStatus: number // -1：未订阅，0：订阅可用，1：订阅封禁，2：订阅过期
        userToken: string
        userTitles: {
            name: string,
            icon: string,
            desc: string
        }[]
    },
    dragElement?: HTMLElement,
    currentDragOverTabHeadersElement?: HTMLElement,
    layout?: {
        layout?: Layout,
        centerLayout?: Layout,
        leftDock?: Dock,
        rightDock?: Dock,
        bottomDock?: Dock,
    }
    config?: Config.IConf;
    ws: Model,
    ctrlIsPressed?: boolean,
    altIsPressed?: boolean,
    shiftIsPressed?: boolean,
    coordinates?: {
        pageX: number,
        pageY: number,
        clientX: number,
        clientY: number,
        screenX: number,
        screenY: number,
    },
    menus?: Menus
    languages?: {
        [key: string]: any;
    }
    bookmarkLabel?: string[]
    blockPanels: BlockPanel[],
    dialogs: Dialog[],
    viewer?: Viewer
}

export interface IMenu {
    checked?: boolean,
    iconClass?: string,
    label?: string,
    click?: (element: HTMLElement, event: MouseEvent) => boolean | void | Promise<boolean | void>
    type?: "separator" | "submenu" | "readonly" | "empty",
    accelerator?: string,
    action?: string,
    id?: string,
    submenu?: IMenu[]
    disabled?: boolean
    icon?: string
    iconHTML?: string
    current?: boolean
    bind?: (element: HTMLElement) => void
    index?: number
    element?: HTMLElement
    ignore?: boolean
    waring?: boolean
}

export interface IPosition {
    x: number,
    y: number,
    w?: number,
    h?: number,
    isLeft?: boolean
}

export interface IWebSocketData {
    cmd: string;
    callback?: string;
    data: any;
    msg: string;
    code: number;
    sid: string;
}

export interface IObject {
    [key: string]: string;
}

declare class Viewer {
    public destroyed: boolean;

    constructor(element: Element, options: {
        title: [number, (image: HTMLImageElement, imageData: IObject) => string],
        button: boolean,
        initialViewIndex?: number,
        transition: boolean,
        hidden: () => void,
        toolbar: {
            zoomIn: boolean,
            zoomOut: boolean,
            oneToOne: boolean,
            reset: boolean,
            prev: boolean,
            play: boolean,
            next: boolean,
            rotateLeft: boolean,
            rotateRight: boolean,
            flipHorizontal: boolean,
            flipVertical: boolean,
            close: () => void
        }
    })

    public destroy(): void

    public show(): void
}

export declare class Layout {
    element: HTMLElement;
    children?: Array<Layout | Wnd>;
    parent?: Layout;
    direction: Config.TUILayoutDirection;
    type?: Config.TUILayoutType;
    id?: string;
    resize?: Config.TUILayoutDirection;
    size?: string;

    constructor(options?: ILayoutOptions);

    addLayout(child: Layout, id?: string): void;

    addWnd(child: Wnd, id?: string): void;
}

export declare class Editor extends Model {
    element: HTMLElement;
    editor: Protyle;
    headElement: HTMLElement;

    constructor(options: {
        app: App;
        tab: Tab;
        blockId: string;
        rootId: string;
        mode?: TEditorMode;
        action?: string[];
    });

    private initProtyle;
}

export declare class Dock {
    element: HTMLElement;
    layout: Layout;
    private position;
    private app;
    resizeElement: HTMLElement;
    pin: boolean;
    data: {
        [key in TDock | string]: Model | boolean;
    };
    private hideResizeTimeout;

    constructor(options: {
        app: App;
        data: {
            pin: boolean;
            data: Config.IUILayoutDockTab[][];
        };
        position: TDockPosition;
    });

    togglePin(): void;

    resetDockPosition(show: boolean): void;

    showDock(reset?: boolean): void;

    hideDock(reset?: boolean): void;

    toggleModel(type: string, show?: boolean, close?: boolean, hide?: boolean, isSaveLayout?: boolean): void;

    add(index: number, sourceElement: Element, previousType?: string): void;

    remove(key: string): void;

    setSize(): void;

    private getMaxSize;

    genButton(data: Config.IUILayoutDockTab[], index: number, tabIndex?: number): void;
}

export declare class MobileCustom {
    public element: Element;
    public data: any;
    public type: string;
    public init: (custom: MobileCustom) => void;
    public destroy: () => void;
    public update: () => void;

    constructor(options: {
        element: Element,
        type: string,
        data: any,
        destroy?: () => void,
        update?: () => void,
        init: (custom: MobileCustom) => void
    })
}


export declare class Custom extends Model {
    element: Element;
    tab: Tab;
    data: any;
    type: string;
    init: (custom: Custom) => void;
    destroy: () => void;
    beforeDestroy: () => void;
    resize: () => void;
    update: () => void;
    editors: Protyle[];

    constructor(options: {
        app: App;
        type: string;
        tab: Tab;
        data: any;
        destroy?: () => void;
        beforeDestroy?: () => void;
        resize?: () => void;
        update?: () => void;
        init: (custom: Custom) => void;
    });
}

export declare class subMenu {
    menus: IMenu[];

    constructor();

    addSeparator(index?: number, id?: string): void;

    addItem(menu: IMenu): void;
}

export declare class App {
    plugins: Plugin[];
    appId: string
}

export declare class Menus {
    menu: Menu;

    constructor(app: App);

    private getDir;
    private unselect;
}
