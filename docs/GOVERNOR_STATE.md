# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

目标：把 v0.7 `归航航线` 的阶段目标行压成“航标化”读回。
Appetite：1 个纯派生阶段目标微切片。
包括：为未贯通和已贯通航线生成短阶段目标、复用现有 `共鸣矩阵` 详情、SSR/单元测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产、余辉公式、归航奖励或 telemetry。
完成定义：玩家扫阶段目标时能直接看到当前航线段、还差什么进入下一段，或贯通后当前沉淀了多少长期储备，而不是在长行动句里提取目标。

## Expected Content Advance

把 v0.7 `归航航线` 的主阶段目标从长行动提示改成短航标读回：未贯通时显示 `当前段 x/3，补 N 次归航 / N 点共鸣进入下一段`；贯通后显示当前长期储备数量。矩阵详情继续保留完整行动、收益、节奏和航线图。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.7 已补齐本段进度、量化收益、具名差距、行动提示、下一段预览、节奏预判、航线图、航线摘要和贯通态储备数量；下一步应复核航线是否减少迷失感。代码阅读显示：主阶段目标直接拼接 `actionHint`，例如“下一步：继续重建工坊并执行 3 次星尘归航，同时保留 2 点额外共鸣”，对扫描型目标行仍偏长。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.test.tsx`、`docs/plans/2026-05-09-v07-route-stage-goal-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

`归航航线` 已经给出摘要、当前收益、下一段门槛、具名差距、行动提示、节奏预判、航线图、本段进度和贯通储备，但阶段目标行仍把完整行动句直接顶到主目标。此轮只为阶段目标增加短航标读回，降低重复归航时的扫描成本。

## Allowed Actions

- 用 TDD 增加未贯通和贯通态阶段目标的单元测试和 SSR 读回测试。
- 复用现有 `共鸣矩阵` 详情，阶段目标只显示短航标。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 航标化阶段目标只从现有 `returnCount`、额外共鸣和当前航线段派生。
- 不新增存档字段。
- 未贯通阶段目标能显示当前段、目标段和缺口。
- 贯通阶段目标能显示当前长期储备数量。
- `归航航线` 仍最多 3 段，并只从现有状态派生。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：手动复核本段进度、航标化阶段目标、量化收益、具名差距和贯通态储备数量后的航线是否让重复归航后的长期目标更清楚；若没有新缺口，转向 `HARNESS_MAINTENANCE` 处理过期计划和文档真实性检查。

## Drift Status

本轮只调整现有矩阵内的派生进度读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-09: 本轮完成 v0.7 `归航航线` 阶段目标航标化读回。主阶段目标现在短读当前段、下一段缺口和贯通储备，完整行动说明继续留在 `共鸣矩阵` 详情中。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于缺少 `stageGoal` 和旧阶段目标文案，补实现后转绿；最终验证通过 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。
