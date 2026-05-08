# Decision

历史原文已归档到 `docs/archive/2026-05-08-runtime-docs/DECISION.md`。

## Current Biggest Problem

v0.7 `归航航线` 已把重复归航组织成 3 段长期读回，并补齐差距、行动、收益、预览、节奏、航线图和带价值短语的摘要。当前主要问题转向可读性复核：玩家是否能把重复归航理解成长期路线，而不是门槛清单；下一步仍不应扩大节点数量或做节点等级树。

## Active Decisions

### `DECISION:2026-05-09-v07-route-value-summary`

v0.7 `归航航线` 继续保持纯派生读回。本轮只调整现有 `航线摘要`：未贯通时在当前段、差距和节奏预判之间加入当前段价值短语，例如“起步星尘已生效”或“重建时间继续压缩”。完整收益、门槛、行动提示、航线图和下一段预览继续保留在同一块内。

约束：不修改归航奖励、余辉公式或 50 星尘上限；不新增资源、节点、等级树、任务系统、面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-09-v07-route-summary-readback`

v0.7 `归航航线` 继续保持纯派生读回。本轮只在现有 `共鸣矩阵` 的航线块中增加 `航线摘要`：把当前段、距下一段差距和节奏预判压缩成首行摘要，完整收益、门槛、行动提示、航线图和下一段预览继续保留在同一块内。

约束：不修改归航奖励、余辉公式或 50 星尘上限；不新增资源、节点、等级树、任务系统、面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-09-v07-route-map-readback`

v0.7 `归航航线` 继续保持纯派生读回。本轮在现有 `共鸣矩阵` 的航线块中增加 `航线图`：显示 `余辉起航 -> 稳航校准 -> 深空归航` 的完整路径和当前所在段；三段贯通后改为长期储备读回。阶段目标仍沿用短行动提示，避免主目标行变长。

约束：不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或上限，不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-09-v07-route-readback-summary`

最近几个 v0.7 小切片都围绕同一约束：`归航航线` 只在现有 `共鸣矩阵` 中做纯派生读回，不改存档、数值或复杂度边界。已完成的 anchor 包括 `DECISION:2026-05-09-v07-route-cadence-forecast`、`DECISION:2026-05-09-v07-afterglow-spent-readback`、`DECISION:2026-05-08-v07-route-payoff-review`、`DECISION:2026-05-08-v07-route-preview-review`、`DECISION:2026-05-08-v07-route-action-review` 和 `DECISION:2026-05-08-v07-route-progress-readback`。

### `DECISION:2026-05-08-v07-return-route-readback`

v0.7 `归航航线` 第一段实现为纯派生读回：当玩家已有归航历史且 2 个永久节点已启动后，`共鸣矩阵` 显示当前航线段、段落说明和下一段门槛；阶段目标优先读回当前航线。航线最多 3 段，门槛来自 `returnCount` 和当前额外共鸣，不新增存档字段。

约束：不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或上限，不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-08-v07-return-route-planning`

v0.7 方向定为 `归航航线`：在现有 `共鸣矩阵` 和阶段目标中读回最多 3 个长期航线里程碑，用来解释 20 小时后继续归航正在推进什么。`governor-check` 必须校验 `v0.7 Return Route Budget` 存在，并确认航线计划和里程碑数量有硬上限。

约束：本轮只规划和加预算闸门，不实现运行时玩法；后续实现也必须复用现有矩阵和阶段目标，不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级、节点等级树、任务系统、多生产线、额外面板、存档字段或 telemetry。

### `DECISION:2026-05-08-v06-afterglow-rebuild-readback`

`归航余辉` 的数值不变：仍按额外共鸣换算 capped 起步星尘，最高 50 星尘。本轮只把这段星尘换算为“可立即重建几台自动采集器”，并在现有 `共鸣矩阵` 与阶段目标读回。50 星尘对应前 3 台自动采集器，足以让重复归航后的新一轮更快回到 `星尘小间`。视觉层面使用 `共鸣矩阵` 内的结构化读回块显示“起步星尘”和“可重建”，而不是新增面板或图片。

