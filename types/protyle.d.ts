import {
    App,
    Config,
    Editor,
    IAV,
    IObject,
    IOperation,
    IPosition,
    IWebSocketData,
    Menu,
} from "./../siyuan";
import {Model} from "./layout/Model";

declare class Breadcrumb {
    element: HTMLElement;

    constructor(protyle: IProtyle);

    toggleExit(hide: boolean): void;

    showMenu(protyle: IProtyle, position: IPosition): void;

    render(protyle: IProtyle, update?: boolean, nodeElement?: Element | false): void;

    hide(): void;
}

declare class Scroll {
    element: HTMLElement;
    private parentElement;
    private inputElement;
    lastScrollTop: number;
    keepLazyLoad: boolean;

    constructor(protyle: IProtyle);

    private setIndex;

    updateIndex(protyle: IProtyle, id: string, cb?: (index: number) => void): void;

    update(protyle: IProtyle): void;
}

declare class WYSIWYG {
    lastHTMLs: {
        [key: string]: string;
    };
    element: HTMLDivElement;
    preventKeyup: boolean;
    private shiftStartElement;
    private preventClick;

    constructor(protyle: IProtyle);

    renderCustom(ial: IObject): void;

    private escapeInline;
    private setEmptyOutline;
    private emojiToMd;
    private bindCommonEvent;
    private bindEvent;
}

declare class Gutter {
    element: HTMLElement;
    private gutterTip;

    constructor(protyle: IProtyle);

    private isMatchNode;
    private turnsOneInto;
    private turnsIntoOne;
    private turnsInto;
    private showMobileAppearance;

    renderMultipleMenu(protyle: IProtyle, selectsElement: Element[]): Menu;

    renderMenu(protyle: IProtyle, buttonElement: Element): Menu;

    private genHeadingTransform;
    private genClick;
    private genAlign;
    private updateNodeElements;
    private genWidths;
    private genHeights;
    private genCopyTextRef;

    render(protyle: IProtyle, element: Element, wysiwyg: HTMLElement, target?: Element): void;
}

declare class Title {
    element: HTMLElement;
    editElement: HTMLElement;
    private timeout;

    constructor(protyle: IProtyle);

    private rename;

    setTitle(title: string): void;

    render(protyle: IProtyle, response: IWebSocketData): boolean;
}

declare class Background {
    element: HTMLElement;
    ial: IObject;
    private imgElement;
    private iconElement;
    private actionElements;
    private tagsElement;
    private transparentData;

    constructor(protyle: IProtyle);

    private removeTag;

    render(ial: IObject, rootId: string): void;

    private openTag;
    private getTags;
    private addTags;
}

declare class Preview {
    element: HTMLElement;
    previewElement: HTMLElement;
    private mdTimeoutId;

    constructor(protyle: IProtyle);

    render(protyle: IProtyle): void;

    private link2online;
    private copyToX;
    private processZHBlockquote;
    private processZHTable;
}

interface IOperations {
    doOperations: IOperation[],
    undoOperations: IOperation[]
}

declare class Undo {
    private hasUndo;
    redoStack: IOperations[];
    undoStack: IOperations[];

    constructor();

    undo(protyle: IProtyle): void;

    redo(protyle: IProtyle): void;

    private render;

    replace(doOperations: IOperation[], protyle: IProtyle): void;

    add(doOperations: IOperation[], undoOperations: IOperation[], protyle: IProtyle): void;

    clear(): void;
}

declare class Upload {
    element: HTMLElement;
    isUploading: boolean;

    constructor();
}

declare class Hint {
    timeId: number;
    element: HTMLDivElement;
    enableSlash: boolean;
    private enableEmoji;
    enableExtend: boolean;
    splitChar: string;
    lastIndex: number;
    private source;

    constructor(protyle: IProtyle);

    render(protyle: IProtyle): void;

    genLoading(protyle: IProtyle): void;

    bindUploadEvent(protyle: IProtyle, element: HTMLElement): void;

    private getHTMLByData;

    genHTML(data: IHintData[], protyle: IProtyle, hide: boolean, source: THintSource): void;

    private genSearchHTML;
    private genEmojiHTML;

