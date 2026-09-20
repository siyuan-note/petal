import {
    Config, Dialog,
    IProtyle,
    Menu,
    Plugin,
    Protyle,
    TDock,
    TEditorMode,
    TProtyleAction
} from "../siyuan";
import {Model} from "./layout/Model";
import {Wnd} from "./layout/Wnd";
import {Tab} from "./layout/Tab";
import {BlockPanel} from "./block/Panel";
import {Inbox} from "./layout/dock/Inbox";
import {Files} from "./layout/dock/Files";
import {MobileOutline} from "./mobile/dock/MobileOutline";
import {MobileFiles} from "./mobile/dock/MobileFiles";
import {MobileBookmarks} from "./mobile/dock/MobileBookmarks";
import {MobileTags} from "./mobile/dock/MobileTags";
import {MobileBacklinks} from "./mobile/dock/MobileBacklinks";

export * from "./config";
export * from "./api";
export * from "./events";
export * from "./kernel";
export * from "./protyle";
export * from "./response";
export * from "./constants";
export * from "./layout/Wnd";
export * from "./layout/Tab";
export * from "./layout/Model";
export * from "./layout/dock/Files";
export * from "./layout/dock/Inbox";
export * from "./block/Panel";
export * from "./util/Tree";
export * from "./mobile/dock/MobileTags";
export * from "./mobile/dock/MobileOutline";
export * from "./mobile/dock/MobileBacklinks";
export * from "./mobile/dock/MobileBookmarks";
export * from "./mobile/dock/MobileFiles";
export * as platformUtils from "./platformUtils";


type TDockPosition = "Left" | "Right" | "Bottom"
type TBazaarType = "templates" | "icons" | "widgets" | "themes" | "plugins"
type TRecentDocsSort = "viewedAt" | "closedAt" | "openAt" | "updated"
type TPublishAccessLevel = "public" | "protected" | "hidden" | "private" | "forbidden"
type TAVView = "table" | "list" | "gallery" | "kanban" | "calendar";
export type TAVAlign = "" | "left" | "center" | "right"
type TAVFilterOperator =
    "="
    | "!="
    | ">"
    | ">="
    | "<"
    | "<="
    | "Contains"
    | "Does not contains"
    | "Is empty"
    | "Is not empty"
    | "Starts with"
    | "Ends with"
    | "Is between"
    | "Is true"
    | "Is false"
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
    direction?: Config.TUILayoutDirection;
    size?: string;
    resize?: Config.TUILayoutDirection;
    type?: Config.TUILayoutType;
    element?: HTMLElement;
}

interface IOperationSrcs {
    itemID: string,
    id: string,
    content?: string,
    isDetached: boolean
}

interface INotebook {
    name: string;
    id: string;
    closed: boolean;
    icon: string;
    sort: number;
    subFileCount: number;
    dueFlashcardCount?: number;
    newFlashcardCount?: number;
    flashcardCount?: number;
    sortMode: number;
    encrypted?: boolean;
    unlocked?: boolean;
    state?: "Locked" | "Unlocking" | "Unlocked" | "Locking" | "Error";
}

export interface IFile {
    icon: string;
    name1: string;
    alias: string;
    memo: string;
    bookmark: string;
    path: string;
    name: string;
    titleEmpty?: boolean;
    hMtime: string;
    hCtime: string;
    hSize: string;
    dueFlashcardCount?: number;
    newFlashcardCount?: number;
    flashcardCount?: number;
    id: string;
    count: number;
    subFileCount: number;
    childrenSortMode?: number | null;
}

export interface ILocalFiles {
    path: string;
    size: number | null;
    isDir?: boolean;
}

export type TAssetUploadSource = "paste" | "drop" | "file-picker" | "programmatic";
export type TAssetUploadTarget = "editor" | "av-cell" | "background" | "pdf-annotation";
export type TAssetUploadStatus = "success" | "partial" | "failed" | "canceled";
export type TAssetUploadRejectionReason = "name-empty" | "size-limit" | "type-not-accepted";

