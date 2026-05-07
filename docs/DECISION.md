# Decision

## Current Biggest Problem

Asset Workflow 已建立，但当前游戏没有已验证的视觉素材缺口。下一步风险是把“需要评估 `imagegen`”误解为“必须立刻生成装饰图”，从而增加首屏噪音。

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
- 发布基础设施收尾后的 self-playtest 显示：前 60 秒的现有提示都围绕星尘、采集、自动采集器、购买进度、目标和里程碑。
- 同一首屏已经包含资源、事件区域、双动作、进度、目标、里程碑、统计和反馈入口，继续添加提示会增加 UI 噪音。
- GitHub issue form 支持 YAML 表单、输入类型、校验、默认标题和默认 labels。
- GitHub `issues/new` URL 支持 `template` 参数，并可预填 issue form 自定义字段。
- 可用性测试资料建议避免引导性问题、yes/no 问题和泄露完成路径的任务 wording。
- `.github/ISSUE_TEMPLATE/feedback.yml` 已聚焦前 60 秒阻塞点、玩家意图和发生步骤。
- `createFeedbackIssueUrl()` 已指向 `issues/new?template=feedback.yml`。
- issue form 后续 self-playtest 显示：反馈入口仍是底部单一链接，未点击时不打断采集、购买、进度或里程碑。
- Playtest 研究建议先定义目标玩家，用少量代表性玩家发现问题，并把邀请放在站外上下文，而不是打断游戏内核心循环。
- 独立游戏预发布实验常受参与者获取、偏差和资源限制影响，早期更依赖 qualitative data。
- README 已包含站外 playtest 邀请素材，指向公开预览和单一 GitHub Issue Form。
- `docs/FEEDBACK_CLUSTERS.md` 仍保留英文模板，而 M3 反馈处理依赖该文档。
- `docs/SIGNAL_ROUTING.md` 和 `docs/RESPONSE_BUDGET.md` 仍以英文为主，而 M3 反馈处理依赖这两份文档。
- `docs/FEEDBACK.md` 仍有英文小节名和字段标签。
- 当前经济模拟显示：每秒点击一次时，第 10、23、39 秒购买前三台自动采集器，第 60 秒下一台购买进度约 98%。
- `docs/METRICS.md` 记录过当前不保留历史 session 汇总。
- `recordSessionEnd` 已在浏览器 `pagehide` 时调用，可以在同一 localStorage 边界内保存最近 session 汇总。
- Issue #1 反馈：“我不知道为何要采集？采集能为我带来什么？如何提高采集给我带来的兴奋点？”
- 当前 UI 已显示星尘、采集、自动采集器、购买进度、目标、里程碑和反馈入口。
- 当前 UI 没有直接说明星尘的用途链路：采集星尘 → 购买自动采集器 → 获得持续生产。
- 当前首屏复杂度接近预算，不应通过新资源、新奖励系统或新面板解决该问题。
- 2026-05-07 review finding: `ops/governor-check.sh` 只检查治理文件存在，不能验证 ledger、cluster、decision、release log 和 response budget 证据链。
- 2026-05-07 review finding: `ops/collect-feedback.sh` 只抓 issue 列表，缺少 body、comments 和 ledger draft，无法支撑可审计路由。
- 2026-05-07 review finding: `docs/ISSUE_LEDGER.md` 允许模糊 decision 和 commit/release 文本，后续 issue 回复可能绕过证据要求。
- 新增脚本测试先证明以上缺口存在：缺聚类、缺 release evidence 和缺正文评论证据时，旧脚本不会失败。
- 2026-05-07 follow-up: 真实运行 `ops/collect-feedback.sh` 后发现默认 `gh issue view --comments` 输出仍缺少 issue 原始正文，只包含评论渲染。
- 显式 `gh issue view --json ... --template ...` 后，`data/feedback/github-feedback.md` 同时包含 Issue #1 的原始正文和回复评论。
- 2026-05-07 self-playtest 显示 Issue #1 采集动机缺口已由动机文案和短暂采集反馈覆盖，本轮不应继续叠加提示。
- `docs/IDEA_PARKING_LOT.md` 记录了 “Soft Automation” 候选。
- `docs/COMPLEXITY_BUDGET.md` 允许最多 3 种 upgrade types，但仍要求 primary resource 维持 1、visible panels 最多 4。
- 研究资料支持在 idle game 早期逐步加入升级和自动化选择，而不是过早增加第二资源或 prestige。
- 2026-05-07 soft automation 60 秒模拟显示：自动采集器仍在第 10、23、39 秒购入，第 55 秒才购买第 1 个调校工具。
- 用户指出当前游戏生成机制似乎不会使用 `imagegen` 来生成需要的图片。
- 现有 `docs/HARNESS.md`、`docs/REVIEW_PROTOCOL.md` 和 `ops/governor-check.sh` 都没有资产工作流入口。
- 资产生成必须受 North Star、复杂度预算和 review protocol 约束，不能变成无边界装饰生产。
- `docs/ASSET_WORKFLOW.md` 已建立素材决策闸门，要求在需要图片时显式评估 `imagegen`。
- 当前没有新 issue 或玩家补充指向视觉素材缺口。
- 当前 `src/` 没有 `src/assets/`；新增首个 asset 会改变纯 UI 原型的复杂度边界。
- 最新 self-playtest 记录显示动作区已有三个按钮，后续应优先避免扩张首屏控件。

