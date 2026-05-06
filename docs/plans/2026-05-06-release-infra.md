# 公开预览基础设施实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标：** 让当前可玩 MVP 能通过 GitHub Pages 工作流构建并发布为公开预览。

**架构：** 使用 GitHub Actions 在 `main` 分支推送后安装 Bun、运行测试、构建 Vite 静态产物并部署到 GitHub Pages。Vite 在 GitHub Actions 中使用仓库路径作为 `base`，本地开发仍使用 `/`。

**技术栈：** GitHub Actions、Bun、Vite、React、TypeScript。

---

## Task 1: 治理选择

**文件：**

- 修改：`docs/GOVERNOR_STATE.md`
- 修改：`docs/DECISION.md`

**步骤：**

1. 选择 `RELEASE_INFRA`。
2. 记录原因：游戏可玩且有反馈入口，但尚不可公开预览。
3. 明确禁止事项：不改玩法，不回复 issue，不生产部署未验证构建。

## Task 2: Pages 工作流

**文件：**

- 创建：`.github/workflows/deploy-pages.yml`
- 修改：`vite.config.ts`

**步骤：**

1. 在 Vite 配置中设置 GitHub Actions 下的项目 Pages base path。
2. 创建 GitHub Pages workflow。
3. workflow 必须运行 `bun install --frozen-lockfile`、`bun test`、`bun run test`、`bun run build`。
4. 上传 `dist` 并部署 Pages。

## Task 3: 文档与验证

**文件：**

- 修改：`README.md`
- 修改：`docs/RELEASE_LOG.md`
- 修改：`docs/DECISION.md`
- 修改：`docs/GOVERNOR_STATE.md`

**步骤：**

1. 记录 Pages 预览 URL 与触发方式。
2. 运行 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh`。
3. 提交后尝试 `git push origin main`。
