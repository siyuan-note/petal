import { Model } from "../../layout/Model";
import {App, IFile} from "../../index";
export declare class MobileFiles extends Model {
    element: HTMLElement;
    private actionsElement;
    private closeElement;
    private touchDragState;
    constructor(app: App);
    private handleMsgCallback;
    private clearDragIndicators;
    private genSort;
    private updateItemArrow;
    private updateDocInfo;
    private genNotebook;
    init(init?: boolean): void;
    private onMove;
    private onRemove;
    onRename(data: {
        path: string;
        title: string;
        box: string;
    }): void;
    private onMount;
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
    private genFileHTML;
    private refreshPublishAccessSwitch;
}