## Current Decision

Decision Anchor: `DECISION:2026-05-07-research-asset-no-change`

当前不生成图片资产，不新增 `src/assets/`，不改游戏 UI。`imagegen` 在未来出现明确视觉素材需求时默认进入评估；本轮明确记录暂不使用的理由：没有具体玩家问题、没有 self-playtest gap、且装饰性图片会增加首屏噪音。

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

2026-05-06 SELF_PLAYTEST no-change result:

- 前 60 秒核心循环提示已覆盖当前阶段的主要问题。
- 继续添加首屏提示会增加复杂度，不一定提升真实玩家理解。
- 决策：本轮不改代码；后续优先寻找真实反馈或研究反馈转化/信息收敛问题。

2026-05-06 RESEARCH issue form signal quality:

- 研究问题：如何提高现有 GitHub Issue 反馈路径的信号质量，而不是新增渠道或追踪。
- 决策：下一步候选是单一 GitHub Issue Form，字段聚焦前 60 秒阻塞点和玩家意图。
- 约束：保留 local-only telemetry 边界；不记录 `feedback_sent`，不要求个人联系方式，不新增 SDK。

2026-05-06 FEEDBACK_INFRA issue form implementation:

- 新增 `.github/ISSUE_TEMPLATE/feedback.yml`。
- 游戏内反馈 URL 指向 `issues/new?template=feedback.yml`。
- 保留单一 GitHub Issues 渠道和 local-only `feedback_clicked`。
- 不新增个人信息字段、上传路径、analytics SDK 或 `feedback_sent`。

2026-05-06 SELF_PLAYTEST issue form no-change result:

- 反馈入口仍在底部，未新增首屏说明文字。
- GitHub Issue Form 只在玩家主动点击后出现。
- 决策：不继续修改游戏代码；等待真实反馈或新的研究问题。

2026-05-06 RESEARCH external playtest invitation:

- 研究问题：如何在不打扰首屏、不新增追踪或渠道的前提下邀请外部 playtest。
- 决策：下一步候选是站外 playtest 邀请素材，不是游戏内提示或新反馈渠道。
- 约束：反馈仍回到单一 GitHub Issue Form；不收集个人数据，不要求联系方式，不做量化结论。

2026-05-06 FEEDBACK_INFRA external playtest invitation:

- README 新增可复用的站外 playtest 邀请素材。
- 邀请只指向公开预览和单一 GitHub Issue Form。
- 文档明确：邀请素材不是玩家反馈，真实反馈仍需进入 issue ledger。

2026-05-06 SIMPLIFY feedback clusters doc:

- Gap: `docs/FEEDBACK_CLUSTERS.md` 仍保留英文说明和模板。
- Decision: 中文化反馈聚类说明和模板，保留字段语义。
- 约束：不新增真实反馈、聚类、渠道或产品任务。

2026-05-06 SIMPLIFY signal routing and response budget:

- Gap: `docs/SIGNAL_ROUTING.md` 和 `docs/RESPONSE_BUDGET.md` 仍以英文为主。
- Decision: 中文化两份反馈处理规则文档，保留路由和回复预算语义。
- 约束：不改变 issue routing、response budget、North Star 或反馈渠道。

2026-05-06 SIMPLIFY feedback doc language:

- Gap: `docs/FEEDBACK.md` 仍有英文小节名和字段标签。
- Decision: 中文化反馈入口文档剩余 UI 文档语言，保留反馈路径和隐私边界。
- 约束：不新增反馈渠道，不改变 metrics，不伪造真实反馈。

2026-05-06 SELF_PLAYTEST economy no-change result:

- 每秒点击一次并自动购买时，自动采集器在第 10、23、39 秒购入。
- 第 60 秒下一台购买进度约 98%，符合“再买一台已接近”的 North Star 感受。
- 决策：不调整经济数值，不新增系统，继续等待真实反馈或新的研究问题。

2026-05-06 METRICS_INFRA session history:

- Gap: 本地 metrics 不保留历史 session 汇总。
- Decision: 在 `stardust-workshop-metrics-history-v1` 中保留最近 10 个 session 汇总。
- 约束：local-only、无上传、无个人数据、无外部 SDK、无 UI 改动。

2026-05-07 OPERATE collect motivation:

- Decision Anchor: `DECISION:2026-05-07-operate-collect-motivation`
- Issue #1 已路由到 `first-60s-motivation` 聚类。
- Gap: 首屏说明了“怎么采集”和“怎么买”，但没有直接说明“为什么采集值得做”。
- Decision: 增加一条短文案说明星尘会转化为自动采集器和持续生产，并增强采集点击的短暂反馈。
- 约束：不新增资源、奖励系统、新面板、经济数值变化、上传 telemetry 或第二反馈渠道。

