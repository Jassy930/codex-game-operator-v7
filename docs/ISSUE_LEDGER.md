# Issue Ledger

本文件记录 GitHub Issue 的路由结果，防止重复处理、重复回复或把单个 issue 直接当成任务。

| Issue | Fingerprint | Cluster | Class | Status | Last Reply | Linked Decision | Linked Commit/Release | Next Action |
|---|---|---|---|---|---|---|---|---|
| #1 | collect-motivation-first-60s | first-60s-motivation | ACTIONABLE | fixed-awaiting-release | none | 2026-05-07 OPERATE collect motivation | pending | 验证通过并提交后回复一次 |

## Status Values

- `new`: 已发现但尚未路由。
- `clustered`: 已归入反馈簇。
- `accepted`: 已接受为符合 North Star 和当前阶段的输入。
- `deferred`: 延后处理。
- `declined`: 明确不采纳。
- `fixed-awaiting-release`: 已修复，等待发布。
- `released`: 已发布。
- `waiting-for-new-info`: 等待更多信息。
- `closed-no-action`: 关闭且不采取行动。

## Rule

如果 issue 不在本 ledger 中，不要实现它；除最多一次简短澄清外，不要回复它。
