# Mobile Button Visual Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修复移动端操作按钮被 flex basis 拉高的问题，并轻量强化按钮状态层级。

**Architecture:** 只修改 CSS 和 CSS 回归测试。React 结构、游戏状态、存档、指标、资源和按钮数量保持不变。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Bun、CSS media query。

---

### Task 1: 写 CSS 回归测试

**Files:**
- Modify: `src/ops-scripts.test.ts`

**Step 1: Write the failing test**

在 `visual assets` describe block 中追加断言，要求移动端媒体查询里覆盖按钮 flex basis：

```ts
expect(styles).toContain(".primary-action,\\n  .upgrade-action {\\n    flex-basis: auto;");
```

**Step 2: Run test to verify it fails**

Run: `bun test src/ops-scripts.test.ts`

Expected: FAIL，因为当前 CSS 没有该移动端覆盖。

### Task 2: 修改移动端 CSS

**Files:**
- Modify: `src/styles.css`

**Step 1: Implement minimal CSS**

在 `@media (max-width: 560px)` 中加入：

```css
.primary-action,
.upgrade-action {
  width: 100%;
  min-height: 48px;
  flex-basis: auto;
  padding: 12px;
}

.upgrade-action {
  justify-content: flex-start;
}
```

**Step 2: Add disabled icon state**

在常规样式中加入：

```css
.upgrade-action:disabled .button-art {
  opacity: 0.72;
  filter: grayscale(0.35);
}
```

**Step 3: Run focused test**

Run: `bun test src/ops-scripts.test.ts`

Expected: PASS。

### Task 3: 视觉和全量验证

**Commands:**
- `bun test`
- `bun run build`
- `./ops/governor-check.sh`
- `git diff --check`

**Manual visual check:**
- 启动 `bun run dev -- --host 127.0.0.1 --port 5173`
- 截取 390x844 和 1280x900
- 确认移动端按钮不再异常拉高，桌面端没有明显回退。

### Task 4: 文档记录

**Files:**
- Modify: `docs/DECISION.md`
- Modify: `docs/RELEASE_LOG.md`

**Step 1: Record decision**

记录本轮是视觉打磨，不新增素材、玩法或面板。

**Step 2: Record release note**

在 release log 记录移动端按钮视觉修复。
