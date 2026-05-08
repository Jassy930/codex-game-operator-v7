# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

目标：给 v0.7 `归航航线` 补动态差距读回，让玩家知道离下一段还差几次归航和几点额外共鸣。
Appetite：1 个派生读回切片。
包括：航线差距推导、现有 `共鸣矩阵` 内读回、阶段目标读回、测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。
完成定义：未贯通航线时，玩家能看到距下一段还差多少归航次数和额外共鸣；已贯通时，读回明确转为储备后续版本。

## Expected Content Advance

把 v0.7 `归航航线` 从静态门槛读回推进为动态差距读回：复用现有 `共鸣矩阵` 和阶段目标，显示距下一段还差多少。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.7 第一段已完成，下一步应复核航线可读性，并只做文案、门槛或读回优先级微调。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.tsx`、`src/App.test.tsx`、`docs/plans/2026-05-08-v07-route-progress-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

静态“下一段门槛”能说明规则，但不能直接告诉玩家当前差多少。动态差距读回能提升 20 小时后目标感，同时仍保持在 v0.7 的纯派生读回预算内。

## Allowed Actions

- 用 TDD 增加 `归航航线` 差距推导和 UI 读回测试。
- 复用现有 `共鸣矩阵` 和阶段目标显示航线差距。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- `归航航线` 仍最多 3 段，并只从现有状态派生。
- `共鸣矩阵` 显示当前航线段、描述、下一段门槛和距下一段差距。
- 阶段目标优先读回当前航线差距。
- 相关运行态文档同步当前方向。
- 完整验证通过。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：复核动态差距读回是否让重复归航后的长期目标更清楚；若继续扩展，只做航线文案或节奏微调，不新增系统。

## Drift Status

本轮只增加派生差距读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-08: 本轮完成 v0.7 `归航航线` 动态差距读回。`getReturnRouteReadback` 新增 `progressSummary`，未贯通航线时显示距下一段还差几次归航、几点额外共鸣；三段贯通后读回转为长期储备。现有 `共鸣矩阵` 和阶段目标复用该差距读回，不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于缺少差距字段和 UI 读回，补实现后转绿。验证通过：`bun test` 114 pass，`bun run test` 114 pass，`bun run build` 成功，`./ops/governor-check.sh` 成功，`git diff --check` 成功。
