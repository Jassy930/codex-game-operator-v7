import {
  METRICS_KEY,
  readMetrics,
  recordOfflineRewardClaimed,
  recordPlayerClick,
  recordSessionEnd,
  recordUpgradePurchase,
  startMetricsSession,
} from "./metrics";

describe("local metrics", () => {
  it("records a local session start without personal data", () => {
    const storage = createMemoryStorage();

    startMetricsSession(storage, 1_000);

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: 1_000,
      sessionEndedAt: null,
      sessionDurationMs: null,
      clickCount: 0,
      upgradePurchaseCount: 0,
      firstUpgradeTimeMs: null,
      offlineRewardClaimedCount: 0,
      lastOfflineRewardDust: null,
    });
  });

  it("increments click count locally", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordPlayerClick(storage);
    recordPlayerClick(storage);

    expect(readMetrics(storage).clickCount).toBe(2);
  });

  it("records local offline reward visibility", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordOfflineRewardClaimed(storage, 6);
    recordOfflineRewardClaimed(storage, 4);

    expect(readMetrics(storage)).toMatchObject({
      offlineRewardClaimedCount: 2,
      lastOfflineRewardDust: 4,
    });
  });

  it("records local session end and duration", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordSessionEnd(storage, 16_000);

    expect(readMetrics(storage)).toMatchObject({
      sessionStartedAt: 1_000,
      sessionEndedAt: 16_000,
      sessionDurationMs: 15_000,
    });
  });

  it("starts a fresh session when the app is opened again", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);
    recordPlayerClick(storage);
    recordUpgradePurchase(storage, 6_000);

    startMetricsSession(storage, 10_000);

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: 10_000,
      sessionEndedAt: null,
      sessionDurationMs: null,
      clickCount: 0,
      upgradePurchaseCount: 0,
      firstUpgradeTimeMs: null,
      offlineRewardClaimedCount: 0,
      lastOfflineRewardDust: null,
    });
  });

  it("records first upgrade time once", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordUpgradePurchase(storage, 6_000);
    recordUpgradePurchase(storage, 9_000);

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: 1_000,
      sessionEndedAt: null,
      sessionDurationMs: null,
      clickCount: 0,
      upgradePurchaseCount: 2,
      firstUpgradeTimeMs: 5_000,
      offlineRewardClaimedCount: 0,
      lastOfflineRewardDust: null,
    });
  });

  it("recovers from malformed local metrics", () => {
    const storage = createMemoryStorage();
    storage.setItem(METRICS_KEY, "not json");

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: null,
      sessionEndedAt: null,
      sessionDurationMs: null,
      clickCount: 0,
      upgradePurchaseCount: 0,
      firstUpgradeTimeMs: null,
      offlineRewardClaimedCount: 0,
      lastOfflineRewardDust: null,
    });
  });
});

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();

  return {
    get length() {
      return values.size;
    },
    clear() {
      values.clear();
    },
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(values.keys())[index] ?? null;
    },
    removeItem(key: string) {
      values.delete(key);
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}
