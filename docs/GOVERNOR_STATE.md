# Governor State

## Selected Mode

SELF_PLAYTEST

## Reason

当前没有开放 GitHub Issues。购买自动采集器后的短暂反馈已经存在；本轮检查它是否造成前 60 秒布局跳动或 UI 噪音。

## Allowed Actions

- 评估前 10/30/60 秒体验。
- 修复一个小型 UI 清晰度问题。
- 更新 self-playtest 和决策文档。
- 添加或更新测试。

## Forbidden Actions

- 不添加大型功能。
- 不添加新资源系统。
- 不添加奖励系统。
- 不新增面板或反馈渠道。

## Exit Criteria

- 购买反馈不再造成明显布局跳动。
- 相关测试通过。
- 文档和发布记录已更新。
- 治理检查通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现复杂度超标。本轮只允许 UI-only 购买反馈稳定性修复。

## Last Updated

2026-05-06: SELF_PLAYTEST 事件反馈稳定区域已实现；`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 均通过。
