# 可玩 MVP 启动实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标：** 创建一个可本地运行、可测试、可构建的 React + TypeScript + Vite + Vitest 最小 idle / incremental 游戏。

**架构：** 核心游戏状态放在 `src/game.ts`，UI 只负责渲染、触发状态变更和保存到 `localStorage`。第一版只包含一个资源、一个主要操作、一个升级类型和版本化存档。

**技术栈：** Bun、React、TypeScript、Vite、Vitest，兼容 `bun test` 与 `bun run test`。

---

## Task 1: 测试入口与核心循环红灯

**文件：**

- 创建：`package.json`
- 创建：`tsconfig.json`
- 创建：`tsconfig.app.json`
- 创建：`tsconfig.node.json`
- 创建：`vite.config.ts`
- 创建：`src/game.test.ts`

**步骤：**

1. 写核心循环测试，覆盖初始状态、点击收益、升级购买、被动产出、版本化存档。
2. 运行 `bun install` 安装依赖。
3. 运行 `bun test`。
4. 预期红灯：`Cannot find module './game'`。

## Task 2: 核心状态逻辑绿灯

**文件：**

- 创建：`src/game.ts`
- 修改：`src/game.test.ts`
- 修改：`vite.config.ts`
- 修改：`tsconfig.app.json`

**步骤：**

1. 实现 `createGameState`、`clickForDust`、`buyAutoCollector`、`tickGame`、`serializeGameState`、`hydrateGameState`。
2. 运行 `bun test`。
3. 预期绿灯：核心循环测试全部通过。

## Task 3: 最小 React UI

**文件：**

- 创建：`src/App.test.tsx`
- 创建：`index.html`
- 创建：`src/main.tsx`
- 创建：`src/App.tsx`
- 创建：`src/styles.css`
- 创建：`src/vite-env.d.ts`

**步骤：**

1. 写首屏渲染测试，确认玩家能看到资源、点击动作和第一升级。
2. 运行 `bun test`，预期因 `src/App.tsx` 缺失失败。
3. 实现 App，展示星尘、采集按钮、自动采集器、目标进度和基础统计。
4. 使用 `localStorage` 自动保存，加载时应用离线收益。
5. 运行 `bun test`、`bun run test`、`bun run build`。

## Task 4: 文档与治理同步

**文件：**

- 修改：`README.md`
- 修改：`docs/GOVERNOR_STATE.md`
- 修改：`docs/DECISION.md`
- 修改：`docs/RELEASE_LOG.md`
- 修改：`docs/SELF_PLAYTEST.md`

**步骤：**

1. 更新 README 的本地运行说明。
2. 记录 BOOTSTRAP 结果和下一周期建议模式。
3. 在决策文档中记录实现证据。
4. 更新发布日志与自测状态。
5. 运行 review protocol 与最终验证命令。
