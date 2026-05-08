# Operating Modes

Codex must choose exactly one operating mode before acting. The chosen mode must be recorded in `docs/GOVERNOR_STATE.md`.

Codex must also choose exactly one iteration track before acting. The track defines what kind of content advance the cycle is expected to produce. A small implementation slice is allowed only when it serves the selected track.

Detailed cycle-bet, cycle-status, required-artifact, and mix-review rules are defined in `docs/ITERATION_POLICY.md`.

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

## Iteration Tracks

Record one of these in `docs/GOVERNOR_STATE.md` under `Iteration Track`:

- `GAME_RESEARCH`: 网络调研、竞品分析或类型研究，产出为研究记录和决策候选。
- `PLAYER_FEEDBACK`: GitHub Issues 或反馈快照处理，产出为 ledger、cluster、decision、release 或明确延后/拒绝理由。
- `CONTENT_PLANNING`: 下一部分游戏规划，产出为内容弧线、计划文档或 roadmap 更新。
- `CONTENT_REVIEW`: 当前游戏内容 review 和整理，产出为 findings、整理结果、stage review 或有证据的 no-change。
- `BUGFIX`: 当前内容 bug 修复，产出为失败测试、修复和回归验证。
- `VISUAL_POLISH`: 图像表现和视觉整理，产出为素材决策、资产更新、布局验证或视觉一致性改进。
- `PLAYABLE_CONTENT`: 可玩内容推进，产出为玩家能感知的新机制、目标、反馈、数值或交互。
- `HARNESS_MAINTENANCE`: 治理系统维护，产出为更强检查、更清晰规则或流程修复。

`Expected Content Advance` must describe the concrete artifact or review outcome for the cycle. It must not be a vague placeholder such as `none`, `no-change`, or `minor copy`. If a cycle records no gameplay change, it must still complete a meaningful track such as `CONTENT_REVIEW`, `GAME_RESEARCH`, `VISUAL_POLISH`, or `HARNESS_MAINTENANCE`.

Each cycle must also record a `Cycle Bet` and `Cycle Status`. `Cycle Status` is `active` while work is in progress and `completed` after validation, documentation, and workspace status have been recorded.

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
- Evaluate the current stage time window, such as 3-5 minutes or first return.
- Update `SELF_PLAYTEST.md`.
- Identify one improvement.
- Record no-change when no concrete gap exists.

Forbidden:
- Large feature additions.
- Repeating no-change checks in the same time window indefinitely.

Exit criteria:
- One concrete gap is documented in `DECISION.md`.
- Or one no-change result is recorded; after two consecutive no-change cycles in the same time window, switch to stage review, research, metrics readback, or a longer time horizon.

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
