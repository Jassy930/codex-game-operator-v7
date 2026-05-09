# Decision

历史原文已归档到 `docs/archive/2026-05-08-runtime-docs/DECISION.md`。

## Current Biggest Problem

v0.7 `归航航线` 已把重复归航组织成 3 段长期读回，并补齐本段进度、`深空信标储备`、具名差距、行动、收益、预览、节奏、航线图、摘要和航标化阶段目标。当前主要问题转向可读性复核；下一步仍不应扩大节点数量或做节点等级树。

## Active Decisions

### `DECISION:2026-05-09-ui-dashboard-redesign`

《星尘工坊》界面从单卡片原型重构为 idle / incremental game dashboard：桌面端使用顶部 HUD、左侧导航、中央主操作区和右侧状态区；移动端使用单列内容流和底部导航。重构只调整 `src/App.tsx` 的展示结构、`src/styles.css` 的视觉层级和少量文案，不改变 `GameState`、存档、归航、共鸣、采集、自动采集器或调校语义。

约束：不新增依赖、资源类型、玩法系统、持久日志、telemetry、共鸣节点、任务系统、科技树、多生产线或存档字段；研究所和日志只作为锁定入口展示。

### `DECISION:2026-05-09-v07-completed-route-beacon`

v0.7 `归航航线` 继续保持纯派生读回。本轮只调整三段贯通后的完成态，把“后续版本 / 长期储备”占位语改成游戏内的 `深空信标储备`：阶段目标、航线摘要、当前收益、下一步和航线图都读回同一组 `returnCount` 与额外共鸣储备。

约束：不修改归航奖励、余辉公式或 50 星尘上限；不新增资源、节点、等级树、任务系统、面板、存档字段、视觉资产或 telemetry。

### `DECISION:2026-05-09-v07-return-route-summary`

v0.7 `归航航线` 继续保持最多 3 段、纯派生、复用现有 `共鸣矩阵` 和阶段目标。已完成的读回包括本段进度、具名差距、当前收益、行动提示、下一段预览、节奏预判、航线图、航线摘要、航标化阶段目标和贯通态 `深空信标储备`。细分历史见 `docs/plans/` 与归档。

约束：不修改归航奖励、余辉公式或 50 星尘上限；不新增资源、节点、等级树、任务系统、面板、存档字段、视觉资产或 telemetry。

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

- `CONTENT_REVIEW`: 复核新 dashboard 在 1440px、1024px 和 375px 下是否让星尘、采集、下一项工程、升级、共鸣和归航的优先级更清楚。
- `CONTENT_REVIEW`: 复核带本段进度、量化收益和 `深空信标储备` 的 `归航航线` 摘要是否在真实或手动 playtest 中减少重复归航后的迷失感。
- `PLAYABLE_CONTENT`: 若复核后仍缺目标感，只做航线文案、门槛或读回优先级微调，不新增系统。
- `PLAYER_FEEDBACK`: 若远端 issue 有新补充，先路由反馈，不直接扩系统。
