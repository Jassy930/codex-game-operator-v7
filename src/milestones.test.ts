import { getAutoCollectorMilestone, getWorkshopStage } from "./milestones";

describe("auto collector milestones", () => {
  it("targets the second auto collector before the first milestone is complete", () => {
    expect(getAutoCollectorMilestone(0)).toEqual({
      current: 0,
      target: 2,
    });
    expect(getAutoCollectorMilestone(1)).toEqual({
      current: 1,
      target: 2,
    });
  });

  it("moves to a larger visible target after two auto collectors", () => {
    expect(getAutoCollectorMilestone(2)).toEqual({
      current: 2,
      target: 5,
    });
    expect(getAutoCollectorMilestone(3)).toEqual({
      current: 3,
      target: 5,
    });
  });
});

describe("workshop stages", () => {
  it("starts at a spark bench with the first stage target", () => {
    expect(getWorkshopStage(0, 0)).toEqual({
      name: "火花工作台",
      description: "先让自动采集器稳定运转。",
      nextRequirement: "下一阶段：拥有 3 台自动采集器，开启星尘小间",
    });
  });

  it("moves through tuning and sustained production stages", () => {
    expect(getWorkshopStage(3, 0)).toEqual({
      name: "星尘小间",
      description: "自动采集器已经成组工作，下一步是调校效率。",
      nextRequirement: "下一阶段：完成 2 次调校，进入稳定工坊",
    });
    expect(getWorkshopStage(6, 2)).toEqual({
      name: "稳定工坊",
      description: "数量和效率开始叠加，工坊进入持续产出。",
      nextRequirement:
        "下一阶段：拥有 10 台自动采集器并完成 4 次调校，点亮星尘引擎室",
    });
    expect(getWorkshopStage(10, 4)).toEqual({
      name: "星尘引擎室",
      description: "工坊已经形成第一条长期生产线。",
      nextRequirement: "长期目标：离开一会儿再回来，查看引擎室积累的离线星尘",
    });
  });
});
