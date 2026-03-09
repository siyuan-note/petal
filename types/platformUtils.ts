export declare const openByMobile: (uri: string) => void;
export declare const readText: () => string | Promise<string>;
export declare const writeText: (text: string) => void;
export declare const copyPlainText: (text: string) => Promise<void>;
export declare const getEventName: () => "click" | "touchstart";
export declare const isOnlyMeta: (event: KeyboardEvent | MouseEvent) => boolean;
export declare const isNotCtrl: (event: KeyboardEvent | MouseEvent) => boolean;
export declare const isHuawei: () => boolean;
export declare const isIPhone: () => boolean;
export declare const isIPad: () => boolean;
export declare const isMac: () => boolean;
export declare const isInAndroid: () => boolean;
export declare const isInIOS: () => any;
export declare const updateHotkeyTip: (hotkey: string) => string;
export declare const getLocalStorage: (cb: () => void) => void;
export declare const setStorageVal: (key: string, val: any, cb?: () => void) => void;

/**
 * @param {string} [options.timeoutType="defalut"] 仅在桌面端有效，"default" 表示使用默认的超时机制，"never" 表示通知将一直显示，直到用户手动关闭它。
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
