import { renderToStaticMarkup } from "react-dom/server";
import {
  App,
  formatAutoCollectorPurchaseMessage,
  formatCollectFeedbackMessage,
  formatEfficiencyUpgradeMessage,
  formatResonanceNodeUnlockMessage,
  formatWorkshopStageNextRequirement,
  formatPurchaseFeedbackMessage,
  formatGoalHint,
  getNextUpgradeTarget,
  shouldShowOfflineDust,
} from "./App";
import { createGameState, serializeGameState } from "./game";
import { getWorkshopStage } from "./milestones";

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
    expect(html).toContain("下一阶段：自动采集器 0/3，开启星尘小间");
    expect(html).toContain("里程碑：0 / 2 台自动采集器");
    expect(html).toContain("event-stack");
    expect(html).toContain("反馈");
    expect(html).not.toContain("共鸣矩阵");
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
      expect(html).toContain("下一阶段：调校 1/2，进入稳定工坊");
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

  it("uses a spend-next stage goal after offline return rewards are visible", () => {
    const storage = createMemoryStorage();
    const now = Date.now();
    storage.setItem(
      "stardust-workshop-save-v1",
      serializeGameState({
        ...createGameState(now),
        dust: 3812.34,
        autoCollectors: 15,
        dustPerSecond: 5.7,
        nextAutoCollectorCost: 4379,
        autoCollectorEfficiencyLevel: 9,
        autoCollectorEfficiencyMultiplier: 1.9,
        nextEfficiencyUpgradeCost: 4959,
        lastUpdatedAt: now - 1000 * 60 * 30,
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

      expect(html).toContain("离线获得");
      expect(html).toContain(
        "回访目标：花掉离线星尘，继续扩建或调校引擎室",
      );
      expect(html).not.toContain("长期目标：离开一会儿再回来");
    } finally {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });
    }
  });

  it("moves the return stage goal forward after offline dust is spent below the next upgrade", () => {
    expect(
      formatWorkshopStageNextRequirement(getWorkshopStage(16, 10), true, false),
    ).toBe("回访目标：离线收益已投入工坊，继续攒下一次升级");
  });

  it("shows resonance progress after the engine room is online", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      autoCollectors: 15,
      autoCollectorEfficiencyLevel: 9,
      autoCollectorEfficiencyMultiplier: 1.9,
      dustPerSecond: 5.7,
      nextAutoCollectorCost: 4379,
      nextEfficiencyUpgradeCost: 4959,
    });

    expect(html).toContain("共鸣矩阵");
    expect(html).toContain("自动采集器 15/20");
    expect(html).toContain("调校 9/12");
  });

  it("points the stage goal at claiming resonance when the first milestone is ready", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 8.8,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
    });

    expect(html).toContain("领取共鸣 +1");
    expect(html).toContain("共鸣目标：领取首个共鸣，再选择 1 个永久节点");
    expect(html).not.toContain("长期目标：离开一会儿再回来");
  });

  it("points the stage goal at stardust return when the long-horizon threshold is ready", () => {
    expect(
      formatWorkshopStageNextRequirement(
        getWorkshopStage(25, 15),
        false,
        false,
        false,
        ["stable-circuit"],
        undefined,
        "first-resonance",
        false,
        true,
      ),
    ).toBe("归航目标：星尘归航，获得 1 共鸣并开启下一轮");
  });

  it("shows unlockable resonance nodes when resonance is available", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 8.8,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
      resonance: 1,
    });

    expect(html).toContain("共鸣矩阵");
    expect(html).toContain("可用共鸣：1");
    expect(html).toContain("稳定回路");
    expect(html).toContain("回访线圈");
    expect(html).toContain("调校刻印");
  });

  it("explains the one-node resonance choice before spending resonance", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 8.8,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
      resonance: 1,
      earnedResonanceMilestones: ["first-resonance"],
    });

    expect(html).toContain("选择 1 个永久节点，本轮只能启动一个");
  });

  it("makes the spent resonance node choice explicit", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 8.8,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
    });

    expect(html).toContain("稳定回路");
    expect(html).toContain("已启动 · 自动采集产出 +10%");
    expect(html).toContain("本轮已选择其他节点 · 离线收益 +10%");
    expect(html).toContain("本轮已选择其他节点 · 调校倍率 +0.05");
  });

  it("marks the first resonance milestone as claimed after spending the node choice", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 9.68,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
    });

    expect(html).toContain("归航准备：自动采集器 20/25，调校 12/15");
  });

  it("offers stardust return at the long horizon threshold", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
    });

    expect(html).toContain("星尘归航 +1 共鸣");
    expect(html).toContain("重启本轮工坊，保留共鸣和永久节点");
    expect(html).toContain("归航准备完成：自动采集器 25/25，调校 15/15");
    expect(html).toContain("已启动 · 自动采集产出 +10%");
    expect(html).not.toContain("领取第 2 点共鸣");
  });

  it("shows the stardust return goal before returning", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 50000,
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
    });

    expect(html).toContain("归航目标：星尘归航，获得 1 共鸣并开启下一轮");
    expect(html).not.toContain("回访计划：稳定回路正在放大自动采集");
  });

  it("points the stage goal at spending available resonance before returning again", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 50000,
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      resonance: 1,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
      returnCount: 1,
    });

    expect(html).toContain("归航目标：用共鸣启动永久节点，再推进下一轮工坊");
    expect(html).not.toContain("回访计划：稳定回路正在放大自动采集");
  });

  it("keeps available return resonance spendable at the start of the next loop", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      resonance: 1,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
      returnCount: 1,
    });

    expect(html).toContain("工坊阶段：火花工作台");
    expect(html).toContain("共鸣矩阵");
    expect(html).toContain("可用共鸣：1");
    expect(html).toContain("选择第 2 个永久节点，最多启动 2 个");
    expect(html).toContain("归航目标：用共鸣启动永久节点，再推进下一轮工坊");
  });

  it("points the full-node state at repeat stardust returns", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 50000,
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
    });

    expect(html).toContain("归航目标：永久节点已形成，继续归航积累共鸣");
    expect(html).toContain("已启动 · 自动采集产出 +10%");
    expect(html).toContain("已启动 · 离线收益 +10%");
    expect(html).not.toContain("回访计划：稳定回路正在放大自动采集");
  });

  it("keeps the near-threshold full-node state pointed at repeat returns", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 163313.57,
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
    });

    expect(html).toContain("归航目标：永久节点已形成，继续归航积累共鸣");
    expect(html).not.toContain("回访计划：稳定回路放大自动采集");
  });

  it("does not leak inactive dual-node copy in the full-node return goal", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 163313.57,
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 14,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
      unlockedResonanceNodes: ["stable-circuit", "tuning-engraving"],
    });

    expect(html).toContain("归航目标：永久节点已形成，继续归航积累共鸣");
    expect(html).not.toContain("回访线圈放大离线收益");
  });

  it("shows the resonance choice cap after two permanent nodes are active", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 50000,
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
    });

    expect(html).toContain("共鸣选择：2/2 个永久节点已启动");
    expect(html).toContain("共鸣选择已满 · 调校倍率 +0.05");
  });

  it("shows stardust return preparation as complete after two nodes are active", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 50000,
      autoCollectors: 25,
      autoCollectorEfficiencyLevel: 15,
      autoCollectorEfficiencyMultiplier: 2.5,
      dustPerSecond: 13.75,
      nextAutoCollectorCost: 252512,
      nextEfficiencyUpgradeCost: 168667,
      earnedResonanceMilestones: ["first-resonance", "second-resonance"],
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
    });

    expect(html).toContain("归航准备完成：自动采集器 25/25，调校 15/15");
    expect(html).not.toContain("共鸣门槛：第二共鸣已领取 ·");
  });

  it("credits the second resonance node effect when it starts", () => {
    expect(formatResonanceNodeUnlockMessage("return-coil", 2)).toBe(
      "第 2 个共鸣节点启动：回访线圈 · 离线收益 +10%",
    );
  });

  it("points the stage goal at the selected resonance node value", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 30000,
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 9.68,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
    });

    expect(html).toContain(
      "共鸣目标：稳定回路已启动，继续扩建自动采集器放大产出",
    );
    expect(html).not.toContain("长期目标：离开一会儿再回来");
  });

  it("reads back the next return plan when a resonance node is active and the next upgrade is not affordable", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 12000,
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 9.68,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
    });

    expect(html).toContain(
      "回访计划：稳定回路正在放大自动采集，约 29 分钟后可购买调校工具",
    );
    expect(html).not.toContain(
      "共鸣目标：稳定回路已启动，继续扩建自动采集器放大产出",
    );
  });

  it("reads back the approximate wait time for the next return plan", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 12000,
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 9.68,
      nextAutoCollectorCost: 33253,
      nextEfficiencyUpgradeCost: 28922,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["stable-circuit"],
    });

    expect(html).toContain(
      "回访计划：稳定回路正在放大自动采集，约 29 分钟后可购买调校工具",
    );
    expect(html).not.toContain("攒到 28,922 星尘再购买调校工具");
  });

  it("credits return coil when offline resonance rewards are visible", () => {
    const html = renderAppWithSave({
      ...createGameState(Date.now()),
      dust: 3812.34,
      autoCollectors: 20,
      autoCollectorEfficiencyLevel: 12,
      autoCollectorEfficiencyMultiplier: 2.2,
      dustPerSecond: 8.8,
      nextAutoCollectorCost: 4379,
      nextEfficiencyUpgradeCost: 4959,
      lastUpdatedAt: Date.now() - 1000 * 60 * 30,
      earnedResonanceMilestones: ["first-resonance"],
      unlockedResonanceNodes: ["return-coil"],
    });

    expect(html).toContain("离线获得");
    expect(html).toContain(
      "共鸣目标：回访线圈带回更多离线星尘，花掉收益继续扩建或调校",
    );
    expect(html).not.toContain("回访目标：花掉离线星尘");
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
      dust: 5,
      dustPerSecond: 0,
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
      dust: 100,
      dustPerSecond: 0,
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

  it("credits stable circuit in the auto collector purchase confirmation", () => {
    expect(formatAutoCollectorPurchaseMessage(9.68, true)).toBe(
      "稳定回路共振：自动采集每秒星尘 +9.7",
    );
  });

  it("credits tuning engraving in the tuning purchase confirmation", () => {
    expect(formatEfficiencyUpgradeMessage(2.25, true)).toBe(
      "调校刻印共振：有效调校倍率 x2.3",
    );
  });

  it("surfaces a workshop stage completion when a purchase crosses a stage boundary", () => {
    const before = {
      ...createGameState(0),
      dust: 34,
      autoCollectors: 2,
      dustPerSecond: 0.4,
      nextAutoCollectorCost: 34,
    };
    const after = {
      ...before,
      dust: 0,
      autoCollectors: 3,
      dustPerSecond: 0.6,
      nextAutoCollectorCost: 51,
    };

    expect(
      formatPurchaseFeedbackMessage(
        before,
        after,
        formatAutoCollectorPurchaseMessage(after.dustPerSecond),
      ),
    ).toBe("工坊升级：星尘小间 · 自动采集器已经成组工作，下一步是调校效率。");
  });

  it("keeps the regular purchase confirmation when the workshop stage is unchanged", () => {
    const before = {
      ...createGameState(0),
      dust: 15,
      autoCollectors: 1,
      dustPerSecond: 0.2,
      nextAutoCollectorCost: 15,
    };
    const after = {
      ...before,
      dust: 0,
      autoCollectors: 2,
      dustPerSecond: 0.4,
      nextAutoCollectorCost: 23,
    };

    expect(
      formatPurchaseFeedbackMessage(
        before,
        after,
        formatAutoCollectorPurchaseMessage(after.dustPerSecond),
      ),
    ).toBe("自动采集器启动：每秒星尘 +0.4");
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

function renderAppWithSave(state: ReturnType<typeof createGameState>): string {
  const storage = createMemoryStorage();
  storage.setItem("stardust-workshop-save-v1", serializeGameState(state));
  const globalWithWindow = globalThis as typeof globalThis & { window?: Window };
  const originalWindow = globalWithWindow.window;
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { localStorage: storage },
  });

  try {
    return renderToStaticMarkup(<App />);
  } finally {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: originalWindow,
    });
  }
}
