# Harness Changelog

Records all harness rule changes.

## Initial

- Created v7.2 clean-room four-layer harness.
- Added meta-governance.
- Added operating modes.
- Added self-playtest as non-issue input source.
- Renamed ideas to idea parking lot to avoid backlog behavior.

## 2026-05-06 - Tooling Policy Alignment

### Files Changed

- `.gitignore`
- `README.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/OPERATING_MODES.md`
- `ops/autopush.sh`
- `ops/create-pages-workflow.sh`
- `ops/deploy.sh`
- `ops/governor-check.sh`
- `docs/META_GOVERNANCE.md`

### Failure Mode

Harness scripts and docs referenced `npm` even though repository policy requires `bun` for JS/TS work.

### Evidence

`rg -n "npm|git init|codex-game-operator-v7-2-clean-room"` found stale setup and package-manager references.

### Change

Updated setup docs and JS/TS automation paths to use the GitHub repository and `bun`.
Reduced false positives in the issue-as-signal language check without relaxing the rule.

### Why This Does Not Weaken Constraints

This tightens tooling consistency and does not relax issue routing, response budget, complexity budget, review protocol, or deployment checks.

### Follow-up

When the playable app is bootstrapped, verify the generated `package.json` scripts match these commands.

## 2026-05-06 - Anti-Achievement Goal Clarification

### Files Changed

- `prompts/goal.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/DECISION.md`

### Failure Mode

The operator previously marked a phase-completion milestone as goal completion after MVP, feedback, deployment, and self-playtest work were done.

### Evidence

The active goal is perpetual product operation. Recent release and self-playtest cycles completed phase transitions, but the system still has no real feedback and must keep selecting the next operating mode.

### Change

Added an anti-achievement clause to `prompts/goal.md` stating that MVP completion, deployment, tests, or no open issues are not completion conditions. The clause directs the operator to select the next mode after each phase.

### Why This Does Not Weaken Constraints

This tightens the harness. It preserves North Star alignment, issue routing, response budget, complexity budget, review protocol, and deployment checks.

### Follow-up

Continue treating completion as unavailable unless the user explicitly pauses/stops the perpetual operation goal, credentials block progress, or a real budget limit is reached.

## 2026-05-06 - Metrics Infrastructure Operating Mode

### Files Changed

- `docs/OPERATING_MODES.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/DECISION.md`

### Failure Mode

`prompts/goal.md` lists metrics gap as an input source, and `docs/METRICS.md` identifies desired local metrics, but no operating mode explicitly allowed metrics infrastructure work after the game became playable.

### Evidence

The project now has a public preview, feedback path, and multiple self-playtest cycles. Further first-60-second decisions need local measurement support, but using `SELF_PLAYTEST` for telemetry would blur mode boundaries.

### Change

Added a constrained `METRICS_INFRA` mode that permits local-only telemetry, first-minute counters, metrics docs, and tests.

### Why This Does Not Weaken Constraints

The mode forbids uploads, personal data, external analytics SDKs, new gameplay mechanics, and issue replies. It preserves North Star alignment, issue routing, response budget, complexity budget, and review protocol.

### Follow-up

Use `METRICS_INFRA` only when local measurement directly supports self-playtest or roadmap decisions.

## 2026-05-07 - Feedback Loop Automation Checks

### Files Changed

- `ops/governor-check.sh`
- `ops/collect-feedback.sh`
- `src/ops-scripts.test.ts`
- `docs/ISSUE_LEDGER.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/RELEASE_LOG.md`

### Failure Mode

反馈闭环规则主要停留在文档层。脚本只检查文件存在，不能阻止 accepted/fixed issue 缺少聚类、decision 锚点或 release evidence；反馈采集也只保留 issue 列表，缺少 body/comments 证据。

### Evidence

代码评审指出三处缺口：governor check 未验证反馈闭环，collector 缺少可路由证据，ledger 允许模糊链接。新增 `src/ops-scripts.test.ts` 先复现这些失败模式。

### Change

`governor-check` 现在验证 issue ledger 中已接受/已修复条目的 cluster、decision anchor、release evidence 和 release log 关联。`collect-feedback` 现在抓取 issue body/comments，并输出 ledger draft。`ISSUE_LEDGER.md` 增加 evidence format 规则。

### Why This Does Not Weaken Constraints

