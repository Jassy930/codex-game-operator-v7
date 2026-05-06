# Decision

## Current Biggest Problem

The game is playable and publicly previewable, but early generator progress lacks a visible milestone.

## Evidence

- BOOTSTRAP commit `7b30c9d` added a playable local MVP.
- FEEDBACK_INFRA commit `8cf6f39` added an in-game feedback path.
- GitHub Pages workflow run `25421769909` completed successfully.
- `gh issue list --state open` returned no open issues on 2026-05-06.
- Prior self-playtest clarified upgrade cost wording.
- The screen still relies on the upgrade button and progress bar to imply the first objective.
- After cycle 2, the first objective is stated directly.
- `docs/RESEARCH.md` recommends early progress feedback before new mechanics.
- The UI shows current auto collector count, but not progress toward an early milestone.

## Current Decision

Add a UI-only early milestone line for reaching 2 auto collectors. Do not add rewards, resources, or new panels.

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

2026-05-06 RELEASE_INFRA selected:

- Add a GitHub Pages workflow that installs with Bun, runs tests, builds, uploads `dist`, and deploys Pages.
- Configure Vite base path for the repository Pages URL.
- Document the preview URL and push trigger.

2026-05-06 RELEASE_INFRA executed locally:

- Added `.github/workflows/deploy-pages.yml`.
- Configured Vite to use `/codex-game-operator-v7/` when `GITHUB_ACTIONS` is set.
- Documented the expected Pages URL in README.
- After remote dependency install stalled on the local mirror lockfile, pinned Bun/package versions, added workflow timeouts, and regenerated `bun.lock` against the public npm registry.
- After Pages configuration reported the site was not enabled, configured `actions/configure-pages` with `enablement: true`.
- Enabled GitHub Pages through the repository Pages API with `build_type=workflow`.
- Rerun `25421667150` completed successfully; `https://jassy930.github.io/codex-game-operator-v7/` returned HTTP 200.

2026-05-06 SELF_PLAYTEST selected:

- Evaluate the first 10/30/60 seconds.
- Focus on whether the first upgrade cost and next action are clear.
- Implement only a small copy/UI clarity fix if the gap is concrete.

2026-05-06 SELF_PLAYTEST result:

- Gap: the first upgrade button shows `10` without explicitly saying it is a star dust cost.
- Decision: update the button copy to include the purchase intent and cost unit.

2026-05-06 SELF_PLAYTEST cycle 2 selected:

- Gap: the first objective is still inferred from UI pieces instead of being stated directly.
- Decision: add a short first-goal sentence that names the goal without adding a mechanic.

2026-05-06 SELF_PLAYTEST cycle 2 result:

- Added one first-goal line: “目标：攒够星尘，购买第一个自动采集器”.
- No mechanics, resources, panels, or feedback replies were added.

2026-05-06 RESEARCH selected:

- Question: after a playable idle MVP with clear first goal, should the next iteration improve early progress feedback or add another mechanic?
- Output required: update `docs/RESEARCH.md` and record one decision here.

2026-05-06 RESEARCH result:

- Decision: improve early progress feedback before adding mechanics.
- Rationale: sources emphasize simple first objectives, visible production/cost balance, steady progression, and frequent feedback as idle-game fundamentals.

2026-05-06 SELF_PLAYTEST cycle 3 selected:

- Implement a UI-only milestone progress line for 0/2, 1/2, and 2/2 auto collectors.
- No milestone reward is allowed in this cycle.

2026-05-06 SELF_PLAYTEST cycle 3 result:

- Added a UI-only “里程碑：0 / 2 台自动采集器” line.
- The milestone has no reward and does not add a new system.

## Input Source

Self-playtest gap backed by research.

## Linked Signals

None.

## Not Doing

- No complex mechanics
- No prestige
- No multiple resources
- No heavy lore
- No issue-driven work yet
- No new gameplay mechanics during feedback infrastructure work
- No gameplay changes during release infrastructure work
- No new systems during self-playtest work
- No direct implementation during research work
- No new mechanic before early progress feedback is stronger

## Review Notes

BOOTSTRAP, FEEDBACK_INFRA, RELEASE_INFRA, SELF_PLAYTEST, and RESEARCH stayed inside `docs/COMPLEXITY_BUDGET.md` and did not use issue-driven input. The research decision keeps the next implementation focused on feedback and milestones instead of scope expansion.

## Maintenance Decision

Keep the v7.2 clean-room harness self-consistent before the first game bootstrap:

- Use `bun` for JS/TS automation.
- Keep runtime snapshot output out of Git history.
- Keep README setup instructions aligned with the GitHub repository.

2026-05-06 META_IMPROVE maintenance decision:

- Accept the anti-achievement clause in `prompts/goal.md` as a tightening clarification.
- Record it in `docs/HARNESS_CHANGELOG.md`.
- Do not weaken issue routing, response budget, complexity budget, review protocol, or North Star constraints.

2026-05-06 META_IMPROVE maintenance decision:

- Add a constrained `METRICS_INFRA` mode because metrics gap is a prompt input source but lacked an operating mode.
- Permit only local-only metrics that support first-60-second evaluation.
- Forbid uploads, personal data, external analytics SDKs, new mechanics, and issue replies in that mode.