export interface IAssetUploadPosition {
    x: number;
    y: number;
}

export type IAssetUploadInput = {
    kind: "files";
    files: File[];
} | {
    kind: "local-files";
    files: ILocalFiles[];
};

export type IAssetUploadDecision = {
    action: "replace";
    /** 必须保持各项的逻辑顺序；需要逐项回填的上传会按下标关联原资源。 */
    input: IAssetUploadInput;
} | {
    /** 取消当前资源写入；未取得全部资源路径时，HTML 粘贴将停止正文提交。 */
    action: "cancel";
};

export interface IAssetUploadRejection {
    index: number;
    name: string;
    reasons: TAssetUploadRejectionReason[];
}

export interface IAssetUploadSuccess {
    index: number;
    name: string;
    path: string;
}

export interface IAssetUploadFailure {
    index: number;
    name: string;
    error: string;
}

export interface IAssetUploadResult {
    requestId: string;
    status: TAssetUploadStatus;
    /** 插件链处理结束后的完整输入。 */
    input: IAssetUploadInput;
    /** 通过前端校验并实际提交上传的输入。 */
    acceptedInput?: IAssetUploadInput;
    /** 被前端校验拒绝的文件及其在完整输入中的位置。 */
    rejected?: IAssetUploadRejection[];
    /** 按 acceptedInput 中的索引记录明确报告成功的结果，可区分同名文件；需要逐项确认时以该字段为准。 */
    succFiles?: IAssetUploadSuccess[];
    /** 按 acceptedInput 中的索引记录明确报告失败的结果；可能不包含未尝试或未逐项报告的项。 */
    failedFiles?: IAssetUploadFailure[];
    succMap?: Record<string, string>;
    errFiles?: string[];
    error?: string;
}

export interface IClipboardData {
    textHTML?: string;
    textPlain?: string;
    siyuanHTML?: string;
    files?: FileList | DataTransferItemList | File[];
    localFiles?: ILocalFiles[];
}

export interface IBlockTree {
    box?: string,
    nodeType?: string,
    hPath?: string,
    subType?: string,
    name: string,
    type: string,
    depth: number,
    url?: string,
    label?: string,
    id?: string,
    blocks?: IBlock[],
    count: number,
    children?: IBlockTree[]
}

export interface IBlock {
    riffCard?: IRiffCard,
    depth?: number,
    box?: string;
    path?: string;
    hPath?: string;
    id?: string;
    rootID?: string;
    type?: string;
    content?: string;
    def?: IBlock;
    defID?: string
    defPath?: string
    refText?: string;
    name?: string;
    memo?: string;
    alias?: string;
    tag?: string;
    refs?: IBlock[];
    children?: IBlock[]
    length?: number
    ial: Record<string, string>
    refCount?: number
}

