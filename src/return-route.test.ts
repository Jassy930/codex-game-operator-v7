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
      nextRequirement: "下一段：累计 3 次归航，并保留 2 点额外共鸣",
      progressSummary: "距下一段还差 1 次归航、1 点额外共鸣",
      actionHint:
        "下一步：继续重建工坊并执行 1 次星尘归航，同时保留 1 点额外共鸣",
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
      progressSummary: "距下一段还差 3 次归航、2 点额外共鸣",
      actionHint:
        "下一步：继续重建工坊并执行 3 次星尘归航，同时保留 2 点额外共鸣",
      nextPreview: "达成后进入深空归航：后续归航会转为长期储备",
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
      progressSummary: "距下一段还差 2 次归航",
      actionHint: "下一步：额外共鸣已够，继续执行 2 次星尘归航",
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
      progressSummary: "距下一段还差 1 点额外共鸣",
      actionHint: "下一步：归航次数已够，继续归航补足 1 点额外共鸣",
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
      nextRequirement: "航线已贯通：继续归航，为后续版本储备共鸣",
      progressSummary: "航线已贯通：后续归航都会成为长期储备",
      actionHint: "下一步：继续归航，把额外共鸣留作后续版本储备",
      nextPreview: "航线已贯通：没有下一段，继续储备后续版本",
      completedMilestones: 3,
      totalMilestones: 3,
    });
  });
});
