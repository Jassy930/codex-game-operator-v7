import { calculateAffordableAutoCollectors, type GameState } from "./game";
import { MAX_UNLOCKED_RESONANCE_NODES } from "./resonance";
import { calculateReturnAfterglowDust } from "./return";

export type ReturnRouteReadback = {
  current: string;
  description: string;
  stageGoal: string;
  routeProgress: string;
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
    const reserveSummary = formatCompletedRouteReserve(state);

    return {
      current: "深空归航",
      description: "三段航线已贯通；后续归航会继续点亮深空信标储备。",
      stageGoal: formatCompletedRouteStageGoal(state),
      routeProgress: `本段进度：航线 ${TOTAL_RETURN_ROUTE_MILESTONES}/${TOTAL_RETURN_ROUTE_MILESTONES} 已贯通 · ${reserveSummary}`,
      routeSummary: `航线摘要：3/3 深空归航；${reserveSummary}，继续归航会点亮信标`,
      currentPayoff:
        `当前收益：三段航线已贯通，当前 ${parkedResonance} 点额外共鸣会沉淀为深空信标储备`,
      nextRequirement: "航线已贯通：继续归航，点亮更多深空信标储备",
      progressSummary: "航线已贯通：后续归航都会沉淀为深空信标储备",
      actionHint: "下一步：继续归航，把额外共鸣沉淀为深空信标储备",
      cadenceForecast: "节奏预判：航线已贯通，后续归航会继续点亮信标储备",
      routeMap:
        "航线图：余辉起航 -> 稳航校准 -> 深空归航已贯通；后续归航点亮深空信标储备",
      nextPreview: "航线已贯通：继续积累深空信标储备，等待下一条航线",
      completedMilestones: 3,
      totalMilestones: TOTAL_RETURN_ROUTE_MILESTONES,
    };
  }

  if (state.returnCount >= 3 && parkedResonance >= 2) {
    const progressSummary = formatRouteProgressGap(state, 6, 4, "深空归航");
    const cadenceForecast = formatRouteCadenceForecast(
      state,
      6,
      4,
      "深空归航",
    );
    const payoffSummary = formatRoutePayoffSummary(state);

    return {
      current: "稳航校准",
      description: "余辉已经能重建开局采集器，继续归航会把路线推向深空段。",
      stageGoal: formatRouteStageGoal(
        2,
        "稳航校准",
        state,
        6,
        4,
        "深空归航",
      ),
      routeProgress: formatRouteProgress(state, 6, 4),
      routeSummary: formatRouteSummary(
        2,
        "稳航校准",
        payoffSummary,
        progressSummary,
        cadenceForecast,
      ),
      currentPayoff: `当前收益：余辉开局已稳定，${formatRoutePayoffImmediate(
        state,
        "下轮起步",
      )}`,
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

  const progressSummary = formatRouteProgressGap(state, 3, 2, "稳航校准");
  const cadenceForecast = formatRouteCadenceForecast(
    state,
    3,
    2,
    "稳航校准",
  );
  const payoffSummary = formatRoutePayoffSummary(state);

  return {
    current: "余辉起航",
    description: "重复归航已能带回起步星尘，下一步把余辉稳定成长期航标。",
    stageGoal: formatRouteStageGoal(
      1,
      "余辉起航",
      state,
      3,
      2,
      "稳航校准",
    ),
    routeProgress: formatRouteProgress(state, 3, 2),
    routeSummary: formatRouteSummary(
      1,
      "余辉起航",
      payoffSummary,
      progressSummary,
      cadenceForecast,
    ),
    currentPayoff: `当前收益：额外共鸣会转成下一轮起步星尘，${formatRoutePayoffImmediate(
      state,
    )}`,
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

function formatCompletedRouteReserve(state: GameState): string {
  return `深空信标储备：${state.returnCount} 次归航 / ${Math.max(
    0,
    state.resonance,
  )} 点额外共鸣`;
}

function formatCompletedRouteStageGoal(state: GameState): string {
  const reserveSummary = formatCompletedRouteReserve(state).replace("：", " ");

  return `归航目标：深空归航 ${TOTAL_RETURN_ROUTE_MILESTONES}/${TOTAL_RETURN_ROUTE_MILESTONES}，${reserveSummary}`;
}

function formatRouteStageGoal(
  completedMilestones: 1 | 2,
  current: "余辉起航" | "稳航校准",
  state: GameState,
  targetReturnCount: number,
  targetParkedResonance: number,
  targetRouteName: "稳航校准" | "深空归航",
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
    return `归航目标：${current} ${completedMilestones}/${TOTAL_RETURN_ROUTE_MILESTONES}，条件已满足，执行归航进入${targetRouteName}`;
  }

  return `归航目标：${current} ${completedMilestones}/${TOTAL_RETURN_ROUTE_MILESTONES}，补 ${parts.join(
    " / ",
  )}进入${targetRouteName}`;
}

function formatRoutePayoffSummary(state: GameState): string {
  const rebuildCount = calculateRoutePayoffRebuildCount(state);

  if (rebuildCount <= 0) {
    return "额外共鸣尚未形成起步星尘";
  }

  return `下轮起步可重建 ${rebuildCount} 台自动采集器`;
}

function formatRouteProgress(
  state: GameState,
  targetReturnCount: number,
  targetParkedResonance: number,
): string {
  const currentReturnCount = Math.min(state.returnCount, targetReturnCount);
  const currentParkedResonance = Math.min(
    Math.max(0, state.resonance),
    targetParkedResonance,
  );

  return `本段进度：归航 ${currentReturnCount}/${targetReturnCount} · 额外共鸣 ${currentParkedResonance}/${targetParkedResonance}`;
}

function formatRoutePayoffImmediate(
  state: GameState,
  prefix = "",
): string {
  const rebuildCount = calculateRoutePayoffRebuildCount(state);

  if (rebuildCount <= 0) {
    return "尚未形成可立即重建的起步星尘";
  }

  return `${prefix}可立即重建 ${rebuildCount} 台自动采集器`;
}

function calculateRoutePayoffRebuildCount(state: GameState): number {
  const rebuildCount = calculateAffordableAutoCollectors(
    calculateReturnAfterglowDust(state),
  );

  return rebuildCount;
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
  targetRouteName: "稳航校准" | "深空归航",
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
    return `${targetRouteName}条件已满足，继续归航刷新航线`;
  }

  return `距${targetRouteName}还差 ${parts.join("、")}`;
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
  targetRouteName: "稳航校准" | "深空归航",
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
    return `节奏预判：按当前路线再归航 ${remainingReturns} 次即可进入${targetRouteName}`;
  }

  if (remainingReturns > 0) {
    return `节奏预判：再归航 ${remainingReturns} 次后，还需保留 ${remainingProjectedResonance} 点额外共鸣才能进入${targetRouteName}`;
  }

  if (currentRemainingResonance > 0) {
    return `节奏预判：归航次数已达标，只差 ${currentRemainingResonance} 点额外共鸣即可进入${targetRouteName}`;
  }

  return `节奏预判：条件已满足，执行下一次归航进入${targetRouteName}`;
}

function formatRouteMap(current: "余辉起航" | "稳航校准"): string {
  return `航线图：余辉起航 -> 稳航校准 -> 深空归航；当前位于${current}`;
}
