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
      completedMilestones: 3,
      totalMilestones: 3,
    });
  });
});
