const path = require("node:path");
const ts = require(process.argv[2] || process.env.SIYUAN_TYPESCRIPT || "typescript");

let failed = false;
for (const config of [
    {name: "kernel ES6 default", file: "kernel-types.ts"},
    {name: "kernel sandbox", file: "kernel-types.ts", lib: ["lib.esnext.d.ts"]},
    {name: "kernel DOM", file: "kernel-types.ts", lib: ["lib.esnext.d.ts", "lib.dom.d.ts"]},
    {name: "frontend ES6 default", file: "plugin-types.ts", strict: false},
]) {
    if (process.argv.includes("--frontend-only") && config.file !== "plugin-types.ts") {
        continue;
    }
    const files = [path.join(__dirname, config.file)];
    const program = ts.createProgram(files, {
        noEmit: true,
        strict: config.strict !== false,
        skipLibCheck: false,
        esModuleInterop: true,
        types: [],
        target: ts.ScriptTarget.ES2015,
        module: ts.ModuleKind.CommonJS,
        lib: config.lib,
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    console.log(`Plugin types (${config.name}, TypeScript ${ts.version}): ${diagnostics.length} errors`);
    if (diagnostics.length) {
        failed = true;
        console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCanonicalFileName: (file) => file,
            getCurrentDirectory: () => process.cwd(),
            getNewLine: () => "\n",
        }));
    }
}
process.exitCode = failed ? 1 : 0;
