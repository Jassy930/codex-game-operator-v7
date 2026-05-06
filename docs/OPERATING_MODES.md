# Operating Modes

Codex must choose exactly one operating mode before acting. The chosen mode must be recorded in `docs/GOVERNOR_STATE.md`.

## Mode Selection Priority

1. If project cannot run: `BOOTSTRAP`
2. If core game is incomplete: `BUILD`
3. If game exists but cannot collect feedback: `FEEDBACK_INFRA`
4. If game exists but not publicly deployable: `RELEASE_INFRA`
5. If real feedback exists: `OPERATE`
6. If product/design question is unclear: `RESEARCH`
7. If no feedback exists but game works: `SELF_PLAYTEST`
8. If self-playtest needs local measurement support: `METRICS_INFRA`
9. If complexity or drift is detected: `SIMPLIFY`
10. If repeated drift occurs: `FEATURE_FREEZE`
11. If tested changes are ready: `RELEASE`
12. If harness rules repeatedly block valid progress: `META_IMPROVE`

## BOOTSTRAP

Use when no runnable project exists.

Allowed:
- Create Vite React TypeScript project.
- Add Vitest.
- Add minimal game shell.
- Add basic tests.

Forbidden:
- Advanced mechanics.
- Production deployment.
- Issue replies except critical repo setup issues.

Exit criteria:
- `package.json` exists.
- `bun test` and `bun run build` exist.

## BUILD

Use when the core game is not playable.

Allowed:
- Core resource loop.
- Upgrades.
- Save/load.
- Simple UI.

Forbidden:
- Prestige.
- Multiple worlds.
- Complex systems.
- Issue-driven feature requests.

Exit criteria:
- A player can click, earn, upgrade, save/load.

## FEEDBACK_INFRA

Use when game works but cannot receive feedback.

Allowed:
- Feedback button.
- GitHub issue link.
- Local telemetry queue.
- README feedback instructions.

Forbidden:
- New game systems.

Exit criteria:
- A player has at least one clear feedback path.

## RELEASE_INFRA

Use when game works but cannot be publicly deployed.

Allowed:
- GitHub Pages workflow.
- Vercel config.
- deploy docs.
- preview deployment.

Forbidden:
- unrelated gameplay changes.

Exit criteria:
- game can be publicly previewed.

## OPERATE

Use when real feedback exists.

Allowed:
- Read issues.
- Update issue ledger.
- Cluster feedback.
- Make product decision.
- Implement one supported change.
- Reply within response budget.

Forbidden:
- Treating one issue as a task.
- Repeatedly replying to one issue.
- Implementing off-strategy feedback.

Exit criteria:
- feedback has been routed and either acted on, deferred, or declined.

## RESEARCH

Use when no feedback exists or a product question is unclear.

Allowed:
- Web research.
- Competitor/genre pattern analysis.
- Update `RESEARCH.md`.
- Produce one decision.

Forbidden:
- Copying content.
- Directly implementing features without `DECISION.md`.

Exit criteria:
- A research-backed decision exists.

## SELF_PLAYTEST

Use when game works but lacks enough feedback.

Allowed:
- Evaluate first 10/30/60 seconds.
- Update `SELF_PLAYTEST.md`.
- Identify one improvement.

Forbidden:
- Large feature additions.

Exit criteria:
- One concrete gap is documented in `DECISION.md`.

## METRICS_INFRA

Use when game works, no real feedback exists, and self-playtest or roadmap decisions need local measurement support.

Allowed:
- Local-only telemetry events.
- Session and first-minute counters.
- Metrics docs.
- Tests for metric recording.

Forbidden:
- Uploading telemetry.
- Collecting personal data.
- External analytics SDKs.
- New gameplay mechanics.
- Issue replies.

Exit criteria:
- At least one local metric supports first-60-second evaluation.
- `docs/METRICS.md` explains what is recorded and where.
- Tests and build pass.

## SIMPLIFY

Use when complexity exceeds budget or drift is detected.

Allowed:
- Remove complexity.
- Consolidate UI.
- Improve onboarding.
- Clarify copy.
- Refactor.

Forbidden:
- New mechanics.
- New resources.
- New panels.

Exit criteria:
- complexity returns under budget or drift source is removed.

## FEATURE_FREEZE

Use when repeated drift occurs.

Allowed:
- Bug fixes.
- Simplification.
- Tests.
- Release hygiene.
- Feedback processing.

Forbidden:
- New mechanics.
- New content systems.
- New long-term progression systems.

Exit criteria:
- retrospective shows stable behavior for at least 3 meaningful cycles.

## RELEASE

Use when tested changes are ready.

Allowed:
- Run tests/build.
- Commit.
- Push.
- Preview deploy.
- Production deploy if allowed.
- Update release log.
- Reply to linked issue if budget allows.

Forbidden:
- Deploying broken builds.
- Replying without evidence.
- Bundling unrelated changes.

Exit criteria:
- release status is recorded.

## META_IMPROVE

Use when the harness itself needs improvement.

Allowed:
- Update runtime docs freely.
- Propose governance changes.
- Modify governance docs only through `META_GOVERNANCE.md`.
- Record changes in `HARNESS_CHANGELOG.md`.

Forbidden:
- Weakening issue routing.
- Removing response budget.
- Removing complexity budget.
- Removing review protocol.
- Lowering test/release standards for convenience.

Exit criteria:
- harness change is recorded and justified.
