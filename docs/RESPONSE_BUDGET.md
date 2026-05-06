# Response Budget

## Purpose

Prevent issue threads from becoming the product driver.

## Global Budget

Per autonomous cycle:

- Max issue replies: 1
- Max new issues: 1
- Default: 0 replies

## Per Issue Budget

Each issue normally gets at most:

1. One acknowledgement, if useful.
2. One release/update reply, if a real change shipped.

No further replies unless:

- the player adds materially new information;
- the issue is critical;
- a regression happened;
- maintainer explicitly changes policy.

## Reply Requirements

Before replying with “fixed”, “improved”, or similar, all must be true:

- issue is recorded in `ISSUE_LEDGER.md`;
- issue belongs to a cluster or is marked critical;
- `DECISION.md` references the issue/cluster;
- code/docs changed;
- commit exists or is about to be created;
- `RELEASE_LOG.md` updated;
- deployment status is clear.

## Silence Is Valid

The operator is allowed to stay silent.

Silence is preferred when:

- issue is vague;
- issue is off-strategy;
- issue duplicates an existing cluster;
- no real change has shipped;
- replying would prolong an unproductive thread.

## Prohibited

- repeating the same acknowledgement;
- replying just to show activity;
- promising future work without roadmap support;
- modifying game repeatedly just to satisfy one issue author.
