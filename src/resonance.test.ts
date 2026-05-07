import { createGameState } from "./game";
import {
  claimResonanceMilestones,
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
});

describe("resonance nodes", () => {
  it("unlocks one resonance node by spending resonance", () => {
    const state = { ...createGameState(0), resonance: 1 };
    const next = unlockResonanceNode(state, "stable-circuit");

    expect(next.resonance).toBe(0);
    expect(next.unlockedResonanceNodes).toEqual(["stable-circuit"]);
  });

  it("does not unlock a second resonance node in v0.3", () => {
    const state = {
      ...createGameState(0),
      resonance: 1,
      unlockedResonanceNodes: ["stable-circuit"],
    };

    expect(unlockResonanceNode(state, "return-coil")).toEqual(state);
  });
});
