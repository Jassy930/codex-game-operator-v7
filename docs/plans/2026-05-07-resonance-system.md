# v0.3 共鸣系统 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现 v0.3 共鸣系统的最小闭环：第二资源、首个共鸣里程碑、共鸣矩阵、v2 存档迁移和 local-only 指标。

**Architecture:** 在 `src/game.ts` 中升级存档模型到 v2，并把共鸣计算保持为纯函数。UI 在 `src/App.tsx` 中复用现有主屏结构，新增一个只在 `星尘引擎室` 后显示的紧凑共鸣面板。指标继续通过 `src/metrics.ts` 写入 localStorage，不新增上传路径。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Bun。

---

### Task 1: 版本化复杂度预算和设计锚点

**Files:**
- Modify: `docs/COMPLEXITY_BUDGET.md`
- Modify: `docs/HARNESS_CHANGELOG.md`
- Modify: `docs/GOVERNOR_STATE.md`
- Modify: `docs/DECISION.md`
- Modify: `docs/CONTENT_ARC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/RELEASE_LOG.md`

**Step 1: Update v0.3 budget**

Add a `v0.3 Resonance Version Budget` section:

```markdown
## v0.3 Resonance Version Budget

目标：在首次回访后引入一个真实策略层，而不是只增加里程碑文案。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Resonance resource: allowed
- Resonance matrix panel: max 1
- Save format versions: max 2
- Local-only resonance metric fields: max 3
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.3 仍然禁止：

- prestige
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 外部 analytics SDK 或上传 telemetry
```

**Step 2: Record meta-governance evidence**

In `docs/HARNESS_CHANGELOG.md`, add an entry explaining:

- Failure mode: v0.2 budget blocks user-requested richer gameplay.
- Evidence: user explicitly rejected “only milestones” and asked for richer play.
- Change: add v0.3 budget with one second resource and one new panel.
- Why this does not weaken constraints: complexity budget remains versioned and bounded.

**Step 3: Run validation**

Run:

```bash
./ops/governor-check.sh
git diff --check
```

Expected: both exit 0.

**Step 4: Commit**

```bash
git add docs/COMPLEXITY_BUDGET.md docs/HARNESS_CHANGELOG.md docs/GOVERNOR_STATE.md docs/DECISION.md docs/CONTENT_ARC.md docs/ROADMAP.md docs/RELEASE_LOG.md
git commit -m "docs: define v0.3 resonance budget"
```

### Task 2: Game state v2 and resonance model

**Files:**
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`

**Step 1: Write failing tests**

Add tests for:

```ts
it("creates a v2 state with resonance fields", () => {
  const state = createGameState(1_000);

  expect(state.version).toBe(2);
  expect(state.resonance).toBe(0);
  expect(state.earnedResonanceMilestones).toEqual([]);
  expect(state.unlockedResonanceNodes).toEqual([]);
});

