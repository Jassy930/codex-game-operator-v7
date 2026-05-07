import { renderToStaticMarkup } from "react-dom/server";
import {
  App,
  formatAutoCollectorPurchaseMessage,
  formatCollectFeedbackMessage,
  formatGoalHint,
  getNextUpgradeTarget,
  shouldShowOfflineDust,
} from "./App";
import { createGameState, serializeGameState } from "./game";

describe("App", () => {
  it("renders the first playable screen with action and upgrade controls", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("星尘");
    expect(html).toContain('alt="星尘晶体"');
    expect(html).toContain("星尘会变成自动采集器，让工坊持续产出");
    expect(html).toContain("采集");
    expect(html).toContain("自动采集器");
    expect(html).toContain('alt="自动采集器"');
    expect(html).toContain("需要 10 星尘");
    expect(html).toContain("调校工具");
    expect(html).toContain('alt="调校工具"');
    expect(html).toContain("需要先购买自动采集器");
    expect(html).toContain("下一升级进度");
    expect(html).toContain("下一升级：自动采集器 · 需要 10 星尘");
    expect(html).toContain("目标：攒够星尘，购买第一个自动采集器");
    expect(html).toContain("工坊阶段：火花工作台");
    expect(html).toContain("下一阶段：拥有 3 台自动采集器");
    expect(html).toContain("里程碑：0 / 2 台自动采集器");
    expect(html).toContain("event-stack");
    expect(html).toContain("反馈");
  });

  it("updates the goal hint after the first auto collector is purchased", () => {
    const storage = createMemoryStorage();
    const now = Date.now();
    storage.setItem(
      "stardust-workshop-save-v1",
      serializeGameState({
        ...createGameState(now),
        autoCollectors: 1,
        dustPerSecond: 0.2,
        nextAutoCollectorCost: 15,
      }),
    );
    const globalWithWindow = globalThis as typeof globalThis & { window?: Window };
    const originalWindow = globalWithWindow.window;
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { localStorage: storage },
    });

    try {
      const html = renderToStaticMarkup(<App />);

      expect(html).toContain("目标：继续攒星尘，购买下一台自动采集器");
      expect(html).toContain("自动采集效率 +10%");
      expect(html).toContain("需要 25 星尘");
      expect(html).not.toContain("目标：攒够星尘，购买第一个自动采集器");
    } finally {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });
    }
  });

  it("surfaces the expansion or tuning choice after efficiency tuning starts", () => {
    const storage = createMemoryStorage();
    const now = Date.now();
    storage.setItem(
      "stardust-workshop-save-v1",
      serializeGameState({
        ...createGameState(now),
        autoCollectors: 3,
        dustPerSecond: 0.66,
        nextAutoCollectorCost: 34,
        autoCollectorEfficiencyLevel: 1,
        autoCollectorEfficiencyMultiplier: 1.1,
        nextEfficiencyUpgradeCost: 45,
      }),
    );
    const globalWithWindow = globalThis as typeof globalThis & { window?: Window };
    const originalWindow = globalWithWindow.window;
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { localStorage: storage },
    });

    try {
      const html = renderToStaticMarkup(<App />);

      expect(html).toContain("目标：扩建或调校，让每秒星尘继续提高");
      expect(html).toContain("工坊阶段：星尘小间");
      expect(html).toContain("下一阶段：完成 2 次调校");
      expect(html).toContain("下一升级：自动采集器 · 需要 34 星尘");
      expect(html).toContain("调校倍率");
      expect(html).toContain("1.1x");
      expect(html).not.toContain("目标：继续攒星尘，购买下一台自动采集器");
      expect(html).not.toContain("点击收益");
    } finally {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });
    }
  });

  it("does not show a rounded zero offline reward", () => {
    const storage = createMemoryStorage();
    const now = Date.now();
    storage.setItem(
      "stardust-workshop-save-v1",
      serializeGameState({
        ...createGameState(now),
        lastUpdatedAt: now - 20,
        autoCollectors: 3,
        dustPerSecond: 0.66,
        nextAutoCollectorCost: 34,
        autoCollectorEfficiencyLevel: 1,
        autoCollectorEfficiencyMultiplier: 1.1,
        nextEfficiencyUpgradeCost: 45,
      }),
    );
    const globalWithWindow = globalThis as typeof globalThis & { window?: Window };
    const originalWindow = globalWithWindow.window;
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { localStorage: storage },
    });

    try {
      const html = renderToStaticMarkup(<App />);

      expect(html).not.toContain("离线获得 0 星尘");
    } finally {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });
    }
  });

  it("formats the next goal from the current upgrade depth", () => {
    expect(formatGoalHint(0, 0)).toBe("目标：攒够星尘，购买第一个自动采集器");
    expect(formatGoalHint(2, 0)).toBe(
      "目标：继续攒星尘，购买下一台自动采集器或第一次调校",
    );
    expect(formatGoalHint(3, 1)).toBe(
      "目标：扩建或调校，让每秒星尘继续提高",
    );
  });

  it("targets the closest available upgrade for the progress bar", () => {
    expect(
      getNextUpgradeTarget({
        autoCollectors: 0,
        dust: 5,
        nextAutoCollectorCost: 10,
        nextEfficiencyUpgradeCost: 25,
      }),
    ).toEqual({
      label: "自动采集器",
      cost: 10,
      progressPercent: 50,
    });

    expect(
      getNextUpgradeTarget({
        autoCollectors: 7,
        dust: 100,
        nextAutoCollectorCost: 171,
        nextEfficiencyUpgradeCost: 146,
      }),
    ).toEqual({
      label: "调校工具",
      cost: 146,
      progressPercent: 68,
    });
  });

  it("uses the displayed offline reward threshold for visibility and metrics", () => {
    expect(shouldShowOfflineDust(0.09)).toBe(false);
    expect(shouldShowOfflineDust(0.1)).toBe(true);
  });

  it("formats a lightweight auto collector purchase confirmation", () => {
    expect(formatAutoCollectorPurchaseMessage(0.2)).toBe(
      "自动采集器启动：每秒星尘 +0.2",
    );
  });

  it("formats a lightweight collect feedback message", () => {
    expect(formatCollectFeedbackMessage(1)).toBe(
      "采集到 1 星尘：正在推进下一台自动采集器",
    );
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
