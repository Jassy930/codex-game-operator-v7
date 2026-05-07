export type MilestoneProgress = {
  current: number;
  target: number;
};

export type WorkshopStage = {
  name: string;
  description: string;
  nextRequirement: string;
};

export function getAutoCollectorMilestone(autoCollectors: number): MilestoneProgress {
  const current = Math.max(0, Math.floor(autoCollectors));

  if (current < 2) {
    return { current, target: 2 };
  }

  if (current < 5) {
    return { current, target: 5 };
  }

  const target = Math.ceil((current + 1) / 5) * 5;
  return { current, target };
}

export function getWorkshopStage(
  autoCollectors: number,
  efficiencyLevel: number,
): WorkshopStage {
  const collectors = Math.max(0, Math.floor(autoCollectors));
  const tuning = Math.max(0, Math.floor(efficiencyLevel));

  if (collectors >= 10 && tuning >= 4) {
    return {
      name: "星尘引擎室",
      description: "工坊已经形成第一条长期生产线。",
      nextRequirement: "v0.2 阶段目标已达成：继续观察 15 分钟后的回访节奏",
    };
  }

  if (collectors >= 5 && tuning >= 2) {
    return {
      name: "稳定工坊",
      description: "数量和效率开始叠加，工坊进入持续产出。",
      nextRequirement:
        "下一阶段：拥有 10 台自动采集器并完成 4 次调校，点亮星尘引擎室",
    };
  }

  if (collectors >= 3) {
    return {
      name: "星尘小间",
      description: "自动采集器已经成组工作，下一步是调校效率。",
      nextRequirement: "下一阶段：完成 2 次调校，进入稳定工坊",
    };
  }

  return {
    name: "火花工作台",
    description: "先让自动采集器稳定运转。",
    nextRequirement: "下一阶段：拥有 3 台自动采集器，开启星尘小间",
  };
}
