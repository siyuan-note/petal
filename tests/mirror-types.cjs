const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const hostRoot = path.resolve(process.argv[2] || path.join(__dirname, "../../siyuan"), "app/src");
const petalRoot = path.join(__dirname, "..");

function members(file) {
    const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const result = new Map();
    function visit(node, prefix = "") {
        if (ts.isModuleDeclaration(node)) {
            if (node.body) visit(node.body, `${prefix}${node.name.text}.`);
            return;
        }
        if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
            result.set(prefix + node.name.text, new Map(node.members.filter(member => member.name).map(member => [
                member.name.getText(source), !!member.questionToken,
            ])));
        }
        ts.forEachChild(node, child => visit(child, prefix));
    }
    visit(source);
    return result;
}

let checked = 0;
for (const [hostFile, petalFile, selected] of [
    ["constants.ts", "types/constants.ts", ["Constants"]],
    ["types/config.d.ts", "types/config.d.ts", null],
    ["types/index.d.ts", "types/index.d.ts", ["ISiyuan", "IBlock", "IPosition", "ITabDragData"]],
]) {
    const host = members(path.join(hostRoot, hostFile));
    const petal = members(path.join(petalRoot, petalFile));
    const names = selected || [...host.keys()];
    if (!selected) assert.deepEqual([...petal.keys()].sort(), [...host.keys()].sort(), `${petalFile}: interface names drifted`);
    for (const name of names) {
        assert.ok(host.has(name) && petal.has(name), `${petalFile}: missing ${name}`);
        assert.deepEqual([...petal.get(name)].sort(), [...host.get(name)].sort(), `${petalFile}: ${name} members drifted`);
        checked++;
    }
}
console.log(`Plugin mirrors: ${checked} declarations match SiYuan member names and optionality`);
