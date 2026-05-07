# Harness Changelog

Records all harness rule changes.

## Initial

- Created v7.2 clean-room four-layer harness.
- Added meta-governance.
- Added operating modes.
- Added self-playtest as non-issue input source.
- Renamed ideas to idea parking lot to avoid backlog behavior.

## 2026-05-06 - Tooling Policy Alignment

### Files Changed

- `.gitignore`
- `README.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/OPERATING_MODES.md`
- `ops/autopush.sh`
- `ops/create-pages-workflow.sh`
- `ops/deploy.sh`
- `ops/governor-check.sh`
- `docs/META_GOVERNANCE.md`

### Failure Mode

Harness scripts and docs referenced `npm` even though repository policy requires `bun` for JS/TS work.

### Evidence

`rg -n "npm|git init|codex-game-operator-v7-2-clean-room"` found stale setup and package-manager references.

### Change

Updated setup docs and JS/TS automation paths to use the GitHub repository and `bun`.
Reduced false positives in the issue-as-signal language check without relaxing the rule.

### Why This Does Not Weaken Constraints

This tightens tooling consistency and does not relax issue routing, response budget, complexity budget, review protocol, or deployment checks.

### Follow-up

When the playable app is bootstrapped, verify the generated `package.json` scripts match these commands.

## 2026-05-06 - Anti-Achievement Goal Clarification

### Files Changed

- `prompts/goal.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/DECISION.md`

### Failure Mode

The operator previously marked a phase-completion milestone as goal completion after MVP, feedback, deployment, and self-playtest work were done.

### Evidence

The active goal is perpetual product operation. Recent release and self-playtest cycles completed phase transitions, but the system still has no real feedback and must keep selecting the next operating mode.

### Change

Added an anti-achievement clause to `prompts/goal.md` stating that MVP completion, deployment, tests, or no open issues are not completion conditions. The clause directs the operator to select the next mode after each phase.

### Why This Does Not Weaken Constraints

This tightens the harness. It preserves North Star alignment, issue routing, response budget, complexity budget, review protocol, and deployment checks.

### Follow-up

Continue treating completion as unavailable unless the user explicitly pauses/stops the perpetual operation goal, credentials block progress, or a real budget limit is reached.

## 2026-05-06 - Metrics Infrastructure Operating Mode

### Files Changed

- `docs/OPERATING_MODES.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/DECISION.md`

### Failure Mode

`prompts/goal.md` lists metrics gap as an input source, and `docs/METRICS.md` identifies desired local metrics, but no operating mode explicitly allowed metrics infrastructure work after the game became playable.

### Evidence

The project now has a public preview, feedback path, and multiple self-playtest cycles. Further first-60-second decisions need local measurement support, but using `SELF_PLAYTEST` for telemetry would blur mode boundaries.

### Change

Added a constrained `METRICS_INFRA` mode that permits local-only telemetry, first-minute counters, metrics docs, and tests.

### Why This Does Not Weaken Constraints

The mode forbids uploads, personal data, external analytics SDKs, new gameplay mechanics, and issue replies. It preserves North Star alignment, issue routing, response budget, complexity budget, and review protocol.

### Follow-up

Use `METRICS_INFRA` only when local measurement directly supports self-playtest or roadmap decisions.

## 2026-05-07 - Feedback Loop Automation Checks

### Files Changed

- `ops/governor-check.sh`
- `ops/collect-feedback.sh`
- `src/ops-scripts.test.ts`
- `docs/ISSUE_LEDGER.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/RELEASE_LOG.md`

### Failure Mode

反馈闭环规则主要停留在文档层。脚本只检查文件存在，不能阻止 accepted/fixed issue 缺少聚类、decision 锚点或 release evidence；反馈采集也只保留 issue 列表，缺少 body/comments 证据。

### Evidence

代码评审指出三处缺口：governor check 未验证反馈闭环，collector 缺少可路由证据，ledger 允许模糊链接。新增 `src/ops-scripts.test.ts` 先复现这些失败模式。

### Change

`governor-check` 现在验证 issue ledger 中已接受/已修复条目的 cluster、decision anchor、release evidence 和 release log 关联。`collect-feedback` 现在抓取 issue body/comments，并输出 ledger draft。`ISSUE_LEDGER.md` 增加 evidence format 规则。

### Why This Does Not Weaken Constraints

该变更只加强 issue routing、response budget 和 release evidence 的自动化检查，不放宽复杂度预算、review protocol、测试要求或部署要求。

### Follow-up

后续若增加 issue 回复自动化，应先扩展 governor check，验证回复预算和最后回复记录，而不是直接调用 GitHub API 回复。

## Template

```md
## YYYY-MM-DD - Change

### Files Changed

### Failure Mode

### Evidence

### Change

### Why This Does Not Weaken Constraints

### Follow-up
```
