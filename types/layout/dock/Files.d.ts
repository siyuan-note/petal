import {App, IFile} from "../../../siyuan";
import {Tab} from "../Tab";
import {Model} from "../Model";

export declare class Files extends Model {
    /** 文档树滚动容器，仅包含当前可视区附近的行，不能用于枚举全部文档或选中项。 */
    element: HTMLElement;
    parent: Tab;
    private actionsElement;
    closeElement: HTMLElement;
    /** 最近选中行。滚动、刷新或折叠后可能脱离文档，请勿长期保存其 DOM 引用。 */
    lastSelectedElement: Element;
    /** 返回完整选择的文档或笔记本元数据，包含离屏条目；同一笔记本中的相同 ID 只返回一次。 */
    getSelectedItems(): {id: string; path: string; notebookId: string}[];
    /**
     * 按需生成完整选择的 DOM 快照，保留行属性与样式类以及同一文档的不同置顶位置。快照可能不在当前文档中，
     * 修改快照不改变树状态；需要执行文档操作时使用 getSelectedItems() 返回的标识。
     */
    getSelectionElements(): NodeListOf<HTMLElement>;
    constructor(options: {
        tab: Tab;
        app: App;
    });
    private handleMsgCallback;
    private updateDocActionElement;
    updateDocActions(): void;
    private genNotebook;
    init(init?: boolean): void;
    onRename(data: {
        path: string;
        title: string;
        box: string;
    }): void;
    setCurrent(target: HTMLElement, isScroll?: boolean): void;
    getLeaf(liElement: Element, notebookId: string, focusUpdate?: boolean): void;
    /**
     * 定位并加载目标，返回已挂载的行；后续滚动可能回收该行，目标不可访问时不返回行。
     * isSetCurrent 为 false 时保留现有选择，仍可能滚动以挂载目标。
     */
    selectItem(notebookId: string, filePath: string, data?: {
        files: IFile[];
        box: string;
        path: string;
        effectiveSortMode?: number;
    }, setStorage?: boolean, isSetCurrent?: boolean): Promise<HTMLElement>;
    private getOpenPaths;
    private genFileHTML;
    private initMoreMenu;
    private refreshPublishAccessSwitch;
    onFiletreeSortChanged(data: {
        notebook: string;
        parentPath: string;
    }): void;
    onDocsImported(data: {
        notebook: string;
        parentPath: string;
        rootIDs: string[];
    }): void;
    onDocSortModeChanged(data: {
        scope: "document" | "notebook" | "global";
        box: string;
        id: string;
        path: string;
        sortMode: number | null;
    }): void;
    onNotebookSortChanged(): void;
    destroy(): void;
}
