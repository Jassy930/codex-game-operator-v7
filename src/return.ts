import {
  createGameState,
  recalculateProduction,
  type GameState,
} from "./game";

const REQUIRED_FIRST_RESONANCE_MILESTONE = "first-resonance";
const RETURN_AUTO_COLLECTORS = 25;
const RETURN_TUNING_LEVEL = 15;
const RETURN_RESONANCE_REWARD = 1;

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

  return recalculateProduction({
    ...createGameState(now),
    resonance: state.resonance + RETURN_RESONANCE_REWARD,
    earnedResonanceMilestones: [...state.earnedResonanceMilestones],
    unlockedResonanceNodes: [...state.unlockedResonanceNodes],
    returnCount: state.returnCount + 1,
  });
}
