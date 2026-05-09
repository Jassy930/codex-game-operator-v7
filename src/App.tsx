import { useEffect, useMemo, useRef, useState } from "react";
import { createFeedbackIssueUrl, recordFeedbackClick } from "./feedback";
import {
  buyAutoCollector,
  buyEfficiencyUpgrade,
  calculateAffordableAutoCollectors,
  clickForDust,
  createGameState,
  getEffectiveAutoCollectorEfficiencyMultiplier,
  hydrateGameStateWithReport,
  recalculateProduction,
  serializeGameState,
  tickGame,
  type GameState,
  type HydratedGameState,
} from "./game";
import {
  createLocalMetricsSnapshot,
  recordOfflineRewardClaimed,
  recordPlayerClick,
  recordResonanceEarned,
  recordResonanceNodeUnlocked,
  recordSaveLoaded,
  recordSessionEnd,
  recordUpgradePurchase,
  startMetricsSession,
} from "./metrics";
import {
  getAutoCollectorMilestone,
  getWorkshopStage,
  type WorkshopStage,
} from "./milestones";
import {
  MAX_UNLOCKED_RESONANCE_NODES,
  claimResonanceMilestones,
  getResonanceMilestoneProgress,
  unlockResonanceNode,
  type ResonanceNodeId,
} from "./resonance";
import {
  calculateReturnAfterglowDust,
  canStardustReturn,
  performStardustReturn,
} from "./return";
import {
  getReturnRouteReadback,
  type ReturnRouteReadback,
} from "./return-route";
import autoCollectorArt from "./assets/auto-collector.webp";
import stardustCrystalArt from "./assets/stardust-crystal.webp";
import tuningToolArt from "./assets/tuning-tool.webp";

const SAVE_KEY = "stardust-workshop-save-v1";

declare global {
  interface Window {
    stardustWorkshopMetricsSnapshot?: () => ReturnType<typeof createLocalMetricsSnapshot>;
  }
}

