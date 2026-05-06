# 反馈入口实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标：** 在不新增游戏系统的前提下，为当前可玩 MVP 增加一个清晰反馈路径，并记录本地反馈点击事件。

**架构：** 反馈配置与本地事件队列放在 `src/feedback.ts`，UI 只渲染一个 GitHub Issues 反馈链接并在点击时记录 `feedback_clicked`。文档说明反馈入口和不伪造反馈的规则。

**技术栈：** Bun、TypeScript、React、Vite、Vitest。

---

## Task 1: 治理选择

**文件：**

- 修改：`docs/GOVERNOR_STATE.md`
- 修改：`docs/DECISION.md`

**步骤：**

1. 选择 `FEEDBACK_INFRA`。
2. 记录原因：游戏已可玩，但玩家还没有清晰反馈路径。
3. 记录禁止事项：不添加新游戏系统，不处理 issue 作为任务。

## Task 2: 反馈模块 TDD

**文件：**

- 创建：`src/feedback.test.ts`
- 创建：`src/feedback.ts`

**步骤：**

1. 写测试：反馈 URL 指向 GitHub issue 新建页，并带有 `feedback` label。
2. 写测试：`recordFeedbackClick` 能追加本地事件队列。
3. 运行 `bun test`，预期因 `src/feedback.ts` 缺失失败。
4. 实现最小反馈模块。
5. 运行 `bun test`，预期通过。

## Task 3: UI 与文档接入

**文件：**

- 修改：`src/App.tsx`
- 修改：`src/App.test.tsx`
- 修改：`src/styles.css`
- 修改：`README.md`
- 修改：`docs/FEEDBACK.md`
- 修改：`docs/METRICS.md`
- 修改：`docs/RELEASE_LOG.md`

**步骤：**

1. 更新 App 测试，确认首屏有“反馈”入口。
2. 在 UI 增加一个外链反馈按钮。
3. 点击反馈时记录本地 `feedback_clicked` 事件。
4. 更新 README 与反馈/指标文档。
5. 运行 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh`。
