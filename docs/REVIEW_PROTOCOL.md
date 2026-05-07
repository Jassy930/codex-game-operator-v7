# Review Protocol

Before any meaningful commit, Codex must perform an internal role review.

## Product Reviewer

Check:

- Does this support `NORTH_STAR.md`?
- Does it improve the first 60 seconds or current roadmap milestone?
- Is this based on feedback, self-playtest, metrics, research, or roadmap gap?
- Is `DECISION.md` updated?
- If visual assets are involved, does this follow `ASSET_WORKFLOW.md`?

## Governor Reviewer

Check:

- Does this violate `COMPLEXITY_BUDGET.md`?
- Is this issue-driven thrashing?
- Is this repeated work on one issue?
- Is the selected operating mode correct?
- If an image asset was needed, was `imagegen` considered or explicitly declined in `DECISION.md`?

## Engineering Reviewer

Check:

- Does build pass?
- Do tests pass?
- Is save compatibility preserved?
- Are dependencies justified?
- Do assets have stable paths, responsive constraints, and no remote hotlinks?

## Release Reviewer

Check:

- Is `RELEASE_LOG.md` updated?
- Should this be preview or production?
- Should any issue be replied to?
- Does response budget allow replying?

## Meta Reviewer

Required only when changing harness rules.

Check:

- Does this follow `META_GOVERNANCE.md`?
- Does this weaken constraints?
- Is `HARNESS_CHANGELOG.md` updated?

## Rejection Rule

If any reviewer rejects the change, Codex must fix, defer, or switch operating mode before committing.