2026-05-07 META_IMPROVE feedback-loop automation:

- Decision Anchor: `DECISION:2026-05-07-meta-feedback-loop-automation`
- Gap: feedback loop 的关键闸门主要停留在文档层，脚本不能自动识别缺失聚类、缺失 decision 锚点、缺失 release evidence 或缺少 issue 正文证据。
- Decision: 为 ops 脚本添加回归测试，并收紧 `governor-check`、`collect-feedback` 和 ledger evidence format。
- 约束：只加强反馈闭环检查，不改变游戏玩法、不新增反馈渠道、不回复 issue、不削弱 response budget。

2026-05-07 META_IMPROVE collector JSON correction:

- Gap: `collect-feedback` 使用 `gh issue view --comments` 默认输出时，真实快照没有 issue 原始正文。
- Decision: 改用显式 `--json` 和 `--template` 输出 issue number/title/url/state/author/body/comments。
- 约束：不新增反馈渠道、不上传 telemetry、不改变 issue 回复策略。

2026-05-07 SELF_PLAYTEST collect motivation no-change:

- Gap check: Issue #1 指向的采集动机缺口已由动机文案和短暂采集反馈覆盖。
- Decision: 本轮不继续修改 UI、经济或玩法，避免重复处理同一 issue 和增加首屏噪音。
- 约束：等待新玩家信息或新的研究问题；不新增资源、奖励系统、面板或反馈渠道。

2026-05-07 RESEARCH soft automation:

- Decision Anchor: `DECISION:2026-05-07-research-soft-automation`
- Gap: 当前已有 “购买更多自动采集器” 一条升级路径，下一步需要一个低复杂度选择，不应引入第二资源或 prestige。
- Decision: 设计一个 `调校工具` 升级候选，使用星尘提升自动采集器效率，让玩家在数量和效率之间选择。
- 约束：本轮只做研究/设计；不实现代码、不新增面板、不新增资源、不改变 feedback flow。

2026-05-07 SELF_PLAYTEST soft automation implementation:

- Decision Anchor: `DECISION:2026-05-07-research-soft-automation`
- Implementation: 增加一个 `调校工具` upgrade type，使用星尘提升自动采集器效率。
- Complexity check: primary resource 仍为 1；upgrade types 从 1 增至 2；visible panels 不增加；feedback channels 不变。
- Economy check: 每秒点击一次并优先购买自动采集器时，调校工具在第 55 秒才出现，不破坏第一台自动采集器目标。
- 约束：不新增第二资源、prestige、多 generator 分类、任务系统、成就或新面板。

2026-05-07 SELF_PLAYTEST soft automation prerequisite copy:

- Gap: 0 台自动采集器时调校工具禁用，但显示成本会暗示攒够 25 星尘即可购买。
- Decision: 无自动采集器时显示“需要先购买自动采集器”，有自动采集器后显示效率提升和星尘成本。
- 约束：只改文案；不改变经济数值、资源、面板或反馈渠道。

2026-05-07 SELF_PLAYTEST post-soft-automation no-change:

- Gap check: 发布后复核显示，调校工具没有改变第 10、23、39 秒购买自动采集器的节奏，第 55 秒才成为第一项效率升级。
- Decision: 本轮不新增第三种升级、不调整调校工具成本、不增加首屏解释，等待真实玩家反馈或后续本地指标。
- 风险记录：购买调校工具后下一台自动采集器距离会回落；这是升级购买后的正常节奏变化，当前没有证据表明需要干预。
- 约束：不新增资源、面板、反馈渠道、analytics、prestige、任务系统或复杂 lore。

2026-05-07 META_IMPROVE asset workflow:

- Decision Anchor: `DECISION:2026-05-07-asset-workflow`
- Gap: harness 缺少资产工作流，未来需要图片时不会显式提示 `imagegen` 评估。
- Decision: 新增 `docs/ASSET_WORKFLOW.md`，并挂入 `docs/HARNESS.md`、`docs/REVIEW_PROTOCOL.md` 和 `ops/governor-check.sh`。
- 约束：本轮不生成图片、不改游戏、不新增视觉复杂度；只要求未来素材需求记录 `imagegen` 使用或不使用理由。

2026-05-07 RESEARCH asset no-change:

- Decision Anchor: `DECISION:2026-05-07-research-asset-no-change`
- Gap check: 当前没有真实反馈、self-playtest gap 或 roadmap requirement 要求图片素材。
- Decision: 本轮不生成图片、不新增 `src/assets/`、不改 UI；未来若出现视觉素材需求，按 `docs/ASSET_WORKFLOW.md` 先记录用途、尺寸、风格和 `imagegen` 决策。
- 约束：不新增装饰图、背景、复杂世界观、sprite set、远程图片或不明授权素材。

## Input Source

Research question + Asset Workflow gate.

## Linked Signals

- Asset Workflow 已建立。
- 当前无新 issue 或视觉素材缺口。
- 2026-05-07 Research: 当前是否需要首个视觉素材。

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
