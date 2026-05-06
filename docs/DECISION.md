# Decision

## Current Biggest Problem

公开预览已经可访问，但当前没有开放 GitHub Issues 或真实玩家反馈。下一步只能通过 self-playtest 检查前 10/30/60 秒体验，不应新增玩法系统。

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
- `docs/METRICS.md` lists desired session and first-upgrade metrics, but only feedback-click telemetry exists.
- A 60-second simulation with one click per second reaches 2 auto collectors at 23 seconds and 3 auto collectors at 39 seconds.
- `docs/NORTH_STAR.md` says the player should feel progress continues when they step away.
- `hydrateGameState` applies elapsed passive production, but the UI does not report the offline gain.
- `docs/METRICS.md` lists `offline_reward_claimed` as desired.
- The UI now shows offline gain, but `stardust-workshop-metrics-v1` does not record it.
- 每秒点击一次的 60 秒模拟会在第 10、23、39 秒买到自动采集器。
- 第 10 秒后，UI 仍然显示“目标：攒够星尘，购买第一个自动采集器”。
- 2026-05-06 研究记录显示，下一步应继续强化已有的货币、generator、production rate、cost 循环，而不是新增资源系统。
- 购买自动采集器是前 60 秒内最重要的状态变化，但当前反馈主要依赖数字变化和按钮状态变化。
- `docs/METRICS.md` 将 `save_loaded` 列为 desired metric。
- `hydrateGameStateWithReport` 能区分有效存档、缺失存档和无效存档后，`save_loaded` 可以保持 local-only 且不记录个人数据。
- 当前反馈入口打开 GitHub Issues 新标签页，App 只能知道玩家点击了反馈链接，不能知道玩家是否最终提交 issue。
- 为了保持 local-only 和隐私边界，不能用外部追踪或猜测方式伪造 `feedback_sent`。
- 公开预览 URL 已发布，但当前没有真实同意流程、analytics governance 或外部 SDK 审核。
- `docs/METRICS.md` 旧表述把 local-only 绑定到“尚未公开部署”，已经与当前状态不一致。
- `docs/FEEDBACK.md` 只记录了 GitHub Issues 裸链接，未说明 App 实际预填 label/title/body。
- `docs/ISSUE_LEDGER.md` 的说明仍是英文模板，不符合当前文档语言约束。
- 2026-05-06 研究记录显示：self-playtest 只能抓明显问题，公开 playtest/外部玩家反馈更适合发现隐藏问题。
- 外部研究建议早期反馈问题应保持窄范围，避免一次性征求过宽反馈。
- 当前 GitHub Issue 反馈正文仍偏泛，不能直接引导玩家报告“前 60 秒哪里不清楚”。
- `docs/METRICS.md` 的 storage key 和 metric key 需要保留英文标识，但说明文字可以中文化。
- `docs/SELF_PLAYTEST.md` 记录的是关键运营输入，应优先保持中文可读。
- `docs/ROADMAP.md` 是高层导航文档，应保持中文可读，同时保留 M0-M5 结构。
- 购买自动采集器后会插入短暂确认反馈。
- 当前首屏没有为离线收益或购买确认预留稳定消息区域。
- 进度条实际表达的是攒够下一次购买成本的百分比。
- 同一块区域已经同时显示目标文案和自动采集器里程碑。
- 最新 workflow run 仍显示 Node.js 20 deprecation annotation。
- GitHub API 返回的最新 action release 包括 `actions/checkout@v6.0.2`、`actions/configure-pages@v6.0.0`、`actions/upload-pages-artifact@v5.0.0`、`actions/deploy-pages@v5.0.0`。
- GitHub Pages workflow run `25430225912` completed successfully on 2026-05-06.
- `https://jassy930.github.io/codex-game-operator-v7/` returned HTTP 200 on 2026-05-06.
- `gh issue list --state open` returned no open issues on 2026-05-06 after the Pages workflow upgrade.

## Current Decision

