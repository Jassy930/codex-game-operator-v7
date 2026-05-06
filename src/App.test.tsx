import { renderToStaticMarkup } from "react-dom/server";
import { App, formatAutoCollectorPurchaseMessage } from "./App";
import { createGameState, serializeGameState } from "./game";

describe("App", () => {
  it("renders the first playable screen with action and upgrade controls", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("星尘");
    expect(html).toContain("采集");
    expect(html).toContain("自动采集器");
    expect(html).toContain("需要 10 星尘");
    expect(html).toContain("购买进度");
    expect(html).toContain("目标：攒够星尘，购买第一个自动采集器");
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
      expect(html).not.toContain("目标：攒够星尘，购买第一个自动采集器");
    } finally {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });
    }
  });

  it("formats a lightweight auto collector purchase confirmation", () => {
    expect(formatAutoCollectorPurchaseMessage(0.2)).toBe(
      "自动采集器启动：每秒星尘 +0.2",
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
