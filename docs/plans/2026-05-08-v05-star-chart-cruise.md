# v0.5 Star Chart Cruise Implementation Plan

> **Status:** Deferred auxiliary plan. v0.5 mainline is now `星尘归航 / Stardust Return`; see `docs/plans/2026-05-08-v05-stardust-return-design.md` and `docs/plans/2026-05-08-v05-stardust-return.md`.

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现 v0.5 `星图巡航` 第一版，让第二共鸣和 2/2 永久节点后的玩家获得一个新的长期路线选择，而不是只继续等待下一次普通升级。

**Architecture:** 先通过 `META_IMPROVE` 增加 v0.5 复杂度预算，再用纯函数实现巡航路线、存档字段和轻量路线效果。UI 复用现有 `共鸣矩阵` 面板，不新增大面板；阶段目标复用现有 `formatWorkshopStageNextRequirement` 读回当前巡航方向。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Bun。

---

## Design Constraints

- 路线来自已启动的两个共鸣节点，不显示与未启动节点无关的路线。
- 第一版只保存 `activeCruiseRoute`，不新增 `cruiseStage` 或路线等级。
- 第一版路线效果弱于对应共鸣节点效果：采集 +5%、回访 +5%、调校 +0.03。
- 星图巡航嵌入现有 `共鸣矩阵`，不新增页面级面板。
- 后续内容优先扩航段目标和回访事件，不用第三共鸣门槛冒充新内容。

### Task 1: 定义 v0.5 预算和决策锚点

**Files:**
- Modify: `docs/COMPLEXITY_BUDGET.md`
- Modify: `docs/HARNESS_CHANGELOG.md`
- Modify: `docs/GOVERNOR_STATE.md`
- Modify: `docs/DECISION.md`
- Modify: `docs/CONTENT_ARC.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/RELEASE_LOG.md`

**Step 1: Update v0.5 budget**

Add a `v0.5 20-Hour Content Budget` section after v0.4:

```markdown
## v0.5 20-Hour Content Budget

目标：把 v0.4 的 20 小时目标骨架扩展成真正的新玩法层，让第二共鸣后的玩家能选择长期巡航方向。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Resonance resource: allowed
- Resonance matrix panel: max 1
- Star chart cruise: allowed
- Cruise routes: max 3
- Active cruise route: max 1
- Save format versions: max 3
- Local-only cruise metric fields: max 2
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.5 仍然禁止：

- prestige
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 新普通资源
- 第三共鸣门槛
- 新共鸣节点
- 外部 analytics SDK 或上传 telemetry
```

**Step 2: Record meta-governance evidence**

In `docs/HARNESS_CHANGELOG.md`, add an entry explaining:

- Failure mode: v0.4 only provides a 20-hour target skeleton.
- Evidence: user explicitly said current game content cannot support 20 hours.
- Change: v0.5 allows one compact `星图巡航` layer.
- Constraint preservation: no prestige, task system, third resonance milestone, new node, new panel, or telemetry upload.

**Step 3: Update current decision docs**

Update `docs/DECISION.md`:

- Current biggest problem: 20-hour content depth, not v0.4 readability.
- Decision anchor: `DECISION:2026-05-08-v05-star-chart-cruise`.
- First slice: budget and plan only.

Update `docs/GOVERNOR_STATE.md`:

- Mode: `META_IMPROVE`.
- Reason: current complexity budget blocks valid new content.
- Allowed actions: budget/docs/plan only.
- Forbidden actions: code gameplay implementation in this task.

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
git commit -m "docs: define v0.5 cruise budget"
```

### Task 2: Add cruise route domain model

**Files:**
- Create: `src/cruise.ts`
- Create: `src/cruise.test.ts`
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`

**Step 1: Write failing tests**

Create `src/cruise.test.ts`:

```ts
import { createGameState } from "./game";
import {
  canChooseCruiseRoute,
  getAvailableCruiseRoutes,
  chooseCruiseRoute,
} from "./cruise";

it("unlocks cruise choices after second resonance and two nodes are active", () => {
  const state = {
    ...createGameState(0),
    earnedResonanceMilestones: ["first-resonance", "second-resonance"],
    unlockedResonanceNodes: ["stable-circuit", "return-coil"],
  };

  expect(canChooseCruiseRoute(state)).toBe(true);
  expect(getAvailableCruiseRoutes(state).map((route) => route.id)).toEqual([
    "collection-route",
    "return-route",
  ]);
});

it("stores one active cruise route", () => {
  const state = {
    ...createGameState(0),
    earnedResonanceMilestones: ["first-resonance", "second-resonance"],
    unlockedResonanceNodes: ["stable-circuit", "return-coil"],
  };

  const next = chooseCruiseRoute(state, "return-route");

  expect(next.activeCruiseRoute).toBe("return-route");
});

it("only offers routes backed by the active node pair", () => {
  expect(
    getAvailableCruiseRoutes({
      ...createGameState(0),
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
      unlockedResonanceNodes: ["stable-circuit", "tuning-engraving"],
    }).map((route) => route.id),
  ).toEqual(["collection-route", "tuning-route"]);

  expect(
    getAvailableCruiseRoutes({
      ...createGameState(0),
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
      unlockedResonanceNodes: ["return-coil", "tuning-engraving"],
    }).map((route) => route.id),
  ).toEqual(["return-route", "tuning-route"]);
});
```

