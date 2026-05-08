import { FEEDBACK_EVENTS_KEY } from "./feedback";

export const METRICS_KEY = "stardust-workshop-metrics-v1";
export const METRICS_HISTORY_KEY = "stardust-workshop-metrics-history-v1";

const METRICS_HISTORY_LIMIT = 10;

export type LocalMetrics = {
  sessionStartedAt: number | null;
  sessionEndedAt: number | null;
  sessionDurationMs: number | null;
  clickCount: number;
  upgradePurchaseCount: number;
  firstUpgradeTimeMs: number | null;
  saveLoadedCount: number;
  offlineRewardClaimedCount: number;
  lastOfflineRewardDust: number | null;
  resonanceEarnedCount: number;
  resonanceNodeUnlockedCount: number;
  firstResonanceTimeMs: number | null;
};

export type LocalMetricsSessionSummary = {
  sessionStartedAt: number;
  sessionEndedAt: number;
  sessionDurationMs: number;
  clickCount: number;
  upgradePurchaseCount: number;
  firstUpgradeTimeMs: number | null;
  saveLoadedCount: number;
  offlineRewardClaimedCount: number;
  resonanceEarnedCount: number;
  resonanceNodeUnlockedCount: number;
  firstResonanceTimeMs: number | null;
};

export type LocalMetricsSnapshot = {
  generatedAt: number;
  activeSessionDurationMs: number | null;
  keys: {
    current: typeof METRICS_KEY;
    history: typeof METRICS_HISTORY_KEY;
    feedbackEvents: typeof FEEDBACK_EVENTS_KEY;
  };
  current: LocalMetrics;
  history: LocalMetricsSessionSummary[];
  feedbackClickedCount: number;
};

const EMPTY_METRICS: LocalMetrics = {
  sessionStartedAt: null,
  sessionEndedAt: null,
  sessionDurationMs: null,
  clickCount: 0,
  upgradePurchaseCount: 0,
  firstUpgradeTimeMs: null,
  saveLoadedCount: 0,
  offlineRewardClaimedCount: 0,
  lastOfflineRewardDust: null,
  resonanceEarnedCount: 0,
  resonanceNodeUnlockedCount: 0,
  firstResonanceTimeMs: null,
};

export function startMetricsSession(storage: Storage, now = Date.now()): void {
  writeMetrics(storage, {
    ...EMPTY_METRICS,
    sessionStartedAt: now,
  });
}

export function recordPlayerClick(storage: Storage): void {
  const metrics = readMetrics(storage);
  writeMetrics(storage, {
    ...metrics,
    clickCount: metrics.clickCount + 1,
  });
}

export function recordSessionEnd(storage: Storage, now = Date.now()): void {
  const metrics = readMetrics(storage);
  const sessionDurationMs =
    metrics.sessionStartedAt === null ? null : Math.max(0, now - metrics.sessionStartedAt);
  const endedMetrics = {
    ...metrics,
    sessionEndedAt: now,
    sessionDurationMs,
  };

  writeMetrics(storage, endedMetrics);
  recordMetricsHistory(storage, endedMetrics);
}

export function recordOfflineRewardClaimed(storage: Storage, dust: number): void {
  if (dust <= 0) {
    return;
  }

  const metrics = readMetrics(storage);
  writeMetrics(storage, {
    ...metrics,
    offlineRewardClaimedCount: metrics.offlineRewardClaimedCount + 1,
    lastOfflineRewardDust: dust,
  });
}

export function recordSaveLoaded(storage: Storage): void {
  const metrics = readMetrics(storage);
  writeMetrics(storage, {
    ...metrics,
    saveLoadedCount: metrics.saveLoadedCount + 1,
  });
}

export function recordUpgradePurchase(storage: Storage, now = Date.now()): void {
  const metrics = readMetrics(storage);
  const firstUpgradeTimeMs =
    metrics.firstUpgradeTimeMs ?? calculateFirstUpgradeTime(metrics, now);

  writeMetrics(storage, {
    ...metrics,
    upgradePurchaseCount: metrics.upgradePurchaseCount + 1,
    firstUpgradeTimeMs,
  });
}