    fill(value: string, protyle: IProtyle, updateRange?: boolean, refIsS?: boolean): void;

    select(event: KeyboardEvent, protyle: IProtyle): boolean;

    private fixImageCursor;
    private getKey;
}

export declare class Toolbar {
    public element: HTMLElement;
    public subElement: HTMLElement;
    public subElementCloseCB: () => void;
    public range: Range;
    public toolbarHeight: number;

    constructor(protyle: IProtyle)

    public render(protyle: IProtyle, range: Range, event?: KeyboardEvent): void

    public getCurrentType(range: Range): string[]

    public setInlineMark(protyle: IProtyle, type: string, action: "range" | "toolbar", textObj?: {
        color?: string,
        type: string
    }): void

    public showRender(protyle: IProtyle, renderElement: Element, updateElements?: Element[], oldHTML?: string): void

    public showCodeLanguage(protyle: IProtyle, languageElement: HTMLElement): void

    public showTpl(protyle: IProtyle, nodeElement: HTMLElement, range: Range): void

    public showWidget(protyle: IProtyle, nodeElement: HTMLElement, range: Range): void

    public showContent(protyle: IProtyle, range: Range, nodeElement: Element): void
}

export class Protyle {

    public readonly version: string;
    public protyle: IProtyle;

    constructor(app: App, element: HTMLElement, options?: IProtyleOptions)

    /** 聚焦到编辑器 */
    public focus(): void

    /** 上传是否还在进行中 */
    public isUploading(): boolean

    /** 清空 undo & redo 栈 */
    public clearStack(): void

    /** 销毁编辑器 */
    public destroy(): void

    public resize(): void

    public reload(focus: boolean): void

    /**
     * @param {boolean} [isBlock=false]
     * @param {boolean} [useProtyleRange=false]
     */
    public insert(html: string, isBlock?: boolean, useProtyleRange?: boolean): void

    public transaction(doOperations: IOperation[], undoOperations?: IOperation[]): void;

    /**
     * 多个块转换为一个块
     * @param {TTurnIntoOneSub} [subType] type 为 "BlocksMergeSuperBlock" 时必传
     */
    public turnIntoOneTransaction(selectsElement: Element[], type: TTurnIntoOne, subType?: TTurnIntoOneSub): void

    /**
     * 多个块转换
     * @param {Element} [nodeElement] 优先使用包含 protyle-wysiwyg--select 的块，否则使用 nodeElement 单块
     * @param type
     * @param {number} [subType] type 为 "Blocks2Hs" 时必传
     */
    public turnIntoTransaction(nodeElement: Element, type: TTurnInto, subType?: number): void

    public updateTransaction(id: string, newHTML: string, html: string): void

    public updateBatchTransaction(nodeElements: Element[], cb: (e: HTMLElement) => void): void

    public getRange(element: Element): Range

    public hasClosestBlock(element: Node): false | HTMLElement

    /**
     * @param {boolean} [toStart=true]
     */
    public focusBlock(element: Element, toStart?: boolean): false | Range

    public disable(): void

    public enable(): void

    public renderAVAttribute(element: HTMLElement, id: string, cb?: (element: HTMLElement) => void): void
}

export class ProtyleMethod {
    /**
     * @description 使用 graphviz 进行渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     */
    public static graphvizRender(element: Element, cdn?: string): void

    /**
     * @description 为 element 中的代码块进行高亮渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     * @param {number} [zoom=1]
     */
    public static highlightRender(element: Element, cdn?: string, zoom?: number): void

    /**
     * @description 对数学公式进行渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     * @param {boolean} [maxWidth=false]
     */
    public static mathRender(element: Element, cdn?: string, maxWidth?: boolean): void;

    /**
     * @description mermaid.js 渲染，支持流程图/时序图/甘特图渲染等
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     */
    public static mermaidRender(element: Element, cdn?: string): void;

    /**
     * @description flowchart.js 渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     */
    public static flowchartRender(element: Element, cdn?: string): void;

    /**
     * @description 图表渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     */
    public static chartRender(element: Element, cdn?: string): void;

    /**
     * @description 五线谱渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     */
    public static abcRender(element: Element, cdn?: string): void;

