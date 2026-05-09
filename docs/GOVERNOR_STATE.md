# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

CONTENT_REVIEW

## Cycle Bet

目标：复核 v0.7 `归航航线` 是否因为信息太完整而变得过密，并把矩阵内读回收敛成摘要优先、细节渐进展开。
Appetite：1 个归航航线可读性小切片。
包括：保留现有航线信息，但在 UI 中优先显示摘要、当前收益和下一步，把进度、门槛、差距、节奏、航线图和预览收进同一个航线块的细节层；同步窄测试和运行态文档。
不包括：新增资源、节点、任务、面板、存档字段、telemetry、归航奖励、余辉公式、航线门槛或新视觉资产。
完成定义：重复归航玩家先扫到“当前价值 + 下一步”，完整航线信息仍可查看，但不再在矩阵内连续铺开十行正文。

## Expected Content Advance

玩家进入 `归航航线` 后先看到摘要、当前收益和下一步行动；完整差距、节奏、航线图和下一段预览仍保留在原航线块内，降低 20 小时后目标读回的密度。

## Evidence Source

`docs/SELF_PLAYTEST.md` 和 `docs/ROADMAP.md` 都要求复核 v0.7 `归航航线` 是否真正减少重复归航后的迷失感。当前实现已补齐本段进度、量化收益、差距、节奏、航线图和预览，但矩阵内连续正文过多，可能违背 `docs/NORTH_STAR.md` 的“游戏在变深，但不是变吵”。

## Required Artifact

更新 `src/App.tsx`、`src/App.test.tsx`、`src/styles.css`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md`、`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

当前 `归航航线` 内容链路已经足够完整，继续追加字段会增加噪音。最小修复是调整现有读回优先级，让摘要、收益和下一步处于首层，细节通过原航线块里的渐进展开承接。

## Allowed Actions

- 用 TDD 增加 `归航航线` 摘要优先和细节层断言。
- 调整现有 `共鸣矩阵` 内 `归航航线` 块的展示结构和样式。
- 更新 decision、roadmap、content arc、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不修改 `GameState`、localStorage 存档格式、导入 / 重置逻辑、共鸣节点或归航航线门槛。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- `归航航线` 首层只显示摘要、当前收益和下一步等高优先级读回。
- 进度、下一段门槛、差距、节奏、航线图和预览仍保留在同一个航线块的细节层。
- 不改变任何 `ReturnRouteReadback` 数值语义、归航奖励或航线门槛。
- 不新增依赖、存档字段、玩法系统或核心函数语义变更。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先在 `CONTENT_REVIEW` 中复核 dashboard 真实截图缺口；若继续处理长期目标，只调整现有读回优先级，不新增任务系统、节点等级树或新面板。

## Drift Status

本轮只调整 `归航航线` 展示密度和读回优先级，不改变存档、资源、节点、归航奖励、余辉公式、航线门槛、采集、升级、共鸣、离线收益、导入或重置语义。

## Last Updated

2026-05-09: 完成 v0.7 `归航航线` 细节渐进展开切片。`共鸣矩阵` 内航线块首层优先显示航线摘要、当前收益和下一步行动，本段进度、下一段门槛、差距、节奏预判、航线图和下一段预览保留在同块内的 `航线细节`。不改 `ReturnRouteReadback` 数值语义、存档、资源、节点、归航奖励、余辉公式、航线门槛或 telemetry。验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。

2026-05-09: 完成首页目标聚焦切片。右侧目标卡从 `下一项工程` 改为 `当前目标`，主文案直接显示下一步动作和差额；升级卡移除重复解释段，首页移除 `未来系统` 说明卡，研究所 / 日志只保留为锁定导航入口。不改玩法、存档、资源、共鸣、归航、余辉、航线门槛或 telemetry。验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。本地 Vite 可启动并返回页面；Node REPL 无 `playwright` 模块，真实截图复核仍是验证缺口。

2026-05-09: 完成 v0.7 `归航航线` 事件职责复核。`星尘归航` 完成事件现在接收归航前后状态：若本次归航刚好跨入 `稳航校准` / `深空归航`，事件读回 `归航航线推进：进入...` 和当前收益；未跨段时继续读回当前段与本段进度。完整行动说明仍留在 `共鸣矩阵`，减少事件流与矩阵详情重复。不改归航奖励、存档、余辉公式、航线门槛、资源、节点、面板或 telemetry。验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。

2026-05-09: 完成 UI dashboard 视觉护栏。900px 以下 `.app-shell` 改为安全区感知底部留白，`.bottom-nav` 使用 `env(safe-area-inset-bottom)` 定位，`引擎室` / `共鸣室` / `归航台` 锚点补底部滚动留白；主资源数字改为按星尘核心卡片容器缩放；倍率 chip 改用专用两列 grid、固定宽度和等宽数字，避免数字变化时横向跳动。不改玩法、存档、归航、共鸣或导入 / 重置语义。验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。Browser 仍有截图捕获 / 几何读取限制，真实截图复核仍是验证缺口。

2026-05-09: 开始 UI dashboard 移动端底部导航复核。目标是补安全区、底部留白和锚点滚动护栏，避免 375px 小屏或带安全区设备上固定底部导航遮挡核心操作；不改玩法、存档、归航、共鸣或导入 / 重置语义。

2026-05-09: 完成 v0.7 `归航航线` 事件反馈 follow-up。红灯测试先要求归航完成事件在当前段和本段进度后追加下一步行动提示；实现复用现有 `getReturnRouteReadback(state).actionHint`，不改归航奖励、存档、余辉公式或航线门槛。完整验证结果见本轮 automation 记录。

2026-05-09: 完成 UI dashboard follow-up 第二批任务：事件记录改为本次 session 非持久事件流；顶部菜单增加保存管理壳，导出只读、导入和重置禁用；右侧状态区增加研究所 / 日志锁定说明。in-app Browser 复核发现折叠菜单可见问题，已补 `.hud-panel[hidden]` 样式和 CSS 测试；截图捕获超时，人工视觉截图复核仍作为缺口记录。

2026-05-09: 完成 v0.7 `归航航线` 贯通态信标储备读回。三段贯通后，阶段目标、航线摘要、当前收益、下一步、航线图和预览统一读回 `深空信标储备`，不再把完成态写成“后续版本”占位语。不改变存档、资源、节点、归航奖励或余辉公式。
