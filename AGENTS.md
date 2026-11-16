# AGENTS.md

仓库：`siyuan-note/petal`；默认分支：`main`；npm 包名：`siyuan`。

## 开发与检查

- 开始任务时核对仓库、分支、提交、远程地址和工作区；最新分支任务先 fetch。保留已有改动，提交、推送和发布须有用户授权，并核对目标及范围
- API 声明从 SiYuan 合约源生成，不手工修改。本包直接发布声明，无需构建
- 工具链以 `.github/workflows/publish.yml` 为准。仓库不跟踪锁文件，安装使用 `pnpm install --no-frozen-lockfile`
- 发布前运行 `pnpm run test:kernel-types`、`pnpm run test:mirrors <path-to-siyuan>` 和 `npm pack --dry-run`。镜像检查需匹配的 SiYuan 仓库，Actions 不运行此项；核对包内两个声明入口及 `types/`，如实报告验证范围

## CHANGELOG

- 开发条目追加到顶部 `Unreleased`；发布时仅将实际包含的条目归入版本章节，日期为实际发布日期 `YYYY-MM-DD`。未发布条目留在 `Unreleased`，不追加到已发布版本下
- CHANGELOG 和 Release 说明的列表项之间不留空行；标题与列表之间保留空行。Release 说明取自目标提交的对应版本章节。发布规则放在本文件，不写入 README

## 发布

- 版本来源为 `package.json`；先查 npm 版本和 dist-tags，避免重用版本。标签为版本号或加 `v` 前缀，固定到确认过的发布提交，不默认取最新分支头，不改写已发布标签
- 发布 GitHub Release 触发工作流；正式版用 `latest`，带预发布后缀的版本标记为 Pre-release 并用 `alpha`
- npm Trusted Publisher 配置为 `siyuan-note / petal / publish.yml`，环境留空；保留 `id-token: write`，无需长期 `NPM_TOKEN`
- 失败重试前确认 npm 未接受该版本；可从默认分支手动运行工作流，以 `tag` 指定原 Release。历史任务重跑仍使用原工作流
- 发布后核对 Release、标签提交、Actions、npm 版本和 dist-tags，并下载包对照目标提交。npm 正在处理或查询为 404 时继续核验，不重复发布；已发布包不可覆盖
