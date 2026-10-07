import type {
    IAssetUploadDecision,
    IAssetUploadInput,
    IAssetUploadPosition,
    IAssetUploadResult,
    IBlock,
    IClipboardData,
    IGetDocInfo,
    IGetTreeStat,
    IKernelPlugin,
    IKernelPluginState,
    IMenu,
    IMenuBaseDetail,
    IMenuItem,
    IModels,
    IObject,
    IPosition,
    IProtyle,
    IProtyleOptions,
    IRefDefs,
    ISiyuan,
    IWebSocketData,
    TAssetUploadSource,
    TAssetUploadTarget,
    TEditorMode,
    TProtyleAction,
} from "./types";
import {App, Config, Custom, Files, Lute, MobileCustom, Model, Protyle, subMenu, Tab, Toolbar,} from "./types";
import type {FetchGet, FetchPost, FetchSyncPost} from "./types/api";

export * from "./types";
export * from "./types/api";

declare global {
    export interface Window extends Global {
    }
}

export type TDock = "file" | "outline" | "inbox" | "bookmark" | "tag" | "graph" | "globalGraph" | "backlink" | "agentChat"

export type TTab = "Outline" | "Graph" | "Backlink" | "Asset" | "Editor" | "Search" | "siyuan-card"

export type TCardType = "doc" | "notebook" | "all"

export interface IFlashcardQueryExpression {
    operator: "matchAll" | "and" | "or" | "not" | "predicate";
    children?: IFlashcardQueryExpression[];
    field?: string;
    comparator?: string;
    value?: unknown;
}

export interface IFlashcardQueryAST {
    version: number;
    root: IFlashcardQueryExpression;
}

export type TEventBus = keyof IEventBusMap

export type TPluginDockPosition = "LeftTop" | "LeftBottom" | "RightTop" | "RightBottom" | "BottomLeft" | "BottomRight"
export type TPluginDataChangeReason = "sync" | "overwrite"

export type TOperation = import("./types").IOperation["action"];

export interface Global {
    Lute: typeof Lute;
    siyuan: ISiyuan;
}

export interface IEventBusMap {
    "before-hide-tooltip": {
        tooltipElement: HTMLElement,
    };
    /** 在桌面端搜索结果渲染前同步触发，blocks 仅包含当前页结果。 */
    "before-search-results-render": {
        protyle: Protyle,
        config: Config.IUILayoutTabSearchConfig,
        searchElement: HTMLInputElement,
        blocks: IBlock[],
    };
    "before-show-tooltip": {
        message: string,
        target: Element,
        tooltipElement: HTMLElement,
    };
    /** 不得在该事件上调用 `preventDefault()`，取消上传应使用 `respondWith({action: "cancel"})`；未取得全部资源路径时，HTML 粘贴将停止正文提交。 */
    "before-upload-assets": {
        requestId: string,
        /** PDF 标注等无编辑器上传场景不提供该字段。 */
        protyle?: IProtyle,
        source: TAssetUploadSource,
        target: TAssetUploadTarget,
        position?: IAssetUploadPosition,
        /** 替换输入必须保持的精确文件数量；各项还须与原输入按下标一一对应。 */
        requiredFileCount?: number,
        /** 当前目标支持的输入类型；未提供时支持 files 和 local-files。 */
        allowedInputKinds?: Array<IAssetUploadInput["kind"]>,
        input: IAssetUploadInput,
        /**
         * 插件处理阶段的取消信号；自定义 upload.handler 执行期间也会在编辑器销毁或超时时触发。
         * 标准传输开始后不再因编辑器销毁触发。
         */
        signal: AbortSignal,
        /** 必须同步调用且每次事件只允许调用一次；替换项须保持逻辑顺序，异步处理应传入 Promise，每个插件默认 120 秒超时。 */
        respondWith(response: IAssetUploadDecision | PromiseLike<IAssetUploadDecision>): void,
        /**
         * 必须同步注册，经思源前端上传协调层发起的资源写入成功、失败或取消时执行一次。
         * 注册该回调的插件卸载后不再执行。
         * 回调结果不表示父级正文或属性视图已完成写入，也不覆盖 HTTP API、CLI、MCP、同步、导入、历史恢复等内核写入。
         */
        onComplete(callback: (result: IAssetUploadResult) => void): void,
    };
    "common-menu-closed": {
        menu: HTMLElement,
        name: string | null,
        from: string | null,
    };
    "common-menu-open": {
        menu: HTMLElement,
        name: string | null,
        from: string | null,
        mode: "popup" | "fullscreen",
    };
    "click-flashcard-action": {
        card: ICard,
        type: string,   // 1 - 重来；2 - 困难；3 - 良好；4 - 简单；-1 - 显示答案；-2 - 上一个 ；-3 - 跳过
    };
    "click-blockicon": {
        menu: subMenu,
        protyle: IProtyle,
        blockElements: HTMLElement[],
    };
    "click-editorcontent": {
        protyle: IProtyle,
        event: MouseEvent,
    };
    /** 仅在具备实际编辑器上下文时触发，关系图按文档信息构造的菜单不触发此事件 */
    "click-editortitleicon": {
        menu: subMenu,
        protyle: IProtyle,
        data: IGetDocInfo,
    };
    "click-pdf": {
        event: MouseEvent,
    };
    "closed-notebook": IWebSocketData;
    "destroy-protyle": {
        protyle: IProtyle,
    };
    "input-search": {
        protyle: Protyle,
        config: Config.IUILayoutTabSearchConfig,
        searchElement: HTMLInputElement,
    };
    "loaded-protyle-dynamic": {
        protyle: IProtyle,
        position: "afterend" | "beforebegin",
    };
    "loaded-protyle-static": {
        protyle: IProtyle,
    };
    "lock-screen": void;
    "switch-protyle": {
        protyle: IProtyle,
    };
    "switch-protyle-mode": {
        protyle: IProtyle,
    };
    "open-menu-av": IMenuBaseDetail & { selectRowElements: HTMLElement[] };
    "open-menu-blockref": IMenuBaseDetail;
    "open-menu-breadcrumbmore": {
        menu: subMenu,
        protyle: IProtyle,
        data: IGetTreeStat,
    };
    "open-menu-content": IMenuBaseDetail & { range: Range };
    "open-menu-fileannotationref": IMenuBaseDetail;
    "open-menu-image": IMenuBaseDetail;
    "open-menu-link": IMenuBaseDetail;
    "open-menu-tag": IMenuBaseDetail;
    "open-menu-doctree": {
        menu: subMenu,
        elements: NodeListOf<HTMLElement>,
        type: "doc" | "docs" | "notebook" | "notebooks" | "items",
        items: { id: string, path: string, notebookId: string }[],
    };
    "open-menu-inbox": {
        menu: subMenu,
        element: HTMLElement,
        ids: string[],
    };
    /**
     * 桌面端和桌面浏览器顶栏右键菜单事件，支持自定义顶栏元素，不扩展停靠栏或状态栏菜单。
     * 所有订阅者都会收到事件，插件应按自己的顶栏元素过滤；空白处的 element 和 entryPath 均为 null。
     * 必须在同步回调中添加项目，异步数据应提前准备；项目显示在内置显隐操作之前。
     * 宿主在可见插件项目之后添加分隔线，并移除此组首尾及连续的分隔线。
     * 使用此事件时应移除自行打开菜单或阻止传播的 contextmenu 监听器，宿主不会强制拦截已有监听器。
     */
    "open-asset": {
        path: string,
        action: Config.TAssetOpenAction,
        event?: MouseEvent,
    };
    "open-link": {
        href: string,
        originalHref: string,
        event?: MouseEvent | KeyboardEvent,
    };
    "open-noneditableblock": {
        protyle: IProtyle,
        toolbar: Toolbar,
        blockElement: HTMLElement,
        renderElement: HTMLElement,
    };
    "open-siyuan-url-block": {
        url: string,
        id: string,
        focus: boolean,
        exist: boolean,
    };
    "open-siyuan-url-plugin": {
        url: string,
    };
    "opened-notebook": IWebSocketData;
    "paste": {
        protyle: IProtyle,
        /** 调用 `preventDefault()` 接管粘贴后必须在 120 秒内完成。 */
        resolve: (value: IClipboardData | PromiseLike<IClipboardData | undefined> | undefined) => void,
        textHTML: string,
        textPlain: string,
        siyuanHTML: string,
        localFiles: {
            path: string,
            size: number
        }[]
        files: FileList | DataTransferItemList
    };
    "ws-main": IWebSocketData;
    "sync-start": IWebSocketData;
    "sync-end": IWebSocketData;
    "sync-fail": IWebSocketData;
    "mobile-keyboard-show": void;
    "mobile-keyboard-hide": void;
    "code-language-update": { languages: string[], type: "init" | "match", listElement: HTMLElement, value: string };
    "code-language-change": {
        language: string,
        languageElements: HTMLElement[],
        protyle: IProtyle
    };
    "kernel-plugin-state-change": IKernelPluginState;
}

