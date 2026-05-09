# UI Dashboard Follow-up Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在当前 dashboard 基础上补齐最影响可用性的 UI 功能缺口：真实视口复核、导航状态、统计入口、非持久事件流、菜单/保存管理和锁定系统说明。

**Architecture:** 保持 `GameState`、存档结构和核心玩法函数不变，只在 `src/App.tsx` 增加非持久 UI state、纯展示 helper 和现有 handler 的展示读回。样式继续集中在 `src/styles.css`，测试以 SSR 断言、纯 helper 单测和治理 CSS 断言为主，真实浏览器视口复核作为手动/Browser 证据写入 `docs/SELF_PLAYTEST.md`。

**Tech Stack:** React + TypeScript + Vite + Vitest + bun；不新增依赖，不引入 UI 框架。

---

## 当前功能缺失盘点

1. 视口复核缺失：当前只通过 SSR、构建和 CSS 静态检查，尚未用真实浏览器确认 1440px、1024px、375px 下无横向滚动、底部导航不遮挡、右侧状态区不过密。
2. 导航仍是静态入口：左侧/底部导航可以锚点跳转，但不会根据当前滚动区段切换 active，也不会给锁定入口反馈。
3. 顶部 `统计`、`设置`、`菜单` 仍是视觉按钮：其中 `统计` 可以安全接入现有 local-only metrics snapshot；`菜单` 可以承载保存导出/导入/重置入口；`设置` 当前没有真实需求，应继续保持最小化。
4. 事件记录太薄：当前只展示离线收益、最新采集消息和最新购买消息，没有一个本次 session 内的短事件流；这让 dashboard 的“事件记录”不像控制台。
5. 研究所/日志缺少锁定详情：它们表达了未来空间，但点击后没有说明为什么锁定、什么时候可能开启。
6. 可访问性和键盘反馈还不够明确：新增面板和导航状态后，需要补 `aria-expanded`、`aria-current`、焦点样式和关闭行为。

## Non-goals

- 不新增第三资源、任务系统、研究系统、真实日志持久化、科技树、多生产线、共鸣节点、节点等级树或 telemetry。
- 不改变 `GameState` 类型、存档 key、serialize / hydrate / migration 逻辑。
- 不改变 `clickForDust`、`buyAutoCollector`、`buyEfficiencyUpgrade`、`claimResonanceMilestones`、`unlockResonanceNode`、`performStardustReturn` 语义。
- 不新增依赖；浏览器复核如果工具不可用，只记录验证缺口，不为截图引入 Playwright/Puppeteer。

### Task 1: 真实视口复核清单

**Files:**
- Modify: `docs/SELF_PLAYTEST.md`
- Modify: `docs/GOVERNOR_STATE.md`

**Step 1: 写复核清单**

在 `docs/SELF_PLAYTEST.md` 的 UI gap 下增加 3 个视口检查项：

```md
- 1440px：顶部 HUD、左侧导航、中央主操作区、右侧状态区同时可见；主资源数字和采集按钮不被遮挡。
- 1024px：左侧导航隐藏或降级后，主列和状态列无横向滚动。
- 375px：首屏可见标题、自动保存、星尘核心和采集按钮；底部导航不遮挡采集按钮。
```

**Step 2: 运行静态验证**

Run: `bun run test -- src/App.test.tsx src/ops-scripts.test.ts`

Expected: PASS。此时只确认 SSR 和 CSS 护栏未破坏。

**Step 3: 浏览器复核**

Run: `bun run dev -- --host 127.0.0.1`

Expected: 本地服务启动。使用 Browser 工具或人工浏览器打开本地 URL，分别检查 1440px、1024px、375px。若 Browser 工具不可用，在 `docs/SELF_PLAYTEST.md` 写明缺口，不引入新依赖。

**Step 4: 更新治理状态**

在 `docs/GOVERNOR_STATE.md` 把本轮 mode 记录为 `CONTENT_REVIEW` / `VISUAL_POLISH`，并写明是否完成真实视口复核。

**Step 5: Commit**

