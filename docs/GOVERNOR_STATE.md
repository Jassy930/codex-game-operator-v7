# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

目标：实现 v0.7 `归航航线` 第一段可玩读回，让重复归航后的 20 小时目标可见。
Appetite：1 个运行时读回切片。
包括：航线段推导、现有 `共鸣矩阵` 内读回、阶段目标读回、测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。
完成定义：已有归航历史且两个永久节点已启动后，玩家能看到当前航线、下一段门槛和继续归航意义。

## Expected Content Advance

把 v0.7 `归航航线` 第一段做成可玩读回：最多 3 个长期航线里程碑，复用现有 `共鸣矩阵` 和阶段目标。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.7 预算和设计已完成，下一步应先实现现有矩阵内的航线读回。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.tsx`、`src/App.test.tsx`、`src/styles.css`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

直接增加节点、等级树或任务会突破当前复杂度边界。先把已规划的 v0.7 `归航航线` 落成既有矩阵内读回，能提升 20 小时后目标感，同时保留后续可玩切片空间。

## Allowed Actions

- 用 TDD 增加 `归航航线` 推导和 UI 读回测试。
- 复用现有 `共鸣矩阵` 和阶段目标显示航线段。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- `归航航线` 推导最多 3 段，并只从现有状态派生。
- `共鸣矩阵` 显示当前航线段、描述和下一段门槛。
- 阶段目标优先读回当前航线。
- 相关运行态文档同步当前方向。
- 完整验证通过。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：复核 `归航航线` 是否让重复归航后的长期目标更清楚；若继续扩展，只做航线文案或节奏微调，不新增系统。

## Drift Status

本轮只增加派生读回和样式，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-08: 本轮完成 v0.7 `归航航线` 第一段读回。新增 `getReturnRouteReadback`，从 `returnCount`、额外共鸣和已启动永久节点推导最多 3 段航线；现有 `共鸣矩阵` 显示当前航线、说明和下一段门槛，阶段目标优先读回当前航线。红灯测试先失败于缺少航线模块和 UI 读回，补实现后转绿。验证通过：`bun test` 113 pass，`bun run test` 113 pass，`bun run build` 成功，`./ops/governor-check.sh` 成功，`git diff --check` 成功。Browser 预览连接两次超时，`curl` 也无法连到本地 dev server 端口；视觉冒烟以 SSR UI 测试和生产构建替代。