Add `src/game.test.ts` coverage:

```ts
it("creates v3 state with no active cruise route", () => {
  const state = createGameState(0);

  expect(state.version).toBe(3);
  expect(state.activeCruiseRoute).toBeNull();
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/cruise.test.ts src/game.test.ts
```

Expected: fails because `src/cruise.ts` and `activeCruiseRoute` do not exist.

**Step 3: Implement minimal model**

Create `src/cruise.ts`:

```ts
import type { GameState } from "./game";

export type CruiseRouteId =
  | "collection-route"
  | "return-route"
  | "tuning-route";

export type CruiseRoute = {
  id: CruiseRouteId;
  name: string;
  description: string;
};

const CRUISE_ROUTES: Record<CruiseRouteId, CruiseRoute> = {
  "collection-route": {
    id: "collection-route",
    name: "采集航线",
    description: "自动采集长期产出 +5%",
  },
  "return-route": {
    id: "return-route",
    name: "回访航线",
    description: "离线收益 +5%",
  },
  "tuning-route": {
    id: "tuning-route",
    name: "调校航线",
    description: "调校倍率 +0.03",
  },
};

export function canChooseCruiseRoute(state: GameState): boolean {
  return (
    state.earnedResonanceMilestones.includes("first-resonance") &&
    state.earnedResonanceMilestones.includes("second-resonance") &&
    state.unlockedResonanceNodes.length >= 2 &&
    state.activeCruiseRoute === null
  );
}

export function getAvailableCruiseRoutes(state: GameState): CruiseRoute[] {
  if (!canChooseCruiseRoute(state)) {
    return [];
  }

  const routeIds = new Set<CruiseRouteId>();

  if (state.unlockedResonanceNodes.includes("stable-circuit")) {
    routeIds.add("collection-route");
  }
  if (state.unlockedResonanceNodes.includes("return-coil")) {
    routeIds.add("return-route");
  }
  if (state.unlockedResonanceNodes.includes("tuning-engraving")) {
    routeIds.add("tuning-route");
  }

  return Array.from(routeIds).map((id) => CRUISE_ROUTES[id]);
}

export function chooseCruiseRoute(
  state: GameState,
  routeId: CruiseRouteId,
): GameState {
  const isAvailable = getAvailableCruiseRoutes(state).some(
    (route) => route.id === routeId,
  );

  if (!isAvailable) {
    return state;
  }

  return {
    ...state,
    activeCruiseRoute: routeId,
  };
}
```

Modify `src/game.ts`:

- Increment save version to 3.
- Add `activeCruiseRoute: CruiseRouteId | null`.
- Hydrate missing value as `null`.
- Keep v1/v2 saves compatible.
- Treat unknown route ids as `null` during hydration.

**Step 4: Run tests**

Run:

```bash
bun test src/cruise.test.ts src/game.test.ts
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/cruise.ts src/cruise.test.ts src/game.ts src/game.test.ts
git commit -m "feat: add cruise route model"
```

### Task 3: Apply lightweight cruise route effects

**Files:**
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`
- Modify: `src/cruise.ts`
- Modify: `src/cruise.test.ts`

**Step 1: Write failing tests**

Add to `src/game.test.ts`:

```ts
it("applies collection cruise to passive production", () => {
  const state = recalculateProduction({
    ...createGameState(0),
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
    activeCruiseRoute: "collection-route",
  });

  const withoutCruise = recalculateProduction({
    ...state,
    activeCruiseRoute: null,
  });

  expect(state.dustPerSecond).toBeGreaterThan(withoutCruise.dustPerSecond);
});

