# Governor State

## Selected Mode

METRICS_INFRA

## Reason

当前没有开放 GitHub Issues。`docs/METRICS.md` 仍列出 `save_loaded`，但本地指标尚未记录有效存档加载；这会限制后续判断回访和离线收益提示是否被触发。

## Allowed Actions

- 添加 local-only telemetry event。
- 添加指标记录测试。
- 更新 `docs/METRICS.md`。
- 保持所有指标只在浏览器本地存储。

## Forbidden Actions

- 不上传 telemetry。
- 不收集个人数据。
- 不添加外部 analytics SDK。
- 不添加 gameplay mechanics。
- 不回复 issue。

## Exit Criteria

- `save_loaded` 本地指标已记录并测试。
- `docs/METRICS.md` 说明记录内容和隐私边界。
- 测试和构建通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现漂移。本轮只允许 local-only save-loaded 指标，不允许改变玩法。

## Last Updated

2026-05-06: METRICS_INFRA `save_loaded` 本地指标已实现；`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 均通过。
