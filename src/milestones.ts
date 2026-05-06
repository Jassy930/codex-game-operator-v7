export type MilestoneProgress = {
  current: number;
  target: number;
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