    /**
     * @description 脑图渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     */
    public static mindmapRender(element: Element, cdn?: string): void;

    /**
     * @description UML 渲染
     * @param {string} [cdn=Constants.PROTYLE_CDN]
     */
    public static plantumlRender(element: Element, cdn?: string): void;

    /**
     * @description 数据库渲染
     * @param {boolean} [renderAll=true]
     */
    public static avRender(element: Element, protyle: IProtyle, cb?: (data: IAV) => void, renderAll?: boolean, avData?: IAV): Promise<void>;

    /**
     * @description html 渲染
     */
    public static htmlRender(element: Element): void;
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

type THintSource = "search" | "av" | "hint";

type TTurnIntoOne = "BlocksMergeSuperBlock" | "Blocks2ULs" | "Blocks2OLs" | "Blocks2TLs" | "Blocks2Blockquote"

type TTurnIntoOneSub = "row" | "col"

type TTurnInto = "Blocks2Ps" | "Blocks2Hs"

type TEditorMode = "preview" | "wysiwyg"

type ILuteRenderCallback = (node: ILuteNode, entering: boolean) => [string, number];

export type TProtyleAction = "cb-get-append" | // 向下滚动加载
    "cb-get-before" | // 向上滚动加载
    "cb-get-unchangeid" | // 上下滚动，定位时不修改 blockid
    "cb-get-hl" | // 高亮
    "cb-get-focus" | // 光标定位
    "cb-get-focusfirst" | // 动态定位到第一个块
    "cb-get-setid" | // 无折叠大纲点击 重置 blockid
    "cb-get-outline" | // 大纲点击
    "cb-get-all" | // 获取所有块
    "cb-get-backlink" | // 悬浮窗为传递型需展示上下文
    "cb-get-unundo" | // 不需要记录历史
    "cb-get-scroll" | // 滚动到指定位置，用于直接打开文档，必有 rootID
    "cb-get-context" | // 包含上下文
    "cb-get-rootscroll" | // 如果为 rootID 就滚动到指定位置，必有 rootID
    "cb-get-html" | // 直接渲染，不需要再 /api/block/getDocInfo，否则搜索表格无法定位
    "cb-get-history" | // 历史渲染
    "cb-get-opennew"  // 编辑器只读后新建文件需为临时解锁状态 & https://github.com/siyuan-note/siyuan/issues/12197

/** @link https://ld246.com/article/1588412297062 */
interface ILuteRender {
    renderDocument?: ILuteRenderCallback;
    renderParagraph?: ILuteRenderCallback;
    renderText?: ILuteRenderCallback;
    renderCodeBlock?: ILuteRenderCallback;
    renderCodeBlockOpenMarker?: ILuteRenderCallback;
    renderCodeBlockInfoMarker?: ILuteRenderCallback;
    renderCodeBlockCode?: ILuteRenderCallback;
    renderCodeBlockCloseMarker?: ILuteRenderCallback;
    renderMathBlock?: ILuteRenderCallback;
    renderMathBlockOpenMarker?: ILuteRenderCallback;
    renderMathBlockContent?: ILuteRenderCallback;
    renderMathBlockCloseMarker?: ILuteRenderCallback;
    renderBlockquote?: ILuteRenderCallback;
    renderBlockquoteMarker?: ILuteRenderCallback;
    renderHeading?: ILuteRenderCallback;
    renderHeadingC8hMarker?: ILuteRenderCallback;
    renderList?: ILuteRenderCallback;
    renderListItem?: ILuteRenderCallback;
    renderTaskListItemMarker?: ILuteRenderCallback;
    renderThematicBreak?: ILuteRenderCallback;
    renderHTML?: ILuteRenderCallback;
    renderTable?: ILuteRenderCallback;
    renderTableHead?: ILuteRenderCallback;
    renderTableRow?: ILuteRenderCallback;
    renderTableCell?: ILuteRenderCallback;
    renderCodeSpan?: ILuteRenderCallback;
    renderCodeSpanOpenMarker?: ILuteRenderCallback;
    renderCodeSpanContent?: ILuteRenderCallback;
    renderCodeSpanCloseMarker?: ILuteRenderCallback;
    renderInlineMath?: ILuteRenderCallback;
    renderInlineMathOpenMarker?: ILuteRenderCallback;
    renderInlineMathContent?: ILuteRenderCallback;
    renderInlineMathCloseMarker?: ILuteRenderCallback;
    renderEmphasis?: ILuteRenderCallback;
    renderEmAsteriskOpenMarker?: ILuteRenderCallback;
    renderEmAsteriskCloseMarker?: ILuteRenderCallback;
    renderEmUnderscoreOpenMarker?: ILuteRenderCallback;
    renderEmUnderscoreCloseMarker?: ILuteRenderCallback;
    renderStrong?: ILuteRenderCallback;
    renderStrongA6kOpenMarker?: ILuteRenderCallback;
    renderStrongA6kCloseMarker?: ILuteRenderCallback;
    renderStrongU8eOpenMarker?: ILuteRenderCallback;
    renderStrongU8eCloseMarker?: ILuteRenderCallback;
    renderStrikethrough?: ILuteRenderCallback;
    renderStrikethrough1OpenMarker?: ILuteRenderCallback;
    renderStrikethrough1CloseMarker?: ILuteRenderCallback;
    renderStrikethrough2OpenMarker?: ILuteRenderCallback;
    renderStrikethrough2CloseMarker?: ILuteRenderCallback;
    renderHardBreak?: ILuteRenderCallback;
    renderSoftBreak?: ILuteRenderCallback;
    renderInlineHTML?: ILuteRenderCallback;
    renderLink?: ILuteRenderCallback;
    renderOpenBracket?: ILuteRenderCallback;
    renderCloseBracket?: ILuteRenderCallback;
    renderOpenParen?: ILuteRenderCallback;
    renderCloseParen?: ILuteRenderCallback;
    renderLinkText?: ILuteRenderCallback;
    renderLinkSpace?: ILuteRenderCallback;
    renderLinkDest?: ILuteRenderCallback;
    renderLinkTitle?: ILuteRenderCallback;
    renderImage?: ILuteRenderCallback;
    renderBang?: ILuteRenderCallback;
    renderEmoji?: ILuteRenderCallback;
    renderEmojiUnicode?: ILuteRenderCallback;
    renderEmojiImg?: ILuteRenderCallback;
    renderEmojiAlias?: ILuteRenderCallback;
    renderBackslash?: ILuteRenderCallback;
    renderBackslashContent?: ILuteRenderCallback;
}

interface IBreadcrumb {
    id: string,
    name: string,
    type: string,
    subType: string,
    children: []
}

interface ILuteOptions extends IMarkdownConfig {
    emojis: IObject;
    emojiSite: string;
    headingAnchor: boolean;
    lazyLoadImage?: string;
}

declare class Viz {
    public static instance(): Promise<Viz>;

