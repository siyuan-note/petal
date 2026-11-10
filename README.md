# SiYuan Plugin API

[SiYuan plugin sample](https://github.com/siyuan-note/plugin-sample)

The frontend `siyuan` entry supports the plugin sample's TypeScript 4.9 configuration. The `siyuan/kernel` entry requires TypeScript 5.9 or later because its Goja Node compatibility dependencies use newer typed-array and iterator declarations. It supplies its required BigInt and async-iterator library references and works without DOM types.

Run `pnpm run test:kernel-types` to check the frontend and kernel entry points with declaration checking enabled. Kernel checks cover the default ES6 libraries and both DOM and DOM-less ESNext configurations without test-only global type shims.

Run `pnpm run test:mirrors <path-to-siyuan>` to compare constant and configuration members with a SiYuan checkout. The default path is the sibling `../siyuan` repository. Regenerate API and attribute-view declarations from SiYuan with `pnpm run api:generate --petal ../../petal` in its `app/` directory.

## Publishing

This repository publishes the `siyuan` package to npm. Configure an npm [trusted publisher](https://docs.npmjs.com/trusted-publishers/) for the existing package with GitHub owner `siyuan-note`, repository `petal`, and workflow filename `publish.yml`. Leave the environment unset to match the workflow. The workflow uses GitHub Actions OIDC and does not require an `NPM_TOKEN` secret.

Before releasing, finalize the declarations and changelog, choose an unused version, and update `package.json`. Run `pnpm install --frozen-lockfile`, `pnpm run test:kernel-types`, `pnpm run test:mirrors <path-to-siyuan>`, and `npm pack --dry-run`. The mirror check requires the matching SiYuan checkout and runs locally; the publishing workflow checks declarations without that checkout. This package ships declarations directly and has no build step.

Commit and push the release changes, then publish a GitHub Release whose tag is the package version or that version prefixed with `v`. The tagged commit must contain `.github/workflows/publish.yml` and the intended release contents. Mark versions containing a prerelease suffix as GitHub pre-releases; these publish to npm's `alpha` tag. Stable releases publish to `latest`. Publishing a draft Release also triggers the workflow.

The repository does not track a lockfile, so Actions installs dependencies with `pnpm install --no-frozen-lockfile`. If publication fails before npm accepts the version, the workflow can be dispatched from the default branch with the existing Release tag as its `tag` input. It checks out that tag and validates the published Release before publishing.

After publication, check the Actions run, `npm view siyuan version dist-tags --registry=https://registry.npmjs.org`, and the published package contents. Published versions cannot be overwritten; choose a new version for subsequent changes.
