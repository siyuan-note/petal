import {IObject} from "../siyuan";

export interface IGetDocInfo {
    attrViews: { id: string; name: string }[] | null;
    ial: IObject;
    icon: string;
    id: string;
    name: string;
    refCount: number;
    refIDs: string[];
    rootID: string;
    subFileCount: number;
}

export interface IGetTreeStat {
    blockCount: number;
    imageCount: number;
    linkCount: number;
    refCount: number;
    runeCount: number;
    wordCount: number;
}
