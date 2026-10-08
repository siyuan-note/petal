import type { IURL } from "../kernel";

// 为 Zod 的 URL 类型引用提供沙箱接口，避免测试依赖 DOM 或 Node 全局声明。
declare global {
    interface URL extends IURL {}
}
