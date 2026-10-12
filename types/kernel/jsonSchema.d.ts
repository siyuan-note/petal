/** JSON Schema 的标准类型名称。 */
export type TJSONSchemaType = "object" | "array" | "string" | "number" | "integer" | "boolean" | "null";

/** 智能体能力的 JSON Schema 声明，不依赖浏览器全局类型；扩展关键字由调用方提供。 */
export interface IJSONSchema {
    [keyword: string]: unknown;
    type?: TJSONSchemaType | TJSONSchemaType[];
    $schema?: string;
    $id?: string;
    $ref?: string;
    $defs?: Record<string, IJSONSchema>;
    properties?: Record<string, IJSONSchema | boolean>;
    patternProperties?: Record<string, IJSONSchema | boolean>;
    required?: string[];
    additionalProperties?: IJSONSchema | boolean;
    items?: IJSONSchema | boolean | Array<IJSONSchema | boolean>;
    prefixItems?: Array<IJSONSchema | boolean>;
    allOf?: IJSONSchema[];
    anyOf?: IJSONSchema[];
    oneOf?: IJSONSchema[];
    not?: IJSONSchema | boolean;
    enum?: Array<string | number | boolean | null>;
    const?: string | number | boolean | null;
    title?: string;
    description?: string;
    default?: unknown;
    format?: string;
    minimum?: number;
    maximum?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minItems?: number;
    maxItems?: number;
}
