import { App } from "../../index";
export declare class MobileTags {
    element: HTMLElement;
    private tree;
    private openNodes;
    constructor(app: App);
    update(): void;
}
