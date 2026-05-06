# Governor State

## Selected Mode

METRICS_INFRA

## Reason

当前没有开放 GitHub Issues。`save_loaded` 已实现；剩余 `feedback_sent` 不能通过当前 GitHub Issue 外链在本地可靠记录，需要先在指标文档中明确延后边界，避免错误添加上传或外部追踪。

## Allowed Actions

- 更新 `docs/METRICS.md`。
- 明确 deferred metrics 的条件。
- 保持所有指标只在浏览器本地存储。
- 记录决策边界。

## Forbidden Actions

- 不上传 telemetry。
- 不收集个人数据。
- 不添加外部 analytics SDK。
- 不添加 gameplay mechanics。
- 不为 GitHub 外链反馈伪造 `feedback_sent`。
- 不回复 issue。

## Exit Criteria

- `feedback_sent` 的 deferred 状态和前置条件已记录。
- `docs/DECISION.md` 记录不实现原因。
- 治理检查通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现漂移。本轮只允许指标文档收口，不允许添加追踪或改变反馈流。

## Last Updated

2026-05-06: METRICS_INFRA `feedback_sent` deferred 边界已记录；`./ops/governor-check.sh` 和 `git diff --check` 通过。