回到 SELF_PLAYTEST，继续检查前 10/30/60 秒体验。除非发现具体清晰度 gap，否则不新增玩法系统、资源、奖励或新面板。

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

2026-05-06 METRICS_INFRA selected:

- Add local-only metrics under browser storage.
- Record session start, click count, upgrade purchase count, and first upgrade time.
- Forbid uploads, personal data, external SDKs, and gameplay changes.

2026-05-06 METRICS_INFRA result:

- Added `stardust-workshop-metrics-v1` local storage metrics.
- Recorded session start, click count, upgrade purchase count, and first upgrade time.
- Added tests for metric recording and malformed storage recovery.

2026-05-06 METRICS_INFRA correction:

- Corrected session metrics to reset when a new app session starts.
- Added a regression test so click and first-upgrade counters do not persist across sessions.

2026-05-06 METRICS_INFRA session duration:

- Added local `sessionEndedAt` and `sessionDurationMs` fields.
- Record session end on browser `pagehide`.
- Kept metrics local-only with no upload path.

2026-05-06 SELF_PLAYTEST cycle 4:

- Simulation: with one click per second, auto collectors are purchased at 10s, 23s, and 39s.
- Gap: `0 / 2` milestone becomes stale before the 60-second mark.
- Decision: make auto-collector milestone targets dynamic: 2, then 5, then rolling 5-step targets.

2026-05-06 SELF_PLAYTEST cycle 5 selected:

- Gap: offline progress exists mechanically but is invisible on return.
- Decision: expose the offline star dust gain as a small return message.

2026-05-06 SELF_PLAYTEST cycle 5 result:

- Added `hydrateGameStateWithReport` to report offline star dust gain.
- Added a small UI message when offline progress adds star dust.
- No new resource or reward system was added.

2026-05-06 METRICS_INFRA selected:

- Gap: `offline_reward_claimed` is desired but not recorded.
- Decision: when offline gain is positive, record local count and last offline dust amount.

2026-05-06 METRICS_INFRA result:

- Added local-only `offlineRewardClaimedCount`.
- Added local-only `lastOfflineRewardDust`.
- Recorded the metric only when the offline gain return message is shown.

2026-05-06 SELF_PLAYTEST cycle 6 selected:

- Gap: 购买第一台自动采集器后，目标提示仍然要求购买第一台自动采集器。
- Decision: 首次购买后，把目标提示切换为购买下一台自动采集器。

2026-05-06 SELF_PLAYTEST cycle 6 result:

- 基于自动采集器数量增加动态目标提示。
- 为新玩家保留初始首目标文案。
- 为已有 1 台自动采集器的存档增加渲染回归测试。

2026-05-06 RESEARCH result:

- 研究问题：前 60 秒清晰度基本稳定后，下一步应优先增强哪类低复杂度反馈。
- 决策：优先考虑购买自动采集器后的短暂确认反馈。
- 约束：不新增资源、奖励系统、弹窗教程或经济数值变化。

2026-05-06 SELF_PLAYTEST cycle 7 selected:

- Gap: 购买自动采集器后，UI 主要依赖数字变化表达升级成功。
- Decision: 增加一条短暂确认文案，说明自动采集器已启动且每秒星尘提升。

2026-05-06 SELF_PLAYTEST cycle 7 result:

- 购买自动采集器成功后显示“自动采集器启动：每秒星尘 +X”。
- 确认反馈会自动清除，不使用弹窗，也不改变经济数值。
- 为购买确认文案增加回归测试。

2026-05-06 METRICS_INFRA selected:

- Gap: `save_loaded` 是 desired metric，但本地 metrics 尚未记录有效存档加载。
- Decision: 只在有效版本化存档成功加载时记录 local-only `saveLoadedCount`。

2026-05-06 METRICS_INFRA result:

- `hydrateGameStateWithReport` 现在返回 `saveLoaded`。
- 新增 local-only `saveLoadedCount`。
- App 打开有效本地存档时记录一次 `saveLoadedCount`。

2026-05-06 METRICS_INFRA feedback boundary:

