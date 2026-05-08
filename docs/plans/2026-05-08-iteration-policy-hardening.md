# Iteration Policy Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在现有 Meaningful Iteration Gate 上增加 Cycle Bet、Cycle Status 和机制复盘要求，避免迭代停滞在同一阶段。

**Architecture:** 新增 `docs/ITERATION_POLICY.md` 存放细则；更新 `docs/GOVERNOR_STATE.md`、`docs/HARNESS.md`、`docs/OPERATING_MODES.md`、`prompts/goal.md` 让每轮必须记录周期赌注和状态；扩展 `ops/governor-check.sh` 与 `src/ops-scripts.test.ts` 做字段校验。

**Tech Stack:** Markdown、Bash、Vitest、Bun。

---

### Task 1: 写失败测试

**Files:**
- Modify: `src/ops-scripts.test.ts`

**Step 1: Add failing tests**

新增测试：

- 缺少 `Cycle Bet` 时 governor check 失败。
- `Cycle Status` 不是 `active` 或 `completed` 时 governor check 失败。

**Step 2: Run red test**

```bash
bun test src/ops-scripts.test.ts -t "cycle bet|cycle status"
```

Expected: fails because `ops/governor-check.sh` does not validate cycle bet/status yet.

### Task 2: 实现检查

**Files:**
- Modify: `ops/governor-check.sh`
- Modify: `src/ops-scripts.test.ts`

**Step 1: Extend required docs**

把 `docs/ITERATION_POLICY.md` 加入 required harness files。

**Step 2: Extend meaningful iteration check**

`check_meaningful_iteration_gate` 新增：

- `Cycle Bet`
- `Cycle Status`
- `Evidence Source` 非空检查
- `Required Artifact` 非空检查
- `Cycle Status` 枚举检查

**Step 3: Update fixture**

测试 fixture 默认写入合格 cycle bet/status。

### Task 3: 同步文档

**Files:**
- Create: `docs/ITERATION_POLICY.md`
- Modify: `prompts/goal.md`
- Modify: `docs/HARNESS.md`
- Modify: `docs/OPERATING_MODES.md`
- Modify: `docs/GOVERNOR_STATE.md`
- Modify: `docs/HARNESS_CHANGELOG.md`
- Modify: `docs/DECISION.md`
- Modify: `docs/RELEASE_LOG.md`

**Step 1: Document policy**

说明每轮开始必须写 cycle bet，每轮结束必须更新 cycle status、summary 和 next candidate track。

**Step 2: Update current state**

当前轮次为 `META_IMPROVE / HARNESS_MAINTENANCE`，cycle status 从 `active` 收口为 `completed`。

### Task 4: 验证、提交、推送

```bash
bun test src/ops-scripts.test.ts
bun test
bun run test
bun run build
./ops/governor-check.sh
git diff --check
git status --short --branch
```

Expected: all pass, then commit and push.
