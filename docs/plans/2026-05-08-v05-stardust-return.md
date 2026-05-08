# v0.5 Stardust Return Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现 v0.5 `星尘归航` 第一版，把 `共鸣` 作为 prestige 奖励资源，让 20 小时目标之后形成可重复的长线循环。

**Architecture:** 先通过 `META_IMPROVE` 更新 v0.5 复杂度预算和决策锚点，再在 `src/game.ts` / 新增 `src/return.ts` 中实现归航条件、奖励和本轮重置。UI 复用现有 `共鸣矩阵` 和事件反馈区，不新增页面级面板；测试按 TDD 红绿循环推进。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Bun。

---

## Design Constraints

- `共鸣` 是归航奖励资源，不新增第三资源。
- 第一版只新增 `returnCount` 存档字段。
- 第一版归航奖励固定为 `1 共鸣`。
- 归航重置本轮星尘、自动采集器和调校工具，保留共鸣和永久节点。
- 第二共鸣门槛语义改为归航条件，不新增第三共鸣门槛。
- 星图巡航暂缓，后续可作为归航后的本轮策略辅助。

### Task 1: 定义 v0.5 prestige 预算和决策锚点

**Files:**
- Modify: `docs/COMPLEXITY_BUDGET.md`
- Modify: `docs/HARNESS_CHANGELOG.md`
- Modify: `docs/GOVERNOR_STATE.md`
- Modify: `docs/DECISION.md`
- Modify: `docs/CONTENT_ARC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/RELEASE_LOG.md`

**Step 1: Update v0.5 budget**

Add a `v0.5 Stardust Return Budget` section after v0.4:

```markdown
## v0.5 Stardust Return Budget

目标：把 v0.4 的 20 小时目标骨架升级为可重复的 prestige 长线循环，让共鸣成为归航奖励资源。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Prestige loop: allowed as `星尘归航`
- Prestige reward resource: `共鸣`
- Resonance resource: allowed
- Resonance matrix panel: max 1
- Return count field: allowed
- Save format versions: max 3
- Local-only return metric fields: max 2
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.5 仍然禁止：

- 第三普通资源
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 第三共鸣门槛
- 新共鸣节点
- 节点等级树
- 外部 analytics SDK 或上传 telemetry
```

**Step 2: Record meta-governance evidence**

In `docs/HARNESS_CHANGELOG.md`, add:

- Failure mode: v0.4 readback and second resonance do not support 20 hours of actual play.
- Evidence: user explicitly wants prestige as main long-term mechanism.
- Change: v0.5 allows one bounded prestige loop.
- Constraint preservation: no third resource, task system, map, production lines, new panels, new nodes, or telemetry.

**Step 3: Update current decision docs**

Update `docs/DECISION.md`:

- Current biggest problem: lack of long-term repeatable loop.
- Decision anchor: `DECISION:2026-05-08-v05-stardust-return`.
- Current decision: use `共鸣` as prestige reward resource.

Update `docs/GOVERNOR_STATE.md`:

- Mode: `META_IMPROVE`.
- Reason: current complexity budget forbids prestige but user direction makes a bounded prestige loop valid.
- Allowed actions: budget/docs only in this task.
- Forbidden actions: gameplay implementation before budget update.

**Step 4: Run validation**

Run:

```bash
./ops/governor-check.sh
git diff --check
```

Expected: both exit 0.

**Step 5: Commit**

```bash
git add docs/COMPLEXITY_BUDGET.md docs/HARNESS_CHANGELOG.md docs/GOVERNOR_STATE.md docs/DECISION.md docs/CONTENT_ARC.md docs/ROADMAP.md docs/RELEASE_LOG.md
git commit -m "docs: define v0.5 stardust return budget"
```

### Task 2: Add return state and save migration

**Files:**
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`

**Step 1: Write failing tests**

Add to `src/game.test.ts`:

```ts
it("creates v3 state with return count", () => {
  const state = createGameState(0);

  expect(state.version).toBe(3);
  expect(state.returnCount).toBe(0);
});

