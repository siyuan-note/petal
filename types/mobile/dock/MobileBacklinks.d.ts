import { App } from "../../index";
import { Model } from "../../layout/Model";
import { Tree } from "../../util/Tree";
export declare class MobileBacklinks extends Model {
    element: HTMLElement;
    tree: Tree;
    notebookId: string;
    mTree: Tree;
    constructor(app: App, element: HTMLElement);
    update(): void;
}
