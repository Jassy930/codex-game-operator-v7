# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

CONTENT_REVIEW

## Cycle Bet

目标：复核 v0.7 `归航航线` 下一段预览，把“达成后去哪里”补成“当前段已经带来什么长期收益”。
Appetite：1 个派生当前收益读回切片。
包括：航线当前收益推导、现有 `共鸣矩阵` 内读回、测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。
完成定义：玩家能在当前 `归航航线` 段看到已获得的长期收益，例如起步星尘、重建节奏压缩或后续版本储备。

## Expected Content Advance

把 v0.7 `归航航线` 从下一段预览推进为当前收益读回：复用现有 `共鸣矩阵`，说明当前航线段对重复归航的长期意义。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.7 下一段预览已完成，下一步应复核航线可读性，并只做航线文案或读回优先级微调。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.tsx`、`src/App.test.tsx`、`docs/plans/2026-05-08-v07-route-payoff-review-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

下一段预览能说明达成门槛后进入哪一段，但当前段的收益仍散在余辉和描述文案里。当前收益读回能把“我已经推进了什么”放在同一个航线块中，同时仍保持在 v0.7 的纯派生读回预算内。

## Allowed Actions

- 用 TDD 增加 `归航航线` 当前收益和 UI 读回测试。
- 复用现有 `共鸣矩阵` 显示航线当前收益。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- `归航航线` 仍最多 3 段，并只从现有状态派生。
- `共鸣矩阵` 显示当前航线段、描述、当前收益、下一段门槛、距下一段差距、行动提示和下一段预览。
- 阶段目标优先读回当前航线行动提示。
- 相关运行态文档同步当前方向。
- 完整验证通过。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：复核当前收益读回是否让重复归航后的长期价值更清楚；若继续扩展，只做航线文案或节奏微调，不新增系统。

## Drift Status

本轮只增加派生当前收益读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-08: 本轮完成 v0.7 `归航航线` 当前收益读回复核。`getReturnRouteReadback` 新增 `currentPayoff`，`余辉起航` 读回额外共鸣已能转成下一轮起步星尘，`稳航校准` 读回余辉开局已稳定并压缩重建时间，`深空归航` 读回额外共鸣会作为后续版本储备。现有 `共鸣矩阵` 显示当前收益，阶段目标仍优先读回行动提示，不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于缺少 `currentPayoff` 字段和 UI 读回，补实现后转绿。验证通过：`bun test` 116 pass，`bun run test` 116 pass，`bun run build` 成功，`./ops/governor-check.sh` 成功，`git diff --check` 成功。验证缺口：`gh issue list` 因 `error connecting to api.github.com` 失败，`git push origin main` 因 `ssh: Could not resolve hostname github.com` 失败。
