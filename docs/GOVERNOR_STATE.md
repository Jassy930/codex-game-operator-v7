# Governor State

## Selected Mode

SELF_PLAYTEST

## Reason

当前没有开放 GitHub Issues。游戏已公开部署，最新本地指标改动已发布，因此下一轮应评估前 60 秒体验，而不是新增系统。

## Allowed Actions

- 评估前 10/30/60 秒体验。
- 使用本地指标或确定性模拟支撑判断。
- 更新 `docs/SELF_PLAYTEST.md`。
- 在 `docs/DECISION.md` 记录一个具体改进候选。

## Forbidden Actions

- 不添加大型功能。
- 不添加新资源系统。
- 不把 self-playtest 当作真实玩家反馈。
- 不回复 issue。

## Exit Criteria

- 已记录一个具体的前 60 秒缺口。
- 所有拟议改动都能追溯到 `docs/DECISION.md`。
- 周期结束后记录工作区状态。

## Drift Status

未发现漂移。本次改动是来自 self-playtest 的 UI-only 清晰度修复。

## Last Updated

2026-05-06: SELF_PLAYTEST 动态目标提示已本地实现；`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 均通过。
