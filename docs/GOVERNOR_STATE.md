# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

SELF_PLAYTEST

## Iteration Track

CONTENT_REVIEW

## Cycle Bet

目标：复核 v0.7 `归航航线` 的余辉收益读回，避免起步星尘被花掉后退回“共鸣暂存”。
Appetite：1 个派生 UI 读回切片。
包括：余辉已投入文案、现有 `共鸣矩阵` 展示条件、SSR 测试和运行态文档同步。
不包括：新增第三资源、节点、节点等级树、任务系统、多生产线、额外面板、存档字段、视觉资产、余辉公式、归航奖励或 telemetry。
完成定义：玩家在花掉余辉起步星尘后，仍能在 `共鸣矩阵` 读懂余辉已经投入本轮重建节奏。

## Expected Content Advance

把 v0.7 `归航航线` 的当前收益读回补到余辉实际使用后：复用现有 `共鸣矩阵`，持续显示余辉起步星尘和可支撑的自动采集器数量。

## Evidence Source

`docs/ROADMAP.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/DECISION.md` 和上一轮自动化记忆都指向：v0.7 已补齐当前收益读回，下一步应复核航线可读性，并只做航线文案、门槛或读回优先级微调。手动 SSR 状态显示：起步星尘被花掉后，矩阵仍退回“共鸣暂存”。

## Required Artifact

更新 `src/App.tsx`、`src/App.test.tsx`、`docs/plans/2026-05-09-v07-afterglow-spent-readback-design.md`、`docs/DECISION.md`、`docs/CONTENT_ARC.md`、`docs/SELF_PLAYTEST.md`、`docs/ROADMAP.md`、`docs/QUALITY_SCORE.md`、`docs/RELEASE_LOG.md` 和本文件。

## Cycle Status

completed

## Reason

`归航余辉` 已经提供可感知的起步星尘，但旧 UI 只在当前星尘仍未花掉时显示余辉读回。玩家按目标花掉星尘后，界面会把额外共鸣描述成等待后续版本，和实际“已投入本轮重建”的体验不一致。

## Allowed Actions

- 用 TDD 增加余辉已投入 SSR 读回测试。
- 复用现有 `共鸣矩阵` 显示余辉起步星尘和已投入文案。
- 更新内容弧线、roadmap、decision、release、自测记录和 governor 状态。

## Forbidden Actions

- 不新增第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、节点等级、存档字段、指标字段、图片素材或 telemetry。
- 不修改 `星尘归航` 奖励、不修改 `归航余辉` 公式或 50 星尘上限。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 余辉已投入读回只从现有额外共鸣、永久节点和当前星尘派生。
- `共鸣矩阵` 在起步星尘已花掉时仍显示 `归航余辉`，并不退回“等待后续版本扩展用途”。
- `归航航线` 仍最多 3 段，并只从现有状态派生。
- 相关运行态文档同步当前方向。
- 完整验证通过或明确记录验证缺口。

## Next Candidate Mode / Track

下一轮优先 `CONTENT_REVIEW`：复核余辉已投入读回和航线行动提示是否让重复归航后的长期价值更清楚；若继续扩展，只做航线文案或节奏微调，不新增系统。

## Drift Status

本轮只调整现有矩阵内的派生读回，不改变存档、资源、节点、归航奖励或余辉公式；v0.7 仍限制为现有 `共鸣矩阵` 内的航线目标读回。

## Last Updated

2026-05-09: 本轮完成 v0.7 `归航余辉` 已投入读回复核。`共鸣矩阵` 现在只要两个永久节点已满且存在额外共鸣，就持续显示余辉起步星尘和可支撑的自动采集器数量；当前星尘已低于余辉起步值时，文案说明余辉已投入本轮重建节奏，不再退回“等待后续版本扩展用途”。不改变存档、资源、节点、归航奖励或余辉公式。红灯测试先失败于旧 UI 缺少余辉已投入文案，补实现后转绿。验证通过：`bun test` 116 pass，`bun run test` 116 pass，`bun run build` 成功，`./ops/governor-check.sh` 成功，`git diff --check` 成功。验证缺口：`gh issue list` 因 `error connecting to api.github.com` 失败；本轮提交后仍需尝试推送。