```bash
git add docs/SELF_PLAYTEST.md docs/GOVERNOR_STATE.md
git commit -m "docs: add dashboard viewport review checklist"
```

### Task 2: 导航 active 状态和锁定反馈

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`

**Step 1: 写失败测试**

在 `src/App.test.tsx` 增加 SSR 断言，确认导航项有可验证状态：

```tsx
it("marks dashboard navigation states", () => {
  const html = renderToStaticMarkup(<App />);

  expect(html).toContain('aria-current="page"');
  expect(html).toContain('aria-disabled="true"');
  expect(html).toContain("研究所锁定");
  expect(html).toContain("日志锁定");
});
```

**Step 2: 确认红灯**

Run: `bun run test -- src/App.test.tsx`

Expected: FAIL，缺少 `aria-current` 或锁定文案。

**Step 3: 最小实现**

在 `src/App.tsx`：

- 给当前默认入口 `引擎室` 加 `aria-current="page"`。
- 锁定入口使用 `aria-disabled="true"`。
- 增加锁定说明短文案，例如 `研究所锁定`、`日志锁定`，仅展示，不做系统。

在 `src/styles.css`：

- 增加 `.nav-item[aria-current="page"]` 和 `.nav-item[aria-disabled="true"]` 的样式。

**Step 4: 绿灯验证**

Run: `bun run test -- src/App.test.tsx`

Expected: PASS。

**Step 5: Commit**

```bash
git add src/App.tsx src/styles.css src/App.test.tsx
git commit -m "feat: clarify dashboard navigation states"
```

### Task 3: 顶部统计面板

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`

**Step 1: 写失败测试**

导出一个纯 helper，例如 `formatStatsPanelRows(state)`，并测试它只读取现有状态：

```tsx
it("formats dashboard stats rows from current game state", () => {
  expect(
    formatStatsPanelRows({
      ...createGameState(0),
      autoCollectors: 3,
      dustPerSecond: 0.6,
      returnCount: 1,
      resonance: 2,
    }),
  ).toEqual([
    ["每秒产出", "+0.6"],
    ["自动采集器", "3 台"],
    ["共鸣", "2"],
    ["归航次数", "1"],
  ]);
});
```

**Step 2: 确认红灯**

Run: `bun run test -- src/App.test.tsx`

Expected: FAIL，helper 尚未存在。

**Step 3: 实现 helper 和面板**

在 `src/App.tsx`：

- 增加 `const [openPanel, setOpenPanel] = useState<"stats" | null>(null);`
- `统计` 按钮切换 `openPanel`。
- 增加 `<section className="hud-panel" aria-label="统计面板">`，展示 `formatStatsPanelRows(state)`。
- 保留 local-only metrics，不新增 telemetry，不写 localStorage。

**Step 4: 样式**

在 `src/styles.css`：

- 增加 `.hud-panel`、`.hud-panel-grid`。
- 移动端让面板跟随文档流或覆盖在 HUD 下方，不遮挡采集按钮。

**Step 5: 验证**

Run: `bun run test -- src/App.test.tsx`

Expected: PASS。

**Step 6: Commit**

```bash
git add src/App.tsx src/styles.css src/App.test.tsx
git commit -m "feat: add local dashboard stats panel"
```

### Task 4: 本次 session 事件流

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`

**Step 1: 写失败测试**

新增纯 helper `appendSessionEvent(events, message, limit)`：

```tsx
it("keeps a capped non-persistent session event feed", () => {
  expect(appendSessionEvent(["a", "b"], "c", 2)).toEqual(["c", "a"]);
});
```

**Step 2: 确认红灯**

Run: `bun run test -- src/App.test.tsx`

Expected: FAIL，helper 尚未存在。

**Step 3: 最小实现**

在 `src/App.tsx`：

- 增加 `const [sessionEvents, setSessionEvents] = useState<string[]>([]);`
- 在采集、购买、调校、领取共鸣、节点解锁、归航成功时调用 `appendSessionEvent`。
- 事件流只保存在 React state，不写 localStorage。
- `事件记录` 优先展示最近 5 条；无事件时继续显示“工坊运行稳定，等待下一次操作”。

**Step 4: 样式**

在 `src/styles.css` 增加 `.event-list`、`.event-list li`，保持右侧卡片可扫读。

**Step 5: 验证**

Run: `bun run test -- src/App.test.tsx`

Expected: PASS。

**Step 6: Commit**

```bash
git add src/App.tsx src/styles.css src/App.test.tsx
git commit -m "feat: add session event feed"
```

### Task 5: 菜单里的保存管理

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`

