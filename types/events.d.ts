import type {IProtyle} from "./protyle";
import {subMenu} from "./../siyuan";

export interface IMenuBaseDetail {
    menu: subMenu;
    protyle: IProtyle;
    element: HTMLElement;
}
