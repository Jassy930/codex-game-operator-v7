# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

VISUAL_POLISH

## Cycle Bet

目标：复核 UI dashboard 移动端底部导航，确保 375px 小屏和带安全区设备上不会遮挡核心操作或锚点目标。
Appetite：1 个 CSS 护栏小切片。
包括：移动端底部导航安全区、底部留白、锚点滚动可见性、窄测试和运行态文档同步。
不包括：新增玩法、资源、节点、任务、面板、存档字段、telemetry、导入 / 重置逻辑或新视觉资产。
完成定义：移动端底部导航使用安全区感知定位，主容器为固定导航预留足够底部空间，锚点跳转到 `归航台` 时不会被底部导航压住。

## Expected Content Advance

移动端玩家能更稳定地从底部导航跳到核心区域、共鸣区和归航台，不会因为固定导航遮住归航按钮或内容底部而误以为操作不可用。

## Evidence Source

`docs/SELF_PLAYTEST.md` 记录了 375px 下仍需复核底部导航是否遮挡核心操作；`docs/DECISION.md` 的下一轮压力也要求复核 dashboard 在 1440px、1024px 和 375px 下的可读性。当前最小可执行 gap 是给固定底部导航补安全区和锚点留白护栏。

## Required Artifact

更新 `src/styles.css`、`src/ops-scripts.test.ts`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

UI dashboard 已完成信息架构重设计，但小屏复核仍留下“底部导航是否遮挡核心操作 / 归航台锚点”的验证缺口。该问题会直接影响移动端玩家能否继续执行归航循环，优先级高于继续堆叠航线文案。

## Allowed Actions

- 用 TDD 增加移动端底部导航 CSS 护栏断言。
- 调整现有 CSS 的移动端安全区、底部留白和锚点滚动空间。
- 用本地浏览器或静态验证复核 375px 行为；若工具受限，明确记录验证缺口。
- 更新 decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不修改 `GameState`、localStorage 存档格式、导入 / 重置逻辑、共鸣节点或归航航线门槛。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 900px 以下 `.app-shell` 底部留白包含固定底部导航高度和 `env(safe-area-inset-bottom)`。
- `.bottom-nav` 使用安全区感知 `bottom` 定位。
- 移动端锚点目标拥有底部滚动留白，跳到 `归航台` 时不被底部导航压住。
- 不新增依赖、存档字段、玩法系统或核心函数语义变更。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先回到 `CONTENT_REVIEW`：复核真实视口下 dashboard 是否无横向滚动，以及 v0.7 `归航航线` 在事件流和矩阵详情之间是否重复过密。

## Drift Status

本轮只调整移动端 CSS 布局护栏，不改变存档、资源、节点、归航奖励、余辉公式、采集、升级、共鸣、离线收益、导入或重置语义。

## Last Updated

2026-05-09: 完成 UI dashboard 移动端底部导航护栏。900px 以下 `.app-shell` 改为安全区感知底部留白，`.bottom-nav` 使用 `env(safe-area-inset-bottom)` 定位，`引擎室` / `共鸣室` / `归航台` 锚点补底部滚动留白；不改玩法、存档、归航、共鸣或导入 / 重置语义。验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。Browser 没有可用 pane，且本轮 shell 无法连接已监听的本地 Vite 端口，真实截图复核仍是验证缺口。

2026-05-09: 开始 UI dashboard 移动端底部导航复核。目标是补安全区、底部留白和锚点滚动护栏，避免 375px 小屏或带安全区设备上固定底部导航遮挡核心操作；不改玩法、存档、归航、共鸣或导入 / 重置语义。

2026-05-09: 完成 v0.7 `归航航线` 事件反馈 follow-up。红灯测试先要求归航完成事件在当前段和本段进度后追加下一步行动提示；实现复用现有 `getReturnRouteReadback(state).actionHint`，不改归航奖励、存档、余辉公式或航线门槛。完整验证结果见本轮 automation 记录。

2026-05-09: 完成 UI dashboard follow-up 第二批任务：事件记录改为本次 session 非持久事件流；顶部菜单增加保存管理壳，导出只读、导入和重置禁用；右侧状态区增加研究所 / 日志锁定说明。in-app Browser 复核发现折叠菜单可见问题，已补 `.hud-panel[hidden]` 样式和 CSS 测试；截图捕获超时，人工视觉截图复核仍作为缺口记录。

2026-05-09: 完成 v0.7 `归航航线` 贯通态信标储备读回。三段贯通后，阶段目标、航线摘要、当前收益、下一步、航线图和预览统一读回 `深空信标储备`，不再把完成态写成“后续版本”占位语。不改变存档、资源、节点、归航奖励或余辉公式。
