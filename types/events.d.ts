import type { EventMenu } from "./../siyuan";
import type { IProtyle } from "./protyle";

export interface IMenuBaseDetail {
    menu: EventMenu;
    protyle: IProtyle;
    element: HTMLElement;
}
