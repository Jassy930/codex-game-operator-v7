import { createGameState } from "./game";
import {
  claimResonanceMilestones,
  getClaimableResonanceMilestones,
  getResonanceMilestoneProgress,
  unlockResonanceNode,
} from "./resonance";

describe("resonance milestones", () => {
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

  it("does not offer second resonance once stardust return owns the long loop", () => {
    const state = {
      ...createGameState(0),
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      earnedResonanceMilestones: ["first-resonance"],
    };

    expect(getClaimableResonanceMilestones(state)).not.toContainEqual(
      expect.objectContaining({ id: "second-resonance" }),
    );

    const claimed = claimResonanceMilestones(state);

    expect(claimed.resonance).toBe(0);
    expect(claimed.earnedResonanceMilestones).toEqual(["first-resonance"]);
  });

  it("preserves historical second resonance saves without offering a new claim", () => {
    const state = {
      ...createGameState(0),
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      resonance: 1,
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
    };

    expect(getResonanceMilestoneProgress(state)).toEqual({
      id: "first-resonance",
      resonanceReward: 1,
      autoCollectors: { current: 20, target: 20 },
      tuning: { current: 12, target: 12 },
      canClaim: false,
    });
    expect(claimResonanceMilestones(state)).toEqual(state);
  });
});

describe("resonance nodes", () => {
  it("unlocks one resonance node by spending resonance", () => {
    const state = { ...createGameState(0), resonance: 1 };
    const next = unlockResonanceNode(state, "stable-circuit");

    expect(next.resonance).toBe(0);
    expect(next.unlockedResonanceNodes).toEqual(["stable-circuit"]);
  });

  it("unlocks a second resonance node after the second milestone in v0.4", () => {
    const state = {
      ...createGameState(0),
      resonance: 1,
      unlockedResonanceNodes: ["stable-circuit"],
    };

    const next = unlockResonanceNode(state, "return-coil");

    expect(next.resonance).toBe(0);
    expect(next.unlockedResonanceNodes).toEqual([
      "stable-circuit",
      "return-coil",
    ]);
  });

  it("keeps the v0.4 resonance matrix capped at two nodes", () => {
    const state = {
      ...createGameState(0),
      resonance: 1,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
    };

    expect(unlockResonanceNode(state, "tuning-engraving")).toEqual(state);
  });
});
