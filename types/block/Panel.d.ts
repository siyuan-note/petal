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
        originalRefBlockIDs?: IObject;
        x?: number;
        y?: number;
    });
    private initProtyle;
    destroy(): void;
    private render;
}