export function recordResonanceEarned(storage: Storage, now = Date.now()): void {
  const metrics = readMetrics(storage);
  const firstResonanceTimeMs =
    metrics.firstResonanceTimeMs ?? calculateElapsedTime(metrics, now);

  writeMetrics(storage, {
    ...metrics,
    resonanceEarnedCount: metrics.resonanceEarnedCount + 1,
    firstResonanceTimeMs,
  });
}

export function recordResonanceNodeUnlocked(storage: Storage): void {
  const metrics = readMetrics(storage);
  writeMetrics(storage, {
    ...metrics,
    resonanceNodeUnlockedCount: metrics.resonanceNodeUnlockedCount + 1,
  });
}

export function readMetrics(storage: Storage): LocalMetrics {
  try {
    const raw = storage.getItem(METRICS_KEY);
    if (!raw) {
      return EMPTY_METRICS;
    }

    const parsed = JSON.parse(raw) as Partial<LocalMetrics>;

    return {
      sessionStartedAt: numberOrNull(parsed.sessionStartedAt),
      sessionEndedAt: numberOrNull(parsed.sessionEndedAt),
      sessionDurationMs: numberOrNull(parsed.sessionDurationMs),
      clickCount: numberOr(parsed.clickCount, 0),
      upgradePurchaseCount: numberOr(parsed.upgradePurchaseCount, 0),
      firstUpgradeTimeMs: numberOrNull(parsed.firstUpgradeTimeMs),
      saveLoadedCount: numberOr(parsed.saveLoadedCount, 0),
      offlineRewardClaimedCount: numberOr(parsed.offlineRewardClaimedCount, 0),
      lastOfflineRewardDust: numberOrNull(parsed.lastOfflineRewardDust),
      resonanceEarnedCount: numberOr(parsed.resonanceEarnedCount, 0),
      resonanceNodeUnlockedCount: numberOr(
        parsed.resonanceNodeUnlockedCount,
        0,
      ),
      firstResonanceTimeMs: numberOrNull(parsed.firstResonanceTimeMs),
    };
  } catch {
    return EMPTY_METRICS;
  }
}

export function readMetricsHistory(storage: Storage): LocalMetricsSessionSummary[] {
  try {
    const raw = storage.getItem(METRICS_HISTORY_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isSessionSummary);
  } catch {
    return [];
  }
}

export function createLocalMetricsSnapshot(
  storage: Storage,
  now = Date.now(),
): LocalMetricsSnapshot {
  const current = readMetrics(storage);

  return {
    generatedAt: now,
    activeSessionDurationMs: calculateActiveSessionDuration(current, now),
    keys: {
      current: METRICS_KEY,
      history: METRICS_HISTORY_KEY,
      feedbackEvents: FEEDBACK_EVENTS_KEY,
    },
    current,
    history: readMetricsHistory(storage),
    feedbackClickedCount: readFeedbackClickedCount(storage),
  };
}

function writeMetrics(storage: Storage, metrics: LocalMetrics): void {
  storage.setItem(METRICS_KEY, JSON.stringify(metrics));
}

function recordMetricsHistory(storage: Storage, metrics: LocalMetrics): void {
  const summary = toSessionSummary(metrics);
  if (summary === null) {
    return;
  }

  const history = readMetricsHistory(storage);
  const withoutCurrentSession = history.filter(
    (item) => item.sessionStartedAt !== summary.sessionStartedAt,
  );

  storage.setItem(
    METRICS_HISTORY_KEY,
    JSON.stringify([...withoutCurrentSession, summary].slice(-METRICS_HISTORY_LIMIT)),
  );
}

