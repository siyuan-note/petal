/**
 * @see {@link https://typedoc-plugin-markdown.org/docs | typedoc-plugin-markdown • Docs} | {@link https://typedoc.org/options/configuration/ | Configuration • TypeDoc}
 * @type {import("typedoc-plugin-markdown").PluginOptions | import("typedoc").TypeDocOptions}
 */
const config = {
    // #region typedoc
    entryPoints: [
        "./siyuan.d.ts",
    ],
    out: "./docs/markdown/",
    plugin: [
        "typedoc-plugin-markdown",
    ],

    // REF: https://typedoc.org/options/input/#sourcelinktemplate
    sourceLinkTemplate: "https://github.com/siyuan-note/petal/tree/main/{path}#L{line}",

    // REF: https://typedoc.org/options/input/#readme
    readme: "none",

    // #endregion typedoc-plugin-markdown
    // #region typedoc-plugin-markdown

    // REF: https://typedoc-plugin-markdown.org/docs/options/file-options#--mergereadme
    mergeReadme: true,

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--usecodeblocks
    // useCodeBlocks: true,

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--indexformat
    indexFormat: "table",

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--parametersFormat
    parametersFormat: "htmlTable",

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--interfacePropertiesFormat
    interfacePropertiesFormat: "htmlTable",

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--classPropertiesFormat
    classPropertiesFormat: "htmlTable",

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--enumMembersFormat
    enumMembersFormat: "htmlTable",

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--typeDeclarationFormat
    typeDeclarationFormat: "htmlTable",

    // REF: https://typedoc-plugin-markdown.org/docs/options/display-options#--propertyMembersFormat
    propertyMembersFormat: "htmlTable",

    // REF: https://typedoc-plugin-markdown.org/docs/options/utility-options#--publicpath
    // publicPath: "https://github.com/siyuan-note/petal/tree/main/docs/markdown/",

    // #endregion typedoc-plugin-markdown
};

export default config;
