import { Tab } from "../Tab";
import { Model } from "../Model";
import { App } from "../../index";
export declare class Inbox extends Model {
    private element;
    private selectIds;
    private currentPage;
    private pageCount;
    private data;
    constructor(app: App, tab: Tab | Element);
    private back;
    private genDetail;
    private genItemHTML;
    private more;
    private remove;
    private move;
    private update;
}