export interface IPluginDockTab {
    position: TPluginDockPosition,
    size: Config.IUILayoutDockPanelSize,
    icon: string,
    hotkey?: string,
    title: string,
    index?: number
    show?: boolean
}

export interface ICommandContext {
    source: "commandPanel" | "shortcut" | "editorShortcut" | "fileTreeShortcut" | "dockShortcut" |
        "globalShortcut" | "keymap" | "menu" | "api",
    focus: "global" | "editor" | "fileTree" | "dock",
    protyle?: IProtyle,
    range?: Range,
    fileTree?: Files,
    dock?: HTMLElement,
}

export interface ICommand {
    langKey: string, // 用于区分不同快捷键的 key, 同时作为 i18n 的字段名
    langText?: string, // 显示的文本, 指定后不再使用 langKey 对应的 i18n 文本
    /**
     * 目前需使用 MacOS 符号标识，顺序按照 ⌥⇧⌘，入 ⌥⇧⌘A
     * "Ctrl": "⌘",
     * "Shift": "⇧",
     * "Alt": "⌥",
     * "Tab": "⇥",
     * "Backspace": "⌫",
     * "Delete": "⌦",
     * "Enter": "↩",
     */
    hotkey?: string,
    customHotkey?: string,
    hotkeys?: string[], // 默认快捷键列表，优先于 hotkey
    when?: (context: ICommandContext) => boolean,
    enabled?: (context: ICommandContext) => boolean,
    execute?: (context: ICommandContext) => void | Promise<void>
    callback?: (context?: ICommandContext) => void   // 其余回调存在时将不会触发
    globalCallback?: (context?: ICommandContext) => void // 焦点不在应用内时执行的回调
    fileTreeCallback?: (
        file: Files,
        context?: ICommandContext
    ) => void // 焦点在文档树上时执行的回调
    editorCallback?: (protyle: IProtyle, context?: ICommandContext) => void // 焦点在编辑器上时执行的回调
    dockCallback?: (element: HTMLElement, context?: ICommandContext) => void // 焦点在 dock 上时执行的回调
}

export interface IAgentCapabilityEffects {
    localRead?: boolean;
    localWrite?: boolean;
    dataEgress?: boolean;
    externalCost?: boolean;
}

export interface ICard {
    deckID: string;
    cardID: string;
    blockID: string;
    nextDues: Record<string, string>;
    lapses: number;  // 遗忘次数
    lastReview: number;  // 最后复习时间
    reps: number;  // 复习次数
    state: number;   // 卡片状态 0：新卡
}

export interface ICardData {
    cards: ICard[],
    unreviewedCount: number
    unreviewedNewCardCount: number
    unreviewedOldCardCount: number
}

export function adaptHotkey(hotkey: string): string

export function confirm(title: string, text: string, confirmCallback?: (dialog: Dialog) => void, cancelCallback?: (dialog: Dialog) => void): void;

export type TEditorFontSizeAction = "increase" | "decrease" | "reset";

export interface IEditorFontSizeOptions {
    notify?: boolean;
}

export function adjustEditorFontSize(action: TEditorFontSizeAction, options?: IEditorFontSizeOptions): number;

export function setEditorFontSize(fontSize: number, options?: IEditorFontSizeOptions): number;

/**
 * `/api/setting/getCloudUser` 可传入 `cached: true`，仅返回内存中的账户，未登录时返回 null。
 * 此模式忽略 token，不联网、不等待同步或切换资源来源；缓存结果不代表云端凭据仍然有效。
 * 省略 cached 或传入 false 时保留账户恢复和令牌刷新行为；非管理员在两种模式下均得到 null。
 * 客户端可先读取缓存完成初始化，再刷新账户，并通过 setCloudUser 主通道事件接收账户变化。
 */
