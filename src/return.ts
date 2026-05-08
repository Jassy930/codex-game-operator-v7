import {
  createGameState,
  recalculateProduction,
  type GameState,
} from "./game";
import { MAX_UNLOCKED_RESONANCE_NODES } from "./resonance";

const REQUIRED_FIRST_RESONANCE_MILESTONE = "first-resonance";
const RETURN_AUTO_COLLECTORS = 25;
const RETURN_TUNING_LEVEL = 15;
const RETURN_RESONANCE_REWARD = 1;
const AFTERGLOW_DUST_PER_PARKED_RESONANCE = 10;
const MAX_AFTERGLOW_DUST = 50;

export function canStardustReturn(state: GameState): boolean {
  return (
    state.earnedResonanceMilestones.includes(REQUIRED_FIRST_RESONANCE_MILESTONE) &&
    state.autoCollectors >= RETURN_AUTO_COLLECTORS &&
    state.autoCollectorEfficiencyLevel >= RETURN_TUNING_LEVEL
  );
}

export function performStardustReturn(
  state: GameState,
  now = Date.now(),
): GameState {
  if (!canStardustReturn(state)) {
    return state;
  }

  const nextResonance = state.resonance + RETURN_RESONANCE_REWARD;

  return recalculateProduction({
    ...createGameState(now),
    dust: calculateReturnAfterglowDust({
      ...state,
      resonance: nextResonance,
    }),
    resonance: nextResonance,
    earnedResonanceMilestones: [...state.earnedResonanceMilestones],
    unlockedResonanceNodes: [...state.unlockedResonanceNodes],
    returnCount: state.returnCount + 1,
  });
}

export function calculateReturnAfterglowDust(state: GameState): number {
  if (
    state.resonance <= 0 ||
    state.unlockedResonanceNodes.length < MAX_UNLOCKED_RESONANCE_NODES
  ) {
    return 0;
  }

  return Math.min(
    MAX_AFTERGLOW_DUST,
    state.resonance * AFTERGLOW_DUST_PER_PARKED_RESONANCE,
  );
}
