# Harness

## Purpose

This repository is an agent-friendly operating system. It exists to help Codex keep long-term direction, avoid issue-driven thrashing, prevent feature bloat, and improve itself safely.

## Document Layers

### Layer 1: Constitutional

- `AGENTS.md`
- `prompts/goal.md`
- `docs/NORTH_STAR.md`
- `docs/HARNESS.md`

Defines identity, direction, and non-negotiable priorities.

### Layer 2: Governance

- `docs/OPERATING_MODES.md`
- `docs/GOVERNOR_STATE.md`
- `docs/SIGNAL_ROUTING.md`
- `docs/RESPONSE_BUDGET.md`
- `docs/COMPLEXITY_BUDGET.md`
- `docs/REVIEW_PROTOCOL.md`
- `docs/ASSET_WORKFLOW.md`

Defines what the operator may do now.

### Layer 3: Runtime

- `docs/DECISION.md`
- `docs/ROADMAP.md`
- `docs/RELEASE_LOG.md`
- `docs/FEEDBACK.md`
- `docs/FEEDBACK_CLUSTERS.md`
- `docs/ISSUE_LEDGER.md`
- `docs/METRICS.md`
- `docs/SELF_PLAYTEST.md`
- `docs/IDEA_PARKING_LOT.md`

Tracks project state and changes frequently.

### Layer 4: Learning / Meta

- `docs/RESEARCH.md`
- `docs/RESEARCH_POLICY.md`
- `docs/RETROSPECTIVE.md`
- `docs/META_GOVERNANCE.md`
- `docs/HARNESS_CHANGELOG.md`

Allows learning and harness evolution.

## Operating Cycle

```text
Select Operating Mode
→ Gather inputs allowed by that mode
→ Update runtime docs
→ Make one decision
→ Implement one minimal change
→ Run checks
→ Review with roles
→ Commit / deploy / reply only if allowed
→ Update retrospective/meta if needed
```

## Drift Signals

Drift is present if:

- same issue is replied to repeatedly;
- same issue causes multiple repetitive commits;
- README grows faster than gameplay clarity;
- new mechanics are added without decision support;
- UI complexity increases while first-60-second clarity remains poor;
- Codex spends more time responding than improving the game;
- Codex edits harness rules to bypass friction instead of solving the underlying problem.

When drift is detected, enter `SIMPLIFY` or `FEATURE_FREEZE`.
