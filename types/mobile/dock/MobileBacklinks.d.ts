import { App } from "../../index";
import { Model } from "../../layout/Model";
import { IProtyle, Protyle } from "../../protyle";
import { Tree } from "../../util/Tree";
export declare class MobileBacklinks extends Model {
    element: HTMLElement;
    inputsElement: NodeListOf<HTMLInputElement>;
    type: "pin" | "local" | "bottom";
    blockId: string;
    rootId: string;
    ownerProtyle?: IProtyle;
    tree: Tree;
    notebookId: string;
    mTree: Tree;
    editors: Protyle[];
    status: {
        [key: string]: {
            sort: number;
            mSort: number;
            scrollTop: number;
            mScrollTop: number;
            backlinkOpenIds: string[];
            backlinkMOpenIds: string[];
            /** 0 全展开，1 展开一半箭头向下，2 展开一半箭头向上，3 全收起 */
            backlinkMStatus: number;
            backlinkFolded: boolean;
            backmentionFolded: boolean;
        };
    };
    constructor(app: App, element: HTMLElement);
    update(): void;
    refresh(): void;
    destroy(): void;
    switchBlock(blockId: string, rootId: string, notebookId: string): void;
}