- Gap: `feedback_sent` 曾列为 desired metric，但当前反馈流只能确认 `feedback_clicked`。
- Decision: 将 `feedback_sent` 记录为 deferred metric，不用外部追踪或猜测方式实现。
- 约束：继续保持 metrics local-only、无上传、无个人数据、无外部 SDK。

2026-05-06 METRICS_INFRA public preview policy:

- Gap: `docs/METRICS.md` 仍暗示 local-only 只适用于未公开部署阶段。
- Decision: 公开预览阶段继续保持 telemetry local-only。
- 约束：上传、外部 SDK、个人数据或跨设备追踪必须另走治理决策。

2026-05-06 SIMPLIFY feedback docs:

- Gap: 反馈入口文档没有说明 App 预填的 label/title/body，issue ledger 说明仍是英文模板。
- Decision: 更新反馈文档和 issue ledger 说明，保持反馈路由清晰。
- 约束：不改变 App 行为，不新增反馈渠道，不回复或伪造 issue。

2026-05-06 RESEARCH no-feedback next step:

- 研究问题：公开预览已存在但没有真实反馈时，下一步应继续添加玩法，还是先降低获取真实反馈的成本。
- 决策：不新增玩法系统；下一步候选是让现有 GitHub Issue 反馈问题更聚焦前 60 秒清晰度。
- 约束：保持单一反馈渠道，不新增 SDK、上传、用户识别或强制弹窗。

2026-05-06 FEEDBACK_INFRA focused issue body:

- Gap: 反馈 Issue 正文仍偏泛，未直接询问前 60 秒哪里不清楚。
- Decision: 将预填正文聚焦到前 60 秒清晰度，并保留“当时想做什么”和“其他补充”。
- 约束：不新增反馈渠道，不上传 telemetry，不记录 `feedback_sent`。

2026-05-06 SIMPLIFY metrics doc language:

- Gap: `docs/METRICS.md` 说明文字仍混用英文。
- Decision: 中文化说明文字，保留 storage key 和 metric key 原文。
- 约束：不改变代码、指标结构、storage key 或隐私边界。

2026-05-06 SIMPLIFY self-playtest doc language:

- Gap: `docs/SELF_PLAYTEST.md` 说明文字仍混用英文。
- Decision: 中文化说明文字，保留已记录事实和 gap 的语义。
- 约束：不改写历史结论，不伪造真实玩家反馈，不改变代码。

2026-05-06 SIMPLIFY roadmap doc language:

- Gap: `docs/ROADMAP.md` 说明和条目仍以英文为主。
- Decision: 中文化说明文字，保留 M0-M5 里程碑结构。
- 约束：不新增里程碑，不把 roadmap 改成任务清单，不改变代码。

2026-05-06 SELF_PLAYTEST event slot:

- Gap: 购买确认反馈以条件渲染插入，会推动下方控件。
- Decision: 为离线收益和购买确认提供稳定的 `event-stack` 区域。
- 约束：UI-only，不新增面板、奖励、资源或反馈渠道。

2026-05-06 SELF_PLAYTEST purchase progress label:

- Gap: “下个目标”无法区分购买进度、目标文案和里程碑。
- Decision: 将进度条标签改为“购买进度”。
- 约束：只改文案，不改变数值、布局、经济或玩法。

2026-05-06 RELEASE_INFRA action upgrade:

- Gap: Pages workflow 仍出现 Node.js 20 deprecation annotation。
- Decision: 升级 checkout/configure-pages/upload-pages-artifact/deploy-pages 到 GitHub API 返回的当前 release。
- 约束：不降低测试、构建或部署门槛，不改变游戏代码。

2026-05-06 RELEASE_INFRA action upgrade result:

- Pages workflow run `25430225912` 成功。
- 公开预览返回 HTTP 200。
- 当前无开放 GitHub Issues。
- 下一步切换到 SELF_PLAYTEST，而不是继续改发布基础设施。

## Input Source

Self-playtest gap.

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