约束：不修改余辉公式或上限，不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-08-v06-return-afterglow`

两个永久节点都启动后，继续 `星尘归航` 获得的额外共鸣会点亮 `归航余辉`：下一轮以 `可用共鸣 * 10` 的星尘起步，最高 50 星尘。UI 继续复用现有 `共鸣矩阵` 和阶段目标读回余辉效果。

约束：不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-08-harness-engineering-scorecard`

基于 OpenAI Harness Engineering 博文，把“仓库是记录系统、agent readability、机械化约束、反馈回路、垃圾收集”转成 `docs/QUALITY_SCORE.md`。每轮没有更强信号时，下一步应优先处理最低分维度；`governor-check` 强制 scorecard 结构存在。

约束：不新增玩法、数值、资源、按钮、面板、存档字段或 telemetry。本轮只加强选题和治理反馈机制。

### `DECISION:2026-05-08-mobile-button-visual-polish`

移动端 560px 以下主操作和升级按钮改用稳定宽度、紧凑高度和 `flex-basis: auto`，禁用升级按钮插图轻度降饱和。不新增玩法、资源、按钮、面板、素材、存档字段、指标字段或 telemetry。

### `DECISION:2026-05-08-runtime-doc-budget-recovery`

补齐 `docs/DOCUMENTATION_POLICY.md`，并把 runtime 文档压缩为当前状态摘要 + 归档指针。该切片不改变游戏行为、issue routing、response budget、complexity budget 或 review protocol。

### `DECISION:2026-05-08-documentation-lifecycle-policy`

新增 `docs/DOCUMENTATION_POLICY.md`，定义运行态文档预算、归档目录、压缩流程和触发条件。`ops/governor-check.sh` 开始检查核心运行态文档行数，防止文档继续无界增长。

约束：不删除历史证据；原始长文档归档到 `docs/archive/2026-05-08-runtime-docs/`。本轮只治理文档和检查，不新增玩法、数值、视觉资产、反馈渠道或 telemetry。

### `DECISION:2026-05-08-v05-stardust-return`

v0.5 主线是 `星尘归航`。玩家达到 25 台自动采集器和 15 次调校后，可在现有 `共鸣矩阵` 中执行归航，重启本轮工坊并获得固定 `1 共鸣`。归航保留共鸣、已领取共鸣里程碑、已启动永久节点和 `returnCount`。

约束：不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、新共鸣节点、节点等级树或外部 telemetry。

### `DECISION:2026-05-08-iteration-policy-hardening`

每轮必须记录 `Cycle Bet`、`Cycle Status`、`Expected Content Advance`、`Evidence Source` 和 `Required Artifact`。每轮结束后必须总结机制/学习更新，并记录下一候选 mode/track。

### `DECISION:2026-05-08-meaningful-iteration-gate`

每轮必须选择一个 iteration track：`GAME_RESEARCH`、`PLAYER_FEEDBACK`、`CONTENT_PLANNING`、`CONTENT_REVIEW`、`BUGFIX`、`VISUAL_POLISH`、`PLAYABLE_CONTENT` 或 `HARNESS_MAINTENANCE`。

## Recently Closed

- `DECISION:2026-05-07-operate-post-60s-engagement`: Issue #2 已发布目标提示修复，等待新信息，不重复回复。
- `DECISION:2026-05-07-operate-collect-motivation`: Issue #1 已发布采集动机修复，等待新信息，不重复回复。
- v0.5 归航后矩阵读回和满节点额外共鸣暂存说明已被 v0.6 `归航余辉` 与 v0.7 `归航航线` 覆盖；详细历史见归档。
- v0.4 第二共鸣和双节点读回已完成；第三共鸣门槛、新节点和 prestige 曾被禁止，后续由 v0.5 归航替代。
- v0.3 共鸣系统第一版已完成：第二资源 `共鸣`、一个紧凑矩阵、三选一永久节点和本地指标。
- v0.2 工坊阶段、物件插图和 3-15 分钟内容弧线已完成。

## Next Decision Pressure

下一轮优先选择：

- `CONTENT_REVIEW`: 复核带当前价值短语的 `归航航线` 摘要是否在真实或手动 playtest 中减少重复归航后的迷失感。
- `PLAYABLE_CONTENT`: 若复核后仍缺目标感，只做航线文案、门槛或读回优先级微调，不新增系统。
- `PLAYER_FEEDBACK`: 若远端 issue 有新补充，先路由反馈，不直接扩系统。
