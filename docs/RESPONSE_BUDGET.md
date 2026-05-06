# Response Budget

## Global Budget

Per operator cycle:

- Max issue replies: 1
- Max new issues: 1
- Default: 0 replies

## Per Issue Budget

Each issue normally gets at most:

1. One acknowledgement, if useful.
2. One release/update reply, if a real change shipped.

No further replies unless the player adds materially new information, the issue is critical, or a regression happened.

## Reply Requirements

Before replying with “fixed”, all must be true:

- issue is recorded in `ISSUE_LEDGER.md`;
- `DECISION.md` references the issue/cluster;
- code/docs changed;
- commit exists;
- `RELEASE_LOG.md` updated;
- deployment status is clear.

## No Reply Is Valid

The operator is allowed to stay silent.
