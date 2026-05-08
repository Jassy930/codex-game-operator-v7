# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

OPERATE

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

目标：补齐 v0.5 `星尘归航` 后第 2 轮开局的共鸣读回。
Appetite：1 个 UI/目标读回切片。
包括：当玩家归航后带着可用共鸣或永久节点回到新一轮火花工作台时，复用现有 `共鸣矩阵` 和阶段目标提示先消费共鸣。
不包括：不新增资源、节点、节点等级、任务系统、多生产线、额外面板、存档字段、数值曲线、视觉资产或 telemetry。
完成定义：归航后的第 2 轮开局能看到可用共鸣、可启动的第 2 个永久节点和“先花共鸣再推进工坊”的目标读回。

## Expected Content Advance

让 `星尘归航` 不只是重置按钮，而是在下一轮开局立即读回“这次归航带来了可花费的共鸣”。

## Evidence Source

`docs/QUALITY_SCORE.md` 当前最低分优先指向 `Content Depth`；`docs/ROADMAP.md`、`docs/CONTENT_ARC.md` 和 `docs/SELF_PLAYTEST.md` 都要求复核 v0.5 归航后的第 2 轮体验、共鸣消费优先级和重复归航目标。

## Required Artifact

更新 `src/App.test.tsx`、`src/App.tsx`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

归航第一版已经能奖励 `1 共鸣` 并重置本轮工坊，但归航后玩家回到火花工作台时，现有共鸣消费目标容易被工坊早期目标遮住。这个缺口会削弱第 2 轮开局的长线反馈。

## Allowed Actions

- 用 TDD 增加归航后第 2 轮开局读回测试。
- 复用现有 `共鸣矩阵`，只在已有共鸣、永久节点或归航历史时显示。
- 调整阶段目标优先级，让可用共鸣消费优先于普通升级等待。
- 同步玩法文档、release 记录、governor state 和自动化记忆。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、存档字段、指标字段、图片素材或 telemetry。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 归航后带着 `1 共鸣` 和 1 个永久节点的新一轮开局显示 `共鸣矩阵`。
- 阶段目标提示先用共鸣启动永久节点。
- 新玩家首屏仍不显示 `共鸣矩阵`。
- 完整验证通过。

## Next Candidate Mode / Track

完成后优先继续 `CONTENT_REVIEW / PLAYABLE_CONTENT`：复核满节点后额外共鸣是否需要暂存说明，还是等待后续 v0.6 设计。

## Drift Status

本轮复用现有 `共鸣矩阵` 和 v0.5 `星尘归航` 预算，不新增系统复杂度。

## Last Updated

2026-05-08: 已补齐归航后第 2 轮开局共鸣消费读回。新增红灯测试 `keeps available return resonance spendable at the start of the next loop`，确认旧行为不显示 `共鸣矩阵`；实现后归航历史、可用共鸣或永久节点会让现有矩阵在新一轮火花工作台继续显示，阶段目标优先提示先用共鸣启动永久节点。验证通过：`bun test` 102 pass，`bun run test` 102 pass，`bun run build` 成功，`./ops/governor-check.sh` 退出 0，`git diff --check` 退出 0。