/**
 * `/api/av/getAttributeViewRelationCandidates` 支持可选的 sort: {column, order}，order 为 ASC 或 DESC。
 * 按关联数据库字段的现有规则排序全部候选后分页，仅影响本次查询，不修改视图和 selectedRows 顺序。
 * 省略 sort 时保留创建时间倒序；不存在的字段或无效方向返回错误。
 * `/api/block/getBlockTreeInfos` 的标题结果包含可选的 `headingChildren` 布尔值，表示完整文档同一容器内是否有下辖块。
 * 空段落也算下辖块，结果不受折叠或分页影响；非标题及旧版内核省略该字段，省略不能视为空标题。
 * `/api/transactions` 的 move 操作支持 nextID，将块移到该同级锚点之前，优先于 previousID 和 parentID。
 * 移动保留折叠标题下辖块顺序及源块身份，不将整列表自动拆成列表项；公开 moveBlock 接口的参数保持不变。
 * `/api/repo/getRepoSnapshots` 可传入可选的 `id`，按 7 至 40 位十六进制 ID 前缀查询本地快照。
 * 前缀匹配多个快照时全部返回，按创建时间降序排列。
 * ID 忽略首尾空白和大小写；page 仍为必填，但按 ID 查询时不参与分页。
 * 省略或留空 ID 保留分页列表；未找到返回空列表，格式错误、损坏或读取失败返回错误。
 * 此接口保留管理员权限要求，返回已有的快照元数据及资源下载状态，不下载或回滚快照。
 * includeFiles 默认为 false；传入 true 时必须提供完整 ID，并返回该快照的文件元数据，不读取正文。
 * 本地快照结果的 tags 包含按名称排序的全部标记，未标记时为空数组；分页与 ID 查询均返回此字段。
 * `/api/repo/getRepoSnapshots` 和 `/api/repo/getCloudRepoSnapshots` 可传入 startTime、endTime，按创建时间筛选后分页。
 * 时间为非负整数 Unix 毫秒时间戳，包含起点、不包含终点；省略或为 0 表示该端无界，两端均非 0 时终点必须大于起点。
 * 本地 ID 查询也应用时间范围并继续忽略分页；云端筛选遍历索引页，读取失败不会返回部分结果。
 * `/api/repo/getRepoTagSnapshots` 仍按标记逐行返回，tag 是当前行供上传、移除使用的标记，tags 是全部别名。
 * `/api/history/getDocHistorySnapshots` 接收文档 id、最多 32 个 searchHistory 时间戳 created，以及可选 op。
 * op 默认为 all；每条结果包含 created、historyPath 和 snapshots，按快照创建时间倒序排列。
 * snapshots 的每项包含 id、fileID、tags、memo 和 created；同一快照的多个标记合并到 tags。
 * 仅匹配本地标记快照中认证解密后完整 .sy 数据相同的文件，不保证资源、数据库或引用内容相同。
 * 无仓库密钥时关联为空；缺失历史、格式错误、读取或认证失败返回错误，不冒充无匹配结果。
 * 此接口要求管理员权限，加密笔记本必须解锁，响应持有请求租约；不下载云端内容，不持久化摘要。
 * `/api/repo/getRepoDocHistory` 的每个文件版本还包含 snapshots，按文件 ID 关联全部本地标记快照。
 * snapshots 按快照创建时间倒序排列，同一快照的多个标记合并；无关联时为空数组，不读取文件正文。
 */
/**
 * `/api/clipboard/preparePasteAssets` 接收已解锁的加密 notebook 和 assets 引用数组，返回原引用到新引用的映射。
 * 普通附件复制为独立加密副本，原文件保持不变；同一笔记本内复用已有附件，拒绝跨加密笔记本复制。
 * 引用仅限工作空间 assets/ 路径，可包含查询参数、片段和 PDF 标注 ID；PDF 标注文件随附件复制。
 * 整批准备成功后调用方再插入内容；失败返回 code=-1、data=null，并清理本批次新建附件。
 * 此接口要求管理员权限，禁止只读写入，响应持有加密笔记本请求租约。
 */
/**
 * `/api/import/importStdMd`、`/api/import/importZipMd` 和 `/api/filetree/createDocWithMd` 自动转换标准脚注。
 * 脚注定义保存为独立列表项，正文引用转换为指向列表项的上标静态块引用，反链复用现有块引用索引。
 * 多段内容保留在同一列表项内；多次引用共享目标，标签匹配忽略大小写，重复定义引用第一个匹配项。
 * 未定义的脚注不生成块引用，代码和转义的脚注文本保持原样；请求、响应和笔记本权限规则保持不变。
 */
/**
 * 数据库自动化由 `/api/transactions` 的 setAttrViewAutomations 操作整体保存，配置 spec 为 1。
 * `/api/av/getAttributeView` 返回数据库级 automations，所有视图共享；缺省表示没有规则。
 * addAttributeViewBlocks、setAttributeViewBlockAttr、batchSetAttributeViewBlockAttrs 会触发启用的新增或字段变化规则。
 * 自动操作与原修改一同提交，失败一起回滚；普通 API 写入不生成编辑器撤销记录。
 * 自动化不串联，导入、同步、历史恢复和撤销重放不重新触发；重做保留原条目 ID 和触发时间。
 * 跨库动作限于同一加密边界，要求目标可访问；单笔事务最多执行 1000 个自动操作。
 */
/**
 * `/api/block/insertBlock` 按 nextID、previousID、parentID 的顺序选择插入位置。
 * 生效的同级锚点必须是非文档块；未使用的定位参数不参与节点类型校验，文档 parentID 插入到文档开头。
 * 目标非法时返回 code=-1、data=null，成功返回已落盘的操作。
 * insertBlock、appendBlock、prependBlock 的目标为原生页签或脑图容器时，只能插入各自的项目块。
 * 输入同类型容器片段时展开其直属项目，保留目标容器属性及项目 ID；非法子块由事务校验拒绝。
 * prependBlock 保留排队执行的响应行为，事务失败不落盘，但 code=0 不代表事务已通过校验。
 * 原生页签和脑图的结构化编辑使用 getBlockDOM 和 dataType="dom"，并保留已有 ID 和属性。
 * getBlockKramdown 默认输出供阅读的 Markdown，会平铺页签并将脑图输出为普通列表。
 */
/**
 * `/api/block/moveBlock` 按 previousID、parentID 的顺序选择移动位置，省略 previousID 时移动到父块开头。
 * 成功和主动跳过返回 code=0、data=null；事务校验或提交失败返回 code=-1、data=null 和原因。
 * 事务回滚时保留界面重载和错误通知行为，加密笔记本的访问规则及跨加密边界限制保持不变。
 */
/**
 * `/api/block/checkBlocksExist` 接收 ids，忽略非字符串及无效块 ID，重复 ID 合并为一个结果。
 * notebook 为加密笔记本时只查询该库；省略或传入普通笔记本时查询全局库及本请求已持有租约的加密库。
 * 不存在或已锁定且无法确定归属的块返回 false；显式指定已锁定的加密笔记本返回 code=-1、data=null。
 * 发布读者的不可访问块不返回结果，加密响应租约保持到响应发送完成。
 */
