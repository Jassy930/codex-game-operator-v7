import { useEffect, useMemo, useState } from "react";
import { createFeedbackIssueUrl, recordFeedbackClick } from "./feedback";
import {
  buyAutoCollector,
  clickForDust,
  createGameState,
  hydrateGameState,
  serializeGameState,
  tickGame,
  type GameState,
} from "./game";
import {
  recordPlayerClick,
  recordSessionEnd,
  recordUpgradePurchase,
  startMetricsSession,
} from "./metrics";
import { getAutoCollectorMilestone } from "./milestones";

const SAVE_KEY = "stardust-workshop-save-v1";

export function App() {
  const [state, setState] = useState<GameState>(() => loadGame());

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
  const progressToUpgrade = useMemo(() => {
    return Math.min(100, (state.dust / state.nextAutoCollectorCost) * 100);
  }, [state.dust, state.nextAutoCollectorCost]);
  const milestone = getAutoCollectorMilestone(state.autoCollectors);
  const feedbackUrl = useMemo(() => createFeedbackIssueUrl(), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      startMetricsSession(window.localStorage);
    }
  }, []);

  useEffect(() => {
    function handlePageHide() {
      recordSessionEnd(window.localStorage);
    }

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  function handleCollectClick() {
    if (typeof window !== "undefined") {
      recordPlayerClick(window.localStorage);
    }

    setState(clickForDust);
  }

  function handleUpgradeClick() {
    setState((current) => {
      const next = buyAutoCollector(current);
      if (next !== current && typeof window !== "undefined") {
        recordUpgradePurchase(window.localStorage);
      }

      return next;
    });
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
        </div>

        <div className="progress-block">
          <div className="progress-label">
            <span>下个目标</span>
            <span>{Math.floor(progressToUpgrade)}%</span>
          </div>
          <p className="goal-hint">目标：攒够星尘，购买第一个自动采集器</p>
          <p className="milestone-hint">
            里程碑：{milestone.current} / {milestone.target} 台自动采集器
          </p>
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
            <dt>点击收益</dt>
            <dd>{formatNumber(state.dustPerClick)}</dd>
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

function loadGame(): GameState {
  if (typeof window === "undefined") {
    return createGameState(0);
  }

  return hydrateGameState(window.localStorage.getItem(SAVE_KEY));
}

function formatNumber(value: number): string {
  return value.toLocaleString("zh-CN", {
    maximumFractionDigits: 1,
  });
}
