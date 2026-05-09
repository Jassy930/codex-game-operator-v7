import { createGameState } from "./game";
import { getReturnRouteReadback } from "./return-route";

describe("return route readback", () => {
  it("stays hidden before the repeat-return route exists", () => {
    const state = {
      ...createGameState(0),
      resonance: 2,
      unlockedResonanceNodes: ["stable-circuit"],
      returnCount: 2,
    };

    expect(getReturnRouteReadback(state)).toBeNull();
  });

  it("starts the first route segment after two permanent nodes and return history", () => {
    const state = {
      ...createGameState(0),
      resonance: 1,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
      returnCount: 2,
    };

    expect(getReturnRouteReadback(state)).toEqual({
      current: "余辉起航",
      description: "重复归航已能带回起步星尘，下一步把余辉稳定成长期航标。",
      stageGoal:
        "归航目标：余辉起航 1/3，补 1 次归航 / 1 点额外共鸣进入稳航校准",
      routeProgress: "本段进度：归航 2/3 · 额外共鸣 1/2",
      routeSummary:
        "航线摘要：1/3 余辉起航；当前收益：下轮起步可重建 1 台自动采集器；距稳航校准还差 1 次归航、1 点额外共鸣；按当前路线再归航 1 次即可进入稳航校准",
      currentPayoff:
        "当前收益：额外共鸣会转成下一轮起步星尘，可立即重建 1 台自动采集器",
      nextRequirement: "下一段：累计 3 次归航，并保留 2 点额外共鸣",
      progressSummary: "距稳航校准还差 1 次归航、1 点额外共鸣",
      actionHint:
        "下一步：继续重建工坊并执行 1 次星尘归航，同时保留 1 点额外共鸣",
      cadenceForecast: "节奏预判：按当前路线再归航 1 次即可进入稳航校准",
      routeMap:
        "航线图：余辉起航 -> 稳航校准 -> 深空归航；当前位于余辉起航",
      nextPreview:
        "达成后进入稳航校准：余辉重建节奏会稳定成长期航标",
      completedMilestones: 1,
      totalMilestones: 3,
    });
  });

  it("shows the remaining returns and parked resonance for the next route segment", () => {
    const state = {
      ...createGameState(0),
      resonance: 2,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
      returnCount: 3,
    };

    expect(getReturnRouteReadback(state)).toMatchObject({
      current: "稳航校准",
      stageGoal:
        "归航目标：稳航校准 2/3，补 3 次归航 / 2 点额外共鸣进入深空归航",
      routeProgress: "本段进度：归航 3/6 · 额外共鸣 2/4",
      routeSummary:
        "航线摘要：2/3 稳航校准；当前收益：下轮起步可重建 1 台自动采集器；距深空归航还差 3 次归航、2 点额外共鸣；按当前路线再归航 3 次即可进入深空归航",
      currentPayoff:
        "当前收益：余辉开局已稳定，下轮起步可立即重建 1 台自动采集器",
      progressSummary: "距深空归航还差 3 次归航、2 点额外共鸣",
      actionHint:
        "下一步：继续重建工坊并执行 3 次星尘归航，同时保留 2 点额外共鸣",
      cadenceForecast: "节奏预判：按当前路线再归航 3 次即可进入深空归航",
      routeMap:
        "航线图：余辉起航 -> 稳航校准 -> 深空归航；当前位于稳航校准",
      nextPreview: "达成后进入深空归航：后续归航会转为长期储备",
    });
  });

  it("forecasts the parked resonance still needed after the remaining returns", () => {
    const state = {
      ...createGameState(0),
      resonance: 2,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
      returnCount: 5,
    };

    expect(getReturnRouteReadback(state)).toMatchObject({
      current: "稳航校准",
      stageGoal:
        "归航目标：稳航校准 2/3，补 1 次归航 / 2 点额外共鸣进入深空归航",
      progressSummary: "距深空归航还差 1 次归航、2 点额外共鸣",
      actionHint:
        "下一步：继续重建工坊并执行 1 次星尘归航，同时保留 2 点额外共鸣",
      cadenceForecast:
        "节奏预判：再归航 1 次后，还需保留 1 点额外共鸣才能进入深空归航",
    });
  });

  it("caps the quantified route payoff at the first three rebuilt collectors", () => {
    const state = {
      ...createGameState(0),
      resonance: 5,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
      returnCount: 3,
    };

    expect(getReturnRouteReadback(state)).toMatchObject({
      current: "稳航校准",
      routeSummary:
        "航线摘要：2/3 稳航校准；当前收益：下轮起步可重建 3 台自动采集器；距深空归航还差 3 次归航；按当前路线再归航 3 次即可进入深空归航",
      currentPayoff:
        "当前收益：余辉开局已稳定，下轮起步可立即重建 3 台自动采集器",
    });
  });

  it("points at return count when parked resonance is already enough", () => {
    const state = {
      ...createGameState(0),
      resonance: 4,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
      returnCount: 4,
    };

    expect(getReturnRouteReadback(state)).toMatchObject({
      current: "稳航校准",
      stageGoal: "归航目标：稳航校准 2/3，补 2 次归航进入深空归航",
      progressSummary: "距深空归航还差 2 次归航",
      actionHint: "下一步：额外共鸣已够，继续执行 2 次星尘归航",
      cadenceForecast: "节奏预判：按当前路线再归航 2 次即可进入深空归航",
    });
  });

  it("points at parked resonance when return count is already enough", () => {
    const state = {
      ...createGameState(0),
      resonance: 3,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
      returnCount: 6,
    };

    expect(getReturnRouteReadback(state)).toMatchObject({
      current: "稳航校准",
      stageGoal:
        "归航目标：稳航校准 2/3，补 1 点额外共鸣进入深空归航",
      progressSummary: "距深空归航还差 1 点额外共鸣",
      actionHint: "下一步：归航次数已够，继续归航补足 1 点额外共鸣",
      cadenceForecast: "节奏预判：归航次数已达标，只差 1 点额外共鸣即可进入深空归航",
    });
  });

  it("caps the route at three long-term milestones", () => {
    const state = {
      ...createGameState(0),
      resonance: 5,
      unlockedResonanceNodes: ["stable-circuit", "return-coil"],
      returnCount: 6,
    };

    expect(getReturnRouteReadback(state)).toEqual({
      current: "深空归航",
      description: "三段航线已贯通；后续归航继续沉淀为未来版本的长期方向。",
      stageGoal:
        "归航目标：深空归航 3/3，长期储备 6 次归航 / 5 点额外共鸣",
      routeProgress:
        "本段进度：航线 3/3 已贯通 · 长期储备：6 次归航 / 5 点额外共鸣",
      routeSummary:
        "航线摘要：3/3 深空归航；长期储备：6 次归航 / 5 点额外共鸣，后续归航继续累积",
      currentPayoff:
        "当前收益：三段航线已贯通，当前 5 点额外共鸣会作为后续版本储备",
      nextRequirement: "航线已贯通：继续归航，为后续版本储备共鸣",
      progressSummary: "航线已贯通：后续归航都会成为长期储备",
      actionHint: "下一步：继续归航，把额外共鸣留作后续版本储备",
      cadenceForecast: "节奏预判：航线已贯通，后续归航进入长期储备",
      routeMap:
        "航线图：余辉起航 -> 稳航校准 -> 深空归航已贯通；后续归航进入长期储备",
      nextPreview: "航线已贯通：没有下一段，继续储备后续版本",
      completedMilestones: 3,
      totalMilestones: 3,
    });
  });
});
