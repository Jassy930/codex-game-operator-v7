# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

CONTENT_REVIEW

## Iteration Track

VISUAL_POLISH

## Cycle Bet

目标：按 `docs/UI_REDESIGN_SPEC.md` 和两张参考图，把《星尘工坊》单卡片原型重构成 idle / incremental game dashboard。
Appetite：1 个 UI 重排与样式重写切片。
包括：顶部 HUD、左侧导航、中央主操作区、右侧状态区、移动端单列布局、底部导航、现有交互展示和运行态文档同步。
不包括：新增依赖、玩法系统、资源、共鸣节点、任务系统、多生产线、设置面板、持久日志、telemetry、存档字段或核心函数语义变更。
完成定义：玩家打开页面后能优先看到星尘数量、每秒产出、采集按钮、下一项工程、自动采集器、调校、共鸣和归航入口，且现有测试和构建通过。

## Expected Content Advance

把现有玩法读回从网页卡片感升级为游戏控制台感，让首屏服务于采集、自动采集器和调校主循环，同时让共鸣矩阵、星尘归航、研究所和日志表达长期扩展空间。

## Evidence Source

`docs/UI_REDESIGN_SPEC.md` 和 `docs/ui-reference/desktop-ui-reference.png`、`docs/ui-reference/mobile-ui-reference.png` 明确要求桌面端三栏 dashboard、移动端单列和底部导航；当前 `src/App.tsx` 仍是单面板结构，不能承载 idle / incremental game 的长期系统层级。

## Required Artifact

更新 `src/App.tsx`、`src/styles.css`、`src/App.test.tsx`、相关治理测试、`docs/DECISION.md`、`docs/SELF_PLAYTEST.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

现有 UI 把所有信息压进单张网页卡片，星尘核心、升级、下一项工程、事件反馈、共鸣和归航没有清晰的 dashboard 层级。此轮只重构界面展示，使现有机制更像可持续运营的 idle game。

## Allowed Actions

- 用 TDD 增加 UI 信息架构 SSR 断言。
- 重排 `App.tsx` JSX，重写 `styles.css`，保留现有 handler 和纯逻辑函数。
- 更新 decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 桌面端存在顶部 HUD、左侧导航、中央主操作区和右侧状态区。
- 移动端存在单列布局和底部导航。
- 采集、升级、共鸣、归航、自动保存和离线收益测试通过。
- 不新增依赖、存档字段、玩法系统或核心函数语义变更。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：手动复核 dashboard 在 1440px、1024px 和 375px 下是否无横向溢出、主资源和采集按钮是否足够突出、右侧状态区是否过密；若没有新缺口，再回到 v0.7 `归航航线` 可读性复核。

## Drift Status

本轮只调整 UI 结构、样式和展示文案，不改变存档、资源、节点、归航奖励、余辉公式、采集、升级、共鸣或离线收益语义。

## Last Updated

2026-05-09: 本轮完成 UI dashboard 重设计。`src/App.tsx` 改为 HUD / 导航 / 主操作 / 状态区结构，`src/styles.css` 改为暖科幻游戏控制台视觉，移动端改为单列和底部导航；`src/App.test.tsx` 增加 UI 架构断言，治理测试更新为新移动端按钮约束。验证通过 `bun run test` 和 `bun run build`，后续仍需浏览器尺寸复核。

2026-05-09: 本轮完成 v0.7 `归航航线` 贯通态信标储备读回。三段贯通后，阶段目标、航线摘要、当前收益、下一步、航线图和预览统一读回 `深空信标储备`，不再把完成态写成“后续版本”占位语。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于旧完成态文案，补实现后转绿；最终验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。
