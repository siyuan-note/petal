import {Protyle} from "../protyle";
import {App} from "../index";

export declare class BlockPanel {
    element: HTMLElement;
    targetElement: HTMLElement;
    nodeIds: string[];
    defIds: string[];
    id: string;
    private app;
    x: number;
    y: number;
    private isBacklink;
    editors: Protyle[];
    constructor(options: {
        app: App;
        targetElement?: HTMLElement;
        nodeIds?: string[];
        defIds?: string[];
        isBacklink: boolean;
        x?: number;
        y?: number;
    });
    private initProtyle;
    destroy(): void;
    private render;
}
