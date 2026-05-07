# Workshop Item Art Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 用 3 张项目内位图插图强化“星尘 → 自动采集器 → 调校工具”的核心链路。

**Architecture:** 生成 3 个 WebP 资产并在现有 `App` UI 中以内联图片引用。保持游戏状态、存档、指标和可见面板不变，只增加现有资源区和升级按钮的视觉锚点。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Bun、内置 `imagegen`。

---

### Task 1: 测试视觉资产语义

**Files:**
- Modify: `src/App.test.tsx`

**Step 1: Write the failing test**

在首屏渲染测试中加入对三类图片 `alt` 文案的断言：

```tsx
expect(html).toContain('alt="星尘晶体"');
expect(html).toContain('alt="自动采集器"');
expect(html).toContain('alt="调校工具"');
```

**Step 2: Run test to verify it fails**

Run: `bun test src/App.test.tsx`

Expected: FAIL，失败原因是当前 HTML 不包含对应 `alt` 文案。

### Task 2: 生成并保存资产

**Files:**
- Create: `src/assets/stardust-crystal.webp`
- Create: `src/assets/auto-collector.webp`
- Create: `src/assets/tuning-tool.webp`

**Step 1: Generate source images**

使用内置 `imagegen` 分别生成 3 张一致风格的游戏物件插图。

**Step 2: Persist project assets**

从 `$CODEX_HOME/generated_images/` 选择最终图，复制到 `src/assets/` 并转换为 WebP。

### Task 3: 接入 UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Step 1: Import assets**

在 `src/App.tsx` 导入 3 个 WebP。

**Step 2: Render visual anchors**

在资源读数区域和两个升级按钮内加入图片，保持按钮文案和禁用状态不变。

**Step 3: Style stable dimensions**

在 `src/styles.css` 为资源图和按钮图设置稳定尺寸、圆角和响应式约束。

**Step 4: Run test**

Run: `bun test src/App.test.tsx`

Expected: PASS。

### Task 4: 更新治理文档

**Files:**
- Modify: `docs/DECISION.md`
- Modify: `docs/RELEASE_LOG.md`

**Step 1: Record decision evidence**

在 `docs/DECISION.md` 记录本轮资产理由、限制和实现记录。

**Step 2: Record release note**

在 `docs/RELEASE_LOG.md` 记录新增项目内插图资产。

### Task 5: 验证

**Commands:**
- `bun test`
- `bun run build`
- `./ops/governor-check.sh`
- `git diff --check`
- `git status --short --branch`

Expected: 所有命令退出码为 0，工作区只包含本轮相关变更。