    renderSVGElement: (code: string) => SVGElement;
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

    public SetSpin(enable: boolean): void;

    public SetTextMark(enable: boolean): void;

    public SetHTMLTag2TextMark(enable: boolean): void;

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

    public SetSuperBlock(enable: boolean): void;

    public SetTag(enable: boolean): void;

    public SetInlineMath(enable: boolean): void;

    public SetGFMStrikethrough(enable: boolean): void;

    public SetGFMStrikethrough1(enable: boolean): void;

    public SetMark(enable: boolean): void;

    public SetSub(enable: boolean): void;

    public SetSup(enable: boolean): void;

    public SetInlineAsterisk(enable: boolean): void;

    public SetInlineUnderscore(enable: boolean): void;

    public SetBlockRef(enable: boolean): void;

    public SetSanitize(enable: boolean): void;

    public SetHeadingAnchor(enable: boolean): void;

    public SetImageLazyLoading(imagePath: string): void;

    public SetInlineMathAllowDigitAfterOpenMarker(enable: boolean): void;

    public SetToC(enable: boolean): void;

    public SetIndentCodeBlock(enable: boolean): void;

    public SetParagraphBeginningSpace(enable: boolean): void;

    public SetFootnotes(enable: boolean): void;

    public SetLinkRef(enable: boolean): void;

    public SetEmojiSite(emojiSite: string): void;

    public PutEmojis(emojis: IObject): void;

    public SpinBlockDOM(html: string): string;

