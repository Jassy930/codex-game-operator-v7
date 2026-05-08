import { createGameState } from "./game";
import { canStardustReturn, performStardustReturn } from "./return";

describe("stardust return", () => {
  it("unlocks at the long horizon threshold after first resonance", () => {
    const state = {
      ...createGameState(0),
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      earnedResonanceMilestones: ["first-resonance"],
    };

    expect(canStardustReturn(state)).toBe(true);
  });

  it("does not unlock before first resonance is claimed", () => {
    const state = {
      ...createGameState(0),
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      earnedResonanceMilestones: [],
    };

    expect(canStardustReturn(state)).toBe(false);
  });

  it("does not unlock before the long horizon threshold", () => {
    const state = {
      ...createGameState(0),
      autoCollectors: 24,
      autoCollectorEfficiencyLevel: 15,
      earnedResonanceMilestones: ["first-resonance"],
    };

    expect(canStardustReturn(state)).toBe(false);
  });

  it("returns the workshop for one resonance and preserves long-term state", () => {
    const state = {
      ...createGameState(0),
      dust: 100000,
      autoCollectors: 25,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      nextEfficiencyUpgradeCost: 168667,
      resonance: 0,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
      returnCount: 2,
    };

    const next = performStardustReturn(state, 1000);

    expect(next.dust).toBe(0);
    expect(next.autoCollectors).toBe(0);
    expect(next.dustPerSecond).toBe(0);
    expect(next.nextAutoCollectorCost).toBe(10);
    expect(next.autoCollectorEfficiencyLevel).toBe(0);
    expect(next.autoCollectorEfficiencyMultiplier).toBe(1);
    expect(next.nextEfficiencyUpgradeCost).toBe(25);
    expect(next.resonance).toBe(1);
    expect(next.earnedResonanceMilestones).toEqual(["first-resonance"]);
    expect(next.unlockedResonanceNodes).toEqual(["stable-circuit"]);
    expect(next.returnCount).toBe(3);
    expect(next.lastUpdatedAt).toBe(1000);
  });

  it("does not return the workshop before the threshold", () => {
    const state = {
      ...createGameState(0),
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 14,
      earnedResonanceMilestones: ["first-resonance"],
    };

    expect(performStardustReturn(state, 1000)).toEqual(state);
  });
});
