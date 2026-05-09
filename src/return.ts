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
const COMPLETED_ROUTE_RESONANCE_REWARD = 2;
const AFTERGLOW_DUST_PER_PARKED_RESONANCE = 10;
const MAX_AFTERGLOW_DUST = 50;

export type StardustReturnRequirement = {
  autoCollectors: number;
  tuning: number;
  completedRouteMilestones: number;
};

export function canStardustReturn(state: GameState): boolean {
  const requirement = getStardustReturnRequirement(state);

  return (
    state.earnedResonanceMilestones.includes(REQUIRED_FIRST_RESONANCE_MILESTONE) &&
    state.autoCollectors >= requirement.autoCollectors &&
    state.autoCollectorEfficiencyLevel >= requirement.tuning
  );
}

export function getStardustReturnRequirement(
  state: GameState,
): StardustReturnRequirement {
  const completedRouteMilestones = getCompletedReturnRouteMilestones(state);
  const routeReduction = Math.max(0, completedRouteMilestones - 1);

  return {
    autoCollectors: RETURN_AUTO_COLLECTORS - routeReduction,
    tuning: RETURN_TUNING_LEVEL - Math.min(1, routeReduction),
    completedRouteMilestones,
  };
}

export function getStardustReturnReward(state: GameState): number {
  if (getCompletedReturnRouteMilestones(state) >= 3) {
    return COMPLETED_ROUTE_RESONANCE_REWARD;
  }

  return RETURN_RESONANCE_REWARD;
}

export function performStardustReturn(
  state: GameState,
  now = Date.now(),
): GameState {
  if (!canStardustReturn(state)) {
    return state;
  }

  const nextResonance = state.resonance + getStardustReturnReward(state);

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

function getCompletedReturnRouteMilestones(state: GameState): number {
  if (
    state.returnCount <= 0 ||
    state.unlockedResonanceNodes.length < MAX_UNLOCKED_RESONANCE_NODES
  ) {
    return 0;
  }

  const parkedResonance = Math.max(0, state.resonance);

  if (state.returnCount >= 6 && parkedResonance >= 4) {
    return 3;
  }

  if (state.returnCount >= 3 && parkedResonance >= 2) {
    return 2;
  }

  return 1;
}
