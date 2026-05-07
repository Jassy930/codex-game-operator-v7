export type GameState = {
  version: 2;
  dust: number;
  dustPerClick: number;
  dustPerSecond: number;
  autoCollectors: number;
  nextAutoCollectorCost: number;
  autoCollectorEfficiencyLevel: number;
  autoCollectorEfficiencyMultiplier: number;
  nextEfficiencyUpgradeCost: number;
  resonance: number;
  earnedResonanceMilestones: string[];
  unlockedResonanceNodes: string[];
  lastUpdatedAt: number;
};

export type HydratedGameState = {
  state: GameState;
  offlineDust: number;
  saveLoaded: boolean;
};

const SAVE_VERSION = 2;
const LEGACY_SAVE_VERSION = 1;
const AUTO_COLLECTOR_BASE_COST = 10;
const AUTO_COLLECTOR_GROWTH = 1.5;
const DUST_PER_AUTO_COLLECTOR = 0.2;
const EFFICIENCY_BASE_COST = 25;
const EFFICIENCY_GROWTH = 1.8;
const EFFICIENCY_BONUS_PER_LEVEL = 0.1;
const MAX_OFFLINE_MS = 1000 * 60 * 60 * 8;

export function createGameState(now = Date.now()): GameState {
  return {
    version: SAVE_VERSION,
    dust: 0,
    dustPerClick: 1,
    dustPerSecond: 0,
    autoCollectors: 0,
    nextAutoCollectorCost: AUTO_COLLECTOR_BASE_COST,
    autoCollectorEfficiencyLevel: 0,
    autoCollectorEfficiencyMultiplier: 1,
    nextEfficiencyUpgradeCost: EFFICIENCY_BASE_COST,
    resonance: 0,
    earnedResonanceMilestones: [],
    unlockedResonanceNodes: [],
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

  return recalculateProduction({
    ...state,
    dust: state.dust - state.nextAutoCollectorCost,
    autoCollectors,
    nextAutoCollectorCost: Math.ceil(
      AUTO_COLLECTOR_BASE_COST * AUTO_COLLECTOR_GROWTH ** autoCollectors,
    ),
  });
}

export function buyEfficiencyUpgrade(state: GameState): GameState {
  if (state.autoCollectors === 0 || state.dust < state.nextEfficiencyUpgradeCost) {
    return state;
  }

  const autoCollectorEfficiencyLevel = state.autoCollectorEfficiencyLevel + 1;
  const autoCollectorEfficiencyMultiplier = calculateEfficiencyMultiplier(
    autoCollectorEfficiencyLevel,
  );

  return recalculateProduction({
    ...state,
    dust: state.dust - state.nextEfficiencyUpgradeCost,
    autoCollectorEfficiencyLevel,
    autoCollectorEfficiencyMultiplier,
    nextEfficiencyUpgradeCost: Math.ceil(
      EFFICIENCY_BASE_COST * EFFICIENCY_GROWTH ** autoCollectorEfficiencyLevel,
    ),
  });
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
  return hydrateGameStateWithReport(saved, now).state;
}

export function hydrateGameStateWithReport(
  saved: string | null,
  now = Date.now(),
): HydratedGameState {
  if (!saved) {
    return {
      state: createGameState(now),
      offlineDust: 0,
      saveLoaded: false,
    };
  }

  try {
    const parsed = JSON.parse(saved) as Partial<GameState> & { version?: number };
    if (parsed.version !== SAVE_VERSION && parsed.version !== LEGACY_SAVE_VERSION) {
      return {
        state: createGameState(now),
        offlineDust: 0,
        saveLoaded: false,
      };
    }

    const dustBeforeOffline = numberOr(parsed.dust, 0);
    const autoCollectors = numberOr(parsed.autoCollectors, 0);
    const autoCollectorEfficiencyLevel = numberOr(
      parsed.autoCollectorEfficiencyLevel,
      0,
    );
    const autoCollectorEfficiencyMultiplier = calculateEfficiencyMultiplier(
      autoCollectorEfficiencyLevel,
    );
    const state = applyOfflineProgress(
      recalculateProduction({
        version: SAVE_VERSION,
        dust: dustBeforeOffline,
        dustPerClick: numberOr(parsed.dustPerClick, 1),
        dustPerSecond: 0,
        autoCollectors,
        nextAutoCollectorCost: numberOr(
          parsed.nextAutoCollectorCost,
          AUTO_COLLECTOR_BASE_COST,
        ),
        autoCollectorEfficiencyLevel,
        autoCollectorEfficiencyMultiplier,
        nextEfficiencyUpgradeCost: numberOr(
          parsed.nextEfficiencyUpgradeCost,
          calculateEfficiencyUpgradeCost(autoCollectorEfficiencyLevel),
        ),
        resonance: numberOr(parsed.resonance, 0),
        earnedResonanceMilestones: stringArrayOr(
          parsed.earnedResonanceMilestones,
          [],
        ),
        unlockedResonanceNodes: stringArrayOr(parsed.unlockedResonanceNodes, []),
        lastUpdatedAt: numberOr(parsed.lastUpdatedAt, now),
      }),
      now,
    );

    return {
      state,
      offlineDust: round(Math.max(0, state.dust - dustBeforeOffline)),
      saveLoaded: true,
    };
  } catch {
    return {
      state: createGameState(now),
      offlineDust: 0,
      saveLoaded: false,
    };
  }
}

export function recalculateProduction(state: GameState): GameState {
  const stableCircuitMultiplier = state.unlockedResonanceNodes.includes(
    "stable-circuit",
  )
    ? 1.1
    : 1;

  return {
    ...state,
    dustPerSecond: round(
      calculateDustPerSecond(
        state.autoCollectors,
        getEffectiveAutoCollectorEfficiencyMultiplier(state),
      ) * stableCircuitMultiplier,
    ),
  };
}

export function getEffectiveAutoCollectorEfficiencyMultiplier(
  state: GameState,
): number {
  const tuningEngravingBonus = state.unlockedResonanceNodes.includes(
    "tuning-engraving",
  )
    ? 0.05
    : 0;

  return round(state.autoCollectorEfficiencyMultiplier + tuningEngravingBonus);
}

function applyOfflineProgress(state: GameState, now: number): GameState {
  const elapsedMs = Math.max(0, Math.min(now - state.lastUpdatedAt, MAX_OFFLINE_MS));
  const gainedDust =
    (elapsedMs / 1000) *
    state.dustPerSecond *
    calculateOfflineRewardMultiplier(state);

  return {
    ...state,
    dust: round(state.dust + gainedDust),
    lastUpdatedAt: now,
  };
}

function calculateOfflineRewardMultiplier(state: GameState): number {
  return state.unlockedResonanceNodes.includes("return-coil") ? 1.1 : 1;
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function stringArrayOr(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string");
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function calculateEfficiencyMultiplier(level: number): number {
  return round(1 + level * EFFICIENCY_BONUS_PER_LEVEL);
}

function calculateEfficiencyUpgradeCost(level: number): number {
  return Math.ceil(EFFICIENCY_BASE_COST * EFFICIENCY_GROWTH ** level);
}

function calculateDustPerSecond(autoCollectors: number, multiplier: number): number {
  return round(autoCollectors * DUST_PER_AUTO_COLLECTOR * multiplier);
}
