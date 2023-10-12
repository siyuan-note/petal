import {IObject} from "../siyuan";

export interface IGetDocInfo {
    ial: IObject
    icon: number
    id: number
    name: number
    refCount: number
    refIDs: string[]
    rootID: string
    subFileCount: number
}

export interface IGetTreeStat {
    imageCount: number;
    linkCount: number;
    refCount: number;
    runeCount: number;
    wordCount: number;
}
