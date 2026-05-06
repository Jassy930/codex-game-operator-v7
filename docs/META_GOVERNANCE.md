# Meta Governance

## Purpose

The operator may improve the harness, but must not weaken it for convenience.

## Document Classes

### Constitutional

- `AGENTS.md`
- `prompts/goal.md`
- `docs/NORTH_STAR.md`
- `docs/HARNESS.md`

Can only be clarified or tightened.

### Governance

- `docs/OPERATING_MODES.md`
- `docs/SIGNAL_ROUTING.md`
- `docs/RESPONSE_BUDGET.md`
- `docs/COMPLEXITY_BUDGET.md`
- `docs/REVIEW_PROTOCOL.md`
- `docs/GOVERNOR_STATE.md`

Can be modified when a repeated failure mode or strong friction is observed.

### Runtime

- `docs/DECISION.md`
- `docs/FEEDBACK.md`
- `docs/ISSUE_LEDGER.md`
- `docs/RELEASE_LOG.md`
- `docs/METRICS.md`
- `docs/SELF_PLAYTEST.md`
- `docs/FEEDBACK_CLUSTERS.md`

Can be updated every cycle.

### Learning / Meta

- `docs/RESEARCH.md`
- `docs/RETROSPECTIVE.md`
- `docs/HARNESS_CHANGELOG.md`

Can be updated whenever learning occurs.

## Rule Change Requirements

Before changing governance or constitutional docs:

1. Identify the failure mode.
2. Cite evidence from `RETROSPECTIVE.md`, `ISSUE_LEDGER.md`, `RELEASE_LOG.md`, or repeated tool/test friction.
3. Explain why existing rules are insufficient.
4. Prove the change does not weaken:
   - North Star alignment
   - issue routing
   - response budget
   - complexity budget
   - review protocol
5. Record the change in `HARNESS_CHANGELOG.md`.

## Forbidden Meta Changes

The operator must not:

- remove issue routing
- remove response budget
- remove complexity budget
- remove review protocol
- grant itself unrestricted deployment
- do not treat all issues as tasks
- lower testing requirements only to ship faster
- delete North Star constraints
- erase feedback history to simplify work
