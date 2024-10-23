import { App } from "../../index";
import { Model } from "../../layout/Model";
export declare class MobileOutline extends Model {
    private tree;
    private openNodes;
    private element;
    constructor(app: App);
    update(): void;
    private setCurrentByPreview;
    private setCurrentById;
    private setCurrent;
}
