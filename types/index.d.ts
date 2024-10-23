import {Config, Plugin, Protyle, TDock, TEditorMode, TOperation} from "../siyuan";
import {Model} from "./layout/Model";
import {Wnd} from "./layout/Wnd";
import {Tab} from "./layout/Tab";

export * from "./config";
export * from "./events";
export * from "./protyle";
export * from "./response";
export * from "./constants";
export * from "./layout/Wnd";
export * from "./layout/Tab";
export * from "./layout/Model";
export * from "./layout/dock/Files";

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

export interface ISiyuan {
    config: Config.IConf;
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

    addSeparator(index?: number): void;

    addItem(menu: IMenu): void;
}

export declare class App {
    plugins: Plugin[];
    appId: string
}
