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
const V03_MAX_UNLOCKED_RESONANCE_NODES = 1;

export function getResonanceMilestoneProgress(
  state: GameState,
): ResonanceMilestoneProgress {
  const autoCollectors = Math.max(0, Math.floor(state.autoCollectors));
  const tuning = Math.max(0, Math.floor(state.autoCollectorEfficiencyLevel));
  const alreadyClaimed = state.earnedResonanceMilestones.includes(
    FIRST_RESONANCE_MILESTONE_ID,
  );

  return {
    id: FIRST_RESONANCE_MILESTONE_ID,
    resonanceReward: FIRST_RESONANCE_REWARD,
    autoCollectors: {
      current: Math.min(autoCollectors, FIRST_RESONANCE_AUTO_COLLECTORS),
      target: FIRST_RESONANCE_AUTO_COLLECTORS,
    },
    tuning: {
      current: Math.min(tuning, FIRST_RESONANCE_TUNING),
      target: FIRST_RESONANCE_TUNING,
    },
    canClaim:
      !alreadyClaimed &&
      autoCollectors >= FIRST_RESONANCE_AUTO_COLLECTORS &&
      tuning >= FIRST_RESONANCE_TUNING,
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
    state.unlockedResonanceNodes.length >= V03_MAX_UNLOCKED_RESONANCE_NODES
  ) {
    return state;
  }

  return {
    ...state,
    resonance: state.resonance - 1,
    unlockedResonanceNodes: [...state.unlockedResonanceNodes, nodeId],
  };
}