    public Md2BlockDOM(html: string): string;

    public SetProtyleWYSIWYG(wysiwyg: boolean): void;

    public MarkdownStr(name: string, md: string): string;

    public GetLinkDest(text: string): string;

    public BlockDOM2InlineBlockDOM(html: string): string;

    public BlockDOM2HTML(html: string): string;

    public HTML2Md(html: string): string;

    public HTML2BlockDOM(html: string): string;

    public SetUnorderedListMarker(marker: string): void;
}

declare const webkitAudioContext: {
    prototype: AudioContext
    new(contextOptions?: AudioContextOptions): AudioContext,
};

/** @link https://ld246.com/article/1549638745630#options-upload */
interface IUpload {
    /** 上传 url */
    url?: string;
    /** 上传文件最大 Byte */
    max?: number;
    /** 剪切板中包含图片地址时，使用此 url 重新上传 */
    linkToImgUrl?: string;
    /** CORS 上传验证，头为 X-Upload-Token */
    token?: string;
    /** 文件上传类型，同 [input accept](https://www.w3schools.com/tags/att_input_accept.asp) */
    accept?: string;
    /** 跨站点访问控制。默认值: false */
    withCredentials?: boolean;
    /** 请求头设置 */
    headers?: IObject;
    /** 额外请求参数 */
    extraData?: { [key: string]: string | Blob };
    /** 上传字段名。默认值：file[] */
    fieldName?: string;

    /** 每次上传前都会重新设置请求头 */
    setHeaders?(): IObject;

    /** 上传成功回调 */
    success?(editor: HTMLDivElement, msg: string): void;

    /** 上传失败回调 */
    error?(msg: string): void;

    /** 文件名安全处理。 默认值: name => name.replace(/\W/g, '') */
    filename?(name: string): string;

    /** 校验，成功时返回 true 否则返回错误信息 */
    validate?(files: File[]): string | boolean;

    /** 自定义上传，当发生错误时返回错误信息 */
    handler?(files: File[]): string | null;

    /** 对服务端返回的数据进行转换，以满足内置的数据结构 */
    format?(files: File[], responseText: string): string;

    /** 将上传的文件处理后再返回  */
    file?(files: File[]): File[];

    /** 图片地址上传后的回调  */
    linkToImgCallback?(responseText: string): void;
}

interface IScrollAttr {
    rootId: string,
    startId: string,
    endId: string
    scrollTop: number,
    focusId?: string,
    focusStart?: number
    focusEnd?: number
    zoomInId?: string
}

/** @link https://ld246.com/article/1549638745630#options-toolbar */
interface IMenuItem {
    /** 唯一标示 */
    name: string;
    /** 提示 */
    tip?: string;
    /** 语言 key */
    lang?: string;
    /** svg 图标 */
    icon?: string;
    /** 快捷键 */
    hotkey?: string;
    /** 提示的位置 */
    tipPosition?: string;

    click?(protyle: Protyle): void;
}

/** @link https://ld246.com/article/1549638745630#options-preview-markdown */
interface IMarkdownConfig {
    /** 段落开头是否空两格。默认值: false */
    paragraphBeginningSpace?: boolean;
    /** 是否启用过滤 XSS。默认值: true */
    sanitize?: boolean;
    /** 为列表添加标记，以便[自定义列表样式](https://github.com/Vanessa219/vditor/issues/390) 默认值：false */
    listStyle?: boolean;
}

/** @link https://ld246.com/article/1549638745630#options-preview */
interface IPreview {
    /** 预览 debounce 毫秒间隔。默认值: 1000 */
    delay?: number;
    /** 显示模式。默认值: 'both' */
    mode?: "both" | "editor";
    /** md 解析请求 */
    url?: string;
    /** @link https://ld246.com/article/1549638745630#options-preview-markdown */
    markdown?: IMarkdownConfig;
    /** @link https://ld246.com/article/1549638745630#options-preview-actions  */
    actions?: Array<IPreviewAction | IPreviewActionCustom>;

