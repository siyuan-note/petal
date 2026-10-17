/**
 * Loads a CommonJS module and returns its `module.exports`.
 *
 * @remarks Backed by `github.com/dop251/goja_nodejs/require`, which follows Node.js's resolution algorithm: a
 * path-like `id` (starting with `/`, `./`, or `../`) resolves against the requiring file and tries `id`, `id.js`,
 * and `id.json`, then a directory's `package.json` `main`, `index.js`, and `index.json`; any other `id` is first
 * looked up among the built-in modules and then in `node_modules` directories. Only regular files inside the
 * plugin's directory (the directory of `kernel.js`) can be loaded, so absolute paths, paths that leave the plugin
 * directory, and `node_modules` directories above it are treated as missing. Each module is evaluated once and then
 * cached. Required files run inside a CommonJS wrapper that provides `exports`, `require`, `module`, `__filename`,
 * and `__dirname`; `kernel.js` itself runs as a plain script, where only `require` exists.
 *
 * The built-in modules are `console`, `buffer`, `url`, and `util` (which exports only `format`), each also
 * available with the `node:` prefix; any other built-in name, such as `fs`, `path`, or `process`, fails. Failures
 * throw an {@link IGoError}. There is no `require.resolve`, `require.cache`, or `require.main`.
 *
 * @param id - The module path or built-in module name.
 * @returns The module's exports.
 */
export type IRequire = (id: string) => any;
