import type {IBlockTree} from "../index";

export declare class Tree {
    element: HTMLElement;
    click: (element: Element, event?: MouseEvent) => void;

    constructor(options: {
        element: HTMLElement;
        data: IBlockTree[];
        blockExtHTML?: string;
        topExtHTML?: string;
        click?(element: HTMLElement, event: MouseEvent): void;
        ctrlClick?(element: HTMLElement, event: MouseEvent): void;
        altClick?(element: HTMLElement, event: MouseEvent): void;
        shiftClick?(element: HTMLElement): void;
        toggleClick?(element: HTMLElement): void;
        rightClick?(element: HTMLElement, event: MouseEvent): void;
    });

    updateData(data: IBlockTree[]): void;

    toggleBlocks(liElement: Element): void;

    expandAll(): void;

    collapseAll(): void;

    getExpandIds(): string[];

    setExpandIds(ids: string[]): void;
}
