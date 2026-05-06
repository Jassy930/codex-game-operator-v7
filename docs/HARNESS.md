# Harness

## Purpose

The harness prevents the operator from drifting, endlessly replying to issues, or adding features without product coherence.

## Operating Cycle

```text
Collect Signals
→ Update Issue Ledger
→ Cluster Feedback
→ Check North Star
→ Check Governor State
→ Choose One Decision
→ Implement Small Change
→ Run Checks
→ Release or Defer
→ Update Logs
→ Maybe Reply to Issue
→ Retrospective Every 10 Cycles
```

## Drift Detection

Drift is present if:

- same issue is replied to repeatedly;
- same issue causes multiple tiny repetitive commits;
- README grows faster than gameplay clarity;
- new mechanics are added without feedback cluster support;
- UI complexity increases while first-60-second clarity remains poor.
