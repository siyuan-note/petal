import {App, IWebSocketData, Tab} from "../../siyuan";

type TWS = "main" | "filetree" | "protyle"

export declare class Model {
    public ws: WebSocket;
    public reqId: number;
    public parent: Tab;
    public app: App;

    constructor(options: {
        app: App,
        id: string,
        type?: TWS,
        callback?: () => void,
        msgCallback?: (data: IWebSocketData) => void
    })

    /**
     * @param {boolean} [process=false]
     */
    public send(cmd: string, param: Record<string, unknown>, process: boolean): void;
}
