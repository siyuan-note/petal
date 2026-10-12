import {Protyle} from "../protyle";
import {App, IObject, IRefDefs} from "../index";

export declare class BlockPanel {
    element: HTMLElement;
    targetElement: HTMLElement;
    refDefs: IRefDefs[];
    id: string;
    private app;
    x: number;
    y: number;
    private isBacklink;
    editors: Protyle[];
    private observerResize;
    private observerLoad;
    private originalRefBlockIDs;
    constructor(options: {
        app: App;
        targetElement?: HTMLElement;
        refDefs: IRefDefs[];
        isBacklink: boolean;
        originalRefBlockIDs?: Record<string, string>;
        x?: number;
        y?: number;
    });
    private initProtyle;
    /**
     * @param {boolean} [removeMenu=true] - 是否同时关闭浮层上打开的菜单
     */
    destroy(removeMenu?: boolean): void;
    removeEditors(options: {
        notebookId?: string;
        rootIDs: ReadonlySet<string>;
    }): void;
    private render;
}
