# Decision

历史原文已归档到 `docs/archive/2026-05-08-runtime-docs/DECISION.md`。

## Current Biggest Problem

v0.6 `归航余辉` 已能把满节点后的额外共鸣转成新一轮开局星尘助推，并读回可立即重建的自动采集器数量。下一步主要问题是规划 20 小时后目标是否需要 v0.7，而不是继续扩大节点数量或做节点等级树。

## Active Decisions

### `DECISION:2026-05-08-v06-afterglow-rebuild-readback`

`归航余辉` 的数值不变：仍按额外共鸣换算 capped 起步星尘，最高 50 星尘。本轮只把这段星尘换算为“可立即重建几台自动采集器”，并在现有 `共鸣矩阵` 与阶段目标读回。50 星尘对应前 3 台自动采集器，足以让重复归航后的新一轮更快回到 `星尘小间`。视觉层面使用 `共鸣矩阵` 内的结构化读回块显示“起步星尘”和“可重建”，而不是新增面板或图片。

约束：不修改余辉公式或上限，不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-08-v06-return-afterglow`

两个永久节点都启动后，继续 `星尘归航` 获得的额外共鸣会点亮 `归航余辉`：下一轮以 `可用共鸣 * 10` 的星尘起步，最高 50 星尘。UI 继续复用现有 `共鸣矩阵` 和阶段目标读回余辉效果。

约束：不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-08-v05-park-extra-return-resonance`

满节点后继续归航获得的额外共鸣暂不扩展新用途，只在现有 `共鸣矩阵` 和阶段目标中读回“共鸣已暂存，等待后续版本扩展用途”。这是 v0.5 的边界说明，不是 v0.6 机制承诺。

约束：不新增第三普通资源、第三共鸣门槛、新共鸣节点、节点等级树、任务系统、多生产线、额外面板、存档字段、奖励公式或 telemetry。

### `DECISION:2026-05-08-v05-return-loop-resonance-readback`

归航后只要存档已有可用共鸣、永久节点或归航历史，就复用现有 `共鸣矩阵` 在新一轮开局读回长期状态。可用共鸣的阶段目标优先于普通升级等待，提示玩家先启动永久节点，再推进下一轮工坊。

约束：不新增资源、共鸣节点、节点等级树、任务系统、多生产线、额外面板、存档字段或 telemetry。新玩家首屏仍不显示 `共鸣矩阵`。

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
- v0.4 第二共鸣和双节点读回已完成；第三共鸣门槛、新节点和 prestige 曾被禁止，后续由 v0.5 归航替代。
- v0.3 共鸣系统第一版已完成：第二资源 `共鸣`、一个紧凑矩阵、三选一永久节点和本地指标。
- v0.2 工坊阶段、物件插图和 3-15 分钟内容弧线已完成。

## Next Decision Pressure

下一轮优先选择：

- `CONTENT_PLANNING`: 规划 v0.7 的 20 小时后目标，但先定义预算和弧线，不直接增加节点等级树。
- `CONTENT_REVIEW`: 复核余辉读回是否在真实或手动 playtest 中减少重复归航后的迷失感。
- `PLAYER_FEEDBACK`: 若远端 issue 有新补充，先路由反馈，不直接扩系统。
