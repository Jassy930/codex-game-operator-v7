# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

目标：把 v0.7 `归航航线` 的差距读回从抽象“下一段”推进到具名目标。
Appetite：1 个纯派生命名差距读回切片。
包括：第一段 / 第二段目标名、现有 `共鸣矩阵` 展示、SSR/单元测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产、余辉公式、归航奖励或 telemetry。
完成定义：玩家在看见当前航线块第一眼时，能读懂自己正在冲 `稳航校准` 还是 `深空归航`，还差什么，以及按当前节奏能否推进。

## Expected Content Advance

把 v0.7 `归航航线` 的差距读回补上下一段名称：让 20 小时后的重复归航不只读成“距下一段还差什么”，也能直接读成“距稳航校准 / 深空归航还差什么”。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.7 已补齐差距、行动提示、下一段预览、当前收益、节奏预判、航线图和航线摘要，下一步应复核航线是否减少迷失感，并只做航线文案、门槛或读回优先级微调。代码阅读显示：当前 `progressSummary` 和摘要仍使用“下一段”，玩家需要继续读 `nextPreview` 才知道自己正在冲 `稳航校准` 还是 `深空归航`。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.test.tsx`、`docs/plans/2026-05-09-v07-route-named-gap-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

`归航航线` 已经给出摘要、当前收益、下一段门槛、差距、行动提示、节奏预判、航线图和下一段预览，但差距文案仍用抽象“下一段”。这轮把下一段名称直接写入差距读回，不改数值或系统，让 20 小时后的重复归航更像具名路线。

## Allowed Actions

- 用 TDD 增加命名差距的单元测试和 SSR 读回测试。
- 复用现有 `共鸣矩阵` 显示带当前价值的航线摘要。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 航线差距只从现有 `returnCount`、额外共鸣和目标门槛派生。
- 不新增存档字段。
- `共鸣矩阵` 在航线出现时显示具名目标差距，再保留完整细节。
- `归航航线` 仍最多 3 段，并只从现有状态派生。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：手动复核具名差距后的航线摘要是否让重复归航后的长期目标更清楚；若没有新缺口，转向 `HARNESS_MAINTENANCE` 处理过期计划和文档真实性检查。

## Drift Status

本轮只调整现有矩阵内的派生差距和节奏预判读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-09: 本轮完成 v0.7 `归航航线` 命名差距读回。现有 `progressSummary` 和 `cadenceForecast` 会直接显示 `稳航校准` / `深空归航`，让摘要首行同时回答“我在哪里、正在冲哪一段、还差什么、节奏如何”。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于旧“下一段”文案，补实现后转绿。标准验证结果记录在本轮最终回复。
