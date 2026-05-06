# Decision

## Current Biggest Problem

The game is playable locally, but players do not yet have a clear feedback path.

## Evidence

- BOOTSTRAP commit `7b30c9d` added a playable local MVP.
- `docs/FEEDBACK.md` still says in-game feedback is not implemented.
- `docs/METRICS.md` lists `feedback_clicked` as desired but no telemetry exists yet.

## Current Decision

Add one GitHub Issues feedback link to the game UI and record a local `feedback_clicked` event queue. Do not add gameplay systems in this cycle.

## Implementation Record

2026-05-06 BOOTSTRAP executed:

- Added Bun-managed React + TypeScript + Vite project files.
- Added tests runnable through both `bun test` and `bun run test`.
- Implemented one-resource star dust loop: click to earn, buy auto collector, passive production, versioned save/load.
- Added a minimal Chinese UI with visible first upgrade goal and local auto-save.

2026-05-06 FEEDBACK_INFRA selected:

- Add one primary feedback path through GitHub Issues.
- Add local-only telemetry for feedback clicks.
- Keep feedback as signal intake, not task intake.

2026-05-06 FEEDBACK_INFRA executed:

- Added a GitHub Issues feedback link to the game UI.
- Added local-only `feedback_clicked` queue under `stardust-workshop-feedback-events-v1`.
- Updated feedback and metrics docs without replying to or fabricating any feedback.

## Input Source

Roadmap gap and metrics gap.

## Linked Signals

None.

## Not Doing

- No complex mechanics
- No prestige
- No multiple resources
- No heavy lore
- No issue-driven work yet
- No new gameplay mechanics during feedback infrastructure work

## Review Notes

BOOTSTRAP implementation stayed inside `docs/COMPLEXITY_BUDGET.md` and did not use issue-driven input. FEEDBACK_INFRA is the correct next mode because the game now works but cannot yet collect player feedback.

## Maintenance Decision

Keep the v7.2 clean-room harness self-consistent before the first game bootstrap:

- Use `bun` for JS/TS automation.
- Keep runtime snapshot output out of Git history.
- Keep README setup instructions aligned with the GitHub repository.
