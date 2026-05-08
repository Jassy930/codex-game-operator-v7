import type { GameState } from "./game";
import { MAX_UNLOCKED_RESONANCE_NODES } from "./resonance";

export type ReturnRouteReadback = {
  current: string;
  description: string;
  routeSummary: string;
  currentPayoff: string;
  nextRequirement: string;
  progressSummary: string;
  actionHint: string;
  cadenceForecast: string;
  routeMap: string;
  nextPreview: string;
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
      routeSummary:
        "航线摘要：3/3 深空归航；航线已贯通，后续归航都会成为长期储备",
      currentPayoff:
        "当前收益：三段航线已贯通，额外共鸣会作为后续版本储备",
      nextRequirement: "航线已贯通：继续归航，为后续版本储备共鸣",
      progressSummary: "航线已贯通：后续归航都会成为长期储备",
      actionHint: "下一步：继续归航，把额外共鸣留作后续版本储备",
      cadenceForecast: "节奏预判：航线已贯通，后续归航进入长期储备",
      routeMap:
        "航线图：余辉起航 -> 稳航校准 -> 深空归航已贯通；后续归航进入长期储备",
      nextPreview: "航线已贯通：没有下一段，继续储备后续版本",
      completedMilestones: 3,
      totalMilestones: TOTAL_RETURN_ROUTE_MILESTONES,
    };
  }

  if (state.returnCount >= 3 && parkedResonance >= 2) {
    const progressSummary = formatRouteProgressGap(state, 6, 4);
    const cadenceForecast = formatRouteCadenceForecast(state, 6, 4);

    return {
      current: "稳航校准",
      description: "余辉已经能重建开局采集器，继续归航会把路线推向深空段。",
      routeSummary: formatRouteSummary(
        2,
        "稳航校准",
        "重建时间继续压缩",
        progressSummary,
        cadenceForecast,
      ),
      currentPayoff:
        "当前收益：余辉开局已稳定，重复归航会继续压缩重建时间",
      nextRequirement: "下一段：累计 6 次归航，并保留 4 点额外共鸣",
      progressSummary,
      actionHint: formatRouteActionHint(state, 6, 4),
      cadenceForecast,
      routeMap: formatRouteMap("稳航校准"),
      nextPreview: "达成后进入深空归航：后续归航会转为长期储备",
      completedMilestones: 2,
      totalMilestones: TOTAL_RETURN_ROUTE_MILESTONES,
    };
  }

  const progressSummary = formatRouteProgressGap(state, 3, 2);
  const cadenceForecast = formatRouteCadenceForecast(state, 3, 2);

  return {
    current: "余辉起航",
    description: "重复归航已能带回起步星尘，下一步把余辉稳定成长期航标。",
    routeSummary: formatRouteSummary(
      1,
      "余辉起航",
      "起步星尘已生效",
      progressSummary,
      cadenceForecast,
    ),
    currentPayoff: "当前收益：额外共鸣已能转成下一轮起步星尘",
    nextRequirement: "下一段：累计 3 次归航，并保留 2 点额外共鸣",
    progressSummary,
    actionHint: formatRouteActionHint(state, 3, 2),
    cadenceForecast,
    routeMap: formatRouteMap("余辉起航"),
    nextPreview: "达成后进入稳航校准：余辉重建节奏会稳定成长期航标",
    completedMilestones: 1,
    totalMilestones: TOTAL_RETURN_ROUTE_MILESTONES,
  };
}

function formatRouteSummary(
  completedMilestones: 1 | 2,
  current: "余辉起航" | "稳航校准",
  payoffSummary: string,
  progressSummary: string,
  cadenceForecast: string,
): string {
  const cadence = cadenceForecast.replace(/^节奏预判：/, "");
  return `航线摘要：${completedMilestones}/${TOTAL_RETURN_ROUTE_MILESTONES} ${current}；当前收益：${payoffSummary}；${progressSummary}；${cadence}`;
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

function formatRouteActionHint(
  state: GameState,
  targetReturnCount: number,
  targetParkedResonance: number,
): string {
  const remainingReturns = Math.max(0, targetReturnCount - state.returnCount);
  const remainingResonance = Math.max(0, targetParkedResonance - state.resonance);

  if (remainingReturns > 0 && remainingResonance > 0) {
    return `下一步：继续重建工坊并执行 ${remainingReturns} 次星尘归航，同时保留 ${remainingResonance} 点额外共鸣`;
  }

  if (remainingReturns > 0) {
    return `下一步：额外共鸣已够，继续执行 ${remainingReturns} 次星尘归航`;
  }

  if (remainingResonance > 0) {
    return `下一步：归航次数已够，继续归航补足 ${remainingResonance} 点额外共鸣`;
  }

  return "下一步：条件已满足，执行下一次归航刷新航线";
}

function formatRouteCadenceForecast(
  state: GameState,
  targetReturnCount: number,
  targetParkedResonance: number,
): string {
  const remainingReturns = Math.max(0, targetReturnCount - state.returnCount);
  const projectedResonance = state.resonance + remainingReturns;
  const remainingProjectedResonance = Math.max(
    0,
    targetParkedResonance - projectedResonance,
  );
  const currentRemainingResonance = Math.max(
    0,
    targetParkedResonance - state.resonance,
  );

  if (remainingReturns > 0 && remainingProjectedResonance === 0) {
    return `节奏预判：按当前路线再归航 ${remainingReturns} 次即可进入下一段`;
  }

  if (remainingReturns > 0) {
    return `节奏预判：再归航 ${remainingReturns} 次后，还需保留 ${remainingProjectedResonance} 点额外共鸣`;
  }

  if (currentRemainingResonance > 0) {
    return `节奏预判：归航次数已达标，只差 ${currentRemainingResonance} 点额外共鸣`;
  }

  return "节奏预判：条件已满足，执行下一次归航刷新航线";
}

function formatRouteMap(current: "余辉起航" | "稳航校准"): string {
  return `航线图：余辉起航 -> 稳航校准 -> 深空归航；当前位于${current}`;
}
