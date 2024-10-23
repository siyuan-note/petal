import { Model } from "../../layout/Model";
import {App, IFile} from "../../index";
export declare class MobileFiles extends Model {
    element: HTMLElement;
    private actionsElement;
    private closeElement;
    constructor(app: App);
    private genSort;
    private genNotebook;
    init(init?: boolean): void;
    private onMove;
    private onMkdir;
    private onRemove;
    onRename(data: {
        path: string;
        title: string;
        box: string;
    }): void;
    private onMount;
    private onLsHTML;
    private onLsSelect;
    private setCurrent;
    getLeaf(liElement: Element, notebookId: string): void;
    selectItem(notebookId: string, filePath: string, data?: {
        files: IFile[];
        box: string;
        path: string;
    }, setStorage?: boolean): void;
    private getOpenPaths;
    private genFileHTML;
}