export const fetchPost: FetchPost<IWebSocketData>;

/**
 * `/api/setting/resetSettings` 接收可选的 `exit`（默认 false），要求管理员权限并禁止只读写入。
 * 仅重置当前工作空间的普通偏好、内置快捷键和当前布局；保留笔记、历史、历史保留天数、学习进度、
 * 账号、认证、同步、加密及恢复材料、AI/MCP、插件和代码片段及其启用状态、已保存布局、语言及应用级设置。
 * 已连接的主客户端收到 `prepareSettingsReset` 后，须保存待提交内容并暂停布局保存，再用通知中的一次性
 * token 调用 `/api/setting/confirmSettingsReset`，传入 `saved: true`；保存失败传 false，15 秒未确认则取消。
 * 成功后 `settingsReset` 通知所有主客户端直接重载；`exit: true` 仅让管理本地内核的桌面主窗口重载后正常退出，
 * 不直接停止远程内核。失败时 `cancelSettingsReset` 携带此次操作 ID，客户端应恢复正常保存。
 * 插件调用前应先取得用户确认，并确保未保存内容已经提交；重复调用恢复同一组默认值。
 *
 * `/api/ai/agent/getInstructions` 返回工作空间 data/ai/AGENTS.md 的 content 和 revision，要求管理员权限。
 * 缺失文件返回空 content 和 missing 修订，不创建文件；非 UTF-8 文本、超出 32 KiB 或读取失败返回 code=-1。
 * `/api/ai/agent/setInstructions` 接收 content 和读取时的 revision，要求管理员权限且禁止只读写入。
 * 内容允许为空；修订冲突返回 code=-1 并保留原文。保存采用原子替换，并按工作空间同步忽略规则通知同步。
 * 指令在下一轮用户对话生效，同轮工具调用和压缩使用固定快照，且不能覆盖工具权限、审批或访问控制。
 *
 * 读取 `/api/template/manage` 的模板源码时，可选的 `sourceDocID` 表示导出模板末尾文档属性中的静态来源 ID。
 * 普通 Markdown、目录或未声明有效 ID 的模板不返回该字段；读取不会执行模板或检查源文档是否仍可访问。
 * 打开来源时需按当前工作空间的文档访问规则处理失败；该字段不是预览上下文，也不保证模板与源文档保持同步。
 * `/api/system/getWorkspaceStorage` 无需参数，要求管理员权限并允许只读模式，统计当前内核工作空间的本地文件大小。
 * `totalSize` 为普通文件字节数之和，`assetsSize` 是 `data` 的子集，不能重复累加；不含目录分配空间或链接目标。
 * `directories` 按 data、repo、history、temp、conf、other 排序，`calculatedAt` 为扫描完成的 Unix 毫秒时间。
 * 扫描不下载资源或解密文件，不返回绝对路径；并发请求共享扫描，完成后不缓存，也不保证扫描期间的快照一致性。
 * 扫描期间已删除的子文件或子目录不计入；根目录丢失、权限错误等仍返回失败。
 * 读取失败或扫描超时返回 code=-1、data=null；调用方应保留旧结果的时间标记，并允许用户重试。
 *
 * 导出图片或 PDF 预览时，/api/export/exportPreviewHTML 可选 keepJSEmbed: true 保留脚本嵌入占位。
 * 默认不保留；内核不执行脚本，调用方须遵守安全模式限制并等待异步渲染完成后再导出。
 *
 * 加密笔记本归档接口要求管理员权限；移出和恢复均禁止只读模式。
 * `/api/notebook/prepareNotebookArchive` 接收已锁定的笔记本 ID，返回归档 ID 和下载路径，不删除源数据。
 * 下载完成后，必须由用户确认已保存归档，再调用 `/api/notebook/commitNotebookArchive` 并传入 `saved: true`。
 * 提交前会重新检查源文件；内容变化需重新导出。重复提交同一归档不会重复移出，未选择的笔记本不受影响。
 * `/api/notebook/importNotebookArchive` 接收 multipart 的 `file`、旧 `password` 和可选密钥备份 `key`。
 * 恢复目标必须关闭同步，且没有加密密钥配置或加密数据；密文全部通过认证后才发布，恢复后仍保持锁定。
 *
 * 内置 MCP 服务端 OAuth 与思源连接外部 MCP 的客户端 OAuth 配置相互独立，默认关闭。
 * `/api/mcp/getOAuth` 返回公开地址、开关和预注册客户端列表，不返回凭证摘要或客户端密钥。
 * `/api/mcp/setOAuth` 接收 enabled 和不含路径的 HTTPS publicURL；启用需要锁屏密码或 OIDC 登录。
 * `/api/mcp/addOAuthClient` 接收 name 和精确匹配的 redirectURI，返回客户端 id 及仅显示一次的 secret。
 * `/api/mcp/removeOAuthClient` 接收 id 删除客户端并撤销授权，或传 all: true 撤销全部授权但保留注册。
 * 以上接口要求管理员权限，配置和注册变更禁止只读模式。关闭、修改地址或管理员认证配置会撤销已有授权。
 * OAuth 使用授权码与 PKCE S256，支持 client_secret_basic 和 client_secret_post，不支持动态注册。
 * 访问令牌最长有效一小时；offline_access 刷新令牌轮换并在授权后三十天过期，重放会撤销同一授权。
 * OAuth 令牌只用于 /mcp，不能用于上述管理接口或其他内核 API，且不会解锁加密笔记本。
 */
export const fetchSyncPost: FetchSyncPost<IWebSocketData>;

export const fetchGet: FetchGet<IWebSocketData | IObject | string>;

export function openWindow(options: {
    position?: {
        x: number,
        y: number,
    },
    height?: number,
    width?: number,
    tab?: Tab,
    alwaysOnTop?: boolean,
    doc?: {
        id: string; // 块 id
    },
}): void;

/**
 * 不支持移动端
 * @param {boolean} [wndActive=true] - 当前活动窗口是否为激活状态
 */
export function getActiveTab(wndActive?: boolean): Tab;

/**
 * @param {boolean} [wndActive=true] - 当前活动窗口是否为激活状态
 */
export function getActiveEditor(wndActive?: boolean): Protyle;

export function expandDocTree(options: {
    id: string,
    isSetCurrent?: boolean
}): void;

export function openMobileFileById(app: App, id: string, action?: TProtyleAction[]): void;

