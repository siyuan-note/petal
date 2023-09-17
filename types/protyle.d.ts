import {App, Lute} from "./../siyuan";

// REF: https://github.com/siyuan-note/siyuan/blob/dev/app/src/types/protyle.d.ts
export interface IProtyle {
    app: App;
    transactionTime: number;
    id: string;
    block: {
        id?: string;
        scroll?: boolean;
        parentID?: string;
        parent2ID?: string;
        rootID?: string;
        showAll?: boolean;
        mode?: number;
        blockCount?: number;
        action?: string[];
    };
    disabled: boolean;
    selectElement?: HTMLElement;
    ws?: any;
    notebookId?: string;
    path?: string;
    model?: any;
    updated: boolean;
    element: HTMLElement;
    scroll?: any;
    gutter?: any;
    breadcrumb?: {
        id: string;
        element: HTMLElement;
    };
    title?: {
        editElement: HTMLElement;
        element: HTMLElement;
    };
    background?: {
        element: HTMLElement;
        ial: Record<string, string>;
        iconElement: HTMLElement;
        imgElement: HTMLElement;
        tagsElement: HTMLElement;
        transparentData: string;
    };
    contentElement?: HTMLElement;
    options: any;
    lute?: Lute;
    toolbar?: any;
    preview?: any;
    hint?: any;
    upload?: any;
    undo?: any;
    wysiwyg?: any;
}
