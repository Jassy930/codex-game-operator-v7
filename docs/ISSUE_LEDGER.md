# Issue Ledger

本文件记录 GitHub Issue 的路由结果，防止重复处理、重复回复或把单个 issue 直接当成任务。

| Issue | Fingerprint | Cluster | Class | Status | Last Reply | Linked Decision | Linked Commit/Release | Next Action |
|---|---|---|---|---|---|---|---|---|
| #2 | issue-2-2865075891 | post-60s-engagement | ACTIONABLE | released | 2026-05-07 | DECISION:2026-05-07-operate-post-60s-engagement | d2d2f94 | 等待新信息，不重复回复 |
| #1 | collect-motivation-first-60s | first-60s-motivation | ACTIONABLE | released | 2026-05-07 | DECISION:2026-05-07-operate-collect-motivation | 861ba0b | 等待新信息，不重复回复 |

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

## Evidence Format Rule

- `Linked Decision` 必须使用 `DECISION:YYYY-MM-DD-slug`，且同一锚点必须出现在 `docs/DECISION.md`。
- `fixed-awaiting-release` 和 `released` 必须提供具体 `Linked Commit/Release`：短/长 commit hash，或 `RELEASE_LOG:Unreleased` / `RELEASE_LOG:版本号`。
- 已回复的 issue 不能使用 `none`、`pending`、`pending-release` 或 `pending-commit` 作为 commit/release 证据。
- `fixed-awaiting-release` 或 `released` 的 issue 必须能在 `docs/RELEASE_LOG.md` 找到对应 issue 记录。
