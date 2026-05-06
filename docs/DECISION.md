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

## Implementation Record

2026-05-06 BOOTSTRAP executed:

- Added Bun-managed React + TypeScript + Vite project files.
- Added tests runnable through both `bun test` and `bun run test`.
- Implemented one-resource star dust loop: click to earn, buy auto collector, passive production, versioned save/load.
- Added a minimal Chinese UI with visible first upgrade goal and local auto-save.

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

Initial decision is consistent with BOOTSTRAP mode. The implemented scope stays inside `docs/COMPLEXITY_BUDGET.md` and does not use issue-driven input.

## Maintenance Decision

Keep the v7.2 clean-room harness self-consistent before the first game bootstrap:

- Use `bun` for JS/TS automation.
- Keep runtime snapshot output out of Git history.
- Keep README setup instructions aligned with the GitHub repository.
