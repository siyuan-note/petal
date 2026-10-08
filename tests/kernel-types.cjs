const path = require("node:path");
const ts = require("typescript");

let failed = false;
for (const dom of [false, true]) {
    const files = [path.join(__dirname, "kernel-types.ts")];
    if (!dom) {
        files.push(path.join(__dirname, "kernel-url.d.ts"));
    }
    const program = ts.createProgram(files, {
        noEmit: true,
        strict: true,
        skipLibCheck: false,
        esModuleInterop: true,
        types: [],
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS,
        lib: dom ? ["lib.esnext.d.ts", "lib.dom.d.ts"] : ["lib.esnext.d.ts"],
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    console.log(`Kernel types (${dom ? "DOM" : "sandbox"}): ${diagnostics.length} errors`);
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
