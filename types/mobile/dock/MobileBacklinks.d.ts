import { App } from "../../index";
export declare class MobileBacklinks {
    element: HTMLElement;
    private tree;
    private notebookId;
    private mTree;
    beforeLen: number;
    constructor(app: App);
    update(): void;
}