it("hydrates v1 saves into v2 resonance defaults", () => {
  const saved = JSON.stringify({
    version: 1,
    dust: 10,
    dustPerClick: 1,
    dustPerSecond: 0.2,
    autoCollectors: 1,
    nextAutoCollectorCost: 15,
    autoCollectorEfficiencyLevel: 0,
    nextEfficiencyUpgradeCost: 25,
    lastUpdatedAt: 1_000,
  });

  const loaded = hydrateGameState(saved, 1_000);

  expect(loaded.version).toBe(2);
  expect(loaded.resonance).toBe(0);
  expect(loaded.earnedResonanceMilestones).toEqual([]);
  expect(loaded.unlockedResonanceNodes).toEqual([]);
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/game.test.ts
```

Expected: fails because v2 fields do not exist.

**Step 3: Implement minimal v2 state**

Update `GameState`, `SAVE_VERSION`, `createGameState`, and hydration code.

**Step 4: Run tests to verify pass**

Run:

```bash
bun test src/game.test.ts
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/game.ts src/game.test.ts
git commit -m "feat: add resonance save fields"
```

### Task 3: Resonance milestones and node unlock logic

**Files:**
- Create: `src/resonance.ts`
- Create: `src/resonance.test.ts`
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`

**Step 1: Write failing tests**

Test pure logic:

```ts
import {
  claimResonanceMilestones,
  getResonanceMilestoneProgress,
  unlockResonanceNode,
} from "./resonance";
import { createGameState } from "./game";

it("shows progress toward the first resonance milestone", () => {
  expect(getResonanceMilestoneProgress(createGameState(0))).toEqual({
    id: "first-resonance",
    resonanceReward: 1,
    autoCollectors: { current: 0, target: 20 },
    tuning: { current: 0, target: 12 },
    canClaim: false,
  });
});

it("claims the first resonance once", () => {
  const state = {
    ...createGameState(0),
    autoCollectors: 20,
    autoCollectorEfficiencyLevel: 12,
  };

  const claimed = claimResonanceMilestones(state);
  const claimedAgain = claimResonanceMilestones(claimed);

  expect(claimed.resonance).toBe(1);
  expect(claimed.earnedResonanceMilestones).toEqual(["first-resonance"]);
  expect(claimedAgain.resonance).toBe(1);
});

it("unlocks one resonance node by spending resonance", () => {
  const state = { ...createGameState(0), resonance: 1 };
  const next = unlockResonanceNode(state, "stable-circuit");

  expect(next.resonance).toBe(0);
  expect(next.unlockedResonanceNodes).toEqual(["stable-circuit"]);
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/resonance.test.ts
```

Expected: module missing.

**Step 3: Implement pure resonance module**

Create:

```ts
export type ResonanceNodeId = "stable-circuit" | "return-coil" | "tuning-engraving";
```

Implement first milestone and node unlock guards:

- cannot claim twice
- cannot unlock without resonance
- cannot unlock more than one node in v0.3

**Step 4: Run tests**

Run:

```bash
bun test src/resonance.test.ts src/game.test.ts
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/resonance.ts src/resonance.test.ts src/game.ts src/game.test.ts
git commit -m "feat: add resonance milestone logic"
```

### Task 4: Apply resonance effects to production

**Files:**
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`
- Modify: `src/resonance.ts`
- Modify: `src/resonance.test.ts`

**Step 1: Write failing tests**

Add tests:

```ts
it("stable circuit increases passive production by 10 percent", () => {
  const state = {
    ...createGameState(0),
    autoCollectors: 10,
    autoCollectorEfficiencyMultiplier: 2,
    unlockedResonanceNodes: ["stable-circuit"],
  };

  expect(recalculateProduction(state).dustPerSecond).toBe(4.4);
});
```

**Step 2: Run failure**

Run:

```bash
bun test src/game.test.ts src/resonance.test.ts
```

Expected: fails because production ignores resonance.

**Step 3: Implement recalculation**

Add `recalculateProduction(state)` in `game.ts`.

Rules:

- base production remains `autoCollectors * 0.2 * efficiencyMultiplier`
- `stable-circuit` multiplies by `1.1`
- `return-coil` affects offline reward only
- `tuning-engraving` can be deferred if it complicates the first slice; if implemented, apply +0.05 to efficiency multiplier display and production.

**Step 4: Run tests**

Run:

```bash
bun test src/game.test.ts src/resonance.test.ts
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/game.ts src/game.test.ts src/resonance.ts src/resonance.test.ts
git commit -m "feat: apply resonance production node"
```

### Task 5: Resonance UI panel

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`

**Step 1: Write failing render tests**

Add tests:

```ts
it("hides the resonance matrix before the engine room", () => {
  const html = renderToStaticMarkup(<App />);
  expect(html).not.toContain("共鸣矩阵");
});

it("shows resonance progress after the engine room", () => {
  // seed save with 15 collectors and 9 tuning, then render
  expect(html).toContain("共鸣矩阵");
  expect(html).toContain("自动采集器 15/20");
  expect(html).toContain("调校 9/12");
});

it("shows unlockable resonance nodes when resonance is available", () => {
  // seed save with resonance: 1
  expect(html).toContain("稳定回路");
  expect(html).toContain("回访线圈");
  expect(html).toContain("调校刻印");
});
```

**Step 2: Run failure**

Run:

```bash
bun test src/App.test.tsx
```

Expected: fails because UI is missing.

**Step 3: Implement panel**

Add a compact panel after existing stats:

- title `共鸣矩阵`
- progress line before claim
- claim button if milestone can be claimed
- node buttons if resonance > 0
- disabled node buttons if no resonance

**Step 4: Style**

Use existing card/panel style. Do not add nested cards.

**Step 5: Run tests**

Run:

```bash
bun test src/App.test.tsx
```

Expected: pass.

**Step 6: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/styles.css
git commit -m "feat: show resonance matrix"
```

### Task 6: Local-only resonance metrics

**Files:**
- Modify: `src/metrics.ts`
- Modify: `src/metrics.test.ts`
- Modify: `src/App.tsx`
- Modify: `docs/METRICS.md`

**Step 1: Write failing tests**

Add tests for:

- `recordResonanceEarned`
- `recordResonanceNodeUnlocked`
- `firstResonanceTime` recorded once

**Step 2: Run failure**

Run:

```bash
bun test src/metrics.test.ts
```

Expected: fails because metric functions do not exist.

**Step 3: Implement metrics**

Update local session schema only. Do not upload.

**Step 4: Wire App events**

Call metrics when:

- first resonance is claimed
- node is unlocked

**Step 5: Run tests**

Run:

```bash
bun test src/metrics.test.ts src/App.test.tsx
```

Expected: pass.

**Step 6: Commit**

```bash
git add src/metrics.ts src/metrics.test.ts src/App.tsx docs/METRICS.md
git commit -m "feat: track local resonance events"
```

### Task 7: Final docs, verification, and release

**Files:**
- Modify: `docs/DECISION.md`
- Modify: `docs/CONTENT_ARC.md`
- Modify: `docs/SELF_PLAYTEST.md`
- Modify: `docs/RELEASE_LOG.md`
- Modify: `docs/GOVERNOR_STATE.md`
- Modify: `docs/RETROSPECTIVE.md` if commit threshold requires it

**Step 1: Update docs**

Record:

- decision anchor for implementation
- v0.3 scope
- complexity guardrails
- local-only metric boundary
- no prestige/task-system rationale

**Step 2: Run full verification**

Run:

```bash
bun test
bun run test
bun run build
./ops/governor-check.sh
git diff --check
```

Expected:

- all tests pass
- build exits 0
- governor check exits 0
- diff check exits 0

**Step 3: Commit**

```bash
git add docs/DECISION.md docs/CONTENT_ARC.md docs/SELF_PLAYTEST.md docs/RELEASE_LOG.md docs/GOVERNOR_STATE.md docs/RETROSPECTIVE.md
git commit -m "docs: record resonance release"
```

**Step 4: Push and verify Pages**

Run:

```bash
git push origin main
gh run list --branch main --limit 3
gh run watch <run-id> --exit-status
curl -I -L --max-time 20 https://jassy930.github.io/codex-game-operator-v7/
```

Expected:

- push succeeds
- Pages workflow succeeds
- public preview returns HTTP 200
