# Signal Routing

## Principle

GitHub Issues are signals, not tasks.

Default behavior:

```text
Do not implement.
Do not reply.
Do not promise.
First classify.
```

## Pipeline

```text
Issue
→ Fingerprint
→ Ledger
→ Cluster
→ North Star Check
→ Stage Check
→ Decision
→ Maybe Task
→ Maybe Reply
```

## Classes

### CRITICAL

Immediate action allowed.

Examples:
- game does not start
- build/deploy broken
- save corruption
- security/privacy problem

### ACTIONABLE

Can become a task if it matches current stage and North Star.

Examples:
- first upgrade too slow
- unclear next goal
- too much UI noise
- save not working
- feedback button broken

### ARCHIVE

Useful later, not now.

Examples:
- prestige system
- complex skill tree
- multiple worlds
- advanced automation

Action:
- record in `IDEA_PARKING_LOT.md` or `FEEDBACK_CLUSTERS.md`
- do not implement now

### IGNORE / DECLINE

Does not fit North Star.

Examples:
- PvP
- multiplayer economy
- unrelated platform requests
- demands to rewrite the product direction

Action:
- no implementation
- optional one-time concise decline
- no repeated discussion

## Mainline Protection

No issue can directly modify `ROADMAP.md`.

It must first appear in:

1. `ISSUE_LEDGER.md`
2. `FEEDBACK_CLUSTERS.md`
3. `DECISION.md`