该变更只加强 issue routing、response budget 和 release evidence 的自动化检查，不放宽复杂度预算、review protocol、测试要求或部署要求。

### Follow-up

后续若增加 issue 回复自动化，应先扩展 governor check，验证回复预算和最后回复记录，而不是直接调用 GitHub API 回复。

## 2026-05-07 - Feedback Collector JSON Output

### Files Changed

- `ops/collect-feedback.sh`
- `src/ops-scripts.test.ts`
- `data/feedback/github-feedback.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/RELEASE_LOG.md`

### Failure Mode

真实运行 `ops/collect-feedback.sh` 后，`gh issue view --comments` 的默认文本输出没有包含 issue 原始正文，只记录了评论。这会让后续路由只能看到回复，缺失玩家原始信号。

### Evidence

`data/feedback/github-feedback.md` 的快照一开始只包含 Issue #1 的回复评论，没有包含“我不知道为何要采集？”这段原始正文。

### Change

`collect-feedback` 改为显式使用 `gh issue view --json ... --template ...` 输出 issue 元数据、body 和 comments。脚本测试现在模拟默认渲染缺失 body 的情况，防止回归。

### Why This Does Not Weaken Constraints

该变更只加强 issue routing 的证据质量，不新增反馈渠道、不上传 telemetry、不收集个人数据，也不改变 response budget 或产品决策规则。

### Follow-up

继续把 `data/feedback/github-feedback.md` 当作原始反馈快照处理；真实产品决策仍必须经过 ledger、cluster 和 `DECISION.md`。

## 2026-05-07 - Asset Workflow

### Files Changed

- `docs/ASSET_WORKFLOW.md`
- `docs/HARNESS.md`
- `docs/REVIEW_PROTOCOL.md`
- `ops/governor-check.sh`
- `src/ops-scripts.test.ts`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/RELEASE_LOG.md`

### Failure Mode

游戏生成机制缺少资产工作流。未来需要图片、sprite、背景或视觉素材时，operator 可能不会显式评估 `imagegen`，也不会记录不使用它的理由。

### Evidence

用户指出当前机制似乎不会使用 `imagegen` 生成需要的图片；`rg` 未发现仓库内已有 `imagegen` 或 asset workflow 规则。

### Change

新增 `docs/ASSET_WORKFLOW.md`，定义素材需求、`imagegen` 使用规则、资产规格、实施流程和验证清单。将该文档挂入 `docs/HARNESS.md` 和 `docs/REVIEW_PROTOCOL.md`，并纳入 `ops/governor-check.sh` 必需文档检查。

### Why This Does Not Weaken Constraints

该变更只新增素材决策闸门，不强制生成装饰图，不新增玩法、反馈渠道或 telemetry，也不放宽 issue routing、response budget、complexity budget 或 review protocol。

### Follow-up

未来涉及视觉素材的 `DECISION.md` 记录必须说明使用 `imagegen`，或说明为什么 CSS、现有图标、文字反馈或不做更合适。

## 2026-05-07 - Versioned Complexity Budget

### Files Changed

- `docs/COMPLEXITY_BUDGET.md`
- `docs/NORTH_STAR.md`
- `docs/ROADMAP.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `ops/governor-check.sh`
- `src/ops-scripts.test.ts`

### Failure Mode

原复杂度预算只有 First Public Version Budget。用户明确要求进入 3-15 分钟版本后，旧预算无法表达下一版本允许的内容弧线，也容易让 operator 在“继续丰富内容”和“避免膨胀”之间摇摆。

### Evidence

用户反馈玩法仍然干枯太少，并确认“现在进入3-15分钟版本吧”。最近 `docs/ROADMAP.md` 也已把 3-5 分钟阶段推到需要扩大时间窗或定义内容弧线的状态。

### Change

`docs/COMPLEXITY_BUDGET.md` 改为版本化预算：保留 v0.1 First Public Version Budget，新增 v0.2 / 3-15 Minute Version Budget。v0.2 允许 3-15 分钟内容弧线、阶段里程碑/工坊阶段、延后解锁文案，并把 upgrade types 上限提升到 4、save format versions 上限提升到 2。

### Why This Does Not Weaken Constraints

该变更没有移除复杂度预算，而是让预算更精确。v0.2 仍禁止第二资源、prestige、任务系统、复杂地图、多面板扩张、外部 analytics 或 telemetry 上传。Issue routing、response budget、review protocol、测试和部署要求不变，v0.1 前 60 秒预算保留为回归护栏。

