import {App, Config, IModel, IWebSocketData, Protyle, TAVCol, TEditorMode, TOperation} from "../siyuan";

export * from "./config";
export * from "./events";
export * from "./protyle";
export * from "./response";
export * from "./constants";

type TWS = "main" | "filetree" | "protyle"

interface ILayoutOptions {
    direction?: Config.TUILayoutDirection
    size?: string
    resize?: Config.TUILayoutDirection
    type?: Config.TUILayoutType
    element?: HTMLElement
}

interface ITab {
    icon?: string
    docIcon?: string
    title?: string
    panel?: string
    callback?: (tab: Tab) => void
}

interface IOperationSrcs {
    id: string,
    content?: string,
    isDetached: boolean
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

export interface IPosition {
    x: number,
    y: number,
    w?: number,
    h?: number,
    isLeft?: boolean
}

declare class Layout {
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

declare class Wnd {
    private app;
    id: string;
    parent?: Layout;
    element: HTMLElement;
    headersElement: HTMLElement;
    children: Tab[];
    resize?: Config.TUILayoutDirection;

    constructor(app: App, resize?: Config.TUILayoutDirection, parentType?: Config.TUILayoutType);

    showHeading(): void;

    switchTab(target: HTMLElement, pushBack?: boolean, update?: boolean, resize?: boolean, isSaveLayout?: boolean): void;

    addTab(tab: Tab, keepCursor?: boolean, isSaveLayout?: boolean, activeTime?: string): void;

    private renderTabList;
    private removeOverCounter;
    private destroyModel;
    private removeTabAction;

    removeTab(id: string, closeAll?: boolean, animate?: boolean, isSaveLayout?: boolean): void;

    moveTab(tab: Tab, nextId?: string): void;

    split(direction: Config.TUILayoutDirection): Wnd;

    private remove;
}

export declare class Tab {
    parent: Wnd;
    id: string;
    headElement: HTMLElement;
    panelElement: HTMLElement;
    callback: (tab: Tab) => void;
    model: Model;
    title: string;
    icon: string;
    docIcon: string;

    constructor(options: ITab);

    updateTitle(title: string): void;

    addModel(model: Model): void;

    pin(): void;

    setDocIcon(icon: string): void;

    unpin(): void;

    close(): void;
}

export declare class Model {
    public ws: WebSocket;
    public reqId: number;
    public parent: Tab;
    public app: App;

    constructor(options: {
        app: App,
        id: string,
        type?: TWS,
        callback?: () => void,
        msgCallback?: (data: IWebSocketData) => void
    })

    /**
     * @param {boolean} [process=false]
     */
    public send(cmd: string, param: Record<string, unknown>, process: boolean): void;
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

