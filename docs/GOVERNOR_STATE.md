# Governor State

历史状态已归档到 `docs/archive/2026-05-08-runtime-docs/GOVERNOR_STATE.md`。本文件只记录当前 cycle 和下一步候选。

## Selected Mode

META_IMPROVE

## Iteration Track

HARNESS_MAINTENANCE

## Cycle Bet

目标：建立统一文档生命周期机制，并把当前膨胀的运行态文档压缩为高信号摘要。
Appetite：1 个治理切片。
包括：归档原始文档、压缩运行态文档、新增 `DOCUMENTATION_POLICY`、扩展 `governor-check` 行数和大小预算。
不包括：不改玩法、数值、视觉资产、反馈渠道、telemetry、移动端按钮视觉改动、按钮、面板、存档字段或指标字段。
完成定义：原文归档可追溯，摘要文档低于预算，完整验证通过。

## Expected Content Advance

统一处理文档爆炸问题：归档长文档，压缩当前运行态文档，并用自动检查防止再次无界增长。

## Evidence Source

用户明确建议“做个统一的机制，一波处理”。当前 `DECISION.md`、`SELF_PLAYTEST.md`、`RETROSPECTIVE.md`、`RELEASE_LOG.md` 等运行态文档已经影响当前目标定位和迭代成本。

## Required Artifact

新增 `docs/DOCUMENTATION_POLICY.md`；归档 `DECISION/GOVERNOR_STATE/SELF_PLAYTEST/RETROSPECTIVE/HARNESS_CHANGELOG/CONTENT_ARC/RESEARCH/RELEASE_LOG` 原文；压缩这些运行态文档；扩展 `ops/governor-check.sh` 和 `src/ops-scripts.test.ts`。

## Cycle Status

completed

## Reason

持续运营需要可读的当前状态。运行态文档如果无限追加，会把治理系统变成噪音源，让 operator 在旧证据里打转。

## Allowed Actions

- 新增文档生命周期策略和行数/大小预算。
- 复制原始长文档到 `docs/archive/2026-05-08-runtime-docs/`。
- 压缩当前运行态文档为高信号摘要。
- 保留 Issue #1/#2 仍需校验的 decision anchors。
- 用 TDD 扩展 `governor-check`。
- 跑完整验证并记录工作区状态。

## Forbidden Actions

- 不新增玩法、数值、资源、按钮、面板、存档字段、指标字段、图片素材或 telemetry。
- 不削弱 issue routing、response budget、complexity budget、review protocol、测试或部署要求。
- 不回复 Issue #1/#2，除非玩家提供新实质信息。

## Exit Criteria

- 运行态文档低于 `docs/DOCUMENTATION_POLICY.md` 的行数和大小预算。
- `./ops/governor-check.sh` 会阻止运行态文档再次超过预算。
- 完整验证通过。

## Next Candidate Mode / Track

完成后优先回到 `CONTENT_REVIEW` 或 `PLAYABLE_CONTENT`：复核 v0.5 归航后的第 2 轮体验、可用共鸣消费目标和重复归航节奏。不要继续停留在文档治理，除非预算检查失败。

## Drift Status

本轮处理文档噪音漂移，不新增系统复杂度。

## Last Updated

2026-05-08: 文档生命周期统一治理已收口。原始长文档已归档到 `docs/archive/2026-05-08-runtime-docs/`，当前文档压缩为摘要版，`governor-check` 增加运行态文档行数和大小预算检查。验证通过：`bun test src/ops-scripts.test.ts -t "runtime docs"` 2 pass，`bun test` 100 pass，`bun run test` 100 pass，`bun run build` 成功，`./ops/governor-check.sh` 退出 0，`git diff --check` 退出 0。
