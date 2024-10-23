import {Model} from "./Model";
import {Wnd} from "./Wnd";

interface ITab {
    icon?: string
    docIcon?: string
    title?: string
    panel?: string
    callback?: (tab: Tab) => void
}

export declare class Tab {
    parent: Wnd;
    id: string;
    headElement: HTMLElement;
    panelElement: HTMLElement;
    callback: (tab: Tab) => void;
    model: Model;
    title: string;
    icon: string;
    docIcon: string;

    constructor(options: ITab);

    updateTitle(title: string): void;

    addModel(model: Model): void;

    pin(): void;

    setDocIcon(icon: string): void;

    unpin(): void;

    close(): void;
}