    /** 渲染之前回调 */
    transform?(html: string): string;
}

type IPreviewAction = "desktop" | "tablet" | "mobile" | "mp-wechat" | "zhihu" | "yuque";

interface IPreviewActionCustom {
    /** 键名 */
    key: string;
    /** 按钮文本 */
    text: string;
    /** 按钮 className 值 */
    className?: string;
    /** 点击回调 */
    click: (key: string) => void;
}

interface IHintData {
    id?: string;
    html: string;
    value: string;
    filter?: string[];
    focus?: boolean;
}

interface IHintExtend {
    key: string;

    hint?(value: string, protyle: IProtyle, source: THintSource): IHintData[];
}

/** @link https://ld246.com/article/1549638745630#options-hint */
interface IHint {
    /** 常用表情提示 HTML */
    emojiTail?: string;
    /** 提示 debounce 毫秒间隔。默认值: 200 */
    delay?: number;
    /** 默认表情，可从 [lute/emoji_map](https://github.com/88250/lute/blob/master/parse/emoji_map.go#L32) 中选取，也可自定义 */
    emoji?: IObject;
    emojiPath?: string;
    extend?: IHintExtend[];
}

/** @link https://ld246.com/article/1549638745630#options */
export interface IProtyleOptions {
    history?: {
        created?: string
        snapshot?: string
    },
    backlinkData?: {
        blockPaths: IBreadcrumb[],
        dom: string
        expand: boolean
    }[],
    action?: TProtyleAction[],
    scrollPosition?: ScrollLogicalPosition,
    mode?: TEditorMode,
    blockId?: string
    rootId?: string
    originalRefBlockIDs?: IObject
    key?: string
    defIds?: string[]
    render?: {
        background?: boolean
        title?: boolean
        titleShowTop?: boolean
        gutter?: boolean
        scroll?: boolean
        breadcrumb?: boolean
        breadcrumbDocName?: boolean
        hideTitleOnZoom?: boolean
    }
    /** 内部调试时使用 */
    _lutePath?: string;
    /** 是否启用打字机模式。默认值: false */
    typewriterMode?: boolean;
    /** 多语言。默认值: 'zh_CN' */
    lang?: string;
    /** @link https://ld246.com/article/1549638745630#options-toolbar */
    toolbar?: Array<string | IMenuItem>;
    /** @link https://ld246.com/article/1549638745630#options-preview */
    preview?: IPreview;
    /** @link https://ld246.com/article/1549638745630#options-hint */
    hint?: IHint;
    /** @link https://ld246.com/article/1549638745630#options-upload */
    upload?: IUpload;
    /** @link https://ld246.com/article/1549638745630#options-classes */
    classes?: {
        preview?: string;
    };
    click?: {
        /** 点击末尾是否阻止插入新块 */
        preventInsetEmptyBlock?: boolean
    }

    handleEmptyContent?(): void

    /** 编辑器异步渲染完成后的回调方法 */
    after?(protyle: Protyle): void;
}

// REF: https://github.com/siyuan-note/siyuan/blob/dev/app/src/types/protyle.d.ts
export interface IProtyle {
    highlight: {
        mark: Highlight
        markHL: Highlight
        ranges: Range[]
        rangeIndex: number
        styleElement: HTMLStyleElement
    }
    getInstance: () => Protyle,
    observerLoad?: ResizeObserver,
    observer?: ResizeObserver,
    app: App,
    transactionTime: number,
    id: string,
    query?: {
        key: string,
        method: number
        types: Config.IUILayoutTabSearchConfigTypes
    },
    block: {
        id?: string,
        scroll?: boolean
        parentID?: string,
        parent2ID?: string,
        rootID?: string,
        showAll?: boolean
        mode?: number
        blockCount?: number
        action?: string[]
    },
    disabled: boolean,
    selectElement?: HTMLElement,
    ws?: Model,
    notebookId?: string
    path?: string
    model?: Editor,
    updated: boolean;
    element: HTMLElement;
    scroll?: Scroll,
    gutter?: Gutter,
    breadcrumb?: Breadcrumb,
    title?: Title,
    background?: Background,
    contentElement?: HTMLElement,
    options: IProtyleOptions;
    lute?: Lute;
    toolbar?: Toolbar,
    preview?: Preview;
    hint?: Hint;
    upload?: Upload;
    undo?: Undo;
    wysiwyg?: WYSIWYG
}