function toSessionSummary(metrics: LocalMetrics): LocalMetricsSessionSummary | null {
  if (
    metrics.sessionStartedAt === null ||
    metrics.sessionEndedAt === null ||
    metrics.sessionDurationMs === null
  ) {
    return null;
  }

  return {
    sessionStartedAt: metrics.sessionStartedAt,
    sessionEndedAt: metrics.sessionEndedAt,
    sessionDurationMs: metrics.sessionDurationMs,
    clickCount: metrics.clickCount,
    upgradePurchaseCount: metrics.upgradePurchaseCount,
    firstUpgradeTimeMs: metrics.firstUpgradeTimeMs,
    saveLoadedCount: metrics.saveLoadedCount,
    offlineRewardClaimedCount: metrics.offlineRewardClaimedCount,
    resonanceEarnedCount: metrics.resonanceEarnedCount,
    resonanceNodeUnlockedCount: metrics.resonanceNodeUnlockedCount,
    firstResonanceTimeMs: metrics.firstResonanceTimeMs,
  };
}

function calculateFirstUpgradeTime(metrics: LocalMetrics, now: number): number | null {
  return calculateElapsedTime(metrics, now);
}

function calculateElapsedTime(metrics: LocalMetrics, now: number): number | null {
  if (metrics.sessionStartedAt === null) {
    return null;
  }

  return Math.max(0, now - metrics.sessionStartedAt);
}

function calculateActiveSessionDuration(
  metrics: LocalMetrics,
  now: number,
): number | null {
  if (metrics.sessionStartedAt === null) {
    return null;
  }

  if (metrics.sessionEndedAt !== null && metrics.sessionDurationMs !== null) {
    return metrics.sessionDurationMs;
  }

  return Math.max(0, now - metrics.sessionStartedAt);
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function numberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readFeedbackClickedCount(storage: Storage): number {
  try {
    const raw = storage.getItem(FEEDBACK_EVENTS_KEY);
    if (!raw) {
      return 0;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return 0;
    }

    return parsed.filter((event) => {
      if (!event || typeof event !== "object") {
        return false;
      }

      const candidate = event as { type?: unknown; createdAt?: unknown };
      return (
        candidate.type === "feedback_clicked" &&
        typeof candidate.createdAt === "number" &&
        Number.isFinite(candidate.createdAt)
      );
    }).length;
  } catch {
    return 0;
  }
}

function isSessionSummary(value: unknown): value is LocalMetricsSessionSummary {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<LocalMetricsSessionSummary>;
  return (
    typeof candidate.sessionStartedAt === "number" &&
    Number.isFinite(candidate.sessionStartedAt) &&
    typeof candidate.sessionEndedAt === "number" &&
    Number.isFinite(candidate.sessionEndedAt) &&
    typeof candidate.sessionDurationMs === "number" &&
    Number.isFinite(candidate.sessionDurationMs) &&
    typeof candidate.clickCount === "number" &&
    Number.isFinite(candidate.clickCount) &&
    typeof candidate.upgradePurchaseCount === "number" &&
    Number.isFinite(candidate.upgradePurchaseCount) &&
    (candidate.firstUpgradeTimeMs === null ||
      (typeof candidate.firstUpgradeTimeMs === "number" &&
        Number.isFinite(candidate.firstUpgradeTimeMs))) &&
    typeof candidate.saveLoadedCount === "number" &&
    Number.isFinite(candidate.saveLoadedCount) &&
    typeof candidate.offlineRewardClaimedCount === "number" &&
    Number.isFinite(candidate.offlineRewardClaimedCount) &&
    typeof candidate.resonanceEarnedCount === "number" &&
    Number.isFinite(candidate.resonanceEarnedCount) &&
    typeof candidate.resonanceNodeUnlockedCount === "number" &&
    Number.isFinite(candidate.resonanceNodeUnlockedCount) &&
    (candidate.firstResonanceTimeMs === null ||
      (typeof candidate.firstResonanceTimeMs === "number" &&
        Number.isFinite(candidate.firstResonanceTimeMs)))
  );
}
