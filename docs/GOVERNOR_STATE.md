# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

META_IMPROVE

## Iteration Track

HARNESS_MAINTENANCE

## Cycle Bet

目标：把 OpenAI Harness Engineering 博文中的 agent-readable record system、机械化约束和 garbage collection 思路转成当前仓库的可执行迭代机制。
Appetite：1 个治理切片。
包括：新增 `docs/QUALITY_SCORE.md`，更新 harness map 和 iteration policy，让 `governor-check` 校验 scorecard 结构。
不包括：不改玩法、数值、视觉资产、反馈渠道、telemetry、按钮、面板、存档字段或指标字段。
完成定义：scorecard 能成为下一轮选题信号，缺失或不完整会被脚本阻止，完整验证通过。

## Expected Content Advance

把“仓库作为记录系统”和“人类品味编码进工具”落到当前 harness：下一轮不仅看 track，还看 agent readability、content depth、mechanical checks 和 garbage collection 的最低分。

## Evidence Source

用户要求基于 OpenAI Harness Engineering 博文改进当前仓库内容和迭代机制。博文强调：不要用巨型说明书，仓库应成为 agent 可读记录系统；文档规则要能被 linter/CI 验证；漂移要通过循环 garbage collection 处理。

## Required Artifact

新增 `docs/QUALITY_SCORE.md`；更新 `docs/HARNESS.md`、`docs/ITERATION_POLICY.md`、`docs/DOCUMENTATION_POLICY.md`、`docs/DECISION.md`、`docs/HARNESS_CHANGELOG.md`、`docs/RETROSPECTIVE.md`、`docs/RELEASE_LOG.md`；扩展 `ops/governor-check.sh` 和 `src/ops-scripts.test.ts`。

## Cycle Status

completed

## Reason

当前已有文档预算和 cycle gate，但还缺一个把“agent 可读性、内容深度、机械检查、垃圾收集”合成下一步选题信号的轻量机制。没有这个信号，operator 仍可能在治理维护和小 polish 中漂移。

## Allowed Actions

- 新增 harness engineering scorecard。
- 将 scorecard 接入 harness map、iteration policy 和 documentation policy。
- 用 TDD 扩展 `governor-check`，校验 scorecard section。
- 跑完整验证并记录工作区状态。

## Forbidden Actions

- 不新增玩法、数值、资源、按钮、面板、存档字段、指标字段、图片素材或 telemetry。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- `docs/QUALITY_SCORE.md` 记录四个核心维度和下一最低分 bet。
- `./ops/governor-check.sh` 会阻止 scorecard 缺失或结构不完整。
- 完整验证通过。

## Next Candidate Mode / Track

完成后优先回到 `CONTENT_REVIEW / PLAYABLE_CONTENT`：`docs/QUALITY_SCORE.md` 当前最低分是 `Content Depth` 和 `Garbage Collection`，其中玩家价值优先级更高，应复核 v0.5 归航第二轮体验。

## Drift Status

本轮处理 harness 可读性和选题漂移，不新增游戏系统复杂度。

## Last Updated

2026-05-08: Harness Engineering scorecard 机制已收口。新增 `docs/QUALITY_SCORE.md`，并把 scorecard 接入 harness map、iteration policy、documentation policy 和 `governor-check`。验证通过：先观察 `bun test src/ops-scripts.test.ts -t "scorecard"` 红灯，修复后聚焦测试 1 pass；`bun test` 101 pass，`bun run test` 101 pass，`bun run build` 成功，`./ops/governor-check.sh` 退出 0，`git diff --check` 退出 0。
