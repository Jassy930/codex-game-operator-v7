# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

CONTENT_REVIEW

## Cycle Bet

目标：复核 v0.7 `归航航线` 的行动提示，把“再归航会自然补足额外共鸣”的节奏读出来。
Appetite：1 个派生 UI 读回切片。
包括：节奏预判文案、现有 `共鸣矩阵` 展示、SSR/单元测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产、余辉公式、归航奖励或 telemetry。
完成定义：玩家在看见下一段门槛时，能读懂还需要几次归航，以及这些归航是否已经足以带来所需额外共鸣。

## Expected Content Advance

把 v0.7 `归航航线` 的行动提示补成节奏预判：复用现有 `共鸣矩阵`，说明按当前路线再归航几次是否可直接进入下一段，或归航次数达标后还差几点额外共鸣。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和上一轮自动化记忆都指向：v0.7 已补齐余辉已投入读回，下一步应复核航线行动提示是否减少迷失感，并只做航线文案、门槛或读回优先级微调。代码阅读显示：当前 `actionHint` 会同时列出归航次数与额外共鸣，但没有说明归航本身会继续产出共鸣。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.tsx`、`src/App.test.tsx`、`docs/plans/2026-05-09-v07-route-cadence-forecast-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

`归航航线` 已经给出下一段门槛和下一步行动，但重复归航同时会增加 `returnCount` 和额外共鸣。若只列出两项差距，玩家可能误读成“先做 N 次归航，再另外补 M 点共鸣”。这轮只补预判文案，让长期目标更可执行。

## Allowed Actions

- 用 TDD 增加航线节奏预判的单元测试和 SSR 读回测试。
- 复用现有 `共鸣矩阵` 显示节奏预判。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 节奏预判只从现有 `returnCount`、额外共鸣和目标门槛派生。
- `共鸣矩阵` 在未贯通航线时说明再归航几次能否直接进入下一段。
- `归航航线` 仍最多 3 段，并只从现有状态派生。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：复核节奏预判是否让重复归航后的长期目标更清楚；若继续扩展，只做航线文案或节奏微调，不新增系统。

## Drift Status

本轮只调整现有矩阵内的派生读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-09: 本轮完成 v0.7 `归航航线` 节奏预判复核。`ReturnRouteReadback` 新增 `cadenceForecast`，现有 `共鸣矩阵` 会显示按当前路线再归航几次是否即可进入下一段，或归航次数达标后还差几点额外共鸣；三段贯通后转为长期储备预判。阶段目标仍保持短行动提示。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于缺少 `cadenceForecast` 字段和 UI 读回，补实现后转绿。验证通过：`bun test` 117 pass，`bun run test` 117 pass，`bun run build` 成功。浏览器冒烟缺口：本地 Vite 可启动在 `http://127.0.0.1:5174/`，但 in-app Browser 返回无可用窗格。