it("applies return cruise to offline rewards only", () => {
  const state = {
    ...createGameState(0),
    dustPerSecond: 10,
    activeCruiseRoute: "return-route",
  };

  const hydrated = hydrateGameStateWithReport(
    serializeGameState({ ...state, lastUpdatedAt: 0 }),
    1000 * 60,
  );

  expect(hydrated.offlineDust).toBe(630);
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/game.test.ts
```

Expected: fails because cruise effects are not applied.

**Step 3: Implement minimal effects**

In `src/game.ts`:

- `collection-route`: multiply passive production by `1.05`.
- `return-route`: multiply offline reward by `1.05`.
- `tuning-route`: add `0.03` to effective tuning multiplier.

Keep effects smaller than resonance node effects.

**Step 4: Run tests**

Run:

```bash
bun test src/game.test.ts src/cruise.test.ts
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/game.ts src/game.test.ts src/cruise.ts src/cruise.test.ts
git commit -m "feat: apply cruise route effects"
```

### Task 4: Add cruise UI inside resonance matrix

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Step 1: Write failing render tests**

Add to `src/App.test.tsx`:

```ts
it("offers star chart cruise routes after two resonance nodes are active", () => {
  const html = renderAppWithSave({
    ...createGameState(Date.now()),
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
    autoCollectorEfficiencyMultiplier: 2.5,
    dustPerSecond: 13.75,
    earnedResonanceMilestones: ["first-resonance", "second-resonance"],
    unlockedResonanceNodes: ["stable-circuit", "return-coil"],
  });

  expect(html).toContain("星图巡航");
  expect(html).toContain("采集航线");
  expect(html).toContain("回访航线");
  expect(html).not.toContain("调校航线");
});

it("reads back the active cruise route", () => {
  const html = renderAppWithSave({
    ...createGameState(Date.now()),
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
    autoCollectorEfficiencyMultiplier: 2.5,
    dustPerSecond: 13.75,
    earnedResonanceMilestones: ["first-resonance", "second-resonance"],
    unlockedResonanceNodes: ["stable-circuit", "return-coil"],
    activeCruiseRoute: "return-route",
  });

  expect(html).toContain("星图巡航：回访航线已设定");
  expect(html).toContain("离线收益 +5%");
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/App.test.tsx -t "star chart cruise|active cruise"
```

Expected: fails because UI does not render cruise choices.

**Step 3: Implement UI**

In `src/App.tsx`:

- Import `getAvailableCruiseRoutes`, `chooseCruiseRoute`, route format helpers.
- Render a compact `星图巡航` block inside existing `resonance-panel`.
- Show buttons only when `canChooseCruiseRoute(state)` is true.
- Show selected route readback when `activeCruiseRoute` is not null.
- Add click handler that sets state via `chooseCruiseRoute`.
- Use this locked-state copy:

```text
星图巡航：回访航线已设定
离线收益 +5% · 回访线圈会把离线收益带回下一次扩建
```

Do not create a new top-level panel.

**Step 4: Run tests**

Run:

```bash
bun test src/App.test.tsx
```

Expected: pass.

**Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: add star chart cruise choices"
```

### Task 5: Read cruise route in stage goals and docs

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `docs/DECISION.md`
- Modify: `docs/CONTENT_ARC.md`
- Modify: `docs/SELF_PLAYTEST.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/RELEASE_LOG.md`
- Modify: `docs/GOVERNOR_STATE.md`

**Step 1: Write failing stage-goal test**

Add to `src/App.test.tsx`:

```ts
it("uses the active cruise route in the long horizon stage goal", () => {
  const html = renderAppWithSave({
    ...createGameState(Date.now()),
    dust: 80000,
    autoCollectors: 25,
    autoCollectorEfficiencyLevel: 15,
    autoCollectorEfficiencyMultiplier: 2.5,
    dustPerSecond: 13.75,
    nextAutoCollectorCost: 252512,
    nextEfficiencyUpgradeCost: 168667,
    earnedResonanceMilestones: ["first-resonance", "second-resonance"],
    unlockedResonanceNodes: ["stable-circuit", "return-coil"],
    activeCruiseRoute: "collection-route",
  });

  expect(html).toContain("星图巡航：采集航线正在放大自动采集");
});
```

**Step 2: Run tests to verify failure**

Run:

```bash
bun test src/App.test.tsx -t "active cruise route in the long horizon"
```

Expected: fails because stage goal ignores cruise route.

**Step 3: Implement goal readback**

Update `formatWorkshopStageNextRequirement` or a helper it calls:

- If `activeCruiseRoute` is set and stage is `星尘引擎室`, prefer cruise route readback.
- Reuse existing next-upgrade wait copy.
- Keep offline reward and claimable resonance overrides higher priority.

**Step 4: Update docs**

Record:

- `DECISION:2026-05-08-v05-star-chart-cruise`
- v0.5 content arc row.
- self-playtest gap: v0.4 cannot support 20 hours with content depth.
- release log entry.
- governor state completion status.
- follow-up sequence: route choice first, then航段目标, then回访事件; do not jump to route levels or third resonance.

**Step 5: Run full validation**

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

**Step 6: Commit**

```bash
git add src/App.tsx src/App.test.tsx docs/DECISION.md docs/CONTENT_ARC.md docs/SELF_PLAYTEST.md docs/ROADMAP.md docs/RELEASE_LOG.md docs/GOVERNOR_STATE.md
git commit -m "feat: read back active cruise route"
```

### Task 6: Push and remote verification

**Files:**
- Modify if needed: `docs/GOVERNOR_STATE.md`
- Modify if needed: `docs/RELEASE_LOG.md`

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