**Step 1: 写失败测试**

新增 SSR 断言，确认菜单入口有明确语义：

```tsx
it("renders save management menu affordances", () => {
  const html = renderToStaticMarkup(<App />);

  expect(html).toContain("导出存档");
  expect(html).toContain("导入存档");
  expect(html).toContain("重置本地存档");
});
```

**Step 2: 确认红灯**

Run: `bun run test -- src/App.test.tsx`

Expected: FAIL，菜单内容尚不存在。

**Step 3: 最小实现**

在 `src/App.tsx`：

- 复用 `openPanel`，增加 `"menu"`。
- `菜单` 按钮展开保存管理面板。
- `导出存档` 只展示当前 `serializeGameState(state)` 的只读文本，不自动复制剪贴板。
- `导入存档` 第一版只显示粘贴框和“暂不实装”说明，避免未经验证的导入破坏存档。
- `重置本地存档` 第一版只显示危险操作说明，不执行删除。真正重置另开任务，带二次确认。

**Step 4: 样式**

在 `src/styles.css` 增加 `.save-export-box` 和 danger hint 样式。

**Step 5: 验证**

Run: `bun run test -- src/App.test.tsx`

Expected: PASS。

**Step 6: Commit**

```bash
git add src/App.tsx src/styles.css src/App.test.tsx
git commit -m "feat: add save management menu shell"
```

### Task 6: 锁定系统说明卡

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`
- Modify: `docs/DECISION.md`
- Modify: `docs/SELF_PLAYTEST.md`

**Step 1: 写失败测试**

增加 SSR 断言：

```tsx
it("explains locked future systems without adding gameplay", () => {
  const html = renderToStaticMarkup(<App />);

  expect(html).toContain("研究所仍在锁定");
  expect(html).toContain("日志仍在锁定");
  expect(html).toContain("不改变当前玩法");
});
```

**Step 2: 确认红灯**

Run: `bun run test -- src/App.test.tsx`

Expected: FAIL，锁定详情尚未存在。

**Step 3: 最小实现**

在 `src/App.tsx`：

- 在右侧状态区底部增加 `future-systems-card`。
- 只说明研究所/日志为何锁定，以及当前版本不会新增系统。
- 不添加真实研究、任务或持久日志功能。

**Step 4: 文档同步**

在 `docs/DECISION.md` 增加一条短 decision：锁定系统说明是展示层，不是系统承诺。

在 `docs/SELF_PLAYTEST.md` 增加完成记录和仍需真实反馈的 gap。

**Step 5: 验证**

Run:

```bash
bun run test
bun run build
./ops/governor-check.sh
git diff --check
```

Expected: 全部 PASS。

**Step 6: Commit**

```bash
git add src/App.tsx src/styles.css src/App.test.tsx docs/DECISION.md docs/SELF_PLAYTEST.md
git commit -m "feat: explain locked future systems"
```

## 推荐执行顺序

1. 先做 Task 1，补齐视口复核证据。
2. 再做 Task 2 和 Task 3，因为导航和统计是当前 dashboard 上最明显的“按钮像假的”问题。
3. Task 4 可以提升 idle dashboard 的操作反馈，但必须保持非持久。
4. Task 5 只做保存管理壳，不实装导入/重置，避免高风险。
5. Task 6 最后做，只补说明，不新增研究或日志系统。

## 最终验证

完成全部任务后运行：

```bash
bun run test
bun run build
./ops/governor-check.sh
git diff --check
git status --short --branch
```

预期：测试和构建全绿，治理检查通过，工作区干净或只剩明确未提交的用户文件。