it("hydrates older saves with return defaults", () => {
  const saved = JSON.stringify({
    version: 2,
    dust: 10,
    dustPerClick: 1,
    dustPerSecond: 0.2,
    autoCollectors: 1,
    nextAutoCollectorCost: 15,
    autoCollectorEfficiencyLevel: 0,
    autoCollectorEfficiencyMultiplier: 1,
    nextEfficiencyUpgradeCost: 25,
    resonance: 0,
    earnedResonanceMilestones: [],
    unlockedResonanceNodes: [],
    lastUpdatedAt: 0,
  });

  const loaded = hydrateGameState(saved, 0);

  expect(loaded.version).toBe(3);
  expect(loaded.returnCount).toBe(0);
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/game.test.ts -t "return"
```

Expected: fails because `returnCount` does not exist and version is still 2.

**Step 3: Implement minimal save migration**

In `src/game.ts`:

- Increment save version to 3.
- Add `returnCount: number` to `GameState`.
- Initialize `returnCount: 0`.
- Hydrate missing or invalid return count to `0`.

**Step 4: Run tests**

Run:

```bash
bun test src/game.test.ts -t "return"
bun test src/game.test.ts
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/game.ts src/game.test.ts
git commit -m "feat: add stardust return save state"
```

### Task 3: Add pure stardust return logic

**Files:**
- Create: `src/return.ts`
- Create: `src/return.test.ts`
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`

**Step 1: Write failing tests**

Create `src/return.test.ts`:

```ts
import { createGameState } from "./game";
import { canStardustReturn, performStardustReturn } from "./return";

it("unlocks stardust return at the long horizon threshold", () => {
  const state = {
    ...createGameState(0),
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
  };

  expect(canStardustReturn(state)).toBe(true);
});

it("does not unlock stardust return before the threshold", () => {
  const state = {
    ...createGameState(0),
    autoCollectors: 24,
    autoCollectorEfficiencyLevel: 15,
  };

  expect(canStardustReturn(state)).toBe(false);
});

it("returns the workshop for one resonance and preserves permanent nodes", () => {
  const state = {
    ...createGameState(0),
    dust: 100000,
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
    resonance: 0,
    unlockedResonanceNodes: ["stable-circuit"],
  };

  const next = performStardustReturn(state, 1000);

  expect(next.resonance).toBe(1);
  expect(next.returnCount).toBe(1);
  expect(next.unlockedResonanceNodes).toEqual(["stable-circuit"]);
  expect(next.dust).toBe(0);
  expect(next.autoCollectors).toBe(0);
  expect(next.autoCollectorEfficiencyLevel).toBe(0);
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/return.test.ts
```

Expected: fails because `src/return.ts` does not exist.

**Step 3: Implement return module**

Create `src/return.ts`:

```ts
import { createGameState, recalculateProduction, type GameState } from "./game";

const RETURN_AUTO_COLLECTOR_REQUIREMENT = 25;
const RETURN_TUNING_REQUIREMENT = 15;
const RETURN_RESONANCE_REWARD = 1;

export function canStardustReturn(state: GameState): boolean {
  return (
    state.autoCollectors >= RETURN_AUTO_COLLECTOR_REQUIREMENT &&
    state.autoCollectorEfficiencyLevel >= RETURN_TUNING_REQUIREMENT
  );
}

export function performStardustReturn(
  state: GameState,
  now = Date.now(),
): GameState {
  if (!canStardustReturn(state)) {
    return state;
  }

  return recalculateProduction({
    ...createGameState(now),
    resonance: state.resonance + RETURN_RESONANCE_REWARD,
    unlockedResonanceNodes: state.unlockedResonanceNodes,
    returnCount: state.returnCount + 1,
  });
}
```

**Step 4: Run tests**

Run:

```bash
bun test src/return.test.ts src/game.test.ts
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/return.ts src/return.test.ts src/game.ts src/game.test.ts
git commit -m "feat: add stardust return logic"
```

### Task 4: Replace second resonance claim with stardust return UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Step 1: Write failing render tests**

Add to `src/App.test.tsx`:

```ts
it("offers stardust return at the long horizon threshold", () => {
  const html = renderAppWithSave({
    ...createGameState(Date.now()),
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
    autoCollectorEfficiencyMultiplier: 2.5,
    dustPerSecond: 13.75,
    earnedResonanceMilestones: ["first-resonance"],
    unlockedResonanceNodes: ["stable-circuit"],
  });

  expect(html).toContain("星尘归航 +1 共鸣");
  expect(html).toContain("重启本轮工坊，保留共鸣和永久节点");
  expect(html).not.toContain("领取第 2 点共鸣");
});

it("shows the stardust return goal before returning", () => {
  const html = renderAppWithSave({
    ...createGameState(Date.now()),
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
    autoCollectorEfficiencyMultiplier: 2.5,
    dustPerSecond: 13.75,
    earnedResonanceMilestones: ["first-resonance"],
    unlockedResonanceNodes: ["stable-circuit"],
  });

  expect(html).toContain("归航目标：星尘归航，获得 1 共鸣并开启下一轮");
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/App.test.tsx -t "stardust return"
```

Expected: fails because return UI does not exist.

**Step 3: Implement UI**

In `src/App.tsx`:

- Import `canStardustReturn` and `performStardustReturn`.
- Show `星尘归航 +1 共鸣` button in the resonance panel when return is available.
- Hide second-resonance claim behavior in this state.
- On click, call `performStardustReturn`.
- Show purchase/event feedback:

```text
星尘归航完成：获得 1 共鸣，工坊回到新一轮火花工作台
```

**Step 4: Run tests**

Run:

```bash
bun test src/App.test.tsx
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: add stardust return UI"
```

### Task 5: Update docs and full validation

**Files:**
- Modify: `docs/DECISION.md`
- Modify: `docs/CONTENT_ARC.md`
- Modify: `docs/SELF_PLAYTEST.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/RELEASE_LOG.md`
- Modify: `docs/GOVERNOR_STATE.md`

**Step 1: Update docs**

Record:

- `DECISION:2026-05-08-v05-stardust-return`
- v0.5 content arc row.
- self-playtest gap: v0.4 cannot support 20 hours without repeatable long-loop.
- release log entry.
- governor state completion.
- note that `星图巡航` is deferred auxiliary content.

**Step 2: Run full validation**

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
- build succeeds
- governor check exits 0
- diff check exits 0

**Step 3: Commit**

```bash
git add docs/DECISION.md docs/CONTENT_ARC.md docs/SELF_PLAYTEST.md docs/ROADMAP.md docs/RELEASE_LOG.md docs/GOVERNOR_STATE.md
git commit -m "docs: record stardust return release"
```

### Task 6: Push and remote verification

**Step 1: Push**

Run:

```bash
git push origin main
```

Expected: push succeeds.

**Step 2: Check GitHub Actions and Pages**

Run:

```bash
gh run list --repo Jassy930/codex-game-operator-v7 --limit 5
curl -I --max-time 20 https://jassy930.github.io/codex-game-operator-v7/
```

Expected:

- latest `Deploy Pages` run is `completed/success`
- public preview returns HTTP 200

If network fails, record the exact failure in `docs/GOVERNOR_STATE.md` and `docs/RELEASE_LOG.md`.

**Step 3: Final status**

Run:

```bash
git status --short --branch
```

Expected: `main...origin/main` with no modified files.
