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
