import {
  buyAutoCollector,
  buyEfficiencyUpgrade,
  clickForDust,
  createGameState,
  hydrateGameState,
  hydrateGameStateWithReport,
  recalculateProduction,
  serializeGameState,
  tickGame,
} from "./game";

describe("core idle loop", () => {
  it("starts with one resource and a visible first upgrade goal", () => {
    const state = createGameState(1_000);

    expect(state.dust).toBe(0);
    expect(state.dustPerClick).toBe(1);
    expect(state.dustPerSecond).toBe(0);
    expect(state.autoCollectors).toBe(0);
    expect(state.nextAutoCollectorCost).toBe(10);
    expect(state.autoCollectorEfficiencyLevel).toBe(0);
    expect(state.autoCollectorEfficiencyMultiplier).toBe(1);
    expect(state.nextEfficiencyUpgradeCost).toBe(25);
    expect(state.resonance).toBe(0);
    expect(state.earnedResonanceMilestones).toEqual([]);
    expect(state.unlockedResonanceNodes).toEqual([]);
    expect(state.lastUpdatedAt).toBe(1_000);
  });

  it("adds dust from the primary player action", () => {
    const state = clickForDust(createGameState(1_000));

    expect(state.dust).toBe(1);
  });

  it("spends dust on an auto collector and increases passive production", () => {
    const state = {
      ...createGameState(1_000),
      dust: 12,
    };

    const next = buyAutoCollector(state);

    expect(next.dust).toBe(2);
    expect(next.autoCollectors).toBe(1);
    expect(next.dustPerSecond).toBe(0.2);
    expect(next.nextAutoCollectorCost).toBe(15);
  });

  it("does not buy an auto collector when dust is insufficient", () => {
    const state = {
      ...createGameState(1_000),
      dust: 9,
    };

    expect(buyAutoCollector(state)).toEqual(state);
  });

  it("buys an efficiency upgrade and increases auto collector production", () => {
    const state = {
      ...createGameState(1_000),
      dust: 25,
      autoCollectors: 2,
      dustPerSecond: 0.4,
    };

    const next = buyEfficiencyUpgrade(state);

    expect(next.dust).toBe(0);
    expect(next.autoCollectorEfficiencyLevel).toBe(1);
    expect(next.autoCollectorEfficiencyMultiplier).toBe(1.1);
    expect(next.dustPerSecond).toBe(0.44);
    expect(next.nextEfficiencyUpgradeCost).toBe(45);
  });

  it("applies stable circuit resonance to passive production", () => {
    const state = {
      ...createGameState(1_000),
      autoCollectors: 10,
      autoCollectorEfficiencyLevel: 10,
      autoCollectorEfficiencyMultiplier: 2,
      unlockedResonanceNodes: ["stable-circuit"],
    };

    expect(recalculateProduction(state).dustPerSecond).toBe(4.4);
  });

  it("does not buy an efficiency upgrade when dust is insufficient", () => {
    const state = {
      ...createGameState(1_000),
      dust: 24,
    };

    expect(buyEfficiencyUpgrade(state)).toEqual(state);
  });

  it("does not buy an efficiency upgrade before any auto collector exists", () => {
    const state = {
      ...createGameState(1_000),
      dust: 25,
    };

    expect(buyEfficiencyUpgrade(state)).toEqual(state);
  });

  it("adds passive dust using elapsed time", () => {
    const state = {
      ...createGameState(1_000),
      autoCollectors: 2,
      dustPerSecond: 0.4,
    };

    const next = tickGame(state, 6_000);

    expect(next.dust).toBe(2);
    expect(next.lastUpdatedAt).toBe(6_000);
  });

  it("loads versioned saves and grants capped offline progress", () => {
    const saved = serializeGameState({
      ...createGameState(1_000),
      dust: 5,
      autoCollectors: 1,
      dustPerSecond: 0.2,
      nextAutoCollectorCost: 15,
    });

    const loaded = hydrateGameState(saved, 31_000);

    expect(loaded.dust).toBe(11);
    expect(loaded.autoCollectors).toBe(1);
    expect(loaded.lastUpdatedAt).toBe(31_000);
  });

  it("hydrates old saves with default efficiency upgrade fields", () => {
    const now = 31_000;
    const saved = JSON.stringify({
      version: 1,
      dust: 10,
      dustPerClick: 1,
      dustPerSecond: 0.2,
      autoCollectors: 1,
      nextAutoCollectorCost: 15,
      lastUpdatedAt: now,
    });

    const loaded = hydrateGameState(saved, now);

    expect(loaded.version).toBe(2);
    expect(loaded.autoCollectorEfficiencyLevel).toBe(0);
    expect(loaded.autoCollectorEfficiencyMultiplier).toBe(1);
    expect(loaded.nextEfficiencyUpgradeCost).toBe(25);
    expect(loaded.resonance).toBe(0);
    expect(loaded.earnedResonanceMilestones).toEqual([]);
    expect(loaded.unlockedResonanceNodes).toEqual([]);
    expect(loaded.dustPerSecond).toBe(0.2);
  });

  it("reports how much dust was earned offline", () => {
    const saved = serializeGameState({
      ...createGameState(1_000),
      dust: 5,
      autoCollectors: 1,
      dustPerSecond: 0.2,
      nextAutoCollectorCost: 15,
    });

    const loaded = hydrateGameStateWithReport(saved, 31_000);

    expect(loaded.state.dust).toBe(11);
    expect(loaded.offlineDust).toBe(6);
    expect(loaded.saveLoaded).toBe(true);
  });

  it("does not report save_loaded when no valid save exists", () => {
    expect(hydrateGameStateWithReport(null, 31_000).saveLoaded).toBe(false);
    expect(hydrateGameStateWithReport("not json", 31_000).saveLoaded).toBe(false);
  });
});
