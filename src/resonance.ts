import type { GameState } from "./game";

export type ResonanceNodeId = "stable-circuit" | "return-coil" | "tuning-engraving";

export type ResonanceMilestoneProgress = {
  id: string;
  resonanceReward: number;
  autoCollectors: {
    current: number;
    target: number;
  };
  tuning: {
    current: number;
    target: number;
  };
  canClaim: boolean;
};

const FIRST_RESONANCE_MILESTONE_ID = "first-resonance";
const FIRST_RESONANCE_AUTO_COLLECTORS = 20;
const FIRST_RESONANCE_TUNING = 12;
const FIRST_RESONANCE_REWARD = 1;
export const MAX_UNLOCKED_RESONANCE_NODES = 2;

const RESONANCE_MILESTONES = [
  {
    id: FIRST_RESONANCE_MILESTONE_ID,
    autoCollectors: FIRST_RESONANCE_AUTO_COLLECTORS,
    tuning: FIRST_RESONANCE_TUNING,
    resonanceReward: FIRST_RESONANCE_REWARD,
  },
  {
    id: "second-resonance",
    autoCollectors: 25,
    tuning: 15,
    resonanceReward: 1,
  },
] as const;

export function getResonanceMilestoneProgress(
  state: GameState,
): ResonanceMilestoneProgress {
  const autoCollectors = Math.max(0, Math.floor(state.autoCollectors));
  const tuning = Math.max(0, Math.floor(state.autoCollectorEfficiencyLevel));
  const milestone = getCurrentResonanceMilestone(state.earnedResonanceMilestones);
  const alreadyClaimed = state.earnedResonanceMilestones.includes(milestone.id);

  return {
    id: milestone.id,
    resonanceReward: milestone.resonanceReward,
    autoCollectors: {
      current: Math.min(autoCollectors, milestone.autoCollectors),
      target: milestone.autoCollectors,
    },
    tuning: {
      current: Math.min(tuning, milestone.tuning),
      target: milestone.tuning,
    },
    canClaim:
      !alreadyClaimed &&
      autoCollectors >= milestone.autoCollectors &&
      tuning >= milestone.tuning,
  };
}

export function claimResonanceMilestones(state: GameState): GameState {
  const progress = getResonanceMilestoneProgress(state);

  if (!progress.canClaim) {
    return state;
  }

  return {
    ...state,
    resonance: state.resonance + progress.resonanceReward,
    earnedResonanceMilestones: [
      ...state.earnedResonanceMilestones,
      progress.id,
    ],
  };
}

export function unlockResonanceNode(
  state: GameState,
  nodeId: ResonanceNodeId,
): GameState {
  if (
    state.resonance < 1 ||
    state.unlockedResonanceNodes.includes(nodeId) ||
    state.unlockedResonanceNodes.length >= MAX_UNLOCKED_RESONANCE_NODES
  ) {
    return state;
  }

  return {
    ...state,
    resonance: state.resonance - 1,
    unlockedResonanceNodes: [...state.unlockedResonanceNodes, nodeId],
  };
}

function getCurrentResonanceMilestone(earnedResonanceMilestones: string[]) {
  return (
    RESONANCE_MILESTONES.find(
      (milestone) => !earnedResonanceMilestones.includes(milestone.id),
    ) ?? RESONANCE_MILESTONES[RESONANCE_MILESTONES.length - 1]
  );
}
