# Decision

## Current Biggest Problem

There is no playable game yet.

## Evidence

- No package.json
- No game source
- No tests
- No deployment
- No feedback intake

## Current Decision

Bootstrap a minimal React + TypeScript + Vite + Vitest project, then implement a tiny playable idle game loop.

## Input Source

Roadmap gap.

## Linked Signals

None.

## Not Doing

- No complex mechanics
- No prestige
- No multiple resources
- No heavy lore
- No issue-driven work yet

## Review Notes

Initial decision is consistent with BOOTSTRAP mode.

## Maintenance Decision

Keep the v7.2 clean-room harness self-consistent before the first game bootstrap:

- Use `bun` for JS/TS automation.
- Keep runtime snapshot output out of Git history.
- Keep README setup instructions aligned with the GitHub repository.
