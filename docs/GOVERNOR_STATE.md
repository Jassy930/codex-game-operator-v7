# Governor State

## Selected Mode

METRICS_INFRA

## Reason

当前没有开放 GitHub Issues。`docs/METRICS.md` 的 Current Decision 仍把 local-only telemetry 绑定到“尚未公开部署”，但项目已经有公开预览；需要修正文档边界，避免后续误解为公开后可以自动上传 telemetry。

## Allowed Actions

- 更新 `docs/METRICS.md`。
- 明确公开预览阶段仍保持 local-only 的原因。
- 保持所有指标只在浏览器本地存储。
- 记录决策边界。

## Forbidden Actions

- 不上传 telemetry。
- 不收集个人数据。
- 不添加外部 analytics SDK。
- 不添加 gameplay mechanics。
- 不回复 issue。

## Exit Criteria

- `docs/METRICS.md` 的公开预览 telemetry 边界已修正。
- `docs/DECISION.md` 记录 local-only policy 继续有效。
- 治理检查通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现漂移。本轮只允许指标文档修正，不允许添加追踪或改变反馈流。

## Last Updated

2026-05-06: METRICS_INFRA 公开预览后的 local-only metrics policy 已修正；`./ops/governor-check.sh` 和 `git diff --check` 通过。
