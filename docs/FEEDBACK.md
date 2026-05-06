# Feedback

## Summary

目前还没有真实玩家反馈。游戏内反馈链接会打开 GitHub Issues 新建页，并预填 label、title 和 body。

## Sources

- GitHub Issues
- 手动反馈
- 游戏内反馈链接

## Current Action

不要伪造反馈。新的 GitHub Issues 必须先通过 `docs/SIGNAL_ROUTING.md` 和 `docs/ISSUE_LEDGER.md` 路由，之后才能影响产品决策。

## In-Game Path

- Primary path: `https://github.com/Jassy930/codex-game-operator-v7/issues/new`
- Label: `feedback`
- Title: `玩家反馈：星尘工坊`
- Body: 询问玩家“前 60 秒哪里不清楚”、当时想做什么和其他补充。
- Local event: `feedback_clicked`
- Storage key: `stardust-workshop-feedback-events-v1`

## Boundary

- App 只能本地记录玩家点击了反馈链接。
- App 不能确认玩家是否最终提交 GitHub Issue。
- 不通过外部追踪或猜测方式生成 `feedback_sent`。
