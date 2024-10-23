import { App } from "../../index";
export declare class MobileBookmarks {
    element: HTMLElement;
    private tree;
    private openNodes;
    constructor(app: App);
    update(): void;
}
