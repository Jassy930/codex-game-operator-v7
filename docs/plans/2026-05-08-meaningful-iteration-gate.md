# Meaningful Iteration Gate Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 给 governed autonomous cycle 增加有主题的迭代闸门，要求每轮声明内容推进轨道、证据来源和产出物。

**Architecture:** 通过 `prompts/goal.md`、`docs/OPERATING_MODES.md` 和 `docs/HARNESS.md` 定义规则；通过 `docs/GOVERNOR_STATE.md` 记录当前轮次；通过 `ops/governor-check.sh` 和 `src/ops-scripts.test.ts` 做轻量机器校验。该变更只强化 harness，不直接改玩法。

**Tech Stack:** Bash、Vitest、Bun、Markdown。

---

### Task 1: 写失败测试

**Files:**
- Modify: `src/ops-scripts.test.ts`

**Step 1: Add test**

增加一个测试：当 `docs/GOVERNOR_STATE.md` 缺少 `Iteration Track` / `Expected Content Advance` / `Evidence Source` / `Required Artifact` 时，`ops/governor-check.sh` 必须失败。

**Step 2: Run red test**

```bash
bun test src/ops-scripts.test.ts -t "meaningful iteration"
```

Expected: fails because governor check does not validate meaningful iteration fields yet.

### Task 2: 实现 governor check

**Files:**
- Modify: `ops/governor-check.sh`
- Modify: `src/ops-scripts.test.ts`

**Step 1: Add check**

新增 `check_meaningful_iteration_gate`：

- 校验 `docs/GOVERNOR_STATE.md` 存在。
- 校验包含 `## Iteration Track`、`## Expected Content Advance`、`## Evidence Source`、`## Required Artifact`。
- 校验 track 属于允许列表。
- 校验 expected content advance 不为空，且不是 `none` / `no-change` / `minor copy`。

**Step 2: Update fixture**

让 `createHarnessWorkspace` 默认写入合格的 governor state，避免既有测试因新闸门失败。

**Step 3: Run focused tests**

```bash
bun test src/ops-scripts.test.ts -t "meaningful iteration|governor check"
```

Expected: pass.

### Task 3: 同步治理文档

**Files:**
- Modify: `prompts/goal.md`
- Modify: `docs/OPERATING_MODES.md`
- Modify: `docs/HARNESS.md`
- Modify: `docs/GOVERNOR_STATE.md`
- Modify: `docs/HARNESS_CHANGELOG.md`
- Modify: `docs/DECISION.md`
- Modify: `docs/RELEASE_LOG.md`

**Step 1: Document gate**

在 cycle 开始规则里要求声明 iteration track 和 required artifact。把轨道列表写进 `docs/OPERATING_MODES.md`，把 operating cycle 更新为“选择 mode + track”。

**Step 2: Update current state**

当前轮次使用 `HARNESS_MAINTENANCE`，产出物为本次规则、脚本测试和文档同步。

### Task 4: 全量验证和提交

**Commands:**

```bash
bun test src/ops-scripts.test.ts
bun test
bun run test
bun run build
./ops/governor-check.sh
git diff --check
git status --short --branch
```

Expected: all checks exit 0, then commit and push without co-author metadata.
