import {
  buyAutoCollector,
  clickForDust,
  createGameState,
  hydrateGameState,
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
});
