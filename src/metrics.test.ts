import {
  METRICS_KEY,
  readMetrics,
  recordPlayerClick,
  recordUpgradePurchase,
  startMetricsSession,
} from "./metrics";

describe("local metrics", () => {
  it("records a local session start without personal data", () => {
    const storage = createMemoryStorage();

    startMetricsSession(storage, 1_000);

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: 1_000,
      clickCount: 0,
      upgradePurchaseCount: 0,
      firstUpgradeTimeMs: null,
    });
  });

  it("increments click count locally", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordPlayerClick(storage);
    recordPlayerClick(storage);

    expect(readMetrics(storage).clickCount).toBe(2);
  });

  it("starts a fresh session when the app is opened again", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);
    recordPlayerClick(storage);
    recordUpgradePurchase(storage, 6_000);

    startMetricsSession(storage, 10_000);

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: 10_000,
      clickCount: 0,
      upgradePurchaseCount: 0,
      firstUpgradeTimeMs: null,
    });
  });

  it("records first upgrade time once", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordUpgradePurchase(storage, 6_000);
    recordUpgradePurchase(storage, 9_000);

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: 1_000,
      clickCount: 0,
      upgradePurchaseCount: 2,
      firstUpgradeTimeMs: 5_000,
    });
  });

  it("recovers from malformed local metrics", () => {
    const storage = createMemoryStorage();
    storage.setItem(METRICS_KEY, "not json");

    expect(readMetrics(storage)).toEqual({
      sessionStartedAt: null,
      clickCount: 0,
      upgradePurchaseCount: 0,
      firstUpgradeTimeMs: null,
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
