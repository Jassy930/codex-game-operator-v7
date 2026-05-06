# Governor State

## Selected Mode

SIMPLIFY

## Reason

当前没有开放 GitHub Issues。`docs/METRICS.md` 仍有多处英文说明，不符合“文档使用中文”的仓库约束；本轮只做指标文档语言收口，保留 metric key 原文。

## Allowed Actions

- 中文化 `docs/METRICS.md` 的说明文字。
- 保留 storage key 和 metric key 原文。
- 更新相关治理记录。
- 不改变代码行为。

## Forbidden Actions

- 不新增指标。
- 不改 storage key。
- 不上传 telemetry。
- 不改变代码行为。

## Exit Criteria

- `docs/METRICS.md` 的说明文字已中文化。
- metric key 和 storage key 保持不变。
- 治理检查通过。
- 周期结束后记录工作区状态。

## Drift Status

发现轻微文档语言漂移。本轮只允许 metrics 文档语言收口。

## Last Updated

2026-05-06: SIMPLIFY `docs/METRICS.md` 说明已中文化，key 原文保留；`./ops/governor-check.sh` 和 `git diff --check` 通过。
