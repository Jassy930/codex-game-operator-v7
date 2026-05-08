import {
  METRICS_HISTORY_KEY,
  METRICS_KEY,
  readMetricsHistory,
  readMetrics,
  createLocalMetricsSnapshot,
  recordResonanceEarned,
  recordResonanceNodeUnlocked,
  recordOfflineRewardClaimed,
  recordPlayerClick,
  recordSaveLoaded,
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
      saveLoadedCount: 0,
      offlineRewardClaimedCount: 0,
      lastOfflineRewardDust: null,
      resonanceEarnedCount: 0,
      resonanceNodeUnlockedCount: 0,
      firstResonanceTimeMs: null,
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

  it("records local save load visibility", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordSaveLoaded(storage);
    recordSaveLoaded(storage);

    expect(readMetrics(storage).saveLoadedCount).toBe(2);
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

  it("keeps a local-only history of recent session summaries", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);
    recordPlayerClick(storage);
    recordUpgradePurchase(storage, 6_000);

    recordSessionEnd(storage, 16_000);

    expect(readMetricsHistory(storage)).toEqual([
      {
        sessionStartedAt: 1_000,
        sessionEndedAt: 16_000,
        sessionDurationMs: 15_000,
        clickCount: 1,
        upgradePurchaseCount: 1,
        firstUpgradeTimeMs: 5_000,
        saveLoadedCount: 0,
        offlineRewardClaimedCount: 0,
        resonanceEarnedCount: 0,
        resonanceNodeUnlockedCount: 0,
        firstResonanceTimeMs: null,
      },
    ]);
  });

  it("updates the current session summary instead of duplicating pagehide events", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordSessionEnd(storage, 16_000);
    recordSessionEnd(storage, 17_000);

    expect(readMetricsHistory(storage)).toHaveLength(1);
    expect(readMetricsHistory(storage)[0]).toMatchObject({
      sessionStartedAt: 1_000,
      sessionEndedAt: 17_000,
      sessionDurationMs: 16_000,
    });
  });

  it("keeps only the 10 most recent local session summaries", () => {
    const storage = createMemoryStorage();

    for (let index = 0; index < 12; index += 1) {
      const startedAt = index * 10_000;
      startMetricsSession(storage, startedAt);
      recordSessionEnd(storage, startedAt + 1_000);
    }

    const history = readMetricsHistory(storage);
    expect(history).toHaveLength(10);
    expect(history[0].sessionStartedAt).toBe(20_000);
    expect(history[9].sessionStartedAt).toBe(110_000);
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
      saveLoadedCount: 0,
      offlineRewardClaimedCount: 0,
      lastOfflineRewardDust: null,
      resonanceEarnedCount: 0,
      resonanceNodeUnlockedCount: 0,
      firstResonanceTimeMs: null,
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
      saveLoadedCount: 0,
      offlineRewardClaimedCount: 0,
      lastOfflineRewardDust: null,
      resonanceEarnedCount: 0,
      resonanceNodeUnlockedCount: 0,
      firstResonanceTimeMs: null,
    });
  });

  it("records local resonance earned count and first resonance time once", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordResonanceEarned(storage, 6_000);
    recordResonanceEarned(storage, 9_000);

    expect(readMetrics(storage)).toMatchObject({
      resonanceEarnedCount: 2,
      firstResonanceTimeMs: 5_000,
    });
  });

  it("records local resonance node unlocks", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);

    recordResonanceNodeUnlocked(storage);
    recordResonanceNodeUnlocked(storage);

    expect(readMetrics(storage).resonanceNodeUnlockedCount).toBe(2);
  });

  it("creates one local-only metrics snapshot for operator readback", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);
    recordPlayerClick(storage);
    recordUpgradePurchase(storage, 6_000);
    recordResonanceEarned(storage, 7_000);
    recordResonanceNodeUnlocked(storage);
    recordSessionEnd(storage, 16_000);
    storage.setItem(
      "stardust-workshop-feedback-events-v1",
      JSON.stringify([{ type: "feedback_clicked", createdAt: 8_000 }]),
    );

    expect(createLocalMetricsSnapshot(storage, 20_000)).toEqual({
      generatedAt: 20_000,
      activeSessionDurationMs: 15_000,
      keys: {
        current: "stardust-workshop-metrics-v1",
        history: "stardust-workshop-metrics-history-v1",
        feedbackEvents: "stardust-workshop-feedback-events-v1",
      },
      current: {
        sessionStartedAt: 1_000,
        sessionEndedAt: 16_000,
        sessionDurationMs: 15_000,
        clickCount: 1,
        upgradePurchaseCount: 1,
        firstUpgradeTimeMs: 5_000,
        saveLoadedCount: 0,
        offlineRewardClaimedCount: 0,
        lastOfflineRewardDust: null,
        resonanceEarnedCount: 1,
        resonanceNodeUnlockedCount: 1,
        firstResonanceTimeMs: 6_000,
      },
      history: [
        {
          sessionStartedAt: 1_000,
          sessionEndedAt: 16_000,
          sessionDurationMs: 15_000,
          clickCount: 1,
          upgradePurchaseCount: 1,
          firstUpgradeTimeMs: 5_000,
          saveLoadedCount: 0,
          offlineRewardClaimedCount: 0,
          resonanceEarnedCount: 1,
          resonanceNodeUnlockedCount: 1,
          firstResonanceTimeMs: 6_000,
        },
      ],
      feedbackClickedCount: 1,
    });
  });

  it("derives active session duration in the local metrics snapshot", () => {
    const storage = createMemoryStorage();
    startMetricsSession(storage, 1_000);
    recordPlayerClick(storage);

    expect(createLocalMetricsSnapshot(storage, 91_000)).toMatchObject({
      activeSessionDurationMs: 90_000,
      current: {
        sessionStartedAt: 1_000,
        sessionEndedAt: null,
        sessionDurationMs: null,
        clickCount: 1,
      },
    });
  });

  it("recovers from malformed local metrics", () => {
    const storage = createMemoryStorage();
    storage.setItem(METRICS_KEY, "not json");
    storage.setItem(METRICS_HISTORY_KEY, "not json");

    expect(readMetrics(storage)).toEqual({
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
    });
    expect(readMetricsHistory(storage)).toEqual([]);
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
