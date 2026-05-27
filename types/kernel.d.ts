/**
 * 内核插件状态
 * - `-1`: inactive 内核插件未安装或不可用
 * - `0`: ready 内核插件已安装但未启动
 * - `1`: loading 内核插件正在启动
 * - `2`: running 内核插件正在运行, 可正常使用
 * - `3`: stopping 内核插件正在停止
 * - `4`: stopped 内核插件已停止
 * - `5`: error 内核插件出现不可恢复的错误
 */
export type TKernelPluginState = -1 | 0 | 1 | 2 | 3 | 4 | 5

export type TJsonRpcId = string | number;
export type TJsonRpcMethod = string;
export type TJsonRpcPositionalParams = any[];
export type TJsonRpcNamedParams = Record<string, any>;
export type TJsonRpcParams = TJsonRpcPositionalParams | TJsonRpcNamedParams | undefined;
export type TJsonRpcMethodParams = TJsonRpcPositionalParams | [TJsonRpcNamedParams] | [];
export type TJsonRpcHandler<T = any> = (...args: TJsonRpcMethodParams) => Promise<T> | T;


export interface IKernelPlugin {
    /**
     * 内核插件的状态管理接口
     */
    state: IKernelPluginState;

    /**
     * 内核插件的 JSON-RPC 调用接口
     */
    rpc: IKernelPluginRpc;
}

export interface IKernelPluginState {
    /**
     * 内核插件的当前状态
     */
    code: TKernelPluginState;

    /**
     * 内核插件状态的描述信息
     */
    description: string;
}

export interface IKernelPluginRpcCall {
    /**
     * JSON-RPC 2.0 中 method 必须是 string，且插件开发者需要保证传入的方法名与内核插件绑定的方法名一致，否则可能会导致调用失败
     */
    method: TJsonRpcMethod;

    /**
     * JSON-RPC 2.0 中 id 可以是 string、number 或 null，但为了兼容性和实用性，插件系统中不允许使用 null 作为 id
     * 
     * 不设置时且 notification 不为 true 时会自动生成一个唯一的 id，设置时必须保证 id 的唯一性，否则可能会导致响应错误或混乱
     */
    id?: TJsonRpcId;

    /**
     * JSON-RPC 2.0 中 params 可以是 array 或 object，插件开发者需要自行保证传入参数与内核插件绑定的方法参数一致
     */
    params?: any[] | Record<string, any>;

    /**
     * 是否为通知，通知不会有响应，且不应传入 id
     * @defaultValue false
     */
    notification?: boolean;
}

export interface IKernelPluginRpcRequest extends IKernelPluginRpcCall {
    jsonrpc: "2.0";
}

export interface IKernelPluginRpcBaseResponse {
    jsonrpc: "2.0";
}

export interface IKernelPluginRpcResultResponse extends IKernelPluginRpcBaseResponse {
    id: TJsonRpcId;
    result?: any;
}

export interface IKernelPluginRpcErrorResponse extends IKernelPluginRpcBaseResponse {
    id: TJsonRpcId | null;
    error?: any;
}

export interface IKernelPluginRpcError {
    code: number;
    message: string;
    data?: any;
}

export interface IKernelPluginRpc {
    /**
     * 通过 {@link Proxy} 实现的动态方法调用，插件开发者可以直接调用 `call.方法名(params)` 来调用内核插件暴露的方法，无需关心 JSON-RPC 的细节
     */
    call: Record<TJsonRpcMethod, (...args: TJsonRpcMethodParams) => Promise<any>>;

    /**
     * 通过 {@link Proxy} 实现的动态方法调用，插件开发者可以直接调用 `notify.方法名(...args)` 来发送通知给内核插件，无需关心 JSON-RPC 的细节
     */
    notify: Record<TJsonRpcMethod, (...args: TJsonRpcMethodParams) => void>;

    /**
     * 批量调用方法，接受一个方法调用数组，返回一个结果数组，结果数组中的每一项对应方法调用数组中非通知的每一项，包含成功的结果或错误信息
     */
    batch: (...calls: IKernelPluginRpcCall[]) => Promise<IKernelPluginRpcError | (IKernelPluginRpcResultResponse | IKernelPluginRpcErrorResponse)[]>;

    /**
     * 绑定内核插件调用时的事件处理函数，插件开发者可以通过 `bind("方法名", handler)` 来监听内核插件通过 JSON-RPC 推送到客户端插件的通知
     */
    bind: (method: TJsonRpcMethod, handler: TJsonRpcHandler<void>) => void;

    /**
     * 解绑事件处理函数，插件开发者可以通过 `unbind("方法名", handler)` 来停止监听内核插件通过 JSON-RPC 推送到客户端插件的通知
     */
    unbind: (method: TJsonRpcMethod, handler: TJsonRpcHandler<void>) => void;
}
