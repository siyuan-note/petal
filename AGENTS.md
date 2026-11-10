# AGENTS.md

Petal 发布维护指南。仓库：`siyuan-note/petal`；npm 包名：`siyuan`。

## 发布准备

- 开始任务时核对仓库、分支、提交、远程地址和工作区；最新分支任务先获取相关远程引用。默认分支为 `main`。保留已有改动，确认发布范围，不将未授权的改动带入发布
- 未获用户明确授权，不提交、推送、创建发布标签、发布 GitHub Release 或触发 npm 发布；同一任务中已有的授权在约定范围内持续有效
- 版本来源为 `package.json`。发布前查询 npm 已有版本和 dist-tags，选择未使用的版本，核对 CHANGELOG 与待发布内容。发布时 CHANGELOG 版本标题使用完整的实际发布日期，格式为 `YYYY-MM-DD`，不只写年份
- 仓库不跟踪 `pnpm-lock.yaml`，使用 `pnpm install --no-frozen-lockfile` 安装依赖。Actions 使用 Node.js 24 和 pnpm 12.6.0，调整工具链时同步检查 `.github/workflows/publish.yml`
- 发布前运行 `pnpm run test:kernel-types`、`pnpm run test:mirrors <path-to-siyuan>` 和 `npm pack --dry-run`。镜像检查需要匹配的 SiYuan 仓库；Actions 不运行此项检查，应在本地完成并说明检查范围
- 本包直接发布声明文件，无需构建。检查打包内容包含 `siyuan.d.ts`、`kernel.d.ts` 及所需的 `types/` 文件；生成的 API 声明应从 SiYuan 合约源重新生成，不手工修改

## npm 认证与触发

- 使用 npm [Trusted Publisher](https://docs.npmjs.com/trusted-publishers/)：GitHub 所有者 `siyuan-note`、仓库 `petal`、工作流文件名 `publish.yml`，环境留空。保留 `id-token: write`，无需配置长期 `NPM_TOKEN`
- 工作流订阅 `release.published`，发布草稿 Release 也会触发。标签必须为包版本或带 `v` 前缀的包版本；标签提交必须包含待发布内容及适用的工作流，不默认使用可能已推进的分支头
- 正式版本对应正式 GitHub Release，并发布到 npm 的 `latest`；带预发布后缀的版本必须标记为 GitHub Pre-release，并发布到 `alpha`
- Release 说明取自目标提交 CHANGELOG 的对应版本章节；CHANGELOG 和 Release 说明的列表项之间不留空行，保留版本标题与列表之间的空行。发布流程规则放在本文件，不写入 README
- 发布失败且 npm 尚未接受该版本时，可从默认分支手动运行工作流，指定已发布 Release 的标签作为 `tag` 输入。工作流检出该标签，校验 Release 后发布；重跑历史任务仍使用其原工作流，不会自动取得新修复

## 发布核验

- 核对 Release 标签、目标提交、预发布标记及说明，检查 Actions 实际执行的安装、声明检查、打包和发布步骤
- 查询 `npm view siyuan version dist-tags --registry=https://registry.npmjs.org`，核对目标版本和 dist-tags，并下载检查包内容是否与目标提交一致、是否排除了不应发布的改动
- npm 返回正在处理或公开查询仍为 404 时，报告可用性尚待确认并继续查询，不重复发布同一版本。已发布的 npm 版本不可覆盖，后续内容更改应使用新版本，不改写已发布标签
- 只汇报实际执行的检查；Actions 发布成功不等于所有本地或跨仓库检查均通过
