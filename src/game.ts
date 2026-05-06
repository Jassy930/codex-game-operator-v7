export type GameState = {
  version: 1;
  dust: number;
  dustPerClick: number;
  dustPerSecond: number;
  autoCollectors: number;
  nextAutoCollectorCost: number;
  lastUpdatedAt: number;
};

const SAVE_VERSION = 1;
const AUTO_COLLECTOR_BASE_COST = 10;
const AUTO_COLLECTOR_GROWTH = 1.5;
const DUST_PER_AUTO_COLLECTOR = 0.2;
const MAX_OFFLINE_MS = 1000 * 60 * 60 * 8;

export function createGameState(now = Date.now()): GameState {
  return {
    version: SAVE_VERSION,
    dust: 0,
    dustPerClick: 1,
    dustPerSecond: 0,
    autoCollectors: 0,
    nextAutoCollectorCost: AUTO_COLLECTOR_BASE_COST,
    lastUpdatedAt: now,
  };
}

export function clickForDust(state: GameState): GameState {
  return {
    ...state,
    dust: state.dust + state.dustPerClick,
  };
}

export function buyAutoCollector(state: GameState): GameState {
  if (state.dust < state.nextAutoCollectorCost) {
    return state;
  }

  const autoCollectors = state.autoCollectors + 1;

  return {
    ...state,
    dust: state.dust - state.nextAutoCollectorCost,
    autoCollectors,
    dustPerSecond: round(autoCollectors * DUST_PER_AUTO_COLLECTOR),
    nextAutoCollectorCost: Math.ceil(
      AUTO_COLLECTOR_BASE_COST * AUTO_COLLECTOR_GROWTH ** autoCollectors,
    ),
  };
}

export function tickGame(state: GameState, now = Date.now()): GameState {
  const elapsedMs = Math.max(0, Math.min(now - state.lastUpdatedAt, MAX_OFFLINE_MS));
  const gainedDust = (elapsedMs / 1000) * state.dustPerSecond;

  return {
    ...state,
    dust: round(state.dust + gainedDust),
    lastUpdatedAt: now,
  };
}

export function serializeGameState(state: GameState): string {
  return JSON.stringify(state);
}

export function hydrateGameState(saved: string | null, now = Date.now()): GameState {
  if (!saved) {
    return createGameState(now);
  }

  try {
    const parsed = JSON.parse(saved) as Partial<GameState>;
    if (parsed.version !== SAVE_VERSION) {
      return createGameState(now);
    }

    return tickGame(
      {
        version: SAVE_VERSION,
        dust: numberOr(parsed.dust, 0),
        dustPerClick: numberOr(parsed.dustPerClick, 1),
        dustPerSecond: numberOr(parsed.dustPerSecond, 0),
        autoCollectors: numberOr(parsed.autoCollectors, 0),
        nextAutoCollectorCost: numberOr(
          parsed.nextAutoCollectorCost,
          AUTO_COLLECTOR_BASE_COST,
        ),
        lastUpdatedAt: numberOr(parsed.lastUpdatedAt, now),
      },
      now,
    );
  } catch {
    return createGameState(now);
  }
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