export interface IRiffCard {
    due?: string;
    reps?: number;
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

export interface IAVColorTheme {
    color: string;
    backgroundColor: string;
}

export interface IAVColor {
    light: IAVColorTheme;
    dark: IAVColorTheme;
}

export interface IAVCustomColor extends IAVColor {
    index: number;
}

export interface IAV {
    id: string;
    name: string;
    view: IAVTable | IAVGallery;
    viewID: string;
    viewType: TAVView;
    views: IAVView[];
    isMirror?: boolean;
    newItemTemplates?: IAVNewItemTemplate[];
    defaultTemplateID?: string;
    customColors?: IAVCustomColor[];
    usedCustomColorIndexes?: number[];
    contextFilter?: IAVContextFilter | null;
    contextFilterFields?: IAVContextFilterField[];
    target?: IAVRenderTarget;
}

export interface IAVContextFilter {
    spec: 1;
    keyID: string;
}

export interface IAVContextFilterField {
    id: string;
    name: string;
    icon: string;
    targetAvID: string;
}

export interface IAVRenderTarget {
    status: "visible" | "filtered" | "itemNotFound" | "viewNotFound" | "groupHidden";
    itemID: string;
    groupID?: string;
    index: number;
    pageSize: number;
}

export type TAVNewItemTarget = "detached" | "document";
export type TAVNewItemFieldValueMode = "static" | "currentTime";

export interface IAVNewItemSaveLocation {
    boxID?: string;
    pathTemplate: string;
}

export interface IAVNewItemFieldValue {
    mode: TAVNewItemFieldValueMode;
    value?: IAVCellValue;
}

export interface IAVNewItemTemplate {
    id: string;
    name: string;
    targetType: TAVNewItemTarget;
    primaryKeyTemplate?: string;
    fieldValues?: Record<string, IAVNewItemFieldValue>;
    saveLocation?: IAVNewItemSaveLocation;
    contentTemplatePath?: string;
}

interface IAVView {
    name?: string;
    desc?: string;
    id?: string;
    type?: TAVView;
    icon?: string;
    hideAttrViewName?: boolean;
    pageSize?: number;
    showIcon?: boolean;
    wrapField?: boolean;
    groupHidden?: number,  // 0：显示，1：空白隐藏，2：手动隐藏
    groupFolded?: boolean,
    filters?: IAVFilter[],
    sorts?: IAVSort[],
    groups?: IAVView[]
    group?: IAVGroup
    groupKey?: IAVColumn
    groupValue?: IAVCellValue
}

/**
 * 日历的持久化设置，也是 setAttrViewCalendar 事务的完整 data。
 * 月周模式和当前浏览日期由各编辑器独立维护，不写入共享设置。
 * 切换布局保留其他布局及分组设置；日历渲染不应用分组。
 */
interface IAVCalendarSettings {
    /**
     * 绑定一个 date、created 或 updated 字段；系统时间不支持通过日历拖动修改。
     * 空字符串表示未绑定；字段缺失或类型变化时保留绑定，日历返回空行，不自动改绑或回填日期。
     * createAttributeViewItem 的可选 calendarDate 是毫秒时间戳，仅支持绑定普通 date 字段的日历。
     * 指定时按全天日期覆盖模板中该字段的值，与模板其他字段及条目创建共用一个可撤销事务。
     * 系统时间源拒绝指定 calendarDate；省略或传 null 时沿用常规创建流程。
     */
    dateKeyID: string;
    /** 可选单选字段，使用已有选项颜色；空字符串表示不使用字段颜色。 */
    colorKeyID: string;
    /** 一周起始日，0 为星期日，1 为星期一，依次至 6 为星期六。 */
    weekStart: number;
}

/**
 * renderAttributeView、renderHistoryAttributeView 和 renderSnapshotAttributeView 的可选 calendarRange。
 * 范围为毫秒时间戳的半开区间 [start, end)，必须满足 start < end，跨度不超过 63 * 24 小时。
 * 仅作用于本次日历渲染，不写入共享视图、历史或快照；无效区间返回错误。
 * 省略或传 null 时不限制日期范围，保留完整渲染及导出的调用兼容性。
 * 日历在筛选和排序后按区间交集取行，不应用行分页；定位目标可额外包含区间外的匹配条目。
 * 全天结束日期包含当天，带时间的结束端点不包含在区间内；缺少一个端点时按单点处理。
 * 反向区间按开始端点显示，原值保持不变；无日期条目不显示。
 * 发布读取继续过滤不可访问条目，日期范围和定位参数不扩大访问权限。
 */
interface IAVCalendarRange {
    /** 范围起点，单位为毫秒，包含该时刻。 */
    start: number;
    /** 范围终点，单位为毫秒，不包含该时刻。 */
    end: number;
    /** 有效的客户端 IANA 时区，用于解释本地日期及夏令时。 */
    timeZone: string;
}

// 表格、列表和日历共用行列结构，布局由 viewType 区分。
interface IAVTable extends IAVView {
    /** 仅日历布局返回的持久化字段设置。 */
    calendar?: IAVCalendarSettings;
    /** 回显本次请求的日期范围，省略范围的请求不返回此字段。 */
    calendarRange?: IAVCalendarRange;
    /**
     * 可访问且通过筛选的定位条目的开始时间，单位为毫秒；无有效定位日期时省略。
     * 发布读取先过滤不可访问条目，再重新计算此日期、定位行索引及 rowCount。
     */
    calendarTargetDate?: number;
    columns: IAVColumn[],
    rows: IAVRow[],
    rowCount: number,
}

interface IAVVirtualData {
    renderedStart: number;
    renderedEnd: number;
    topSpacerHeight: number;
}

interface IAVGallery extends IAVView {
    coverFrom: number;    // 0：无，1：内容图，2：资源字段，3：内容块
    coverFromAssetKeyID?: string;
    cardSize: number;   // 0：小卡片，1：中卡片，2：大卡片
    cardAspectRatio: number;
    displayFieldName: boolean;
    fitImage: boolean;
    cards: IAVGalleryItem[],
    desc?: string
    fields: IAVColumn[]
    cardCount: number,
}

interface IAVKanban extends IAVView {
    coverFrom: number;    // 0：无，1：内容图，2：资源字段，3：内容块
    coverFromAssetKeyID?: string;
    cardSize: number;   // 0：小卡片，1：中卡片，2：大卡片
    cardAspectRatio: number;
    displayFieldName: boolean;
    fitImage: boolean;
    cards: IAVGalleryItem[],
    desc?: string
    fields: IAVColumn[]
    cardCount: number,
    fillColBackgroundColor: boolean
}

interface IAVFilter {
    column?: string,                                  // 叶子节点：字段（列）ID
    valueSource?: "stored" | "rendered",             // 叶子节点：值来源，默认为存储值
    operator?: TAVFilterOperator | "",                     // 叶子节点：操作符
    quantifier?: string,                              // 叶子节点：量词
    value?: IAVCellValue,                             // 叶子节点：过滤值
    relativeDate?: IAVRelativeDate,                   // 叶子节点：相对时间
    relativeDate2?: IAVRelativeDate,                  // 叶子节点：第二个相对时间
    combination?: "and" | "or",                       // 分组节点：子条件组合方式
    filters?: IAVFilter[],                            // 分组节点：子节点（递归）
}

interface IAVRelativeDate {
    count: number;   // 数量
    unit: number;    // 单位：0: 天、1: 周、2: 月、3: 年
    direction: number;   // 方向：-1: 前、0: 现在、1: 后
}

interface IAVGroup {
    field: string,
    valueSource?: "stored" | "rendered",             // 值来源，默认为存储值
    method?: number //  0: 按值分组、1: 按数字范围分组、2: 按相对日期分组、3: 按天日期分组、4: 按周日期分组、5: 按月日期分组、6: 按年日期分组
    range?: {
        numStart: number // 数字范围起始值 0
        numEnd: number   // 数字范围结束值 1000
        numStep: number  // 数字范围步长 100
    }
    hideEmpty?: boolean
    order?: number  // 升序: 0(默认), 降序: 1, 手动排序: 2, 按选项排序: 3
}

interface IAVSort {
    column: string,
    valueSource?: "stored" | "rendered",             // 值来源，默认为存储值
    order: "ASC" | "DESC" | ""
}

interface IAVColumn {
    width?: string,
    align?: TAVAlign,
    icon?: string,
    id?: string,
    name?: string,
    desc?: string,
    wrap?: boolean,
    pin?: boolean,
    hidden?: boolean,
    type?: TAVCol,
    numberFormat?: string,
    template?: string,
    renderTemplate?: string,
    calc?: IAVCalc,
    updated?: {
        includeTime: boolean
    }
    created?: {
        includeTime: boolean
    }
    date?: {
        autoFillNow: boolean,
        fillSpecificTime: boolean,
    }
    // 选项列表
    options?: {
        name: string,
        color: string,
        resolvedColor?: IAVColor,
        desc?: string,
    }[],
    relation?: IAVColumnRelation,
    rollup?: IAVCellRollupValue
}

interface IAVRow {
    id: string,
    cells: IAVCell[]
}

interface IAVGalleryItem {
    coverURL?: string;
    coverContent?: string;
    id: string;
    values: IAVCell[];
}

interface IAVCell {
    id?: string,
    color?: string,
    bgColor?: string,
    value?: IAVCellValue,
    valueType?: TAVCol,
}

interface IAVCellValue {
    keyID?: string,
    id?: string,
    blockID?: string // 为 row id
    type?: TAVCol,
    renderedContent?: string,
    isDetached?: boolean,
    text?: {
        content: string,
        rich?: {
            spec: 1,
            format: "kramdown",
            content: string
        } | null
    },
    number?: {
        content?: number,
        isNotEmpty: boolean,
        format?: string,
        formattedContent?: string
    },
    mSelect?: IAVCellSelectValue[]
    mAsset?: IAVCellAssetValue[]
    block?: {
        content: string,
        id?: string,
        icon?: string
    }
    url?: {
        content: string
    }
    phone?: {
        content: string
    }
    email?: {
        content: string
    }
    template?: {
        content: string
    },
    checkbox?: {
        checked: boolean,
        content?: string, // gallery 中显示 https://github.com/siyuan-note/siyuan/issues/15389
    }
    relation?: IAVCellRelationValue
    rollup?: {
        contents?: IAVCellValue[]
    }
    date?: IAVCellDateValue
    created?: IAVCellDateValue
    updated?: IAVCellDateValue
}

interface IAVCellRelationValue {
    blockIDs: string[];
    contents?: IAVCellValue[];
}

interface IAVCellDateValue {
    content?: number,
    isNotEmpty?: boolean
    content2?: number,
    isNotEmpty2?: boolean
    hasEndDate?: boolean
    formattedContent?: string,
    isNotTime?: boolean // 默认 true
}

interface IAVCellSelectValue {
    content: string,
    color: string,
    resolvedColor?: IAVColor
}

interface IAVCellAssetValue {
    content: string,
    name: string,
    type: "file" | "image"
}

interface IAVColumnRelation {
    avID?: string;
    backKeyID?: string;
    isTwoWay?: boolean;
}

interface IAVCellRollupValue {
    relationKeyID?: string;  // 关联列 ID
    keyID?: string;
    calc?: IAVCalc;
}

interface IAVCalc {
    operator?: string,
    template?: string,
    result?: IAVCellValue
}

export type IOperation = Exclude<import("./api").TransactionOperationRequest, {action: import("./api").UnknownTransactionAction}>;

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
    closedTabs?: ILayoutJSON[]
    reqIds: {
        [key: string]: number
    },
    editorIsFullscreen?: boolean,
    hideBreadcrumb?: boolean,
    notebooks?: INotebook[],
    emojis?: IEmoji[],
    backStack?: IBackStack[],
    mobile?: {
        touchRange?: Range
        size: {
            isLandscape?: boolean,
            landscape?: {
                height1: number,
                height2: number,    // 键盘弹起时的高度
            }, // 横屏
            portrait?: {
                height1: number,
                height2: number,
            }
        }
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
        /**
         * 功能特性付费状态
         * 0 未付费，1 已付费
         */
        userSiYuanOneTimePayStatus: number
        /**
         * 会员过期时间
         * -1 终身会员；0 未订阅或订阅已过期；>0 订阅到期时间（时间戳，毫秒）
         */
        userSiYuanProExpireTime: number
        /**
         * 订阅计划类型
         * 0 年付订阅/终生；1 教育优惠；2 订阅试用
         */
        userSiYuanSubscriptionPlan: number
        /**
         * 订阅类型
         * 0 年付；1 终生；2 月付
         */
        userSiYuanSubscriptionType: number
        /**
         * 订阅状态
         * -1 未订阅，0 订阅可用，1 订阅封禁，2 订阅过期（包括付费订阅过期和试用订阅过期）
         */
        userSiYuanSubscriptionStatus: number
        userToken: string
        userTitles: {
            name: string,
            icon: string,
            desc: string
        }[]
    },
    dragElement?: HTMLElement,
    dragTitle?: string,
    currentDragOverTabHeadersElement?: HTMLElement
    touchDragActive?: boolean,
    touchDragGhost?: HTMLElement | null,
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
    /**
     * 是否在发布服务下访问
     */
    isPublish?: boolean;
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
    warning?: boolean
}

