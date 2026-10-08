import type { IFetchResponse, IResponseStream, TReadableStream, TWritableStream, TTransformStream } from "../kernel";

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
writable.getWriter().write(new Uint8Array());
// @ts-expect-error 可写流必须保留 chunk 类型。
writable.getWriter().write(1);

declare const transform: TTransformStream<string, Uint8Array>;
transform.writable.getWriter().write("value");
// @ts-expect-error 转换流必须保留输入类型。
transform.writable.getWriter().write(1);
const transformed: TReadableStream<Uint8Array> = transform.readable;
// @ts-expect-error 转换流必须保留输出类型。
const invalidTransformed: TReadableStream<number> = transform.readable;
