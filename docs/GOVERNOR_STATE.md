# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

目标：把 `星尘归航` 完成事件里的 v0.7 `归航航线` 读回再压实一步，让玩家执行归航后不只看到当前段和本段进度，也直接看到下一步行动提示。
Appetite：1 个反馈层小切片。
包括：归航完成事件文案、事件记录复用、窄测试和运行态文档同步。
不包括：新增资源、节点、任务、面板、存档字段、telemetry、归航奖励变化、余辉公式变化或新 UI 布局。
完成定义：归航完成反馈在航线存在时短读 `当前段 completed/3 + 本段进度 + 下一步行动`。

## Expected Content Advance

重复归航从“事件告诉我航线更新到哪里”推进到“事件顺手告诉我下一步该继续归航、补共鸣，还是沉淀信标储备”，降低 20 小时后循环的迷失感。

## Evidence Source

`docs/SELF_PLAYTEST.md` 和 `docs/ROADMAP.md` 都把下一步指向 v0.7 `归航航线` 可读性复核；上一轮事件流已能读回航线段和本段进度，但归航后的即时反馈还没有把既有行动提示带到事件流。

## Required Artifact

更新 `src/App.tsx`、`src/App.test.tsx`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md`、`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

当前航线详情已经足够丰富，上一轮点击 `星尘归航` 后也能读回航线进度；但事件反馈仍没有告诉玩家下一步该补什么，玩家仍可能回到矩阵详情里再次扫描行动提示。

## Allowed Actions

- 用 TDD 增加归航完成事件的下一步行动提示断言。
- 复用 `getReturnRouteReadback(state)` 生成纯派生文案。
- 继续把事件写入本次 session 事件流，不持久化。
- 更新 decision、release、自测记录、内容弧线和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 航线存在时，归航完成事件包含当前航线段、`completed/3`、本段进度和下一步行动提示。
- 航线不存在时，旧的归航完成反馈保持可读。
- 事件仍只保存在 React state，不写入存档。
- 不新增依赖、存档字段、玩法系统或核心函数语义变更。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先回到 `CONTENT_REVIEW`：复核真实视口下 dashboard 是否无横向滚动，以及 v0.7 `归航航线` 在事件流和矩阵详情之间是否重复过密。

## Drift Status

本轮只调整归航完成反馈文案和事件记录内容，不改变存档、资源、节点、归航奖励、余辉公式、采集、升级、共鸣、离线收益、导入或重置语义。

## Last Updated

2026-05-09: 完成 v0.7 `归航航线` 事件反馈 follow-up。红灯测试先要求归航完成事件在当前段和本段进度后追加下一步行动提示；实现复用现有 `getReturnRouteReadback(state).actionHint`，不改归航奖励、存档、余辉公式或航线门槛。完整验证结果见本轮 automation 记录。

2026-05-09: 完成 UI dashboard follow-up 第二批任务：事件记录改为本次 session 非持久事件流；顶部菜单增加保存管理壳，导出只读、导入和重置禁用；右侧状态区增加研究所 / 日志锁定说明。in-app Browser 复核发现折叠菜单可见问题，已补 `.hud-panel[hidden]` 样式和 CSS 测试；截图捕获超时，人工视觉截图复核仍作为缺口记录。

2026-05-09: 完成 v0.7 `归航航线` 贯通态信标储备读回。三段贯通后，阶段目标、航线摘要、当前收益、下一步、航线图和预览统一读回 `深空信标储备`，不再把完成态写成“后续版本”占位语。不改变存档、资源、节点、归航奖励或余辉公式。
