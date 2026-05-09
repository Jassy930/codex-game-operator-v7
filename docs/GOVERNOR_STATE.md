# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

CONTENT_REVIEW

## Iteration Track

VISUAL_POLISH

## Cycle Bet

目标：补齐 UI dashboard 第一批 follow-up：真实视口复核清单、导航状态和顶部统计入口。
Appetite：3 个展示层小切片。
包括：1440px / 1024px / 375px 复核清单、导航 active/locked 可访问状态、local-only 统计面板和运行态文档同步。
不包括：新增依赖、玩法系统、资源、共鸣节点、任务系统、多生产线、设置面板、持久日志、telemetry、存档字段或核心函数语义变更。
完成定义：dashboard 的主要入口不再像纯装饰按钮，且后续真实视口复核有明确检查项。

## Expected Content Advance

让当前 dashboard 从“静态布局完成”推进到“入口状态可读”：玩家能看懂当前导航位置、锁定入口原因，并能从顶部统计看到本轮工坊摘要。

## Evidence Source

`docs/plans/2026-05-09-ui-dashboard-followup-plan.md`、`docs/SELF_PLAYTEST.md` 和当前 UI 实现显示：dashboard 结构已完成，但真实视口复核、导航状态和顶部统计入口仍是第一批缺口。

## Required Artifact

更新 `docs/SELF_PLAYTEST.md`、本文件、`src/App.tsx`、`src/styles.css` 和 `src/App.test.tsx`。

## Cycle Status

completed

## Reason

当前 dashboard 视觉结构已经上线，但顶部按钮和导航状态仍缺少可验证语义；这会让玩家误判哪些入口可用、哪些只是未来占位。此轮先补入口状态，不扩玩法。

## Allowed Actions

- 用 TDD 增加导航状态和统计 helper 断言。
- 增加非持久 UI state 展开统计面板。
- 更新 decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 视口复核清单写入 self-playtest。
- 导航项具备 `aria-current` / `aria-disabled` 和锁定短文案。
- 顶部统计面板只从现有 `GameState` 读取数据，不新增 telemetry。
- 不新增依赖、存档字段、玩法系统或核心函数语义变更。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先继续 `VISUAL_POLISH`：补本次 session 事件流、菜单保存管理壳和锁定系统说明；完成后再回到 v0.7 `归航航线` 可读性复核。

## Drift Status

本轮只调整 UI 状态、样式和展示文案，不改变存档、资源、节点、归航奖励、余辉公式、采集、升级、共鸣或离线收益语义。

## Last Updated

2026-05-09: 完成 UI dashboard follow-up 第一批任务：写入 1440px / 1024px / 375px 视口复核清单；导航补 `aria-current`、`aria-disabled` 和锁定短文案；顶部 `统计` 按钮接入只读当前 `GameState` 的本地统计面板。验证通过 `bun run test`、`bun run build`、`git diff --check`；`governor-check` 在状态收口后复跑。

2026-05-09: 开始执行 UI dashboard follow-up 第一批任务：先补视口复核清单，再用 TDD 增加导航状态和顶部统计面板。仍不改变 `GameState`、存档、核心玩法函数、资源、节点或 telemetry。

2026-05-09: 本轮完成 UI dashboard 重设计。`src/App.tsx` 改为 HUD / 导航 / 主操作 / 状态区结构，`src/styles.css` 改为暖科幻游戏控制台视觉，移动端改为单列和底部导航；`src/App.test.tsx` 增加 UI 架构断言，治理测试更新为新移动端按钮约束。验证通过 `bun run test` 和 `bun run build`，后续仍需浏览器尺寸复核。

2026-05-09: 本轮完成 v0.7 `归航航线` 贯通态信标储备读回。三段贯通后，阶段目标、航线摘要、当前收益、下一步、航线图和预览统一读回 `深空信标储备`，不再把完成态写成“后续版本”占位语。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于旧完成态文案，补实现后转绿；最终验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。
