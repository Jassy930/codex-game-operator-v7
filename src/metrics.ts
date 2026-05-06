export const METRICS_KEY = "stardust-workshop-metrics-v1";

export type LocalMetrics = {
  sessionStartedAt: number | null;
  sessionEndedAt: number | null;
  sessionDurationMs: number | null;
  clickCount: number;
  upgradePurchaseCount: number;
  firstUpgradeTimeMs: number | null;
  offlineRewardClaimedCount: number;
  lastOfflineRewardDust: number | null;
};

const EMPTY_METRICS: LocalMetrics = {
  sessionStartedAt: null,
  sessionEndedAt: null,
  sessionDurationMs: null,
  clickCount: 0,
  upgradePurchaseCount: 0,
  firstUpgradeTimeMs: null,
  offlineRewardClaimedCount: 0,
  lastOfflineRewardDust: null,
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

  writeMetrics(storage, {
    ...metrics,
    sessionEndedAt: now,
    sessionDurationMs,
  });
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
      offlineRewardClaimedCount: numberOr(parsed.offlineRewardClaimedCount, 0),
      lastOfflineRewardDust: numberOrNull(parsed.lastOfflineRewardDust),
    };
  } catch {
    return EMPTY_METRICS;
  }
}

function writeMetrics(storage: Storage, metrics: LocalMetrics): void {
  storage.setItem(METRICS_KEY, JSON.stringify(metrics));
}

function calculateFirstUpgradeTime(metrics: LocalMetrics, now: number): number | null {
  if (metrics.sessionStartedAt === null) {
    return null;
  }

  return Math.max(0, now - metrics.sessionStartedAt);
}

function numberOr(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function numberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
