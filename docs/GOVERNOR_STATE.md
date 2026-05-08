# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

CONTENT_PLANNING

## Cycle Bet

目标：规划 v0.7 的 20 小时后长期目标，让重复归航不只是累积余辉。
Appetite：1 个规划切片。
包括：定义 `归航航线` 的复杂度预算、内容弧线和下一轮实现边界。
不包括：本轮不实现新玩法，不新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。
完成定义：下一轮可以直接用 TDD 实现一个航线读回切片，而不会突破当前预算。

## Expected Content Advance

把 20 小时后的下一目标定义为 v0.7 `归航航线`：最多 3 个长期航线里程碑，复用现有 `共鸣矩阵` 和阶段目标读回。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.6 余辉读回已完成，下一步应先规划 v0.7 的 20 小时后目标和复杂度预算。

## Required Artifact

更新 `src/ops-scripts.test.ts`、`ops/governor-check.sh`、`docs/plans/2026-05-08-v07-return-route-design.md`、`docs/COMPLEXITY_BUDGET.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

直接增加节点、等级树或任务会突破当前复杂度边界。先把 v0.7 限制成 `归航航线` 读回和最多 3 个里程碑，能为 20 小时目标提供方向感，同时保留后续可玩切片空间。

## Allowed Actions

- 用 TDD 增加 v0.7 预算检查。
- 更新复杂度预算、内容弧线、roadmap、decision、release 记录和计划文档。
- 明确下一轮 `PLAYABLE_CONTENT` 的可实现边界。

## Forbidden Actions

- 不实现本轮新玩法。
- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- `v0.7 Return Route Budget` 存在，并被 `governor-check` 机器校验。
- `归航航线` 计划说明下一轮只做现有矩阵内的航线读回。
- 相关运行态文档同步当前方向。
- 完整验证通过。

## Next Candidate Mode / Track

下一轮优先 `PLAYABLE_CONTENT`：用 TDD 实现 v0.7 `归航航线` 第一段读回，不新增节点、等级树或新面板。

## Drift Status

本轮只增加预算闸门和规划文档，不改变运行时玩法；v0.7 被限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-08: 本轮完成 v0.7 `归航航线`规划。新增 `v0.7 Return Route Budget`、计划文档和 `governor-check` 机器闸门；红灯测试确认旧检查不会阻止缺失 v0.7 预算，补齐后转绿。验证通过：`bun test` 109 pass，`bun run test` 109 pass，`bun run build` 成功，`./ops/governor-check.sh` 成功，`git diff --check` 成功。
