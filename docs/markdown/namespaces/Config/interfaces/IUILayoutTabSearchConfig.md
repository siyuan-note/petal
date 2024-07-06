[**SiYuan Plugin API v1.0.2**](../../../README.md) • **Docs**

---

[SiYuan Plugin API v1.0.2](../../../README.md) / [Config](../README.md) / IUILayoutTabSearchConfig

# Interface: IUILayoutTabSearchConfig

SiYuan search tab configuration

## Properties

### group

> **group**: `number`

Grouping strategy

- `0`: No grouping
- `1`: Group by document

#### Defined in

[types/config.d.ts:1915](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1915)

---

### hPath

> **hPath**: `string`

Readable path list

#### Defined in

[types/config.d.ts:1920](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1920)

---

### hasReplace

> **hasReplace**: `any`

#### Defined in

[types/config.d.ts:1916](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1916)

---

### idPath

> **idPath**: `string`[]

Search in the specified paths

#### Defined in

[types/config.d.ts:1924](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1924)

---

### k

> **k**: `string`

Search content

#### Defined in

[types/config.d.ts:1928](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1928)

---

### method

> **method**: `number`

Search scheme

- `0`: Keyword (default)
- `1`: Query syntax
- `2`: SQL
- `3`: Regular expression

#### Default

```ts
0;
```

#### Defined in

[types/config.d.ts:1937](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1937)

---

### name?

> `optional` **name**: `string`

Custom name of the query condition group

#### Defined in

[types/config.d.ts:1941](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1941)

---

### page

> **page**: `number`

Current page number

#### Defined in

[types/config.d.ts:1945](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1945)

---

### r

> **r**: `string`

Replace content

#### Defined in

[types/config.d.ts:1949](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1949)

---

### removed?

> `optional` **removed**: `boolean`

Whether to clear the search box after removing the currently used query condition group

#### Defined in

[types/config.d.ts:1953](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1953)

---

### replaceTypes

> **replaceTypes**: [`IUILayoutTabSearchConfigReplaceTypes`](IUILayoutTabSearchConfigReplaceTypes.md)

#### Defined in

[types/config.d.ts:1954](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1954)

---

### sort

> **sort**: `number`

Search result sorting scheme

- `0`: Block type (default)
- `1`: Ascending by creation time
- `2`: Descending by creation time
- `3`: Ascending by update time
- `4`: Descending by update time
- `5`: By content order (only valid when grouping by document)
- `6`: Ascending by relevance
- `7`: Descending by relevance

#### Default

```ts
0;
```

#### Defined in

[types/config.d.ts:1967](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1967)

---

### types

> **types**: [`IUILayoutTabSearchConfigTypes`](IUILayoutTabSearchConfigTypes.md)

#### Defined in

[types/config.d.ts:1968](https://github.com/siyuan-note/petal/tree/main/types/config.d.ts#L1968)
