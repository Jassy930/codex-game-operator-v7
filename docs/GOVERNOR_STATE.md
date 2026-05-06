# Governor State

## Selected Mode

SIMPLIFY

## Reason

当前没有开放 GitHub Issues。反馈处理主路径文档存在轻微漂移：`docs/FEEDBACK.md` 未说明 App 实际生成的 label/title/body，`docs/ISSUE_LEDGER.md` 仍是英文模板；需要先收口文档，避免后续路由误解。

## Allowed Actions

- 澄清反馈入口文档。
- 简化并中文化反馈 ledger 说明。
- 更新相关治理记录。
- 不改变游戏行为。

## Forbidden Actions

- 不添加新反馈渠道。
- 不回复 issue。
- 不伪造反馈。
- 不改变 GitHub Issue 路由规则。

## Exit Criteria

- `docs/FEEDBACK.md` 与 App 实际反馈链接行为一致。
- `docs/ISSUE_LEDGER.md` 的说明改为中文。
- 如 release-log 达到 5 条，更新 `docs/RETROSPECTIVE.md`。
- 治理检查通过。
- 周期结束后记录工作区状态。

## Drift Status

发现轻微文档漂移。本轮只允许反馈文档收口，不允许改动玩法或新增渠道。

## Last Updated

2026-05-06: SIMPLIFY 反馈文档漂移已收口；release-log 达 5 条后的 retrospective 已更新；`./ops/governor-check.sh` 和 `git diff --check` 通过。
