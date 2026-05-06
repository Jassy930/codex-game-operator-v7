# Feedback

## Summary

目前还没有真实玩家反馈。游戏内反馈链接会打开 GitHub Issues 新建页，并使用仓库内的 `feedback.yml` issue form 收集前 60 秒清晰度反馈。

## Sources

- GitHub Issues
- 手动反馈
- 游戏内反馈链接

## Current Action

不要伪造反馈。新的 GitHub Issues 必须先通过 `docs/SIGNAL_ROUTING.md` 和 `docs/ISSUE_LEDGER.md` 路由，之后才能影响产品决策。

## External Playtest Invitation

站外邀请可复用 README 中的“外部 Playtest 邀请”。邀请只应指向公开预览和单一 GitHub Issue Form，不新增问卷、邮件、Discord、录屏上传或 analytics。

## In-Game Path

- Primary path: `https://github.com/Jassy930/codex-game-operator-v7/issues/new?template=feedback.yml`
- Template: `.github/ISSUE_TEMPLATE/feedback.yml`
- Label: `feedback`
- Title: `玩家反馈：星尘工坊`
- Fields: 前 60 秒哪里不清楚、当时想做什么、主要发生在哪一步、其他补充。
- Local event: `feedback_clicked`
- Storage key: `stardust-workshop-feedback-events-v1`

## Boundary

- App 只能本地记录玩家点击了反馈链接。
- App 不能确认玩家是否最终提交 GitHub Issue。
- 不通过外部追踪或猜测方式生成 `feedback_sent`。
- 外部 playtest 邀请不是玩家反馈本身；只有真实提交的 GitHub Issue 或明确手动反馈才能进入 `docs/ISSUE_LEDGER.md`。