export function App() {
  const [loadedGame] = useState<HydratedGameState>(() => loadGame());
  const [state, setState] = useState<GameState>(loadedGame.state);
  const [offlineDust] = useState(loadedGame.offlineDust);
  const showOfflineDust = shouldShowOfflineDust(offlineDust);
  const [collectMessage, setCollectMessage] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [openPanel, setOpenPanel] = useState<"stats" | "menu" | null>(null);
  const [sessionEvents, setSessionEvents] = useState<string[]>([]);
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
  const nextUpgradeTarget = useMemo(() => {
    return getNextUpgradeTarget(state);
  }, [
    state.autoCollectors,
    state.dust,
    state.dustPerSecond,
    state.nextAutoCollectorCost,
    state.nextEfficiencyUpgradeCost,
  ]);
  const milestone = getAutoCollectorMilestone(state.autoCollectors);
  const workshopStage = getWorkshopStage(
    state.autoCollectors,
    state.autoCollectorEfficiencyLevel,
  );
  const resonanceProgress = getResonanceMilestoneProgress(state);
  const canReturn = canStardustReturn(state);
  const showStardustReturnProgress =
    state.earnedResonanceMilestones.includes("first-resonance");
  const hasClaimedCurrentResonanceMilestone =
    state.earnedResonanceMilestones.includes(resonanceProgress.id);
  const hasLongTermResonanceState =
    state.resonance > 0 ||
    state.unlockedResonanceNodes.length > 0 ||
    state.returnCount > 0;
  const showResonanceMatrix =
    workshopStage.name === "星尘引擎室" || hasLongTermResonanceState;
  const canChooseResonanceNode =
    state.resonance > 0 &&
    state.unlockedResonanceNodes.length < MAX_UNLOCKED_RESONANCE_NODES;
  const hasParkedReturnResonance =
    state.resonance > 0 &&
    state.unlockedResonanceNodes.length >= MAX_UNLOCKED_RESONANCE_NODES;
  const returnAfterglowDust = calculateReturnAfterglowDust(state);
  const returnAfterglowRebuildCount =
    calculateAffordableAutoCollectors(returnAfterglowDust);
  const hasReturnAfterglowReadout =
    hasParkedReturnResonance && returnAfterglowDust > 0;
  const hasActiveReturnAfterglow =
    hasReturnAfterglowReadout && state.dust >= returnAfterglowDust;
  const returnRouteReadback = getReturnRouteReadback(state);
  const showResonanceChoiceStatus =
    canChooseResonanceNode ||
    state.unlockedResonanceNodes.length >= MAX_UNLOCKED_RESONANCE_NODES;
  const stageNextRequirement = formatWorkshopStageNextRequirement(
    workshopStage,
    showOfflineDust,
    canBuyAutoCollector || canBuyEfficiencyUpgrade,
    resonanceProgress.canClaim,
    state.unlockedResonanceNodes,
    nextUpgradeTarget,
    resonanceProgress.id,
    canChooseResonanceNode,
    canReturn,
    hasParkedReturnResonance,
    hasActiveReturnAfterglow,
    returnAfterglowRebuildCount,
    returnRouteReadback,
  );
  const goalHint = formatGoalHint(
    state.autoCollectors,
    state.autoCollectorEfficiencyLevel,
  );
  const currentGoal = formatCurrentGoal(goalHint);
  const feedbackUrl = useMemo(() => createFeedbackIssueUrl(), []);
  const effectiveEfficiencyMultiplier =
    getEffectiveAutoCollectorEfficiencyMultiplier(state);
  const nextEfficiencyMultiplier = getNextEfficiencyMultiplier(state);
  const nextUpgradeShortfall = Math.max(0, nextUpgradeTarget.cost - state.dust);
  const milestoneProgressPercent = Math.min(
    100,
    Math.floor((milestone.current / milestone.target) * 100),
  );
  const resonanceMilestoneReady = state.earnedResonanceMilestones.includes(
    "first-resonance",
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      startMetricsSession(window.localStorage);
      window.stardustWorkshopMetricsSnapshot = () =>
        createLocalMetricsSnapshot(window.localStorage);
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
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      delete window.stardustWorkshopMetricsSnapshot;
    };
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
    addSessionEvent(message);
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
        showPurchaseMessage(
          formatPurchaseFeedbackMessage(
            current,
            next,
            formatAutoCollectorPurchaseMessage(
              next.dustPerSecond,
              next.unlockedResonanceNodes.includes("stable-circuit"),
            ),
          ),
        );
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
        showPurchaseMessage(
          formatPurchaseFeedbackMessage(
            current,
            next,
            formatEfficiencyUpgradeMessage(
              getEffectiveAutoCollectorEfficiencyMultiplier(next),
              next.unlockedResonanceNodes.includes("tuning-engraving"),
            ),
          ),
        );
      }

      return next;
    });
  }

  function showPurchaseMessage(message: string) {
    setPurchaseMessage(message);
    addSessionEvent(message);
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

  function handleClaimResonanceClick() {
    setState((current) => {
      const next = claimResonanceMilestones(current);
      if (next !== current) {
        if (typeof window !== "undefined") {
          recordResonanceEarned(window.localStorage);
        }
        showPurchaseMessage("共鸣已聚合：获得 1 共鸣");
      }

      return next;
    });
  }

  function handleStardustReturnClick() {
    setState((current) => {
      const next = performStardustReturn(current);
      if (next !== current) {
        showPurchaseMessage(formatStardustReturnCompletionMessage(next, current));
      }

      return next;
    });
  }

  function handleUnlockResonanceNodeClick(nodeId: ResonanceNodeId) {
    setState((current) => {
      const unlocked = unlockResonanceNode(current, nodeId);
      if (unlocked !== current) {
        const next = recalculateProduction(unlocked);
        if (typeof window !== "undefined") {
          recordResonanceNodeUnlocked(window.localStorage);
        }
        showPurchaseMessage(
          formatResonanceNodeUnlockMessage(
            nodeId,
            next.unlockedResonanceNodes.length,
          ),
        );
        return next;
      }

      return current;
    });
  }

  function addSessionEvent(message: string) {
    setSessionEvents((current) => appendSessionEvent(current, message));
  }

  return (
    <div className="app-shell">
      <header className="top-hud" aria-label="星尘工坊 HUD">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            ◆
          </span>
          <div>
            <p className="eyebrow">Idle 控制台</p>
            <h1 id="game-title">星尘工坊</h1>
          </div>
        </div>
        <div className="hud-status">
          <span className="save-state">
            <span className="save-dot" aria-hidden="true" />
            自动保存中
          </span>
          <span className="hud-pill">阶段：{workshopStage.name}</span>
          <span className="hud-pill">共鸣 {state.resonance}</span>
          <span className="hud-pill">第 {state.returnCount} 次归航</span>
        </div>
        <div className="hud-actions" aria-label="功能入口">
          <button
            aria-expanded={openPanel === "stats"}
            aria-controls="stats-panel"
            type="button"
            className="icon-button"
            onClick={() =>
              setOpenPanel((current) => (current === "stats" ? null : "stats"))
            }
          >
            统计
          </button>
          <a
            className="icon-button feedback-link"
            href={feedbackUrl}
            target="_blank"
            rel="noreferrer"
            onClick={handleFeedbackClick}
          >
            反馈
          </a>
          <button type="button" className="icon-button">
            设置
          </button>
          <button
            aria-expanded={openPanel === "menu"}
            aria-controls="menu-panel"
            type="button"
            className="icon-button"
            onClick={() =>
              setOpenPanel((current) => (current === "menu" ? null : "menu"))
            }
          >
            菜单
          </button>
        </div>
        {openPanel === "stats" ? (
          <section
            className="hud-panel"
            id="stats-panel"
            aria-label="统计面板"
          >
            <div className="section-heading">
              <h2>统计面板</h2>
              <span>本地状态</span>
            </div>
            <dl className="hud-panel-grid">
              {formatStatsPanelRows(state).map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        <section
          className="hud-panel save-menu-panel"
          id="menu-panel"
          aria-label="保存管理菜单"
          hidden={openPanel !== "menu"}
        >
          <div className="section-heading">
            <h2>保存管理</h2>
            <span>本地存档</span>
          </div>
          <div className="save-menu-grid">
            <section>
              <h3>导出存档</h3>
              <p>只读展示当前本地存档内容，不自动复制剪贴板。</p>
              <textarea
                className="save-export-box"
                readOnly
                value={serializeGameState(state)}
                aria-label="导出存档内容"
              />
            </section>
            <section>
              <h3>导入存档</h3>
              <p>暂不实装导入，避免未经验证的文本破坏本地存档。</p>
            </section>
            <section>
              <h3>重置本地存档</h3>
              <p className="danger-hint">
                危险操作暂不执行。真正重置需要单独实现二次确认。
              </p>
            </section>
          </div>
        </section>
      </header>

      <main className="game-layout" aria-labelledby="game-title">
        <aside className="sidebar" aria-label="工坊导航">
          <nav className="nav-stack">
            <a
              aria-current="page"
              className="nav-item is-active"
              href="#engine-room"
            >
              <span>引擎室</span>
            </a>
            <a className="nav-item" href="#resonance-room">
              <span>共鸣室</span>
            </a>
            <a className="nav-item" href="#return-dock">
              <span>归航台</span>
            </a>
            <button
              aria-disabled="true"
              className="nav-item is-locked"
              type="button"
              disabled
            >
              <span>研究所</span>
              <small>研究所锁定</small>
            </button>
            <button
              aria-disabled="true"
              className="nav-item is-locked"
              type="button"
              disabled
            >
              <span>日志</span>
              <small>日志锁定</small>
            </button>
          </nav>
          <div className="guide-chip">
            <span>新手引导</span>
            <strong>{Math.min(state.autoCollectors + 1, 5)} / 7</strong>
          </div>
        </aside>

        <section className="main-column" id="engine-room">
          <section className="resource-core-card" aria-live="polite">
            <div className="resource-copy">
              <div className="resource-heading">
                <p className="eyebrow">星尘核心</p>
                <span className="info-chip">倍率 x{formatNumber(effectiveEfficiencyMultiplier)}</span>
              </div>
              <strong className="resource-number">{formatNumber(state.dust)}</strong>
              <span className="resource-unit">星尘</span>
              <p className="motivation-copy">
                星尘会变成自动采集器，让工坊持续产出
              </p>
              <dl className="core-metrics">
                <div>
                  <dt>每秒产出</dt>
                  <dd>+{formatNumber(state.dustPerSecond)}</dd>
                </div>
                <div>
                  <dt>每次点击</dt>
                  <dd>+{formatNumber(state.dustPerClick)}</dd>
                </div>
              </dl>
            </div>
            <img className="resource-art" src={stardustCrystalArt} alt="星尘晶体" />
          </section>

          <button className="collect-button" onClick={handleCollectClick}>
            采集星尘 +{formatNumber(state.dustPerClick)}
          </button>

          <section className="upgrade-grid" aria-label="工坊升级">
            <article className="upgrade-card auto-card">
              <img className="upgrade-art" src={autoCollectorArt} alt="自动采集器" />
              <div className="upgrade-copy">
                <div className="section-heading">
                  <h2>建造自动采集器</h2>
                  <span>Lv.{state.autoCollectors}</span>
                </div>
                <dl>
                  <div>
                    <dt>当前拥有</dt>
                    <dd>{state.autoCollectors} 台</dd>
                  </div>
                  <div>
                    <dt>每秒产出</dt>
                    <dd>+{formatNumber(state.dustPerSecond)}</dd>
                  </div>
                </dl>
                <button
                  className="upgrade-action cyan-action"
                  disabled={!canBuyAutoCollector}
                  onClick={handleUpgradeClick}
                >
                  {formatNumber(state.nextAutoCollectorCost)} 星尘
                </button>
                {!canBuyAutoCollector ? (
                  <small>{formatShortfall(state.dust, state.nextAutoCollectorCost)}</small>
                ) : null}
              </div>
            </article>

            <article className="upgrade-card tuning-card">
              <img className="upgrade-art" src={tuningToolArt} alt="调校工具" />
              <div className="upgrade-copy">
                <div className="section-heading">
                  <h2>调校工坊频率</h2>
                  <span>Lv.{state.autoCollectorEfficiencyLevel}</span>
                </div>
                <dl>
                  <div>
                    <dt>当前倍率</dt>
                    <dd>{formatNumber(effectiveEfficiencyMultiplier)}x</dd>
                  </div>
                  <div>
                    <dt>下一等级</dt>
                    <dd>{formatNumber(nextEfficiencyMultiplier)}x</dd>
                  </div>
                </dl>
                <button
                  className="upgrade-action violet-action"
                  disabled={!canBuyEfficiencyUpgrade}
                  onClick={handleEfficiencyUpgradeClick}
                >
                  {state.autoCollectors === 0
                    ? "需要先建造自动采集器"
                    : `${formatNumber(state.nextEfficiencyUpgradeCost)} 星尘`}
                </button>
                {!canBuyEfficiencyUpgrade ? <small>{efficiencyUpgradeLabel}</small> : null}
              </div>
            </article>
          </section>

          {showResonanceMatrix ? (
            <section
              className="resonance-panel"
              id="resonance-room"
              aria-labelledby="resonance-title"
            >
              <div className="resonance-header">
                <div>
                  <p className="eyebrow">中后期系统</p>
                  <h2 id="resonance-title">共鸣矩阵</h2>
                </div>
                <span className="hud-pill">可用共鸣：{state.resonance}</span>
              </div>
              {resonanceProgress.canClaim ? (
                <button className="resonance-claim" onClick={handleClaimResonanceClick}>
                  领取共鸣 +{resonanceProgress.resonanceReward}
                </button>
              ) : null}
              <p className="resonance-progress">
                {showStardustReturnProgress
                  ? formatStardustReturnProgressMessage(state, canReturn)
                  : formatResonanceProgressMessage(
                      resonanceProgress,
                      hasClaimedCurrentResonanceMilestone,
                    )}
              </p>
              {showStardustReturnProgress ? (
                <p className="return-description">
                  重启本轮工坊，保留共鸣和永久节点
                </p>
              ) : null}
              {showResonanceChoiceStatus ? (
                <p className="resonance-choice-hint">
                  {formatResonanceChoiceHint(state.unlockedResonanceNodes.length)}
                </p>
              ) : null}
              {hasReturnAfterglowReadout ? (
                <div className="return-afterglow-readout" aria-label="归航余辉读回">
                  <div className="return-afterglow-stats">
                    <div>
                      <span>起步星尘</span>
                      <strong>{formatNumber(returnAfterglowDust)}</strong>
                    </div>
                    <div>
                      <span>可重建</span>
                      <strong>{returnAfterglowRebuildCount} 台</strong>
                    </div>
                  </div>
                  {hasActiveReturnAfterglow ? (
                    <p>
                      共鸣余辉：额外共鸣让新一轮从 {formatNumber(returnAfterglowDust)}{" "}
                      星尘起步，可立即重建 {returnAfterglowRebuildCount} 台自动采集器
                    </p>
                  ) : (
                    <p>
                      共鸣余辉：本轮起步获得 {formatNumber(returnAfterglowDust)}{" "}
                      星尘；若已花掉，表示余辉已投入重建节奏，可支撑前{" "}
                      {returnAfterglowRebuildCount} 台自动采集器
                    </p>
                  )}
                </div>
              ) : hasParkedReturnResonance ? (
                <p className="resonance-choice-hint">
                  共鸣暂存：当前版本永久节点已满，额外共鸣会保留到后续版本
                </p>
              ) : null}
              {returnRouteReadback ? (
                <div className="return-route-readout" aria-label="归航航线读回">
                  <div className="return-route-heading">
                    <span>归航航线</span>
                    <strong>
                      航线 {returnRouteReadback.completedMilestones}/
                      {returnRouteReadback.totalMilestones} ·{" "}
                      {returnRouteReadback.current}
                    </strong>
                  </div>
                  <p>{returnRouteReadback.description}</p>
                  <p>{returnRouteReadback.routeProgress}</p>
                  <p>{returnRouteReadback.routeSummary}</p>
                  <p>{returnRouteReadback.currentPayoff}</p>
                  <p>{returnRouteReadback.nextRequirement}</p>
                  <p>{returnRouteReadback.progressSummary}</p>
                  <p>{returnRouteReadback.actionHint}</p>
                  <p>{returnRouteReadback.cadenceForecast}</p>
                  <p>{returnRouteReadback.routeMap}</p>
                  <p>{returnRouteReadback.nextPreview}</p>
                </div>
              ) : null}
              <div className="resonance-nodes">
                {RESONANCE_NODES.map((node) => {
                  const isUnlocked = state.unlockedResonanceNodes.includes(node.id);
                  const hasUsedResonanceChoice =
                    state.unlockedResonanceNodes.length >= 1;
                  const hasFilledResonanceChoices =
                    state.unlockedResonanceNodes.length >=
                    MAX_UNLOCKED_RESONANCE_NODES;
                  return (
                    <button
                      className={`resonance-node${isUnlocked ? " is-unlocked" : ""}`}
                      disabled={
                        isUnlocked ||
                        state.resonance < 1 ||
                        hasFilledResonanceChoices
                      }
                      key={node.id}
                      onClick={() => handleUnlockResonanceNodeClick(node.id)}
                    >
                      <span>{node.name}</span>
                      <small>
                        {formatResonanceNodeDescription(
                          node.description,
                          isUnlocked,
                          hasUsedResonanceChoice,
                          state.resonance > 0,
                          hasFilledResonanceChoices,
                        )}
                      </small>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : (
            <section className="resonance-panel is-locked-panel" id="resonance-room">
              <div className="resonance-header">
                <div>
                  <p className="eyebrow">中后期系统</p>
                  <h2>共鸣矩阵</h2>
                </div>
                <span className="hud-pill">未解锁</span>
              </div>
              <p className="resonance-progress">
                {formatResonanceProgressMessage(
                  resonanceProgress,
                  hasClaimedCurrentResonanceMilestone,
                )}
              </p>
            </section>
          )}
        </section>

        <aside className="side-column">
          <section className="goal-card panel-card">
            <div className="section-heading">
              <h2>当前目标</h2>
              <strong>{nextUpgradeTarget.progressPercent}%</strong>
            </div>
            <p className="goal-hint primary-goal">{currentGoal}</p>
            <div className="progress-track" aria-hidden="true">
              <div style={{ width: `${nextUpgradeTarget.progressPercent}%` }} />
            </div>
            <div className="goal-meta">
              <span>
                {nextUpgradeShortfall > 0
                  ? `还差 ${formatNumber(nextUpgradeShortfall)} 星尘`
                  : "资源已就绪"}
              </span>
            </div>
            <p className="upgrade-target">
              下一升级：{nextUpgradeTarget.label} · 需要{" "}
              {formatNumber(nextUpgradeTarget.cost)} 星尘
            </p>
          </section>

          <section className="workshop-status-card panel-card">
            <div className="section-heading">
              <h2>工坊状态</h2>
              <span>{workshopStage.name}</span>
            </div>
            <dl className="stats-grid">
              <div>
                <dt>自动采集器</dt>
                <dd>{state.autoCollectors} 台</dd>
              </div>
              <div>
                <dt>调校倍率</dt>
                <dd>{formatNumber(effectiveEfficiencyMultiplier)}x</dd>
              </div>
              <div>
                <dt>工坊等级</dt>
                <dd>
                  {milestone.current} / {milestone.target}
                </dd>
              </div>
            </dl>
            <p className="stage-next">{stageNextRequirement}</p>
            <div className="progress-track compact-track" aria-hidden="true">
              <div style={{ width: `${milestoneProgressPercent}%` }} />
            </div>
          </section>

          <section className="milestone-card panel-card">
            <div className="section-heading">
              <h2>里程碑</h2>
              <span>
                {milestone.current} / {milestone.target} 台
              </span>
            </div>
            <ul className="milestone-list">
              <li className={showResonanceMatrix ? "is-complete" : ""}>
                解锁「共鸣矩阵」
              </li>
              <li className={state.autoCollectorEfficiencyLevel > 0 ? "is-complete" : ""}>
                已提升自动采集器基础效率
              </li>
              <li className={state.returnCount > 0 ? "is-complete" : ""}>
                已完成星尘归航 {state.returnCount} 次
              </li>
              <li className={resonanceMilestoneReady ? "is-complete" : ""}>
                调校倍率达到 {formatNumber(resonanceProgress.tuning.current)} /{" "}
                {resonanceProgress.tuning.target}
              </li>
            </ul>
            <p className="milestone-hint">
              里程碑：{milestone.current} / {milestone.target} 台自动采集器
            </p>
          </section>

          <section className="event-log-card panel-card" aria-live="polite">
            <div className="section-heading">
              <h2>事件记录</h2>
              <span>即时反馈</span>
            </div>
            <div className="event-stack">
              {showOfflineDust ? (
                <p className="offline-gain">
                  离线获得 {formatNumber(offlineDust)} 星尘
                </p>
              ) : null}
              {collectMessage ? (
                <p className="collect-feedback">{collectMessage}</p>
              ) : null}
              {purchaseMessage ? (
                <p className="purchase-feedback">{purchaseMessage}</p>
              ) : null}
              {sessionEvents.length > 0 ? (
                <ul className="event-list" aria-label="本次操作记录">
                  {sessionEvents.map((event, index) => (
                    <li key={`${event}-${index}`}>{event}</li>
                  ))}
                </ul>
              ) : null}
              {!showOfflineDust &&
              !collectMessage &&
              !purchaseMessage &&
              sessionEvents.length === 0 ? (
                <p className="idle-event">工坊运行稳定，等待下一次操作</p>
              ) : null}
            </div>
          </section>

          <section className="return-card panel-card" id="return-dock">
            <div>
              <p className="eyebrow">长期循环</p>
              <h2>启动星尘归航</h2>
              <p className="return-description">
                重启本轮工坊，保留共鸣和永久节点。
              </p>
            </div>
            <p className="resonance-progress">
              {formatStardustReturnProgressMessage(state, canReturn)}
            </p>
            {hasReturnAfterglowReadout ? (
              <p className="return-description">
                共鸣余辉：新一轮从 {formatNumber(returnAfterglowDust)} 星尘起步
              </p>
            ) : null}
            <button
              className="return-action"
              disabled={!canReturn || canChooseResonanceNode}
              onClick={handleStardustReturnClick}
            >
              {canReturn && !canChooseResonanceNode
                ? "星尘归航 +1 共鸣"
                : "归航条件未完成"}
            </button>
          </section>

        </aside>
      </main>

      <nav className="bottom-nav" aria-label="移动端导航">
        <a className="is-active" href="#engine-room">
          引擎室
        </a>
        <a href="#resonance-room">共鸣室</a>
        <a href="#return-dock">归航台</a>
      </nav>
    </div>
  );
}

const RESONANCE_NODES: Array<{
  id: ResonanceNodeId;
  name: string;
  description: string;
}> = [
  {
    id: "stable-circuit",
    name: "稳定回路",
    description: "自动采集产出 +10%",
  },
  {
    id: "return-coil",
    name: "回访线圈",
    description: "离线收益 +10%",
  },
  {
    id: "tuning-engraving",
    name: "调校刻印",
    description: "调校倍率 +0.05",
  },
];

function formatResonanceNodeName(nodeId: ResonanceNodeId): string {
  return RESONANCE_NODES.find((node) => node.id === nodeId)?.name ?? nodeId;
}

export function formatResonanceNodeUnlockMessage(
  nodeId: ResonanceNodeId,
  unlockedNodeCount: number,
): string {
  const prefix =
    unlockedNodeCount >= 2 ? "第 2 个共鸣节点启动" : "共鸣节点启动";

  return `${prefix}：${formatResonanceNodeName(nodeId)} · ${formatResonanceNodeEffect(nodeId)}`;
}

function formatResonanceNodeDescription(
  description: string,
  isUnlocked: boolean,
  hasUsedResonanceChoice: boolean,
  hasAvailableResonance = false,
  hasFilledResonanceChoices = false,
): string {
  if (isUnlocked) {
    return `已启动 · ${description}`;
  }

  if (hasFilledResonanceChoices) {
    return `共鸣选择已满 · ${description}`;
  }

  if (hasAvailableResonance) {
    return description;
  }

  if (hasUsedResonanceChoice) {
    return `本轮已选择其他节点 · ${description}`;
  }

  return description;
}

function formatResonanceNodeEffect(nodeId: ResonanceNodeId): string {
  const node = RESONANCE_NODES.find((item) => item.id === nodeId);

  return node?.description ?? "永久效果已启动";
}

function formatResonanceChoiceHint(unlockedNodeCount: number): string {
  if (unlockedNodeCount >= MAX_UNLOCKED_RESONANCE_NODES) {
    return "共鸣选择：2/2 个永久节点已启动";
  }

  if (unlockedNodeCount === 0) {
    return "选择 1 个永久节点，本轮只能启动一个";
  }

  return "选择第 2 个永久节点，最多启动 2 个";
}

function formatResonanceProgressMessage(
  resonanceProgress: ReturnType<typeof getResonanceMilestoneProgress>,
  hasClaimedMilestone: boolean,
): string {
  const claimedPrefix = hasClaimedMilestone
    ? `${formatResonanceMilestoneLabel(resonanceProgress.id)}已领取 · `
    : "";

  return `共鸣门槛：${claimedPrefix}自动采集器 ${resonanceProgress.autoCollectors.current}/${resonanceProgress.autoCollectors.target}，调校 ${resonanceProgress.tuning.current}/${resonanceProgress.tuning.target}`;
}

function formatResonanceMilestoneLabel(milestoneId: string): string {
  return "首个共鸣";
}

function formatStardustReturnProgressMessage(
  state: GameState,
  canReturn: boolean,
): string {
  const autoCollectors = Math.min(Math.max(0, state.autoCollectors), 25);
  const tuning = Math.min(Math.max(0, state.autoCollectorEfficiencyLevel), 15);
  const prefix = canReturn ? "归航准备完成" : "归航准备";

  return `${prefix}：自动采集器 ${autoCollectors}/25，调校 ${tuning}/15`;
}

export function formatStardustReturnCompletionMessage(
  state: GameState,
  previousState: GameState | null = null,
): string {
  const returnRouteReadback = getReturnRouteReadback(state);

  if (returnRouteReadback) {
    const previousRouteReadback = previousState
      ? getReturnRouteReadback(previousState)
      : null;

    if (
      previousRouteReadback &&
      returnRouteReadback.completedMilestones >
        previousRouteReadback.completedMilestones
    ) {
      return `星尘归航完成：获得 1 共鸣；归航航线推进：进入${returnRouteReadback.current} ${returnRouteReadback.completedMilestones}/${returnRouteReadback.totalMilestones} · ${returnRouteReadback.currentPayoff}`;
    }

    return `星尘归航完成：获得 1 共鸣；归航航线更新：${returnRouteReadback.current} ${returnRouteReadback.completedMilestones}/${returnRouteReadback.totalMilestones} · ${returnRouteReadback.routeProgress} · ${returnRouteReadback.actionHint}`;
  }

  return "星尘归航完成：获得 1 共鸣，工坊回到新一轮火花工作台";
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

export function formatStatsPanelRows(state: GameState): Array<[string, string]> {
  return [
    ["每秒产出", `+${formatNumber(state.dustPerSecond)}`],
    ["自动采集器", `${state.autoCollectors} 台`],
    ["共鸣", formatNumber(state.resonance)],
    ["归航次数", formatNumber(state.returnCount)],
  ];
}

export function appendSessionEvent(
  events: string[],
  message: string,
  limit = 5,
): string[] {
  return [message, ...events].slice(0, Math.max(0, limit));
}

function formatShortfall(current: number, cost: number): string {
  const shortfall = Math.max(0, cost - current);

  if (shortfall <= 0) {
    return "资源已就绪";
  }

  return `还差 ${formatNumber(shortfall)} 星尘`;
}

function getNextEfficiencyMultiplier(state: GameState): number {
  if (state.autoCollectors === 0) {
    return getEffectiveAutoCollectorEfficiencyMultiplier(state);
  }

  const tuningEngravingBonus = state.unlockedResonanceNodes.includes(
    "tuning-engraving",
  )
    ? 0.05
    : 0;

  return Math.round(
    (state.autoCollectorEfficiencyMultiplier + 0.1 + tuningEngravingBonus) *
      10,
  ) / 10;
}

export function formatAutoCollectorPurchaseMessage(
  dustPerSecond: number,
  hasStableCircuit = false,
): string {
  if (hasStableCircuit) {
    return `稳定回路共振：自动采集每秒星尘 +${formatNumber(dustPerSecond)}`;
  }

  return `自动采集器启动：每秒星尘 +${formatNumber(dustPerSecond)}`;
}

export function formatPurchaseFeedbackMessage(
  current: GameState,
  next: GameState,
  fallbackMessage: string,
): string {
  const currentStage = getWorkshopStage(
    current.autoCollectors,
    current.autoCollectorEfficiencyLevel,
  );
  const nextStage = getWorkshopStage(
    next.autoCollectors,
    next.autoCollectorEfficiencyLevel,
  );

  if (currentStage.name !== nextStage.name) {
    return `工坊升级：${nextStage.name} · ${nextStage.description}`;
  }

  return fallbackMessage;
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

function formatCurrentGoal(goalHint: string): string {
  return goalHint.replace(/^目标：/, "");
}

export function shouldShowOfflineDust(offlineDust: number): boolean {
  return offlineDust >= 0.1;
}

export function formatWorkshopStageNextRequirement(
  workshopStage: WorkshopStage,
  hasVisibleOfflineReward: boolean,
  canSpendVisibleOfflineReward: boolean,
  canClaimResonance = false,
  unlockedResonanceNodes: string[] = [],
  nextUpgradeTarget?: { label: string; cost: number },
  claimableResonanceMilestoneId = "first-resonance",
  canChooseResonanceNode = false,
  canReturn = false,
  hasParkedReturnResonance = false,
  hasActiveReturnAfterglow = false,
  returnAfterglowRebuildCount = 0,
  returnRouteReadback: ReturnRouteReadback | null = null,
): string {
  if (canClaimResonance && workshopStage.name === "星尘引擎室") {
    return "共鸣目标：领取首个共鸣，再选择 1 个永久节点";
  }

  if (canChooseResonanceNode) {
    if (unlockedResonanceNodes.length >= 1) {
      return "归航目标：用共鸣启动永久节点，再推进下一轮工坊";
    }

    return "共鸣目标：选择 1 个永久节点，本轮只能启动一个";
  }

  if (returnRouteReadback) {
    return formatReturnRouteStageGoal(returnRouteReadback);
  }

  if (hasActiveReturnAfterglow) {
    return `归航目标：余辉可重建前 ${returnAfterglowRebuildCount} 台自动采集器，继续扩建到下一次归航`;
  }

  if (hasParkedReturnResonance) {
    return "归航目标：额外共鸣已暂存，等待后续版本扩展用途";
  }

  if (canReturn && workshopStage.name === "星尘引擎室") {
    if (unlockedResonanceNodes.length >= MAX_UNLOCKED_RESONANCE_NODES) {
      return "归航目标：永久节点已形成，继续归航积累共鸣";
    }

    return "归航目标：星尘归航，获得 1 共鸣并开启下一轮";
  }

  if (hasVisibleOfflineReward && workshopStage.name === "星尘引擎室") {
    if (unlockedResonanceNodes.includes("return-coil")) {
      if (!canSpendVisibleOfflineReward) {
        return "共鸣目标：回访线圈收益已投入工坊，继续攒下一次升级";
      }

      return "共鸣目标：回访线圈带回更多离线星尘，花掉收益继续扩建或调校";
    }

    if (!canSpendVisibleOfflineReward) {
      return "回访目标：离线收益已投入工坊，继续攒下一次升级";
    }

    return "回访目标：花掉离线星尘，继续扩建或调校引擎室";
  }

  const returnPlanningReadback = formatReturnPlanningReadback(
    unlockedResonanceNodes,
    canSpendVisibleOfflineReward,
    nextUpgradeTarget,
  );
  if (returnPlanningReadback && workshopStage.name === "星尘引擎室") {
    return returnPlanningReadback;
  }

  const selectedResonanceGoal = formatSelectedResonanceGoal(
    unlockedResonanceNodes,
  );
  if (selectedResonanceGoal && workshopStage.name === "星尘引擎室") {
    return selectedResonanceGoal;
  }

  return workshopStage.nextRequirement;
}

function formatReturnRouteStageGoal(readback: ReturnRouteReadback): string {
  return readback.stageGoal;
}

function formatReturnPlanningReadback(
  unlockedResonanceNodes: string[],
  canSpendNextUpgrade: boolean,
  nextUpgradeTarget?: {
    label: string;
    cost: number;
    dust?: number;
    dustPerSecond?: number;
    progressPercent?: number;
  },
): string {
  if (canSpendNextUpgrade || !nextUpgradeTarget) {
    return "";
  }

  const selectedNode = unlockedResonanceNodes[0];
  const nextUpgradeCopy = formatReturnPlanNextUpgradeCopy(nextUpgradeTarget);

  if (unlockedResonanceNodes.length >= 2) {
    const activeNodeCopies = unlockedResonanceNodes
      .map(formatResonancePlanValue)
      .filter(Boolean);

    if (activeNodeCopies.length >= 2) {
      const combinationName = formatResonanceCombinationName(unlockedResonanceNodes);
      const planPrefix =
        (nextUpgradeTarget.progressPercent ?? 0) >= 90
          ? "20 小时巡航"
          : "回访计划";
      const combinationPrefix = combinationName ? `${combinationName} · ` : "";
      return `${planPrefix}：${combinationPrefix}${activeNodeCopies.join("，")}，${nextUpgradeCopy}`;
    }
  }

  if (selectedNode === "stable-circuit") {
    return `回访计划：稳定回路正在放大自动采集，${nextUpgradeCopy}`;
  }

  if (selectedNode === "return-coil") {
    return `回访计划：回访线圈会放大离线收益，${nextUpgradeCopy}`;
  }

  if (selectedNode === "tuning-engraving") {
    return `回访计划：调校刻印已提高调校价值，${nextUpgradeCopy}`;
  }

  return "";
}

function formatResonancePlanValue(nodeId: string): string {
  if (nodeId === "stable-circuit") {
    return "稳定回路放大自动采集";
  }

  if (nodeId === "return-coil") {
    return "回访线圈放大离线收益";
  }

  if (nodeId === "tuning-engraving") {
    return "调校刻印提高调校价值";
  }

  return "";
}

function formatResonanceCombinationName(nodeIds: string[]): string {
  const nodeSet = new Set(nodeIds);

  if (nodeSet.has("stable-circuit") && nodeSet.has("return-coil")) {
    return "采集回访组合";
  }

  if (nodeSet.has("stable-circuit") && nodeSet.has("tuning-engraving")) {
    return "采集调校组合";
  }

  if (nodeSet.has("return-coil") && nodeSet.has("tuning-engraving")) {
    return "回访调校组合";
  }

  return "";
}

function formatReturnPlanNextUpgradeCopy(nextUpgradeTarget: {
  label: string;
  cost: number;
  dust?: number;
  dustPerSecond?: number;
}): string {
  const dust = nextUpgradeTarget.dust ?? 0;
  const dustPerSecond = nextUpgradeTarget.dustPerSecond ?? 0;
  const remainingDust = nextUpgradeTarget.cost - dust;

  if (remainingDust > 0 && dustPerSecond > 0) {
    return `${formatWaitTime(remainingDust / dustPerSecond)}后可购买${nextUpgradeTarget.label}`;
  }

  return `攒到 ${formatNumber(nextUpgradeTarget.cost)} 星尘再购买${nextUpgradeTarget.label}`;
}

function formatWaitTime(seconds: number): string {
  if (seconds < 60) {
    return "不到 1 分钟";
  }

  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) {
    return `约 ${minutes} 分钟`;
  }

  const hours = Math.round((minutes / 60) * 10) / 10;
  return `约 ${formatNumber(hours)} 小时`;
}

function formatSelectedResonanceGoal(unlockedResonanceNodes: string[]): string {
  const selectedNode = unlockedResonanceNodes[0];

  if (selectedNode === "stable-circuit") {
    return "共鸣目标：稳定回路已启动，继续扩建自动采集器放大产出";
  }

  if (selectedNode === "return-coil") {
    return "共鸣目标：回访线圈已启动，离开一会儿再查看离线收益";
  }

  if (selectedNode === "tuning-engraving") {
    return "共鸣目标：调校刻印已启动，继续调校放大引擎效率";
  }

  return "";
}

export type NextUpgradeTarget = {
  autoCollectors: number;
  dust: number;
  dustPerSecond?: number;
  nextAutoCollectorCost: number;
  nextEfficiencyUpgradeCost: number;
};

export function getNextUpgradeTarget(target: NextUpgradeTarget) {
  const canConsiderTuning = target.autoCollectors > 0;
  const cost =
    canConsiderTuning && target.nextEfficiencyUpgradeCost < target.nextAutoCollectorCost
      ? target.nextEfficiencyUpgradeCost
      : target.nextAutoCollectorCost;
  const label =
    canConsiderTuning && cost === target.nextEfficiencyUpgradeCost
      ? "调校工具"
      : "自动采集器";

  return {
    label,
    cost,
    dust: target.dust,
    dustPerSecond: target.dustPerSecond ?? 0,
    progressPercent: Math.min(100, Math.floor((target.dust / cost) * 100)),
  };
}

export function formatCollectFeedbackMessage(dustPerClick: number): string {
  return `采集到 ${formatNumber(dustPerClick)} 星尘：正在推进下一台自动采集器`;
}

export function formatEfficiencyUpgradeMessage(
  multiplier: number,
  hasTuningEngraving = false,
): string {
  if (hasTuningEngraving) {
    return `调校刻印共振：有效调校倍率 x${formatNumber(multiplier)}`;
  }

  return `调校完成：自动采集效率 x${formatNumber(multiplier)}`;
}
