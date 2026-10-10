import {Constants} from "../siyuan";
import type {Config, IBlock, IPosition, IScrollAttr, ISiyuan} from "../siyuan";

declare const editor: Config.IEditor;
const headings: boolean = editor.headingNumber;
const loaded: boolean = editor.keepLoadedContent;
const database: boolean = editor.databaseAttrShow;
declare const sync: Config.ISync;
const lan: boolean = sync.lan.enabled;
declare const appearance: Config.IAppearance;
const activeProfile: string = appearance.entryVisibility.active;
declare const tab: Config.IUILayoutTabEditor;
const scroll: IScrollAttr | undefined = tab.scrollAttr;
declare const siyuan: ISiyuan;
const ready: boolean | undefined = siyuan.isReady;
const dragging: boolean | undefined = siyuan.dragTab?.pin;
declare const block: IBlock;
const number: string | undefined = block.number;
declare const position: IPosition;
const target: HTMLElement | undefined = position.target;
const headingAttribute: string = Constants.CUSTOM_SY_HEADING_NUMBER;
// @ts-expect-error 内核不再提供旧的 AI 配置常量。
Constants.LOCAL_AI;
// @ts-expect-error AI 配置中没有独立视觉模型配置。
declare const removedVision: Config.IAI["vision"];