/**
 * @param {string} [options.doc.mode="wysiwyg"] - 只在首次打开时生效，切换可调用 switchMode 方法
 */
export function openTab(options: {
    app: App,
    doc?: {
        id: string, // 块 id
        action?: TProtyleAction[],
        zoomIn?: boolean, // 是否缩放
        mode?: TEditorMode
    };
    pdf?: {
        path: string,
        page?: number,  // pdf 页码
        id?: string,    // File Annotation id
    };
    asset?: {
        path: string,
    };
    search?: Config.IUILayoutTabSearchConfig;
    /**
     * 打开 v2 闪卡复习会话，兼容仅传 type、id、title 的调用。
     * 关闭页签会结束会话，恢复布局时按保存的选择新建会话。
     * 旧版闪卡页签恢复时保留全局、文档或笔记本范围，转换为 v2 会话，不复用旧队列和游标。
     */
    card?: {
        type: TCardType,
        id?: string, //  cardType 为 all 时不传，否则传文档或笔记本 id
        title?: string, //  cardType 为 all 时不传，否则传文档或笔记本名称
        // 多个卡包取并集并去重；与文档范围、查询条件取交集，不能传空数组
        // 每张卡保留自身调度预设和每日额度；混合会话采用工作空间队列限制及默认优先级、到期排序。
        // 不合并各卡包的队列限制或排序设置。
        reviewSetIDs?: string[];
        // 有序卡片 ID，按首次出现去重；与范围、查询取交集，仍受复习资格和额度限制，不能传空数组
        cardIDs?: string[];
        // 版本 1 查询 AST，与所选卡包及 type/id 范围取交集。
        query?: IFlashcardQueryAST;
        reviewMode?: "normal" | "reinforcement";
    };
    custom?: {
        id: string, // 插件名称+页签类型：plugin.name + tab.type
        icon: string,
        title: string,
        data?: any,
    };
    position?: "right" | "bottom";
    keepCursor?: boolean; // 是否跳转到新 tab 上
    removeCurrentTab?: boolean; // 在当前页签打开时需移除原有页签
    openNewTab?: boolean // 使用新页签打开
    afterOpen?: () => void; // 打开后回调
}): Promise<Tab>

export function getFrontend(): "desktop" | "desktop-window" | "mobile" | "browser-desktop" | "browser-mobile";

export function getBackend(): "windows" | "linux" | "darwin" | "docker" | "android" | "ios" | "harmony";

export function lockScreen(app: App): void

export function exitSiYuan(): void

export function getAllEditor(): Protyle[]

export function saveExportFile(uri: string, msgId?: string): Promise<void>;

export function getAllTabs(type?: TTab | string): Tab[]

export function getAllModels(): IModels

export function openSetting(app: App, tab?: "editor" | "file" | "appearance" | "bazaar" | "flashcard" | "ai" | "secretsVariables" | "assets" | "ocr" | "export" | "search" | "keymap" | "sync" | "access" | "app" | "about", options?: {
    /** 在人工智能设置中打开 ChatGPT 提供商；搭配 tab="ai" 使用 */
    aiProvider?: "chatgpt";
}): Dialog | undefined;

export function openEmoji(options: {
    position: IPosition,
    selectedCB?: (emoji: string) => void,
    dynamicIconURL?: string
    hideDynamicIcon?: boolean
    hideCustomIcon?: boolean
}): void ;

export interface IAssetPickerOptions {
    /** 省略或传入空数组时不限制类型；扩展名可以带点或不带点，匹配时不区分大小写 */
    exts?: string[];
    /** 与扩展名和选择器中的普通关键词搜索取交集 */
    match?: {
        /** 默认匹配去掉资源 ID 的文件名；path 匹配返回的 assets/ 相对路径 */
        field?: "name" | "path";
        /** 前后缀匹配不区分大小写；正则使用 Go 语法，默认区分大小写，可用 (?i) 忽略大小写 */
        mode: "prefix" | "suffix" | "regex";
        /** 最多 1024 字节；空字符串不额外筛选，无效正则会使 Promise 拒绝 */
        value: string;
    };
}

/**
 * 打开原生资源选择界面，无需活动文档或编辑器。选中后返回 assets/ 相对路径，取消时返回 null。
 * 搜索结果可逐页加载；选择操作不插入文档或修改资源。搜索沿用内核接口的管理员和非只读权限。
 * 关键词匹配文件名、路径以及普通笔记本中图片的标题、提示文本和已有 OCR 文本，不搜索加密笔记本。
 */
export function openAssetPicker(options?: IAssetPickerOptions): Promise<{path: string} | null>;

export function getModelByDockType(type: TDock | string): Model | any;

/**
 * 显示、隐藏或切换左侧停靠栏面板。移动端、独立窗口或布局尚未初始化时调用无操作并返回 false。
 * @param {boolean} [visible] - 不传时切换显隐，传入时设置显隐
 * @returns 该组是否有活动工具且未被整体收起；空组返回 false，浮动面板暂时未悬停显示仍返回 true
 */
export function toggleLeftDock(visible?: boolean): boolean;

/**
 * 显示、隐藏或切换右侧停靠栏面板。移动端、独立窗口或布局尚未初始化时调用无操作并返回 false。
 * @param {boolean} [visible] - 不传时切换显隐，传入时设置显隐
 * @returns 该组是否有活动工具且未被整体收起；空组返回 false，浮动面板暂时未悬停显示仍返回 true
 */
export function toggleRightDock(visible?: boolean): boolean;

/**
 * 显示、隐藏或切换下侧停靠栏面板。移动端、独立窗口或布局尚未初始化时调用无操作并返回 false。
 * @param {boolean} [visible] - 不传时切换显隐，传入时设置显隐
 * @returns 该组是否有活动工具且未被整体收起；空组返回 false，浮动面板暂时未悬停显示仍返回 true
 */
export function toggleBottomDock(visible?: boolean): boolean;

/**
 * 移动端、独立窗口或布局尚未初始化时返回 false。
 * @returns 左侧组是否有活动工具且未被整体收起；浮动面板暂时未悬停显示仍返回 true
 */
export function isLeftDockVisible(): boolean;

/**
 * 移动端、独立窗口或布局尚未初始化时返回 false。
 * @returns 右侧组是否有活动工具且未被整体收起；浮动面板暂时未悬停显示仍返回 true
 */
export function isRightDockVisible(): boolean;

/**
 * 移动端、独立窗口或布局尚未初始化时返回 false。
 * @returns 下侧组是否有活动工具且未被整体收起；浮动面板暂时未悬停显示仍返回 true
 */
export function isBottomDockVisible(): boolean;

