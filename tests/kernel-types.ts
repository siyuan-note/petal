import type { IAgentCapabilityConfig, IFetchResponse, IResponseStream, TEventMessage, TReadableStream, TWritableStream, TTransformStream } from "../kernel";

siyuan.event.handler = event => {
    // @ts-expect-error runtime 主题的载荷必须先验证，不能直接当作内置事件读取。
    event.type.toUpperCase();
    if (typeof event === "string") {
        siyuan.logger.info(event.toUpperCase());
    } else if (typeof event === "object" && event !== null && "type" in event && typeof event.type === "string") {
        siyuan.logger.info(event.type.toUpperCase());
    }
};
void siyuan.event.emit("runtime", "custom payload");
void siyuan.event.emit("runtime", {custom: true});
void siyuan.event.emit("runtime", {
    id: "00000000-0000-4000-8000-000000000000", type: "start", detail: null,
} satisfies TEventMessage);

const capability: IAgentCapabilityConfig = {
    description: "test",
    inputSchema: {type: "object", properties: {count: {type: "integer", minimum: 1}}, required: ["count"]},
    outputSchema: {type: "array", items: {type: "object", properties: {id: {type: "string"}}}},
};
// @ts-expect-error 能力输入必须使用对象 Schema。
const invalidSchema: IAgentCapabilityConfig["inputSchema"] = {type: "string"};
// @ts-expect-error Schema 的必填字段必须是字符串数组。
const invalidRequired: IAgentCapabilityConfig["inputSchema"] = {type: "object", required: [1]};
crypto.getRandomValues(new BigInt64Array(1));
BigInt("1");

clearTimeout(setTimeout((value: string) => value, 0, "value"));
clearInterval(setInterval(() => {}, 1));

declare const response: IFetchResponse;
async function readBody() {
    const chunk = await response.body.getReader().read();
    if (!chunk.done) {
        const bytes: Uint8Array = chunk.value;
        new TextDecoder().decode(bytes);
    }
}

const readable: TReadableStream<Uint8Array> = new ReadableStream<Uint8Array>();
const validResponse: IResponseStream = { contentType: "application/octet-stream", stream: readable };
// @ts-expect-error 数字不是响应流支持的 chunk 类型。
const invalidResponse: IResponseStream = { contentType: "text/plain", stream: new ReadableStream<number>() };

declare const writable: TWritableStream<Uint8Array>;
writable.getWriter().write(new Uint8Array(0));
// @ts-expect-error 可写流必须保留 chunk 类型。
writable.getWriter().write(1);

declare const transform: TTransformStream<string, Uint8Array>;
transform.writable.getWriter().write("value");
// @ts-expect-error 转换流必须保留输入类型。
transform.writable.getWriter().write(1);
const transformed: TReadableStream<Uint8Array> = transform.readable;
// @ts-expect-error 转换流必须保留输出类型。
const invalidTransformed: TReadableStream<number> = transform.readable;
