import type { GameState } from "./game";
import { MAX_UNLOCKED_RESONANCE_NODES } from "./resonance";

export type ReturnRouteReadback = {
  current: string;
  description: string;
  nextRequirement: string;
  progressSummary: string;
  completedMilestones: number;
  totalMilestones: 3;
};

const TOTAL_RETURN_ROUTE_MILESTONES = 3;

export function getReturnRouteReadback(
  state: GameState,
): ReturnRouteReadback | null {
  if (
    state.returnCount <= 0 ||
    state.unlockedResonanceNodes.length < MAX_UNLOCKED_RESONANCE_NODES
  ) {
    return null;
  }

  const parkedResonance = Math.max(0, state.resonance);

  if (state.returnCount >= 6 && parkedResonance >= 4) {
    return {
      current: "深空归航",
      description: "三段航线已贯通；后续归航继续沉淀为未来版本的长期方向。",
      nextRequirement: "航线已贯通：继续归航，为后续版本储备共鸣",
      progressSummary: "航线已贯通：后续归航都会成为长期储备",
      completedMilestones: 3,
      totalMilestones: TOTAL_RETURN_ROUTE_MILESTONES,
    };
  }

  if (state.returnCount >= 3 && parkedResonance >= 2) {
    return {
      current: "稳航校准",
      description: "余辉已经能重建开局采集器，继续归航会把路线推向深空段。",
      nextRequirement: "下一段：累计 6 次归航，并保留 4 点额外共鸣",
      progressSummary: formatRouteProgressGap(state, 6, 4),
      completedMilestones: 2,
      totalMilestones: TOTAL_RETURN_ROUTE_MILESTONES,
    };
  }

  return {
    current: "余辉起航",
    description: "重复归航已能带回起步星尘，下一步把余辉稳定成长期航标。",
    nextRequirement: "下一段：累计 3 次归航，并保留 2 点额外共鸣",
    progressSummary: formatRouteProgressGap(state, 3, 2),
    completedMilestones: 1,
    totalMilestones: TOTAL_RETURN_ROUTE_MILESTONES,
  };
}

function formatRouteProgressGap(
  state: GameState,
  targetReturnCount: number,
  targetParkedResonance: number,
): string {
  const remainingReturns = Math.max(0, targetReturnCount - state.returnCount);
  const remainingResonance = Math.max(0, targetParkedResonance - state.resonance);
  const parts = [];

  if (remainingReturns > 0) {
    parts.push(`${remainingReturns} 次归航`);
  }

  if (remainingResonance > 0) {
    parts.push(`${remainingResonance} 点额外共鸣`);
  }

  if (parts.length === 0) {
    return "距下一段已满足条件，继续归航刷新航线";
  }

  return `距下一段还差 ${parts.join("、")}`;
}