interface ILayoutJSON extends ILayoutOptions {
    scrollAttr?: {
        rootId: string,
        startId?: string,
        endId?: string
        scrollTop?: number,
        focusId?: string,
        focusStart?: number
        focusEnd?: number
        zoomInId?: string
    },
    instance?: string,
    width?: string,
    height?: string,
    title?: string,
    lang?: string
    docIcon?: string
    page?: string
    path?: string
    blockId?: string
    mode?: TEditorMode
    action?: TProtyleAction
    icon?: string
    rootId?: string
    active?: boolean
    pin?: boolean
    isPreview?: boolean
    customModelData?: any
    customModelType?: string
    config?: Config.IUILayoutTabSearchConfig
    children?: ILayoutJSON[] | ILayoutJSON
}

export interface IModels {
    editor: Editor[],
    graph: Model[],
    outline: Model[],
    backlink: Model[],
    inbox: Inbox[],
    files: Files[],
    bookmark: Model[],
    tag: Model[],
    asset: Model[],
    search: Model[],
    custom: Custom[],
}

export interface IWebSocketData {
    cmd?: string;
    callback?: string;
    data?: any;
    msg: string;
    code: number;
    sid?: string;
    context?: any;
}

export interface IObject {
    [key: string]: string | number | boolean;
}

