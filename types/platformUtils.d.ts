export declare const openByMobile: (uri: string) => void;
/**
 * @param {boolean} [silent=false] - 为 true 时无法读取剪贴板不弹出提示
 * @returns 浏览器拒绝读取时 Promise 兑现为 undefined
 */
export declare const readText: (silent?: boolean) => string | Promise<string | void>;
export declare const writeText: (text: string) => void;
export declare const copyPlainText: (text: string) => void;
export declare const getEventName: () => "click" | "touchstart";
export declare const isOnlyMeta: (event: KeyboardEvent | MouseEvent) => boolean;
export declare const isNotCtrl: (event: KeyboardEvent | MouseEvent) => boolean;
export declare const isHuawei: () => boolean;
export declare const isIPhone: () => boolean;
export declare const isIPad: () => boolean;
export declare const isMac: () => boolean;
/** 仅用于真值判断：Android 中返回原生桥接对象而非 true */
export declare const isInAndroid: () => boolean;
export declare const isInIOS: () => any;
export declare const updateHotkeyTip: (hotkey: string) => string;
export declare const getLocalStorage: (cb: () => void) => void;
/**
 * 只读模式或发布服务下不写入、不调用 cb，并返回 undefined。
 * @param {number} [timeout=0] - 请求超时时间（毫秒），0 表示不设超时
 */
export declare const setStorageVal: (key: string, val: any, cb?: () => void, timeout?: number) => Promise<void> | undefined;

export declare const getStorageVal: (key: string) => any;

/**
 * @param {string} [options.timeoutType="defalut"] 仅在 Windows 和 Linux 有效，"default" 表示使用默认的超时机制，"never" 表示通知将一直显示，直到用户手动关闭它。
 * @returns 通知 id
 */
export declare const sendNotification: (options: {
    title?: string,
    body?: string,
    delayInSeconds?: number,
    channel?: string,
    timeoutType?: "default" | "never"
}) => Promise<number>;

export declare const cancelNotification: (id: number) => void;
