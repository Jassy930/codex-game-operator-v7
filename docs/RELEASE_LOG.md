# Release Log

## Unreleased

- Initialized v7.2 clean-room goal harness project.
- Bootstrapped the playable local MVP for 星尘工坊 with React, TypeScript, Vite, Vitest, Bun tests, local save/load, click resource loop, passive production, and one upgrade.
- Added an in-game GitHub Issues feedback link and local-only `feedback_clicked` event queue.
- Added GitHub Pages workflow for public preview builds from `main`, with pinned Bun/package versions and workflow timeouts.
- Published the first GitHub Pages preview at `https://jassy930.github.io/codex-game-operator-v7/`.
- Clarified the first upgrade button copy so the cost reads as required star dust.
- Added a short first-goal line that tells players to save star dust for the first auto collector.
- Added a UI-only early milestone line for reaching 2 auto collectors.
- Added local-only first-session metrics for clicks, upgrades, and first upgrade time.
- Corrected local metrics so session counters reset when a new app session starts.
- Added local-only session end and session duration metrics.
- Changed the auto-collector milestone from fixed `2` to dynamic targets so early progress continues after the second collector.
- Added a return message that shows star dust earned from offline progress.
- Added local-only metrics for offline reward messages shown on return.
- 购买第一台自动采集器后，前 60 秒目标提示会继续指向下一台自动采集器。
- 记录研究支撑的下一步方向：优先增强购买自动采集器后的轻量确认反馈。
- 购买自动采集器成功后显示短暂确认反馈，不改变经济数值。
- 有效本地存档加载时记录 local-only `saveLoadedCount` 指标。
- 明确 `feedback_sent` 在当前 GitHub 外链反馈流下为 deferred metric，不做本地伪计数。
- 修正 metrics policy：公开预览阶段仍保持 telemetry local-only。
- 收口反馈入口文档与 issue ledger 说明，使其匹配当前 GitHub Issue 反馈流。
- 记录研究结论：无真实反馈时优先降低反馈成本，不新增玩法系统。
- GitHub Issue 反馈正文改为聚焦“前 60 秒哪里不清楚”。
- 中文化 metrics 文档说明，保留 storage key 和 metric key 原文。
- 中文化 self-playtest 文档说明，保留已记录事实和 gap。
- 中文化 roadmap 文档说明，保留 M0-M5 里程碑结构。
- 为离线收益和购买确认保留稳定事件反馈区域，减少购买瞬间布局跳动。
- 将进度条标签从“下个目标”改为“购买进度”，减少目标/里程碑语义混淆。
- 升级 GitHub Pages workflow actions，移除 Node24 强制兼容开关。
- 记录研究结论：下一步反馈改进候选是单一 GitHub Issue Form，而不是新增反馈渠道或 analytics。
- 将游戏内反馈链接迁移到单一 GitHub Issue Form，字段聚焦前 60 秒阻塞点和玩家意图。
- 记录研究结论：下一步候选是站外 playtest 邀请素材，不在游戏首屏新增提示。
- README 增加站外 playtest 邀请素材，继续复用公开预览和单一 GitHub Issue Form。
- 中文化反馈聚类文档模板，保持 M3 反馈处理文档一致。
- 中文化 signal routing 和 response budget 文档，保持 M3 反馈处理规则一致。
- 中文化反馈入口文档剩余小节名和字段标签。