/**
 * @param {IObject} [options.data] - 块属性值
 * @param {HTMLElement} [options.nodeElement] - 块元素
 * @param {"bookmark" | "name" | "alias" | "memo" | "av" | "custom"} [options.focusName="bookmark"] - av 为数据库页签，custom 为自定义页签，其余为内置输入框
 * @param {IProtyle} [options.protyle] - 有数据库时需要传入 protyle
 */
export function openAttributePanel(options: {
    data?: IObject
    nodeElement?: HTMLElement,
    focusName: "bookmark" | "name" | "alias" | "memo" | "av" | "custom",
    protyle?: IProtyle,
}): void;

/**
 * 保存布局
 * @param {function} [cb] - 保存后的回调函数
 */
export function saveLayout(cb: () => void): void;

/**
 * 全局命令
 * @param {string} command - 命令名称 https://github.com/siyuan-note/siyuan/blob/master/app/src/boot/globalEvent/command/global.ts#L71
 * @param {App} app
 */
export function globalCommand(command: string, app: App): void;

/**
 * @param {number} [timeout=6000] - ms. 0: manual close；-1: always show;
 * @param {string} [type=info]
 */
export function showMessage(text: string, timeout?: number, type?: "info" | "error", id?: string): void;

export function hideMessage(id?: string): void;

/**
 * 前端插件生命周期契约。
 *
 * 同一插件实例的 `onload`、`onLayoutReady`、`onDataChanged`、`onunload` 与 `uninstall` 在拆除截止时间前严格串行，
 * 并等待钩子返回的 Promise。`onDataChanged` 仅在插件实例就绪后运行；若插件未覆盖基类实现，数据变更会改为重载整个插件。
 * 禁用、重载或卸载会在首次收到拆除请求时建立一份共享的 5 秒预算。等待 `onload`、内核初始化、`onLayoutReady` 或已经开始的
 * `onDataChanged`，以及后续的 `onunload` 和仅在从工作空间移除插件时运行的 `uninstall`，均使用同一份预算。尚未开始的
 * `onDataChanged` 会在禁用或卸载时丢弃。
 *
 * 截止时间后，JavaScript Promise 无法取消，超时钩子可能继续运行。思源仍会尽力调用每个剩余的拆除钩子一次，但不再等待，
 * 随后拆除宿主管理的资源。这 5 秒只限制思源等待 Promise 的时间，无法中断同步 JavaScript。关闭窗口或退出思源时，
 * 普通前端窗口不会触发前端插件生命周期钩子。独立设置窗口销毁时会尽力调用 onunload 并立即释放宿主管理的资源，
 * 不等待异步钩子完成；窗口关闭后不能继续操作其文档。
 *
 * plugin.json 可声明 settingsWindow: true，允许已启用且兼容 desktop 的插件在内置和插件的独立设置窗口中运行。
 * 省略或 false 不加载；该声明不会启用已禁用的插件，也不改变主窗口、文档窗口和移动端的 frontends 兼容性。
 * 每个设置窗口使用独立实例、事件总线和存储缓存，复用 onload、onLayoutReady、onDataChanged 和 onunload 生命周期。
 * 主窗口的配置写入通过现有数据变更通知同步；未覆盖 onDataChanged 时重载实例。插件应自行清理其样式和事件监听。
 * 设置窗口未提供编辑器、顶栏、状态栏和停靠栏，相关注册入口不生效，也不注册命令、全局快捷键或智能体能力。
 * 插件的 openSetting 调用交由所属宿主窗口处理；设置窗口在打开后启用、停用和重载插件时也更新本地实例。
 */
export abstract class Plugin {
    eventBus: EventBus;
    i18n: Record<string, import("./types/api").JSONValue>;
    kernel: IKernelPlugin;
    /**
     * 当前插件实例的存储数据会话缓存，以传入的 storageName 为键，也是 loadData 读取失败时的回退值。
     * 直接修改此对象不会写入磁盘；其他前端实例删除文件不会自动清除此实例中对应的缓存。
     */
    data: any;
    displayName: string;
    readonly name: string;
    app: App;
    commands: ICommand[];
    setting: Setting;
    /**
     * 自定义块渲染器。键为插件内部的块类型；块信息使用编码后的插件包名和块类型组成。
     * 渲染函数只应修改传入的挂载元素，并可返回清理函数，不支持在其中嵌套 Protyle。
     * setContent 应在渲染函数返回后调用；只读状态或内容中某行移除编辑器光标标记并去除首尾空白后等于 ;;; 时返回 false。
     */
    customBlockRenders: {
        [key: string]: {
            render: (options: {
                element: HTMLElement,
                content: string,
                setContent: (content: string) => boolean,
            }) => void | (() => void)
        }
    };
    topBarIcons: Element[];
    statusBarIcons: Element[];
    agentActions: string[];
    models: {
        [key: string]: (options: { tab: Tab, data: any }) => Custom
    };
    docks: {
        [key: string]: {
            id: string,
            config: IPluginDockTab,
            model?: (options: { tab: Tab }) => Custom,
            mobileModel?: (element: Element) => MobileCustom
        }
    };
    protyleSlash: {
        filter: string[],
        html: string,
        id: string,
        /** 是否在精简版中显示。默认值：false */
        showInLite?: boolean,
        callback(protyle: Protyle, nodeElement: HTMLElement): void,
    }[];
    protyleOptions: IProtyleOptions;

    constructor(options: {
        app: App,
        name: string,
        displayName: string,
        i18n: Record<string, import("./types/api").JSONValue>,
    });

    /** 当前端插件实例启动时运行。 */
    onload(): Promise<void> | void;

    /**
     * 插件实例就绪后收到数据变更时运行；思源会等待返回的 Promise，未覆盖该方法时则重载整个插件。
     * @param reason 数据变更来源，sync 为跨设备同步合并，overwrite 为其他前端实例通过文件接口写入
     */
    onDataChanged(reason?: TPluginDataChangeReason): Promise<void> | void;

    /** 当前端插件实例被禁用、重载或卸载前运行一次。 */
    onunload(): Promise<void> | void;

    /**
     * 仅在从工作空间移除插件时，于 `onunload` 完成或思源停止等待后运行一次。
     */
    uninstall(): Promise<void> | void;

    /** 布局就绪时，在 `onload` 与内核初始化完成后运行一次。 */
    onLayoutReady(): Promise<void> | void;

