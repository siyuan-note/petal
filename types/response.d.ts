import {IObject} from "../siyuan";

interface IGetDocInfo {
    ial: IObject
    icon: number
    id: number
    name: number
    refCount: number
    refIDs: string[]
    rootID: string
    subFileCount: number
}

interface IGetTreeStat {
    imageCount: number;
    linkCount: number;
    refCount: number;
    runeCount: number;
    wordCount: number;
}
