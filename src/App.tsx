import { useEffect, useMemo, useState } from "react";
import {
  buyAutoCollector,
  clickForDust,
  createGameState,
  hydrateGameState,
  serializeGameState,
  tickGame,
  type GameState,
} from "./game";

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
          <button className="primary-action" onClick={() => setState(clickForDust)}>
            采集 +{formatNumber(state.dustPerClick)}
          </button>
          <button
            className="upgrade-action"
            disabled={!canBuyAutoCollector}
            onClick={() => setState(buyAutoCollector)}
          >
            自动采集器 {formatNumber(state.nextAutoCollectorCost)}
          </button>
        </div>

        <div className="progress-block">
          <div className="progress-label">
            <span>下个目标</span>
            <span>{Math.floor(progressToUpgrade)}%</span>
          </div>
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