    /**
     * 添加顶栏条目，自定义元素与图标共用排序、显隐和移除机制。
     * @param options.id 插件内唯一标识，重复调用时更新条目；传入不同元素时替换原元素。
     * @param options.position 默认位于右侧。
     * @param options.element 自定义元素，仅桌面端主窗口支持；移动端和独立窗口忽略本次调用。
     * 提供时忽略 icon 和 callback，保留元素的样式、内容和事件绑定，布局及交互由插件负责。
     * 思源设置 id、data-id（提供 id 时）、data-topbar-entry、data-location 和 aria-label。
     * 同一元素不能注册到多个 id；不传 id 重复注册同一元素时更新现有条目。
     * @param options.icon 未提供 element 时必填，支持 SVG ID 或 SVG 标签。
     * @param options.callback 图标条目的点击回调。
     * @param options.contextMenu 桌面端或桌面浏览器中当前按钮的右键菜单回调，也支持自定义元素。
     * 其他按钮及顶栏空白处不会调用此回调；必须同步添加菜单项，异步数据应提前准备。
     * 操作显示在显隐控制之前，宿主在可见操作之后添加分隔线，并移除此组首尾及连续的分隔线。
     * 更新同一按钮时替换回调，省略此选项则清除回调。
     * 使用此选项时应移除阻止传播或单独打开菜单的 contextmenu 监听器。
     */
    addTopBar(options: {
        id?: string,
        icon?: string,
        element?: HTMLElement,
        // 桌面端顶栏右键回调，同步添加该按钮的菜单操作；更新时省略则清除回调。
        contextMenu?: (menu: subMenu) => void,
        title: string,
        callback?: (event: MouseEvent) => void
        position?: "right" | "left"
    }): HTMLElement;

    removeTopBar(id: string): void;

    addBreadcrumbButton(options: {
        id: string,
        icon: string,
        title: string,
        callback: (event: MouseEvent, protyle: IProtyle) => void,
    }): string;

    removeBreadcrumbButton(id: string): void;

    /**
     * Must be executed before the synchronous function.
     * @param {string} [options.position=right]
     */
    addStatusBar(options: {
        element: HTMLElement,
        position?: "right" | "left",
    }): HTMLElement;

    openSetting(): void;

    /**
     * 读取 /data/storage/petal/ 插件私有目录中的文件，成功回调会更新 data[storageName]。
     * 缓存值为 undefined 时先初始化为 ""；文件不存在（HTTP 202）或触发请求失败回调时，
     * Promise 会兑现为当前缓存值，而非拒绝，因此可能返回其他窗口删除文件前的旧内容。
     * 如需避免旧缓存回退，应在调用前执行 delete this.data[storageName]；
     * 此时读取失败会返回 ""，仍无法区分文件缺失、读取失败与空文件，也不能据此确认磁盘状态。
     * 负数错误码被请求层拦截等未触发回调的情况会使 Promise 持续等待，需要调用方自行设置超时。
     * 只读或发布会话不会在此方法中直接拒绝，但私有文件读取仍受内核权限限制；公开快照应使用 loadPublishData。
     * @returns 文件内容（解析后的 JSON 值或文本），或读取失败时的缓存值，不是统一的内核响应封装。
     * @throws 调用时插件实例已销毁则拒绝 Promise，值为 {code: 410, msg, data: null}。
     */
    loadData(storageName: string): Promise<any>;

    /**
     * 读取已获管理员授权的公开快照，供发布页面使用；未授权或尚未生成时拒绝 Promise。
     * loadData 仍访问私有存储，读取公开快照失败时不得回退到私有存储。
     * 权限、生命周期、限制及 HTTP 契约见 https://github.com/siyuan-note/siyuan/blob/master/docs/PLUGIN-PUBLISH.zh-CN.md
     */
    loadPublishData(): Promise<Record<string, string | number | boolean | null>>;

    /**
     * 在管理员环境中完整替换公开快照，仅支持 plugin.json 的 publish.data 声明并获单独授权的标量字段。
     * 应逐一选择适合公开的字段；值仅支持字符串、数字、布尔值或 null，省略的字段会被移除。
     * 发布端所需的额外前端文件应在 plugin.json 的 publish.resources 中声明。
     * 资源支持精确相对文件名及以 / 结尾的递归目录，例如 fonts/，不支持通配符。
     * 目录声明包含后续新增文件，私有文件应放在公开目录之外；链接、plugin.json 和 kernel.js 不可发布。
     * 权限、生命周期、限制及 HTTP 契约见 https://github.com/siyuan-note/siyuan/blob/master/docs/PLUGIN-PUBLISH.zh-CN.md
     */
    savePublishData(data: Record<string, string | number | boolean | null>): Promise<void>;

    /**
     * 写入 /data/storage/petal/ 插件私有目录中的文件；对象会序列化为 JSON，其他值作为文件内容写入。
     * 写入回调会将传入值存入 data[storageName] 并兑现 Promise；回调本身不检查响应 code。
     * 未设置请求失败回调，网络异常或内核负数错误码（如 -1、-3）可能使 Promise 持续等待；
     * 调用方需要自行设置超时，不能仅依赖捕获拒绝来处理写入失败。
     * @returns 内核响应 {code, msg, data}，调用方仍需检查 code，不能将兑现视为写入成功。
     * @throws 调用时插件实例已销毁为 410，只读或发布会话为 403，序列化或创建文件失败为 400；
     * 拒绝值均为 {code, msg, data: null}，生命周期检查优先于只读或发布会话检查。
     */
    saveData(storageName: string, content: any): Promise<any | IWebSocketData>;

    /**
     * 删除 /data/storage/petal/ 插件私有目录中的文件。
     * 删除回调会清除当前实例的 data[storageName] 并兑现 Promise；回调本身不检查响应 code。
     * 不会直接清除其他前端实例的缓存，这些实例再次 loadData 时可能回退到旧内容。
     * 未设置请求失败回调，网络异常或内核负数错误码可能使 Promise 持续等待，调用方需要自行设置超时。
     * @returns 内核响应 {code, msg, data}，调用方仍需检查 code，不能将兑现视为删除成功。
     * @throws 调用时插件实例已销毁为 410，只读或发布会话为 403，拒绝值为 {code, msg, data: null}；
     * 生命周期检查优先于只读或发布会话检查。
     */
    removeData(storageName: string): Promise<IWebSocketData>;

    addIcons(svg: string): void;

    getOpenedTab(): { [key: string]: Custom[] };

    /**
     * Must be executed before the synchronous function.
     */
    addTab(options: {
        type: string,
        destroy?: (this: Custom) => void,
        beforeDestroy?: (this: Custom) => void,
        resize?: (this: Custom) => void,
        update?: (this: Custom) => void,
        init: (this: Custom, custom: Custom) => void,
    }): (options: { tab: Tab, data: any }) => Custom;

