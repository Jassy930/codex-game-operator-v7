import { useEffect, useMemo, useRef, useState } from "react";
import { createFeedbackIssueUrl, recordFeedbackClick } from "./feedback";
import {
  buyAutoCollector,
  buyEfficiencyUpgrade,
  clickForDust,
  createGameState,
  hydrateGameStateWithReport,
  serializeGameState,
  tickGame,
  type GameState,
  type HydratedGameState,
} from "./game";
import {
  recordOfflineRewardClaimed,
  recordPlayerClick,
  recordSaveLoaded,
  recordSessionEnd,
  recordUpgradePurchase,
  startMetricsSession,
} from "./metrics";
import { getAutoCollectorMilestone, getWorkshopStage } from "./milestones";

const SAVE_KEY = "stardust-workshop-save-v1";

export function App() {
  const [loadedGame] = useState<HydratedGameState>(() => loadGame());
  const [state, setState] = useState<GameState>(loadedGame.state);
  const [offlineDust] = useState(loadedGame.offlineDust);
  const showOfflineDust = shouldShowOfflineDust(offlineDust);
  const [collectMessage, setCollectMessage] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const collectMessageTimer = useRef<number | null>(null);
  const purchaseMessageTimer = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setState((current) => tickGame(current));
    }, 250);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SAVE_KEY, serializeGameState(state));
    }
  }, [state]);

  const canBuyAutoCollector = state.dust >= state.nextAutoCollectorCost;
  const canBuyEfficiencyUpgrade =
    state.autoCollectors > 0 && state.dust >= state.nextEfficiencyUpgradeCost;
  const efficiencyUpgradeLabel =
    state.autoCollectors === 0
      ? "调校工具 · 需要先购买自动采集器"
      : `调校工具 · 自动采集效率 +10% · 需要 ${formatNumber(
          state.nextEfficiencyUpgradeCost,
        )} 星尘`;
  const progressToUpgrade = useMemo(() => {
    return Math.min(100, (state.dust / state.nextAutoCollectorCost) * 100);
  }, [state.dust, state.nextAutoCollectorCost]);
  const milestone = getAutoCollectorMilestone(state.autoCollectors);
  const workshopStage = getWorkshopStage(
    state.autoCollectors,
    state.autoCollectorEfficiencyLevel,
  );
  const goalHint = formatGoalHint(
    state.autoCollectors,
    state.autoCollectorEfficiencyLevel,
  );
  const feedbackUrl = useMemo(() => createFeedbackIssueUrl(), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      startMetricsSession(window.localStorage);
      if (loadedGame.saveLoaded) {
        recordSaveLoaded(window.localStorage);
      }
      if (showOfflineDust) {
        recordOfflineRewardClaimed(window.localStorage, offlineDust);
      }
    }
  }, [offlineDust, showOfflineDust]);

  useEffect(() => {
    function handlePageHide() {
      recordSessionEnd(window.localStorage);
    }

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  useEffect(() => {
    return () => {
      if (collectMessageTimer.current !== null) {
        window.clearTimeout(collectMessageTimer.current);
      }
      if (purchaseMessageTimer.current !== null) {
        window.clearTimeout(purchaseMessageTimer.current);
      }
    };
  }, []);

  function handleCollectClick() {
    if (typeof window !== "undefined") {
      recordPlayerClick(window.localStorage);
      showCollectMessage(formatCollectFeedbackMessage(state.dustPerClick));
    }

    setState(clickForDust);
  }

  function showCollectMessage(message: string) {
    setCollectMessage(message);
    if (collectMessageTimer.current !== null) {
      window.clearTimeout(collectMessageTimer.current);
    }

    collectMessageTimer.current = window.setTimeout(() => {
      setCollectMessage("");
      collectMessageTimer.current = null;
    }, 1800);
  }

  function handleUpgradeClick() {
    setState((current) => {
      const next = buyAutoCollector(current);
      if (next !== current && typeof window !== "undefined") {
        recordUpgradePurchase(window.localStorage);
        clearCollectMessage();
        showPurchaseMessage(formatAutoCollectorPurchaseMessage(next.dustPerSecond));
      }

      return next;
    });
  }

  function handleEfficiencyUpgradeClick() {
    setState((current) => {
      const next = buyEfficiencyUpgrade(current);
      if (next !== current && typeof window !== "undefined") {
        recordUpgradePurchase(window.localStorage);
        clearCollectMessage();
        showPurchaseMessage(formatEfficiencyUpgradeMessage(next.autoCollectorEfficiencyMultiplier));
      }

      return next;
    });
  }

  function showPurchaseMessage(message: string) {
    setPurchaseMessage(message);
    if (purchaseMessageTimer.current !== null) {
      window.clearTimeout(purchaseMessageTimer.current);
    }

    purchaseMessageTimer.current = window.setTimeout(() => {
      setPurchaseMessage("");
      purchaseMessageTimer.current = null;
    }, 2400);
  }

  function clearCollectMessage() {
    setCollectMessage("");
    if (collectMessageTimer.current !== null) {
      window.clearTimeout(collectMessageTimer.current);
      collectMessageTimer.current = null;
    }
  }

  function handleFeedbackClick() {
    if (typeof window !== "undefined") {
      recordFeedbackClick(window.localStorage);
    }
  }

  return (
    <main className="app-shell">
      <section className="game-panel" aria-labelledby="game-title">
        <div className="title-row">
          <div>
            <p className="eyebrow">第一版原型</p>
            <h1 id="game-title">星尘工坊</h1>
          </div>
          <p className="save-state">自动保存</p>
        </div>

        <div className="resource-readout" aria-live="polite">
          <span>星尘</span>
          <strong>{formatNumber(state.dust)}</strong>
          <small>每秒 +{formatNumber(state.dustPerSecond)}</small>
          <p className="motivation-copy">星尘会变成自动采集器，让工坊持续产出</p>
        </div>

        <div className="event-stack" aria-live="polite">
          {showOfflineDust ? (
            <p className="offline-gain">离线获得 {formatNumber(offlineDust)} 星尘</p>
          ) : null}

          {collectMessage ? <p className="collect-feedback">{collectMessage}</p> : null}

          {purchaseMessage ? <p className="purchase-feedback">{purchaseMessage}</p> : null}
        </div>

        <div className="action-row">
          <button className="primary-action" onClick={handleCollectClick}>
            采集 +{formatNumber(state.dustPerClick)}
          </button>
          <button
            className="upgrade-action"
            disabled={!canBuyAutoCollector}
            onClick={handleUpgradeClick}
          >
            购买自动采集器 · 需要 {formatNumber(state.nextAutoCollectorCost)} 星尘
          </button>
          <button
            className="upgrade-action"
            disabled={!canBuyEfficiencyUpgrade}
            onClick={handleEfficiencyUpgradeClick}
          >
            {efficiencyUpgradeLabel}
          </button>
        </div>

        <div className="progress-block">
          <div className="progress-label">
            <span>购买进度</span>
            <span>{Math.floor(progressToUpgrade)}%</span>
          </div>
          <p className="goal-hint">{goalHint}</p>
          <p className="milestone-hint">
            里程碑：{milestone.current} / {milestone.target} 台自动采集器
          </p>
          <p className="stage-hint">
            工坊阶段：{workshopStage.name} · {workshopStage.description}
          </p>
          <p className="stage-next">{workshopStage.nextRequirement}</p>
          <div className="progress-track" aria-hidden="true">
            <div style={{ width: `${progressToUpgrade}%` }} />
          </div>
        </div>

        <dl className="stats-grid">
          <div>
            <dt>自动采集器</dt>
            <dd>{state.autoCollectors}</dd>
          </div>
          <div>
            <dt>调校倍率</dt>
            <dd>{formatNumber(state.autoCollectorEfficiencyMultiplier)}x</dd>
          </div>
        </dl>

        <a
          className="feedback-link"
          href={feedbackUrl}
          target="_blank"
          rel="noreferrer"
          onClick={handleFeedbackClick}
        >
          反馈
        </a>
      </section>
    </main>
  );
}

function loadGame(): HydratedGameState {
  if (typeof window === "undefined") {
    return {
      state: createGameState(0),
      offlineDust: 0,
      saveLoaded: false,
    };
  }

  return hydrateGameStateWithReport(window.localStorage.getItem(SAVE_KEY));
}

function formatNumber(value: number): string {
  return value.toLocaleString("zh-CN", {
    maximumFractionDigits: 1,
  });
}

export function formatAutoCollectorPurchaseMessage(dustPerSecond: number): string {
  return `自动采集器启动：每秒星尘 +${formatNumber(dustPerSecond)}`;
}

export function formatGoalHint(
  autoCollectors: number,
  efficiencyLevel: number,
): string {
  if (autoCollectors === 0) {
    return "目标：攒够星尘，购买第一个自动采集器";
  }

  if (efficiencyLevel === 0) {
    return "目标：继续攒星尘，购买下一台自动采集器或第一次调校";
  }

  return "目标：扩建或调校，让每秒星尘继续提高";
}

export function shouldShowOfflineDust(offlineDust: number): boolean {
  return offlineDust >= 0.1;
}

export function formatCollectFeedbackMessage(dustPerClick: number): string {
  return `采集到 ${formatNumber(dustPerClick)} 星尘：正在推进下一台自动采集器`;
}

export function formatEfficiencyUpgradeMessage(multiplier: number): string {
  return `调校完成：自动采集效率 x${formatNumber(multiplier)}`;
}
