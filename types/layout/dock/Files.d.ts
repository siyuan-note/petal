import {App} from "../../../siyuan";
import {Tab} from "../Tab";
import {Model} from "../Model";

interface IFile {
    icon: string;
    name1: string;
    alias: string;
    memo: string;
    bookmark: string;
    path: string;
    name: string;
    hMtime: string;
    hCtime: string;
    hSize: string;
    dueFlashcardCount?: string;
    newFlashcardCount?: string;
    flashcardCount?: string;
    id: string;
    count: number;
    subFileCount: number;
}

export declare class Files extends Model {
    element: HTMLElement;
    parent: Tab;
    private actionsElement;
    closeElement: HTMLElement;
    constructor(options: {
        tab: Tab;
        app: App;
    });
    private genNotebook;
    init(init?: boolean): void;
    private onRemove;
    private onMount;
    onRename(data: {
        path: string;
        title: string;
        box: string;
    }): void;
    private onMove;
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
    private genDocAriaLabel;
    private genFileHTML;
    private initMoreMenu;
}
