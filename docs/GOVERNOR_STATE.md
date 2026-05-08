# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

CONTENT_REVIEW

## Cycle Bet

目标：复核 v0.7 `归航航线` 的下一段预览，把三段长期路径一次读出来。
Appetite：1 个派生 UI 读回切片。
包括：航线图文案、现有 `共鸣矩阵` 展示、SSR/单元测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产、余辉公式、归航奖励或 telemetry。
完成定义：玩家在看见当前航线时，能同时读懂当前段、下一段和完整三段终点，而不是只知道下一段名称。

## Expected Content Advance

把 v0.7 `归航航线` 的下一段预览补成航线图：复用现有 `共鸣矩阵`，显示 `余辉起航 -> 稳航校准 -> 深空归航` 的完整路径和当前所在段。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和长期记忆都指向：v0.7 已补齐差距、行动提示、下一段预览、当前收益和节奏预判，下一步应复核航线是否减少迷失感，并只做航线文案、门槛或读回优先级微调。代码阅读显示：当前 `nextPreview` 只说明达成后进入哪一段，缺少完整三段路径读回。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.tsx`、`src/App.test.tsx`、`docs/plans/2026-05-09-v07-route-map-readback-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

`归航航线` 已经给出当前段、差距、行动提示、下一段预览、当前收益和节奏预判，但下一段预览仍是局部信息。若玩家只看到“达成后进入稳航校准/深空归航”，还要自己拼出完整三段长期路径。这轮只补航线图，让 20 小时后的目标结构更可扫读。

## Allowed Actions

- 用 TDD 增加航线图的单元测试和 SSR 读回测试。
- 复用现有 `共鸣矩阵` 显示航线图。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 节奏预判只从现有 `returnCount`、额外共鸣和目标门槛派生。
- 航线图只从现有航线段派生，不新增存档字段。
- `共鸣矩阵` 在航线出现时说明完整三段路径和当前所在段。
- `归航航线` 仍最多 3 段，并只从现有状态派生。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：复核航线图是否让重复归航后的长期目标更清楚；若继续扩展，只做航线文案或节奏微调，不新增系统。

## Drift Status

本轮只调整现有矩阵内的派生读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-09: 本轮完成 v0.7 `归航航线` 航线图读回复核。`ReturnRouteReadback` 新增 `routeMap`，现有 `共鸣矩阵` 会显示 `余辉起航 -> 稳航校准 -> 深空归航` 的完整三段路径和当前所在段；三段贯通后转为长期储备读回。阶段目标仍保持短行动提示。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于缺少 `routeMap` 字段和 UI 读回，补实现后转绿。标准验证结果记录在本轮最终回复。
