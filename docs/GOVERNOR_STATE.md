# Governor State

## Selected Mode

SELF_PLAYTEST

## Reason

当前没有开放 GitHub Issues。研究结论已经把下一步限定为购买自动采集器后的轻量确认反馈；本轮验证并实现一个 UI-only 改动。

## Allowed Actions

- 评估前 10/30/60 秒体验。
- 更新 `docs/SELF_PLAYTEST.md`。
- 实现一个小型 UI 清晰度修复。
- 添加回归测试。

## Forbidden Actions

- 不添加大型功能。
- 不添加新资源系统。
- 不添加奖励系统、弹窗教程或经济数值变化。
- 不回复 issue。

## Exit Criteria

- 购买自动采集器后的轻量确认反馈已实现并测试。
- 相关文档与发布记录已更新。
- 周期结束后记录工作区状态。

## Drift Status

未发现漂移。本轮只允许 UI-only 购买反馈，不允许扩展系统。

## Last Updated

2026-05-06: SELF_PLAYTEST 购买自动采集器轻量确认反馈已本地实现；`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 均通过。
