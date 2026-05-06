# Governor State

## Selected Mode

FEEDBACK_INFRA

## Reason

当前没有开放 GitHub Issues。研究结论要求在不新增玩法系统前先降低真实反馈获取成本；本轮只优化现有 GitHub Issue 反馈正文，使其聚焦前 60 秒清晰度。

## Allowed Actions

- 更新现有 GitHub Issue 反馈链接正文。
- 保持单一反馈渠道。
- 更新反馈和决策文档。
- 添加或更新测试。

## Forbidden Actions

- 不新增反馈渠道。
- 不添加站内提交系统。
- 不上传 telemetry。
- 不收集个人数据。
- 不回复 issue。

## Exit Criteria

- GitHub Issue 预填正文聚焦前 60 秒清晰度。
- 反馈路径仍只记录 local-only `feedback_clicked`。
- 测试和构建通过。
- 治理检查通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现复杂度超标。本轮只允许优化反馈正文，不允许改变玩法或新增反馈渠道。

## Last Updated

2026-05-06: FEEDBACK_INFRA 反馈 Issue 正文已聚焦前 60 秒清晰度；`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 均通过。