### Follow-up

进入 v0.2 后，下一步应先设计 3-15 分钟内容弧线，再实现一个小切片。任何具体玩法仍必须经过 `docs/DECISION.md`，并说明使用 v0.2 预算且没有破坏 v0.1 回归护栏。

## 2026-05-07 - Review Finding Cleanup

### Files Changed

- `data/feedback/github-feedback.md`
- `ops/collect-feedback.sh`
- `ops/create-pages-workflow.sh`
- `src/ops-scripts.test.ts`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/RELEASE_LOG.md`
- `docs/RETROSPECTIVE.md`

### Failure Mode

反馈表单声明 `feedback` label，但远端仓库缺少该 label，导致真实 issue 不进入 `Feedback Issues` 分桶。Pages workflow 生成脚本也落后于真实部署 workflow，会写出旧版 `.github/workflows/pages.yml`，并用 `bun test || true` 吞掉失败。

### Evidence

`gh label list` 原本没有 `feedback`，Issue #1/#2 labels 为空。`ops/create-pages-workflow.sh` 原本生成 `pages.yml`，使用旧 actions，并允许 Bun 测试失败。Retrospective 最后一次记录停在 `e269f5e`，之后已有 11 个 commit。

### Change

创建远端 `feedback` label，并给 Issue #1/#2 回填该 label。`collect-feedback` 现在在已认证 GitHub 环境下验证必需 label 存在，缺失时写入快照并失败。`create-pages-workflow` 现在生成当前标准的 `deploy-pages.yml`，运行 `bun test`、`bun run test` 和 `bun run build`，并使用当前 Pages action 版本。补充脚本测试、release log、governor state 和 retrospective。

### Why This Does Not Weaken Constraints

该变更收紧反馈路由和发布工具标准，没有新增玩法、资源、面板、反馈渠道、telemetry 上传或 issue 回复，也没有降低测试、部署、issue routing、response budget、complexity budget 或 review protocol。

### Follow-up

后续如果 issue form 新增必需 label，要同步扩展 `collect-feedback` 的 required label 检查和脚本测试。

## 2026-05-07 - v0.3 Resonance Budget

### Files Changed

- `docs/COMPLEXITY_BUDGET.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/GOVERNOR_STATE.md`
- `docs/DECISION.md`
- `docs/CONTENT_ARC.md`
- `docs/ROADMAP.md`
- `docs/RELEASE_LOG.md`
- `docs/plans/2026-05-07-resonance-system-design.md`
- `docs/plans/2026-05-07-resonance-system.md`

### Failure Mode

v0.2 预算把第二资源、新面板、存档字段和本地指标字段全部禁止。用户明确指出只增加里程碑不够，希望下一阶段有更丰富的玩法。

### Evidence

用户反馈：“为什么不新增第二资源、prestige、任务系统、新面板、存档字段或指标字段 我希望有更丰富的玩法，而不是只增加里程碑”，随后确认“好的，进入下一阶段吧”。`docs/RESEARCH.md` 已把 `星尘共鸣节点` 识别为下一阶段候选，但旧 v0.2 预算不足以承载真实第二资源和矩阵选择。

### Change

新增 v0.3 Resonance Version Budget：允许 1 个第二资源、1 个共鸣矩阵面板、v2 存档和最多 3 个 local-only 共鸣指标字段。v0.3 仍禁止 prestige、任务系统、复杂地图、多生产线、多个新面板、外部 analytics SDK 和 telemetry 上传。

### Why This Does Not Weaken Constraints

该变更没有移除复杂度预算，而是把下一阶段玩法扩展限定在一个版本预算内。North Star、issue routing、response budget、review protocol、测试要求和部署要求保持不变；v0.1 前 60 秒预算继续作为回归护栏。

### Follow-up

v0.3 实现应按 `docs/plans/2026-05-07-resonance-system.md` 分切片执行。第一版只实现共鸣资源、首个共鸣里程碑、一个紧凑共鸣矩阵、v2 存档迁移和 local-only 指标，不同时引入 prestige 或任务系统。

## 2026-05-08 - v0.4 20-Hour Resonance Budget

### Files Changed

- `docs/COMPLEXITY_BUDGET.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/GOVERNOR_STATE.md`
- `docs/DECISION.md`
- `docs/CONTENT_ARC.md`
- `docs/ROADMAP.md`
- `docs/SELF_PLAYTEST.md`
- `docs/RELEASE_LOG.md`
- `docs/RETROSPECTIVE.md`

### Failure Mode

v0.3 已把首个共鸣闭环收敛，但后续继续 no-change 或只打磨同一文案，会与用户明确提出的 20 小时内容目标冲突。直接新增 prestige、任务系统、多生产线或新面板又会越过当前复杂度边界。

### Evidence

用户本轮明确要求：“前期游戏内容不多需要积极做游戏玩法和内容的扩展，目标先做到20小时的游戏时间”。主动模拟显示首个共鸣后继续到约第 60,928 秒会达到 25 台自动采集器和 15 次调校，适合作为第二长期门槛。

### Change

新增 v0.4 20-Hour Resonance Budget：继续保持 1 个主资源、1 个第二资源和 1 个共鸣矩阵面板；允许最多 2 个共鸣里程碑，并允许启动现有 3 个共鸣节点中的 2 个。v0.4 仍禁止 prestige、任务系统、复杂地图、多生产线、多个新面板、新资源、新共鸣节点、外部 analytics SDK 和 telemetry 上传。

### Why This Does Not Weaken Constraints

该变更没有移除复杂度预算，而是用更窄的版本预算承接 20 小时目标。North Star、issue routing、response budget、review protocol、测试要求和部署要求保持不变；v0.1 前 60 秒预算继续作为回归护栏。

### Follow-up

下一轮只允许复核第二节点选择后的目标/反馈或等待真实反馈。不得直接新增第三共鸣门槛、新节点、prestige、任务系统或多生产线。

## 2026-05-08 - v0.5 Stardust Return Budget

### Files Changed

- `docs/COMPLEXITY_BUDGET.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/GOVERNOR_STATE.md`
- `docs/DECISION.md`
- `docs/CONTENT_ARC.md`
- `docs/ROADMAP.md`
- `docs/RELEASE_LOG.md`
- `docs/plans/2026-05-08-v05-stardust-return-design.md`
- `docs/plans/2026-05-08-v05-stardust-return.md`
- `docs/plans/2026-05-08-v05-star-chart-cruise-design.md`
- `docs/plans/2026-05-08-v05-star-chart-cruise.md`
- `ops/governor-check.sh`
- `src/ops-scripts.test.ts`

### Failure Mode

v0.4 的第二共鸣和 20 小时读回仍是一次性目标骨架。继续追加第三共鸣门槛、新节点或巡航文案无法形成可重复长线循环，也会把同一系统拉长到难以维护。

### Evidence

用户明确希望 prestige 成为长线主机制，并倾向把现有第二资源 `共鸣` 作为 prestige 奖励资源。当前 v0.4 预算显式禁止 prestige，因此不能直接实现归航逻辑，必须先版本化约束。

### Change

新增 v0.5 Stardust Return Budget：允许一个受限 prestige loop，命名为 `星尘归航`；归航奖励资源固定为 `共鸣`；允许新增 `returnCount` 存档字段，并把存档版本上限提升到 3。`星图巡航` 降级为后续辅助计划，v0.5 主线改为 `星尘归航`。`governor-check` 现在会校验 v0.5 预算存在、归航 loop 明确受限、奖励资源保持为 `共鸣`、存档版本上限为 3，并显式禁止第三普通资源。

### Why This Does Not Weaken Constraints

该变更没有移除复杂度预算，而是把用户明确要求的 prestige 方向限定为单一、可验证的版本预算。v0.5 仍禁止第三普通资源、任务系统、复杂地图、多生产线、多个新面板、第三共鸣门槛、新共鸣节点、节点等级树、外部 analytics SDK 和 telemetry 上传。North Star、issue routing、response budget、review protocol、测试要求和部署要求保持不变；v0.1 前 60 秒预算继续作为回归护栏。

### Follow-up

v0.5 实现必须按 `docs/plans/2026-05-08-v05-stardust-return.md` 分切片执行。第一版只做 `returnCount` 存档迁移、归航条件、归航按钮、固定 1 点共鸣奖励和本轮工坊重置；不要同时加入新资源、节点等级树、星图巡航、任务系统、多生产线或额外面板。

## Template

```md
## YYYY-MM-DD - Change

### Files Changed

### Failure Mode

### Evidence

### Change

### Why This Does Not Weaken Constraints

### Follow-up
```
