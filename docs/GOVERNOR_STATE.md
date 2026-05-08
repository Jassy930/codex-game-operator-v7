# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

目标：把 v0.7 `归航航线` 的差距读回补成当前值 / 目标值的本段进度。
Appetite：1 个纯派生进度读回切片。
包括：第一段 / 第二段归航次数与额外共鸣进度、贯通后完成态、现有 `共鸣矩阵` 展示、SSR/单元测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产、余辉公式、归航奖励或 telemetry。
完成定义：玩家在看见当前航线块时，能同时读懂“我正在冲哪一段”“已经做到多少”“还差什么”和“继续归航是否足够”。

## Expected Content Advance

把 v0.7 `归航航线` 的差距读回补上本段进度：让 20 小时后的重复归航不只显示“距稳航校准 / 深空归航还差什么”，也直接显示当前归航次数和额外共鸣已经推进到目标的几分之几。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和自动化记忆都指向：v0.7 已补齐具名差距、行动提示、下一段预览、当前收益、节奏预判、航线图和航线摘要，下一步应复核航线是否减少迷失感，并只做航线文案、门槛或读回优先级微调。代码阅读显示：当前读回有“还差 N 次 / N 点”，但缺少“当前 N/M”的进度式扫读，玩家仍要把差距和门槛相减才能判断本段推进程度。

## Required Artifact

更新 `src/return-route.ts`、`src/return-route.test.ts`、`src/App.tsx`、`src/App.test.tsx`、`docs/plans/2026-05-09-v07-route-progress-meter-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

`归航航线` 已经给出摘要、当前收益、下一段门槛、具名差距、行动提示、节奏预判、航线图和下一段预览，但玩家仍看不到当前归航次数和额外共鸣分别推进到目标的几分之几。这轮只增加本段进度读回，不改数值或系统，让 20 小时后的重复归航更像可追踪的路线。

## Allowed Actions

- 用 TDD 增加本段进度的单元测试和 SSR 读回测试。
- 复用现有 `共鸣矩阵` 显示带当前价值的航线摘要。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 航线本段进度只从现有 `returnCount`、额外共鸣和目标门槛派生。
- 不新增存档字段。
- `共鸣矩阵` 在航线出现时显示当前值 / 目标值进度，再保留完整细节。
- `归航航线` 仍最多 3 段，并只从现有状态派生。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：手动复核本段进度后的航线摘要是否让重复归航后的长期目标更清楚；若没有新缺口，转向 `HARNESS_MAINTENANCE` 处理过期计划和文档真实性检查。

## Drift Status

本轮只调整现有矩阵内的派生进度读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-09: 本轮完成 v0.7 `归航航线` 本段进度读回。现有 `共鸣矩阵` 会显示归航次数和额外共鸣的当前值 / 目标值，例如 `归航 3/6 · 额外共鸣 2/4`；三段贯通后显示 `航线 3/3 已贯通`。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于缺少 `routeProgress` 和 UI 行，补实现后转绿。验证通过：`bun test`、`bun run test`、`bun run build`、`git diff --check`；最终 `governor-check` 结果记录在本轮收口。
