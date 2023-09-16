import type siyuan from "./../siyuan";
import type { IProtyle } from "./protyle";

//#region click-block-icon
interface IBlockIconDetail {
    menu: InstanceType<typeof siyuan.Menu>;
    protyle: IProtyle;
    data?: IDocumentData;
    blockElements?: HTMLElement[];
}

interface IDocumentData {
    id: string;
    ial: Record<string, string>;
    icon: string;
    name: string;
    rootID: string;
    refIDs: string[];
    refCount: number;
    subFileCount: number;
}

/**
 * `click-blockicon`
 */
export interface IClickBlockIconDetail extends IBlockIconDetail {
    blockElements: HTMLElement[];
}

/**
 * `click-editortitleicon`
 */
export interface IClickEditorTitleIconDetail extends IBlockIconDetail {
    data: IDocumentData;
}
//#endregion click-block-icon

//#region click-editor-content
/**
 * `click-editorcontent`
 */
export interface IClickEditorContentDetail {
    event: PointerEvent;
    protyle: IProtyle;
}
//#endregion click-editor-content

//#region click-pdf
/**
 * `click-pdf`
 */
export interface IClickPdfDetail {
    event: PointerEvent;
}
//#endregion click-pdf

//#region protyle
/**
 * `loaded-protyle`
 */
export interface ILoadedProtyleDetail extends IProtyle {
}

/**
 * `loaded-protyle-dynamic`
 */
export interface ILoadedProtyleDynamicDetail {
    protyle: IProtyle;
    positon: string;
}

/**
 * `destroy-protyle`
 */
export interface IDestroyProtyleDetail {
    protyle: IProtyle;
}
//#endregion protyle

//#region input-search
interface IInputSearchConfig {
    removed: boolean;
    k: string;
    r: string;
    hasReplace: boolean;
    method: number;
    hPath: string;
    idPath: string[];
    group: number;
    sort: number;
    types: {
        blockquote: boolean;
        codeBlock: boolean;
        document: boolean;
        embedBlock: boolean;
        heading: boolean;
        htmlBlock: boolean;
        list: boolean;
        listItem: boolean;
        mathBlock: boolean;
        paragraph: boolean;
        superBlock: boolean;
        table: boolean;
    };
    page: number;
}

interface IInputSearchProtyle {
    protyle: IProtyle;
}

/**
 * `input-search`
 */
export interface IInputSearchDetail {
    config: IInputSearchConfig;
    protyle: IInputSearchProtyle;
    searchElement: HTMLInputElement;
}
//#endregion input-search

//#region open-menu
interface IMenuBaseDetail {
    menu: InstanceType<typeof siyuan.Menu>;
    protyle: IProtyle;
}

interface IMenuInlineDetail extends IMenuBaseDetail {
    element: HTMLSpanElement,
}

interface IBreadcrumbData {
    imageCount: number;
    linkCount: number;
    refCount: number;
    runeCount: number;
    wordCount: number;
}

/**
 * `open-menu-breadcrumbmore`
 */
export interface IOpenMenuBreadcrumbMoreDetail extends IMenuBaseDetail {
    data: IBreadcrumbData;
}

/**
 * `open-menu-content`
 */
export interface IOpenMenuContentDetail extends IMenuBaseDetail {
    element: HTMLDivElement,
    range: Range;
}

/**
 * `open-menu-blockref`
 */
export interface IOpenMenuBlockRefDetail extends IMenuInlineDetail {
}

/**
 * `open-menu-fileannotationref`
 */
export interface IOpenMenuFileAnnotationRefDetail extends IMenuInlineDetail {
}

/**
 * `open-menu-image`
 */
export interface IOpenMenuImageDetail extends IMenuInlineDetail {
}

/**
 * `open-menu-link`
 */
export interface IOpenMenuLinkDetail extends IMenuInlineDetail {
}

/**
 * `open-menu-tag`
 */
export interface IOpenMenuTagDetail extends IMenuInlineDetail {
}
//#endregion open-menu

//#region open-noneditableblock
interface INonEditableBlockToolbar {
    element: HTMLDivElement;
    range: Range;
    subElement: HTMLDivElement;
    subElementCloseCB: () => any;
    toolbarHeight: number;
}

/**
 * `open-noneditableblock`
 */
export interface IOpenNonEditableBlockDetail {
    protyle: IProtyle;
    toolbar: INonEditableBlockToolbar;
}
//#endregion open-noneditableblock

//#region open-siyuan-url
interface IOpenSiyuanUrlDetail {
    url: string;
}

/**
 * `open-siyuan-url-block`
 */
export interface IOpenSiyuanUrlBlockDetail extends IOpenSiyuanUrlDetail {
    id: string;
    focus: boolean;
    exist: boolean;
}

/**
 * `open-siyuan-url-plugin`
*/
export interface IOpenSiyuanUrlPluginDetail extends IOpenSiyuanUrlDetail {
}
//#endregion open-siyuan-url

//#region ws-main
/**
 * `ws-main`
 */
export interface IWebSocketMainDetail {
    cmd?: string
    callback?: string
    data?: any
    msg: string
    code: number
    sid?: string
}
//#endregion ws-main
