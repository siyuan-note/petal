import type {IProtyle} from "./protyle";
import {subMenu} from "./../siyuan";

export interface IMenuBaseDetail {
    menu: subMenu;
    protyle: IProtyle;
    element: HTMLElement;
}

/** 闪卡复习界面发出的会话通知，不覆盖直接调用内核 API 的操作。 */
export interface IFlashcardReviewSessionDetail {
    sessionID: string;
    reviewSetID: string;
    reviewMode: "normal" | "reinforcement";
}

export interface IFlashcardReviewCardDetail extends IFlashcardReviewSessionDetail {
    cardID: string;
    sourceID: string;
    /** 内置或插件注册的来源类型标识。 */
    sourceType: string;
}

/** 评分前后及撤销恢复的排期快照，时间戳单位为毫秒。 */
export interface IFlashcardReviewStateSnapshot {
    state: string;
    due: number;
    lastReview?: number;
    stability: number;
    difficulty: number;
    elapsedDays: number;
    scheduledDays: number;
    reps: number;
    lapses: number;
    suspended: boolean;
    buriedUntil?: number;
    buriedReason?: string;
    stateRevisionID: string;
}