declare class Viewer {
    public viewer: HTMLElement;
    public destroyed: boolean;
    public image: HTMLImageElement;
    public viewed: boolean;
    public toolbar: HTMLElement;

    constructor(element: Element, options: {
        title: [number, (image: HTMLImageElement, imageData: IObject) => string],
        button: boolean,
        initialViewIndex?: number,
        magnifier?: boolean,
        navigation?: boolean,
        transition: boolean,
        hidden: () => void,
        ready?: (this: HTMLElement, event: CustomEvent) => void,
        view?: (this: HTMLElement, event: CustomEvent) => void,
        viewed?: (this: HTMLElement, event: CustomEvent) => void,
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
            copy?: () => void,
            copyFile?: () => void,
            close?: () => void
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
        action?: TProtyleAction[];
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
    public init: (this: MobileCustom, custom: MobileCustom) => void;
    public destroy: (this: MobileCustom) => void;
    public update: (this: MobileCustom) => void;

    constructor(options: {
        element: Element,
        type: string,
        data: any,
        destroy?: (this: MobileCustom) => void,
        update?: (this: MobileCustom) => void,
        init: (this: MobileCustom, custom: MobileCustom) => void
    })
}


export declare class Custom extends Model {
    element: Element;
    tab: Tab;
    data: any;
    type: string;
    init: (this: Custom, custom: Custom) => void;
    destroy: (this: Custom) => void;
    beforeDestroy: (this: Custom) => void;
    resize: (this: Custom) => void;
    update: (this: Custom) => void;
    editors: Protyle[];

    constructor(options: {
        app: App;
        type: string;
        tab: Tab;
        data: any;
        destroy?: (this: Custom) => void;
        beforeDestroy?: (this: Custom) => void;
        resize?: (this: Custom) => void;
        update?: (this: Custom) => void;
        init: (this: Custom, custom: Custom) => void;
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
    appId: string;
}

export declare class Menus {
    menu: Menu;

    constructor(app: App);

    private getDir;
    private unselect;
}
