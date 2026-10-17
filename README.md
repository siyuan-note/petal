# SiYuan Plugin API

[SiYuan plugin sample](https://github.com/siyuan-note/plugin-sample)

The frontend `siyuan` entry supports the plugin sample's TypeScript 4.9 configuration. The `siyuan/kernel` entry requires TypeScript 5.9 or later because its Goja Node compatibility dependencies use newer typed-array and iterator declarations. It supplies its required BigInt and async-iterator library references and works without DOM types.

Run `pnpm run test:kernel-types` to check the frontend and kernel entry points with declaration checking enabled. Kernel checks cover the default ES6 libraries and both DOM and DOM-less ESNext configurations without test-only global type shims.

Run `pnpm run test:mirrors <path-to-siyuan>` to compare constant and configuration members with a SiYuan checkout. The default path is the sibling `../siyuan` repository. Regenerate API and attribute-view declarations from SiYuan with `pnpm run api:generate --petal ../../petal` in its `app/` directory.