    /**
     * Add Custom to Dock.
     * Must be executed before the synchronous function.
     * @param {string} [options.id] - Unique ID within the plugin. Defaults to options.type.
     */
    addDock(options: {
        id?: string,
        config: IPluginDockTab,
        data: any,
        type: string,
        destroy?: (this: Custom | MobileCustom) => void,
        resize?: (this: Custom) => void,
        update?: (this: Custom | MobileCustom) => void,
        init: (this: Custom | MobileCustom, custom: Custom | MobileCustom) => void,
    }): {
        id: string,
        config: IPluginDockTab,
        model?: (options: { tab: Tab }) => Custom,
        mobileModel?: (element: Element) => MobileCustom
    };

    removeDock(id: string): void;

    addCommand(options: ICommand): void;

    /**
     * 动态添加或更新编辑器工具栏按钮。name 必须是插件内稳定且唯一的自定义标识，不能使用内置工具栏名称或分隔符。
     * 同名按钮会被更新，并保留用户已经配置的快捷键。
     */
    addToolbarItem(item: IMenuItem): void;

    /**
     * 移除动态注册的编辑器工具栏按钮，并保留其快捷键和入口配置。
     */
    removeToolbarItem(name: string): void;

    /**
     * 按名称取密钥值（来自「设置 → 密钥和变量」的密钥库）。找不到时返回空字符串。
     * 密钥在内核侧加密存储，此处读到的是运行时明文；仅在本地管理员身份下可用。
     */
    getSecret(name: string): string;

    /**
     * 按名称取变量值（来自「设置 → 密钥和变量」的变量库）。找不到时返回空字符串。
     * 变量以明文存储，用于非敏感配置。
     */
    getVariable(name: string): string;

    addAgentCapability(options: {
        name: string,
        title?: string,
        description: string,
        inputSchema: Record<string, unknown>,
        outputSchema?: Record<string, unknown>,
        effects?: IAgentCapabilityEffects,
        actionEffects?: Record<string, IAgentCapabilityEffects>,
        handler: (args: Record<string, unknown>, app: App) => Promise<{
            result?: string;
            structuredContent?: unknown;
            error?: string;
        }>,
    }): string;

    addFloatLayer(options: {
        refDefs: IRefDefs[],
        x?: number,
        y?: number,
        targetElement?: HTMLElement,
        originalRefBlockIDs?: Record<string, string>,
        isBacklink: boolean,
    }): void;

    updateCards(options: ICardData): Promise<ICardData>;

    updateProtyleToolbar(toolbar: Array<string | IMenuItem>): Array<string | IMenuItem>;
}

export class Setting {
    constructor(options: {
        height?: string,
        width?: string,
        destroyCallback?: () => void,
        confirmCallback?: () => void,
        /**
         * 桌面客户端使用独立原生窗口，默认 false，浏览器和移动端仍使用原有设置界面。
         * 原插件实例保持在所属窗口；声明 settingsWindow: true 的插件可在原生设置窗口另建独立实例。
         * 控件回调在原插件所属窗口执行，原生窗口关闭或原插件卸载时触发一次销毁回调。
         * 控件会迁入独立窗口，应使用元素引用操作控件，避免依赖所属窗口的 document 查询或样式。
         * 在设置窗口中再次打开 Setting 使用普通对话框，关闭该对话框不会关闭整个设置窗口。
         */
        openInWindow?: boolean,
    });

    addItem(options: {
        title: string,
        direction?: "column" | "row"
        description?: string,
        actionElement?: HTMLElement,
        createActionElement?(): HTMLElement,
    }): void;

    open(name: string): void;

    /** 关闭设置并释放控件；独立窗口尚未创建时也会取消打开请求 */
    close(): void;
}

export class EventBus {
    on<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, listener: (event: CustomEvent<D>) => any): void;

    once<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, listener: (event: CustomEvent<D>) => any): void;

    off<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, listener: (event: CustomEvent<D>) => any): void;

    emit<
        K extends TEventBus,
        D = IEventBusMap[K],
    >(type: K, detail?: D): boolean;
}

/**
 * 打开单输入框对话框，支持 Enter 确认和 Escape 关闭。
 * 确认时不自动关闭，由 onConfirm 处理校验、提交并调用 dialog.destroy()。
 */
export function openInputDialog(options: {
    title: string,
    value: string,
    /** 输入框上方的纯文本标签。 */
    label?: string,
    /** 默认桌面端 520px，移动端 92vw。 */
    width?: string,
    positionId?: string,
    maxLength?: number,
    type?: "text" | "number" | "password",
    /** 使用多行文本框，默认使用单行输入框。 */
    multiline?: boolean,
    resize?: "none" | "vertical",
    min?: string,
    max?: string,
    step?: string,
    placeholder?: string,
    /** 输入框下方的 HTML 说明，调用方应确保内容可信。 */
    description?: string,
    /** 附加控件的可信 HTML，调用方负责绑定交互。 */
    extraContent?: string,
    confirmText?: string,
    actions?: {
        text: string,
        position?: "beforeCancel" | "beforeConfirm" | "afterConfirm",
        danger?: boolean,
        onClick: (value: string, dialog: Dialog) => void,
    }[],
    /** 设置为 false 时，由调用方处理输入框键盘事件。 */
    bindInput?: boolean,
    onConfirm: (value: string, dialog: Dialog) => void,
    destroyCallback?: (options?: IObject) => void,
}): Dialog;

export class Dialog {

    element: HTMLElement;
    editors: { [key: string]: Protyle };
    data: any;

    constructor(options: {
        positionId?: string,
        title?: string,
        transparent?: boolean,
        content: string,
        width?: string,
        height?: string,
        destroyCallback?: (options?: IObject) => void,
        disableClose?: boolean,
        hideCloseIcon?: boolean,
        disableAnimation?: boolean,
        resizeCallback?: (type: string) => void
    });

    destroy(options?: IObject): void;

    bindInput(inputElement: HTMLInputElement | HTMLTextAreaElement, enterEvent?: () => void): void;
}

export class Menu {
    private menu;
    isOpen: boolean;
    element: HTMLElement;

    constructor(id?: string, closeCB?: () => void);

    showSubMenu(subMenuElement: HTMLElement): void;

    addItem(option: IMenu): HTMLElement;

    addSeparator(options?: {
        index?: number,
        id?: string,
        ignore?: boolean
    }): HTMLElement;

    open(options: IPosition): void;

    /**
     * @param {string} [position=all]
     */
    fullscreen(position?: "bottom" | "all"): void;

    close(): void;
}
