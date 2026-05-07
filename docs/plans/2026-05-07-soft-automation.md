# Soft Automation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add one low-complexity `调校工具` upgrade that improves auto collector efficiency while keeping star dust as the only resource.

**Architecture:** Extend the existing pure game state first, then render one additional upgrade control in the current panel. Preserve old save compatibility by defaulting missing efficiency fields during hydration.

**Tech Stack:** React, TypeScript, Vite, Vitest, Bun.

---

### Task 1: Game State And Economy

**Files:**
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`

**Step 1: Write failing tests**

Add tests for:

```ts
it("buys an efficiency upgrade and increases auto collector production", () => {
  const state = {
    ...createGameState(0),
    dust: 25,
    autoCollectors: 2,
    dustPerSecond: 0.4,
  };

  const next = buyEfficiencyUpgrade(state);

  expect(next.dust).toBe(0);
  expect(next.autoCollectorEfficiencyLevel).toBe(1);
  expect(next.dustPerSecond).toBeGreaterThan(state.dustPerSecond);
});
```

Also test that insufficient dust returns the same state.

**Step 2: Verify red**

Run: `bun test src/game.test.ts`

Expected: fails because `buyEfficiencyUpgrade` and new fields do not exist.

**Step 3: Implement minimal state**

Add fields:

```ts
autoCollectorEfficiencyLevel: number;
autoCollectorEfficiencyMultiplier: number;
nextEfficiencyUpgradeCost: number;
```

Add constants:

```ts
const EFFICIENCY_BASE_COST = 25;
const EFFICIENCY_GROWTH = 1.8;
const EFFICIENCY_BONUS_PER_LEVEL = 0.1;
```

Add `buyEfficiencyUpgrade` and recalculate `dustPerSecond` from auto collectors and multiplier.

**Step 4: Verify green**

Run: `bun test src/game.test.ts`

Expected: game tests pass.

### Task 2: Save Compatibility

**Files:**
- Modify: `src/game.ts`
- Modify: `src/game.test.ts`

**Step 1: Write failing test**

Add a hydration test for a version 1 save missing the new fields:

```ts
const state = hydrateGameState(JSON.stringify({
  version: 1,
  dust: 10,
  dustPerClick: 1,
  dustPerSecond: 0.2,
  autoCollectors: 1,
  nextAutoCollectorCost: 15,
  lastUpdatedAt: now,
}), now);

expect(state.autoCollectorEfficiencyLevel).toBe(0);
expect(state.autoCollectorEfficiencyMultiplier).toBe(1);
expect(state.nextEfficiencyUpgradeCost).toBe(25);
```

**Step 2: Verify red**

Run: `bun test src/game.test.ts`

Expected: fails until hydration defaults are added.

**Step 3: Implement hydration defaults**

Use `numberOr` defaults for new fields and recalculate `dustPerSecond` consistently.

**Step 4: Verify green**

Run: `bun test src/game.test.ts`

Expected: game tests pass.

### Task 3: App UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`

**Step 1: Write failing UI tests**

Add render assertions for:

```ts
expect(html).toContain("调校工具");
expect(html).toContain("自动采集效率");
expect(html).toContain("需要 25 星尘");
```

**Step 2: Verify red**

Run: `bun test src/App.test.tsx`

Expected: fails because the UI does not render the new upgrade.

**Step 3: Implement minimal UI**

Import `buyEfficiencyUpgrade`. Add one button in the existing action area or immediately below it. Keep styling consistent with the current upgrade button and avoid adding a new panel.

**Step 4: Verify green**

Run: `bun test src/App.test.tsx`

Expected: UI tests pass.

### Task 4: Docs And Full Verification

**Files:**
- Modify: `docs/DECISION.md`
- Modify: `docs/SELF_PLAYTEST.md`
- Modify: `docs/RELEASE_LOG.md`
- Modify: `docs/GOVERNOR_STATE.md`

**Step 1: Update docs**

Record that the implemented version uses one new upgrade type, keeps one resource, and does not add panels or feedback channels.

**Step 2: Full verification**

Run:

```bash
bun test
bun run test
bun run build
./ops/governor-check.sh
```

Expected:

- `bun test`: all tests pass.
- `bun run test`: all Vitest tests pass.
- `bun run build`: TypeScript and Vite build pass.
- `./ops/governor-check.sh`: exits 0.

**Step 3: Commit**

Commit without co-author metadata:

```bash
git add src/game.ts src/game.test.ts src/App.tsx src/App.test.tsx src/styles.css docs/DECISION.md docs/SELF_PLAYTEST.md docs/RELEASE_LOG.md docs/GOVERNOR_STATE.md
git commit -m "feat: add soft automation upgrade"
```
