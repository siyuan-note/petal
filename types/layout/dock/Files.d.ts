import {App, IFile} from "../../../siyuan";
import {Tab} from "../Tab";
import {Model} from "../Model";

export declare class Files extends Model {
    element: HTMLElement;
    parent: Tab;
    private actionsElement;
    closeElement: HTMLElement;
    lastSelectedElement: Element;
    constructor(options: {
        tab: Tab;
        app: App;
    });
    private handleMsgCallback;
    private updateDocInfo;
    private updateDocActionElement;
    updateDocActions(): void;
    private updateItemArrow;
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
    setCurrent(target: HTMLElement, isScroll?: boolean): void;
    getLeaf(liElement: Element, notebookId: string, focusUpdate?: boolean): void;
    selectItem(notebookId: string, filePath: string, data?: {
        files: IFile[];
        box: string;
        path: string;
    }, setStorage?: boolean, isSetCurrent?: boolean): Promise<HTMLElement>;
    private getOpenPaths;
    private genDocAriaLabel;
    private genFileHTML;
    private initMoreMenu;
    private refreshPublishAccessSwitch;
}
