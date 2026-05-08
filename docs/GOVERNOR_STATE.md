# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

CONTENT_REVIEW

## Cycle Bet

目标：复核 v0.7 `归航航线` 的可扫读性，把多行航线读回压缩出一条首行摘要。
Appetite：1 个派生 UI 摘要切片。
包括：航线摘要文案、现有 `共鸣矩阵` 展示、SSR/单元测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产、余辉公式、归航奖励或 telemetry。
完成定义：玩家在看见当前航线块第一眼时，能先读懂当前段、差距和节奏预判，再决定是否展开阅读完整航线细节。

## Expected Content Advance

把 v0.7 `归航航线` 的多行读回补成首行摘要：复用现有 `共鸣矩阵`，把当前段、距下一段差距和节奏预判压缩到一行。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.7 已补齐差距、行动提示、下一段预览、当前收益、节奏预判和航线图，下一步应复核航线是否减少迷失感，并只做航线文案、门槛或读回优先级微调。代码阅读显示：当前 `归航航线` 块信息完整但段落较多，缺少第一眼可扫读的摘要行。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.tsx`、`src/App.test.tsx`、`docs/plans/2026-05-09-v07-route-summary-readback-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

`归航航线` 已经给出当前段、收益、下一段门槛、差距、行动提示、节奏预判、航线图和下一段预览，但矩阵内读回行数较多。若玩家只想快速确认下一步，仍需要扫完整块。这轮只补首行摘要，让 20 小时后的目标结构更可扫读。

## Allowed Actions

- 用 TDD 增加航线摘要的单元测试和 SSR 读回测试。
- 复用现有 `共鸣矩阵` 显示航线摘要。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 航线摘要只从现有 `returnCount`、额外共鸣、目标门槛和节奏预判派生。
- 不新增存档字段。
- `共鸣矩阵` 在航线出现时优先显示摘要，再保留完整细节。
- `归航航线` 仍最多 3 段，并只从现有状态派生。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：复核航线摘要是否让重复归航后的长期目标更清楚；若继续扩展，只做航线文案或节奏微调，不新增系统。

## Drift Status

本轮只调整现有矩阵内的派生读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-09: 本轮完成 v0.7 `归航航线` 摘要读回复核。`ReturnRouteReadback` 新增 `routeSummary`，现有 `共鸣矩阵` 会在完整细节前先显示当前段、距下一段差距和节奏预判的首行摘要；三段贯通后摘要转为长期储备读回。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于缺少 `routeSummary` 字段和 UI 读回，补实现后转绿。标准验证结果记录在本轮最终回复。
