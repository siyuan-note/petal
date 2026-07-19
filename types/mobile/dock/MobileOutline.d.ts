import {App, IWebSocketData} from "../../index";
import { Model } from "../../layout/Model";
import {Tree} from "../../util/Tree";
export declare class MobileOutline extends Model {
    tree: Tree;
    element: HTMLElement;
    blockId: string;
    isPreview: boolean;
    private preFilterExpandIds;
    private touchDragState;
    constructor(options: {
        app: App;
        blockId: string;
        isPreview: boolean;
    });
    private bindSort;
    private clearDragIndicators;
    private handleMsgCallback;
    setCurrent(nodeElement: HTMLElement): void;
    setCurrentByPreview(nodeElement: Element): void;
    private setCurrentById;
    update(data: IWebSocketData, callbackId?: string): void;
    saveExpendIds(): void;
    private setFilter;
    private getHeadingLevel;
    private expandToLevel;
    private showExpandLevelMenu;
    private collapseSameLevel;
    private collapseChildren;
    private onTransaction;
    private showContextMenu;
    private getProtyleAndBlockElement;
    private genHeadingTransform;
}
