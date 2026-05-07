# Retrospective

## Trigger

Update this file when either is true:

- 10 commits have occurred since the last retrospective.
- 5 release-log entries have been added since the last retrospective.
- drift is detected.
- a harness change is proposed.

## Latest Retrospective

## 2026-05-06 Retrospective

### Window

从 clean-room harness 到首个公开预览与一次 SELF_PLAYTEST 清晰度修复。

### What Changed

- 创建 React + TypeScript + Vite + Vitest + Bun 项目。
- 实现“星尘工坊”最小 idle loop：点击采集、自动采集器、被动产出、版本化本地存档。
- 增加 GitHub Issues 反馈入口与本地 `feedback_clicked` 队列。
- 配置并验证 GitHub Pages 公开预览。
- 通过一次 self-playtest 改进首个升级成本文案。

### What Improved

- Roadmap M1 可玩本地 MVP 已完成。
- 反馈入口已存在，且没有伪造反馈。
- 公开预览 URL 可访问。
- CI 运行 Bun 原生测试、Vitest 和 Vite build。

### What Got Worse

- 发布基础设施调试产生了多个小 commit。
- GitHub Actions 仍提示部分 action 目标 Node.js 20；当前通过 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` 运行，但后续应关注 action 版本。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无。
- feature bloat: 无，仍是一资源、一升级类型。
- lack of tests: 无，核心循环、反馈入口、首屏渲染均有测试。
- unclear North Star: 无，仍优先前 60 秒清晰度。
- harness friction: Pages 启用和 lockfile registry 暴露了 CI 环境差异，但未削弱治理约束。

### Harness Lessons

- lockfile 不能保留本地镜像 registry；CI 需要显式使用公开 npm registry。
- Pages 首次启用可能需要仓库级 API 权限，不能只依赖 workflow token。

### Next Operating Mode

若没有真实反馈，继续 `SELF_PLAYTEST`；若出现真实 GitHub Issues，进入 `OPERATE` 并先更新 `docs/ISSUE_LEDGER.md`。

## 2026-05-06 Retrospective 2

### Window

从首个公开预览后的 self-playtest 文案改进，到本地 metrics infrastructure 成型。

### What Changed

- 增加首目标文案，直接说明攒星尘购买第一个自动采集器。
- 增加 UI-only 早期里程碑：`0 / 2` 自动采集器。
- 增加本地指标模式 `METRICS_INFRA`。
- 增加本地 session、点击、升级、首升时间、session end 和 session duration 指标。
- 修正指标 session 语义，确保每次 app session 重置。

### What Improved

- 第一目标更明确，早期进度反馈更强。
- 后续 self-playtest 可以查看本地指标，而不是只靠主观观察。
- metrics 模式边界更清楚：本地、无上传、无个人数据、无 SDK。

### What Got Worse

- 文档和 release-log 更新频率较高，产生多个小提交。
- GitHub Actions 仍提示部分 action 目标 Node.js 20；当前通过 Node 24 强制运行成功。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无。
- feature bloat: 无，未新增资源、奖励里程碑或系统。
- lack of tests: 无，metrics 已有本地测试。
- unclear North Star: 无，仍围绕前 60 秒清晰度。
- harness friction: metrics gap 已通过新增 `METRICS_INFRA` 模式解决。

### Harness Lessons

- 如果 prompt 提到某类输入源，operating modes 也需要对应的合法执行路径。
- 本地指标必须明确 session 边界，否则会污染后续 self-playtest 判断。

### Next Operating Mode

若没有真实反馈，继续 `SELF_PLAYTEST`，用本地指标辅助判断下一处前 60 秒缺口；若出现 issue，进入 `OPERATE`。

## 2026-05-06 Retrospective 3

### Window

从本地指标基础设施成型，到离线收益提示、动态里程碑、动态目标文案和下一步购买反馈研究。

### What Changed

- 动态里程碑替代固定 `0 / 2`，避免前 60 秒中途变成过期目标。
- 返回游戏时显示离线获得的星尘，并记录本地 offline reward 指标。
- 购买第一台自动采集器后，目标提示会继续指向下一台自动采集器。
- 新增研究结论：下一步优先增强购买自动采集器后的轻量确认反馈。

### What Improved

- 前 60 秒的目标指引更少过期信息。
- 返回体验更符合 North Star 中“离开后进度仍在继续”的要求。
- 下一步候选仍限定在 UI-only 反馈，不扩展资源、奖励或经济系统。

### What Got Worse

- release-log 和治理文档继续快速增长，需要后续保持精简。
- GitHub Actions 仍出现 Node.js 20 deprecation annotation；当前通过 Node 24 强制运行成功。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，未新增资源、奖励系统、prestige 或新面板。
- lack of tests: 无，动态目标文案已有渲染回归测试。
- unclear North Star: 无，仍围绕前 60 秒清晰度和稳定增长反馈。
- harness friction: 无，`METRICS_INFRA` 与 `RESEARCH` 边界清楚。

### Harness Lessons

- 每轮 self-playtest 修复后，如果下一步产品方向不清楚，应进入 `RESEARCH`，避免脑补功能。
- release-log 达到 5 条时要及时 retrospective，否则治理状态会失真。

### Next Operating Mode

若没有真实反馈，下一轮可进入 `SELF_PLAYTEST` 验证购买动作反馈缺口；若出现 issue，进入 `OPERATE` 并先更新 `docs/ISSUE_LEDGER.md`。

## 2026-05-06 Retrospective 4

### Window

从购买反馈实现，到本地 `save_loaded` 指标、反馈指标边界、公开预览 metrics policy 和反馈文档收口。

### What Changed

- 购买自动采集器后显示短暂确认反馈。
- 有效本地存档加载时记录 local-only `saveLoadedCount`。
- 将 `feedback_sent` 明确为 deferred metric，当前只记录 `feedback_clicked`。
- 修正公开预览阶段的 metrics policy：仍保持 local-only。
- 收口 `FEEDBACK.md` 和 `ISSUE_LEDGER.md`，让反馈文档更贴近实际 GitHub Issue 流程。

### What Improved

- 前 60 秒购买动作反馈更清楚。
- 回访和离线收益相关的本地判断更有数据基础。
- 指标边界更清楚，避免公开预览后误加上传或外部 SDK。
- 反馈路由文档更符合中文文档约束。

### What Got Worse

- runtime 文档继续增长，后续需要保持 `AGENTS.md` 和高层文档只做导航。
- 仍没有真实玩家反馈，产品判断主要来自 self-playtest、metrics gap 和 research。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，未新增资源、奖励系统或新面板。
- lack of tests: 无，购买反馈和 save-loaded 指标均有测试。
- unclear North Star: 无，仍围绕清晰目标、稳定增长和回访体验。
- harness friction: 无；本轮是文档漂移收口，没有削弱治理约束。

### Harness Lessons

- 公开预览不等于可以自动上传 telemetry；metrics policy 必须明确 consent 和 governance 边界。
- 外部 GitHub Issue 流程只能可靠记录点击，不能伪造提交完成。
- 反馈文档需要描述实际链接行为，否则后续 agent 容易误判反馈入口能力。

### Next Operating Mode

若没有真实反馈，下一轮优先 `SELF_PLAYTEST` 检查购买反馈和整体 UI 是否开始接近复杂度上限；若出现 issue，进入 `OPERATE`。

## 2026-05-06 Retrospective 5

### Window

从无真实反馈后的研究，到反馈正文聚焦和核心运行文档中文化。

### What Changed

- 研究确认：没有真实反馈时，优先降低反馈成本，而不是新增玩法系统。
- GitHub Issue 反馈正文改为聚焦“前 60 秒哪里不清楚”。
- 中文化 `docs/METRICS.md`、`docs/SELF_PLAYTEST.md` 和 `docs/ROADMAP.md` 的说明文字。
- 保留 metric key、storage key 和 M0-M5 roadmap 结构。

### What Improved

- 反馈入口更容易产生可路由的前 60 秒清晰度信号。
- 关键运行文档更符合中文文档约束。
- 文档收口没有改变代码行为、玩法、指标结构或反馈渠道。

### What Got Worse

- 文档维护占用了多个小提交。
- 仍没有真实玩家反馈，下一步不应继续无限中文化低优先级文档而忽视 playable experience。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，本窗口只有一次反馈正文改动和文档收口。
- lack of tests: 无，反馈正文改动有测试，文档变更通过治理检查。
- unclear North Star: 无，仍围绕前 60 秒清晰度和真实反馈获取。
- harness friction: 无，文档语言收口未削弱治理约束。

### Harness Lessons

- 文档中文化应优先处理高频运行文档，避免把所有文档翻译变成无边界任务。
- 反馈正文需要聚焦具体问题，才能把点击转化为有用 signal。

### Next Operating Mode

若仍没有真实反馈，下一轮优先 `SELF_PLAYTEST` 重新评估当前 playable experience，而不是继续只做文档语言收口。

## 2026-05-06 Retrospective 6

### Window

从购买反馈布局/文案收口，到 Pages actions 升级、发布基础设施收尾、self-playtest no-change 决策、反馈表单研究和 issue form 实施。

### What Changed

- 为离线收益和购买确认保留稳定事件区域。
- 将购买进度标签从“下个目标”改为“购买进度”。
- 升级 GitHub Pages workflow actions，并确认后续文档提交的 Pages workflow 成功。
- 记录 self-playtest no-change 决策，避免继续添加首屏提示。
- 研究确认：下一步反馈改进候选是单一 GitHub Issue Form。
- 新增 `feedback.yml` issue form，并让游戏内反馈链接指向它。

### What Improved

- 发布基础设施不再依赖 Node24 强制兼容开关。
- 前 60 秒 UI 更稳定，购买反馈不再推动下方控件。
- 运行文档明确记录了“不改代码”的合理场景。
- 反馈改进方向从“更多入口”收敛为“同一入口更结构化”，并已落到单一 GitHub Issue Form。

### What Got Worse

- 连续文档提交较多，仍会触发 Pages workflow。
- 仍没有真实玩家反馈；研究只能降低获取信号的摩擦，不能替代真实反馈。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，没有新增玩法、资源、奖励或面板。
- lack of tests: 无，代码变更已有测试；文档变更通过治理检查。
- unclear North Star: 无，仍围绕前 60 秒清晰度、反馈入口和可发布性。
- harness friction: 无，未削弱治理约束。

### Harness Lessons

- no-change 决策也要记录，否则长期运营容易把“继续工作”误解为“继续加 UI”。
- 当反馈为空且 self-playtest 没有明确 gap 时，下一步应研究信号质量，而不是扩大玩法。

### Next Operating Mode

若仍没有真实反馈，下一轮优先观察是否出现 GitHub Issue；若出现 issue，进入 `OPERATE` 并先更新 `docs/ISSUE_LEDGER.md`。若继续无反馈，回到 `SELF_PLAYTEST` 或 `RESEARCH`，不要新增第二反馈渠道。

## 2026-05-06 Retrospective 7

### Window

从外部 playtest 邀请研究，到 README 邀请素材、反馈聚类模板、signal routing、response budget 和反馈入口文档语言收口。

### What Changed

- 研究确认：外部 playtest 邀请应放在站外，不打断游戏首屏。
- README 增加可复用 playtest 邀请素材。
- 中文化 `FEEDBACK_CLUSTERS.md`、`SIGNAL_ROUTING.md`、`RESPONSE_BUDGET.md` 和 `FEEDBACK.md` 的关键说明。
- 保持单一 GitHub Issue Form 和 local-only telemetry 边界。

### What Improved

- M3 反馈处理链路的核心文档更一致。
- 后续真实 issue 出现时，路由、聚类、回复预算和反馈边界更容易执行。
- no-feedback 状态被明确保留，没有伪造聚类或指标。

### What Got Worse

- 连续文档提交仍偏多。
- 仍没有真实玩家反馈，文档准备不能替代 playtest 输入。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，没有新增玩法、资源、奖励或面板。
- lack of tests: 无，文档变更通过治理检查；代码未变。
- unclear North Star: 无，仍围绕反馈获取和可持续处理。
- harness friction: 无，未削弱路由、回复预算、复杂度预算或 North Star 约束。

### Harness Lessons

- 反馈处理文档的语言一致性是执行质量问题，但不应无限扩展为全仓库翻译任务。
- 站外 playtest 素材可以降低真实反馈摩擦，但真实反馈仍必须来自明确提交或手动记录。

### Next Operating Mode

若仍没有真实反馈，下一轮优先 `SELF_PLAYTEST` 或 `RESEARCH`，避免继续只做低优先级文档语言收口；若出现 issue，进入 `OPERATE` 并先更新 `ISSUE_LEDGER.md`。

## 2026-05-07 Retrospective 8

### Window

从首条真实 issue 路由开始，到代码评审指出反馈闭环自动化不足并完成 harness 收紧。

### What Changed

- `governor-check` 开始验证 ledger、cluster、decision 锚点和 release evidence。
- `collect-feedback` 开始抓取 issue 正文、评论，并生成 ledger draft。
- 修正 `collect-feedback` 真实输出缺少 issue 原始正文的问题，改用显式 JSON/template。
- `ISSUE_LEDGER.md` 增加 evidence format 规则。
- 新增脚本测试覆盖缺失聚类、缺失 release evidence 和缺少 issue 正文/评论证据。

### What Improved

- 反馈闭环不再只依赖代理记住流程，关键证据链可以被自动检查。
- issue 路由输入更完整，后续聚类和决策能看到正文与评论上下文。
- 反馈快照现在能同时保留玩家原始正文和后续回复，减少把回复误当原始信号的风险。
- 已修复/已发布状态不能再使用模糊 `pending` 证据通过检查。

### What Got Worse

- harness 检查脚本更复杂，后续维护时需要同步更新测试。
- 当前工作区同时包含 Issue #1 产品改动和本轮 harness 改动，提交前需要整理变更边界。

### Drift Check

- repeated issue replies: 无，本轮未回复 issue。
- issue-driven thrashing: 无，harness 改动来自代码评审，不扩大 #1 产品范围。
- feature bloat: 无，没有改变玩法、经济、资源或 UI。
- lack of tests: 已改善，新增 ops 脚本回归测试。
- unclear North Star: 无，反馈闭环自动化是为了更可靠地吸收真实玩家反馈。
- harness friction: 发现并收紧，未削弱治理约束。

### Harness Lessons

- 文档规则必须尽快转化为可执行检查，否则真实 issue 出现后容易漏掉证据链。
- 反馈采集快照必须用结构化字段包含正文和评论；依赖 CLI 默认渲染不够可靠。

### Next Operating Mode

本轮 META_IMPROVE 完成后，若继续处理 Issue #1，应回到 `OPERATE` 并在验证、提交和发布证据存在后再回复。

## 2026-05-07 Retrospective 9

### Window

从 Issue #1 修复后的 no-change self-playtest，到 Soft Automation 研究、`调校工具` 实施、60 秒经济复核、前置条件文案修正和 Pages 发布收口。

### What Changed

- 研究确认：核心循环清晰后，下一步候选应是低复杂度 soft automation，而不是第二资源、prestige 或新面板。
- 新增 `调校工具` upgrade type：使用星尘提升自动采集器效率。
- 旧存档缺少新字段时保持兼容，默认调校等级为 0。
- 60 秒模拟确认自动采集器仍在第 10、23、39 秒购入，第 55 秒才购买第一项调校工具。
- 无自动采集器时，调校工具文案改为“需要先购买自动采集器”。
- commit `7a15e5d` 已推送，Pages workflow `25474199644` 成功，公开预览 HTTP 200。

### What Improved

- 玩家购买第一台自动采集器后有了第二个低复杂度选择，能在数量和效率之间做轻量取舍。
- 第一台自动采集器目标没有被 25 星尘调校成本抢走，前 60 秒节奏仍围绕同一核心循环。
- 禁用态文案更准确，避免玩家误以为只要攒够 25 星尘就能购买调校工具。
- 玩法扩展仍复用现有资源、主屏和反馈渠道。

### What Got Worse

- 动作区现在包含采集、自动采集器、调校工具三个按钮，长文案需要持续关注窄屏换行。
- upgrade type 从 1 增至 2，后续不应在缺少真实反馈时继续加第三种升级。

### Drift Check

- repeated issue replies: 无。Issue #1 没有玩家新补充，本轮不回复。
- issue-driven thrashing: 无。Soft Automation 来自 research-backed roadmap gap，不是把 #1 扩成新系统。
- feature bloat: 受控。primary resource 仍为 1，upgrade types 为 2，visible panels 不增加。
- lack of tests: 无。实现周期覆盖游戏逻辑、旧存档兼容和 UI 文案。
- unclear North Star: 无。改动继续服务“采集星尘、购买自动采集器、提高持续产出”的前 60 秒循环。
- harness friction: 无。治理检查和发布验证完成，没有削弱约束。

### Harness Lessons

- 新升级的禁用态不能只显示成本；如果还有结构性前置条件，按钮文案必须直接说明。
- 研究支撑的新玩法也要做 60 秒经济回访，确认没有抢走已有第一目标。
- 发布完成后应立即收口 governor state，避免状态长期停留在实施切片。

### Next Operating Mode

若 Issue #1 或新 issue 出现玩家补充，进入 `OPERATE` 并先更新 feedback snapshot、issue ledger 和 cluster。若继续无新反馈，优先 `SELF_PLAYTEST` 或 `RESEARCH` 做 no-change/等待判断；不要继续增加第三种升级。

## 2026-05-07 Retrospective 10

### Window

从用户指出图片生成机制缺口，到新增 Asset Workflow 并挂入 harness/review/governor 检查。

### What Changed

- 新增 `docs/ASSET_WORKFLOW.md`。
- `docs/HARNESS.md` 将 Asset Workflow 纳入治理层文档。
- `docs/REVIEW_PROTOCOL.md` 增加视觉素材和 `imagegen` 决策检查。
- `ops/governor-check.sh` 将 Asset Workflow 纳入必需文档。

### What Improved

- 未来需要图片、sprite、背景或视觉素材时，operator 必须显式评估 `imagegen`。
- 不使用 `imagegen` 的情况也需要记录理由，避免默认忽略。
- 资产生成被限制在 North Star、复杂度预算和发布检查内，不会自动变成装饰扩张。

### What Got Worse

- 治理文档又增加一份，后续需要保持它简洁，避免变成素材百科。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，本轮来自用户对 harness 的直接反馈。
- feature bloat: 无，没有新增图片、玩法、资源、UI 或面板。
- lack of tests: 无，governor check 覆盖必需文档存在性。
- unclear North Star: 无，素材必须服务前 60 秒清晰度、成长反馈或 roadmap。
- harness friction: 发现并收紧，未削弱治理约束。

### Harness Lessons

- 对于可用工具，harness 不能只依赖代理记忆；需要在 workflow 和 review checklist 中显式出现。
- `imagegen` 应是“需要图片时必须评估”，而不是“每轮必须生成图片”。

### Next Operating Mode

Asset Workflow 收口后，若无新玩家反馈，回到 `SELF_PLAYTEST` 或 `RESEARCH`，优先判断是否停手等待反馈。

## 2026-05-07 Retrospective 11

### Window

从 Asset Workflow 收口后的 no-change 决策开始，到 roadmap gate、首屏文案预算、窄屏动作区、反馈快照刷新和 metrics 本地查看方式收敛。

### What Changed

- 记录当前不生成 `imagegen` 图片、不新增 `src/assets/` 的决策。
- `ROADMAP.md` 增加当前状态和下一道闸门，明确 M0-M3 已基本完成，M4/M5 处于持续运营中。
- 完成 first-screen text budget 审计，调校工具上线后首屏仍低于 300 中文字符预算。
- 完成动作区窄屏 CSS 复核，现有样式支持换行和 560px 以下纵向排列。
- 刷新 GitHub feedback snapshot，确认 Issue #1 没有玩家新补充。
- `METRICS.md` 增加本地 localStorage 查看方式，便于 operator 读取 current session、session history 和 feedback click queue。

### What Improved

- 后续 operator 更清楚哪些 milestone 已完成，避免把 roadmap 当 backlog。
- no-change 决策有了更明确的证据：文字预算、CSS 响应式规则、反馈快照和 metrics readback。
- Asset Workflow 被正确应用为“需要时评估”，而不是推动无信号图片生成。
- metrics 仍保持 local-only，但现在更容易用于本机 self-playtest 复核。

### What Got Worse

- 连续小文档提交较多，Pages workflow 频繁运行。
- 当前仍缺少新真实玩家反馈；运营动作主要是在降低未来 drift 风险，而不是增加可见玩法内容。

### Drift Check

- repeated issue replies: 无。Issue #1 没有新玩家补充，本轮未回复。
- issue-driven thrashing: 无。没有继续基于 #1 添加提示或系统。
- feature bloat: 无。没有新增资源、升级、图片、面板、反馈渠道或 telemetry 上传。
- lack of tests: 无。涉及代码状态的流程继续通过 tests/build；文档变更通过 governor check。
- unclear North Star: 无。roadmap gate 和 no-change 决策都围绕前 60 秒清晰度、成长反馈和避免噪音。
- harness friction: 轻微增加。文档越来越多，需要后续避免把每个 no-change 都扩成大文档周期。

### Harness Lessons

- 持续运营不等于持续加功能；当没有新反馈时，可验证的 no-change 决策比无信号扩张更健康。
- Roadmap 需要显示当前状态，否则完成的里程碑会被反复当成待办。
- Local-only metrics 只有能被 operator 读取，才真正能支持 self-playtest；但不能把本机数据伪装成真实玩家指标。

### Next Operating Mode

若出现新 issue 或 Issue #1 玩家补充，进入 `OPERATE` 并先更新 feedback snapshot、ledger 和 cluster。若继续无新反馈，下一轮优先只做一个有证据的 self-playtest 或 metrics readback；如果仍没有具体 gap，应等待新信号，不要继续扩大文档或玩法。

## 2026-05-07 Retrospective 12

### Window

从用户确认“进入下一步”，到 North Star、Roadmap、Decision 和 Self-playtest 口径切换到 3-5 分钟参与度。

### What Changed

- `docs/NORTH_STAR.md` 的当前阶段从 early clean-room / first 60 seconds 切换为 early live-operation / 3-5 minute engagement。
- `docs/ROADMAP.md` 明确前 60 秒现在是回归护栏，下一道闸门是 3-5 分钟目标清晰度、升级节奏和回访理解。
- `docs/SELF_PLAYTEST.md` 增加前 3-5 分钟检查项。
- `docs/DECISION.md` 记录阶段切换不是新增系统授权。
- 增加 stage cadence：同一时间窗连续 no-change 后必须扩大时间窗、定义内容弧线或等待真实反馈。

### What Improved

- Operator 不会继续把所有下一步都压回前 60 秒。
- Operator 也不能在 3-5 分钟阶段无限 no-change；必须向更长内容弧线推进。
- 3-5 分钟体验有了明确检查口径，但仍保留第一分钟回归安全。
- Roadmap 更清楚地区分“阶段焦点变化”和“功能实现授权”。

### What Got Worse

- 阶段切换后，后续判断会更依赖 180-300 秒模拟、local-only metrics 和真实反馈；不能再只靠首屏阅读判断。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，Issue #1/#2 均不重复处理。
- feature bloat: 无，本轮只改文档和检查口径，不新增玩法、资源、图片、面板或 telemetry。
- lack of tests: 通过 governor check 验证治理文件；无代码行为变化。
- unclear North Star: 已改善，当前阶段更明确。
- harness friction: 无，阶段切换保留复杂度预算和 review protocol。

### Harness Lessons

- 当前阶段必须在 North Star 中更新，否则 operator 会被旧优先级拖回上一阶段。
- 阶段必须有推进节奏；no-change 是刹车，不是停车场。
- 阶段切换不是功能授权；新的实现仍要走 decision、复杂度预算、测试和发布证据。

### Next Operating Mode

进入 3-5 分钟阶段后的下一轮优先 `SELF_PLAYTEST` 或 `METRICS_INFRA`：先读取/模拟 180-300 秒体验，再决定是否需要小切片。

## 2026-05-07 Retrospective 13

### Window

从 `e269f5e` 阶段切换后，到 imagegen 背景、调校倍率可见性、v0.2 复杂度预算、工坊阶段、物件插图、内容弧线、最近升级进度、阶段完成反馈、延后解锁预告、引擎室回访目标和本轮 review finding cleanup。

### What Changed

- 使用 imagegen 接入星尘工坊背景和三张核心物件插图。
- 将主屏统计中的点击收益替换为调校倍率，让调校成长可见。
- 将复杂度预算版本化为 v0.1 / v0.2，并用 v0.2 支持 3-15 分钟内容弧线。
- 增加工坊阶段、下一升级进度、阶段完成反馈和延后解锁预告。
- 将 `星尘引擎室` 后续目标改为首次回访目标。
- 创建并回填远端 `feedback` label，刷新反馈快照。
- 收紧 `collect-feedback` 必需 label 检查，并修正 `create-pages-workflow` 生成当前标准 Pages workflow。

### What Improved

- 3-15 分钟内容不再只依赖数字上涨，玩家能看到阶段名、下一阶段名称、当前最近升级和阶段跨越反馈。
- 视觉素材服务核心链路，没有新增资源、按钮、面板或远程热链。
- 反馈 issue 现在能进入 `Feedback Issues` 分区，后续路由不会因为缺 label 漏信号。
- Pages workflow 生成脚本不再生成第二套旧 workflow，也不会吞掉测试失败。

### What Got Worse

- Runtime 文档继续增长，`docs/DECISION.md`、`docs/SELF_PLAYTEST.md` 和本 retrospective 已经偏长。
- 视觉和阶段表达增加后，后续更需要用真实反馈或截图验证首屏是否仍足够安静。

### Drift Check

- repeated issue replies: 无。Issue #1/#2 本轮只回填 label，没有新增回复。
- issue-driven thrashing: 无。本轮是 review finding cleanup 和 v0.2 内容弧线收口，不把单个 issue 直接当 backlog。
- feature bloat: 受控。仍为 1 个主资源、0 个第二资源、2 种升级类型、无新面板、无任务系统、无 prestige。
- lack of tests: 已改善。新增脚本测试覆盖缺失 `feedback` label 和 Pages workflow 生成标准。
- unclear North Star: 无。当前阶段仍是 3-15 分钟内容弧线与首次回访，前 60 秒是回归护栏。
- harness friction: 已收紧。反馈分桶和 Pages 生成脚本现在更接近真实运行标准。

### Harness Lessons

- Issue form 的默认 label 不是纯本地配置；远端 label 缺失会让后续分桶和自动化失效。
- `ops` 工具箱必须和真实 CI 保持同步，否则旧脚本会在未来重新引入已经修过的发布风险。
- Retrospective 触发规则需要严格执行；大量小切片完成后不回顾，会让 governor state 停在旧周期。

### Next Operating Mode

本轮 review finding cleanup 完成后，下一轮若无新 issue 补充，应先读取 feedback snapshot、local-only metrics 或做一次聚焦 self-playtest；不要因为 v0.2 预算允许 4 种 upgrade type 就直接新增第三种升级。

## Template

```md
## YYYY-MM-DD Retrospective

### Window

### What Changed

### What Improved

### What Got Worse

### Drift Check

- repeated issue replies:
- issue-driven thrashing:
- feature bloat:
- lack of tests:
- unclear North Star:
- harness friction:

### Harness Lessons

### Next Operating Mode
```
