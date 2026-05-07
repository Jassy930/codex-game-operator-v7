# Research

## Current Research

2026-05-07 - 首次回访后的下一阶段内容方向。

## 2026-05-07 - 首次回访后的下一阶段内容方向

### Question

`星尘引擎室` 和首次回访目标已经能解释 15-60 分钟与第一次离线收益。下一阶段应如何丰富内容，才能让回访后的 15-60 分钟继续有局部目标和策略变化，同时不新增第二资源、prestige、任务系统、复杂地图或新面板？

### Sources / Observations

- 当前本地模拟显示，首次回访后玩家可以把 30 分钟离线收益连续投入第 16 台自动采集器和第 10 次调校；之后进入“继续攒下一次升级”的状态。
- Machinations 的 idle game 设计资料强调：idle game 需要同时支持 active play 和 inactive progress；核心循环之外需要逐步引入 meta loop，但 active loop 不能退化成“登录、花钱、离开”。
- GDC Vault 的 Anthony Pecorella talk 概览强调 idle game 研究重点包含 self-playing core、演化趋势、新机制分析，以及让玩家对“数字上涨”持续兴奋。
- Incremental game 类型资料把成就/里程碑系统描述为给玩家结构和方向的常见机制；prestige 可以形成后续策略深度，但通常用于进度明显变慢后的 reset loop。
- 现有 `docs/COMPLEXITY_BUDGET.md` v0.2 允许阶段里程碑和延后解锁文案，但仍禁止第二资源、prestige、任务系统和新增多面板管理界面。

Sources:

- https://machinations.io/articles/idle-games-and-how-to-design-them
- https://www.gdcvault.com/play/1023876/Quest-for-Progress-The-Math
- https://www.gdcvault.com/play/1022066/Idle-Games-The-Mechanics-and
- https://en.wikipedia.org/wiki/Incremental_game

### Candidate Directions

1. 推荐：`Milestone Resonance / 星尘共鸣节点`
   - 用现有自动采集器数量和调校等级派生下一组里程碑，例如 `20 台自动采集器 + 12 次调校`。
   - 第一阶段只做预告或派生状态，不新增资源、不新增面板、不新增存档字段。
   - 如果后续 self-playtest 或真实反馈证明需要更强动力，再考虑把共鸣节点变成自动产出倍率或一次性阶段反馈。

2. 候选：短时主动加速
   - 让玩家回访后有一个可点击的短时 boost。
   - 风险是增加主动作或 cooldown 规则，容易扩大首屏控件和指标需求；当前不推荐。

3. 延后：prestige 或第二资源
   - 可以在更长时间窗提供策略重置和新目标。
   - 当前 15-60 分钟仍有升级推进，过早引入 reset 或第二资源会破坏 v0.2 轻量约束；本轮明确不采用。

### General Principles

- 继续保持单一主资源和现有主屏。
- 下一阶段内容应先提供“我接下来在等哪个里程碑”的结构，再考虑新增可购买升级。
- 优先使用现有状态派生内容：自动采集器数量、调校等级、每秒星尘和阶段名。
- 不把 meta loop 一次性做成多系统；每轮最多验证一个局部目标。
- 如果实现 `星尘共鸣节点`，第一版应是 existing state derived，不能要求 save version 2。

### Decision Impact

下一阶段研究决策是：把 `Milestone Resonance / 星尘共鸣节点` 作为下一步候选内容，优先设计为现有状态派生的里程碑预告。它可以在 `星尘引擎室` 后告诉玩家下一组长期目标，例如自动采集器和调校等级的组合门槛。它不自动授权实现；实现前需要新的 design/implementation plan，并在 `DECISION.md` 中确认是否只做预告、是否影响产出倍率、是否需要测试和存档兼容检查。

### What Not To Copy

- 不复制商业 idle game 的广告、付费 boost、抽卡、限时活动或多货币经济。
- 不把“meta loop”直接解释成第二资源、prestige、多角色、多地图或任务系统。
- 不在没有新反馈或 self-playtest gap 的情况下同时加入主动 boost、成就、共鸣倍率和 prestige。
- 不新增 player identity、外部 analytics 或上传路径来证明下一阶段内容。

## 2026-05-07 - 300 秒后下一步内容方向

### Question

Issue #2 已通过目标提示切片处理，60-300 秒模拟也显示升级事件仍然稳定出现。下一步内容应继续等待反馈，还是开始设计第三种升级、解锁目标或回访优化？

### Sources / Observations

- 本地 300 秒模拟显示升级事件出现在第 10、23、39、55、76、100、126、160、194、238、290 秒；第 300 秒距离下一次升级约 47 秒，暂未出现明显停滞。
- CHI 2018《Playing to Wait》将 incremental games 描述为玩家选择资源生成、等待资源积累、再花费资源自动化生产；它强调等待是玩法的一部分，玩家的选择会随时间展开。
- Incremental game 类型资料强调资源积累、重复动作、自动化和逐步升级是核心，玩家在昂贵升级与快速替换之间追逐增长感。
- 近期 idle 设计资料强调早期应打好基础、逐步引入新系统，并让长期目标逐渐展开；如果 pacing 错误，玩家会逐渐流失，而不是立刻报告明确错误。
- 设计实践资料建议早期优先基础 generator、multiplier、unlock gate、efficiency 和 quality-of-life，但这不等于应在没有信号时一次性加入多层系统。

Sources:

- https://par.nsf.gov/servlets/purl/10061230
- https://en.wikipedia.org/wiki/Incremental_game
- https://www.capermint.com/blog/idle-game-development/
- https://gridinc.co.za/blog/idle-games-best-practices

### General Principles

- 当前仍应保持单资源、现有主屏和最多 2 种已实现升级。
- 第三种升级只有在出现明确 post-300s 停滞、真实反馈或 local-only metrics 证据时才进入实现。
- 如果未来需要新内容，优先考虑“解锁预告 / milestone gate / 回访后选择”，而不是第二资源、prestige、任务系统或复杂 lore。
- 新内容应让玩家更会判断下一步，而不是制造更多按钮。

### Decision Impact

当前不实现第三种升级或新系统。下一步候选只保留为 research-backed direction：如果后续出现 post-300s 停滞或玩家再次反馈“内容少”，优先研究一个复用现有主屏的 milestone unlock preview，让玩家看到 10 台自动采集器或若干调校后的下一个目标；仍不新增资源、面板或 prestige。

### What Not To Copy

- 不复制长期运营游戏的多资源、prestige、任务系统、成就系统或多面板结构。
- 不把“逐步引入新系统”理解成当前马上加第三种升级。
- 不用新内容掩盖没有真实证据的 pacing 判断。

## 2026-05-07 - Issue #2 后的 60 秒后参与度切片

### Question

玩家反馈“只能玩前60秒，然后就无聊了”后，应如何提升 60 秒后的目标感，同时不新增第二资源、新面板、第三种升级、prestige、任务系统或复杂 lore？

### Sources / Observations

- Issue #2 是真实玩家反馈，指向 post-60s engagement，而不是前 60 秒完全看不懂。
- 当前经济模拟显示：第 55 秒购买第 1 个调校工具后，第 76 秒可购买第 4 台自动采集器，第 100 秒可购买第 2 次调校，第 126 秒和第 160 秒继续购买自动采集器。
- 这说明 60 秒后并非完全没有可达事件；更具体的缺口是现有目标提示仍偏向“下一台自动采集器”，没有表达“扩建或调校”的已有二选一成长。
- 既有 research 已支持先扩展现有升级选择，而不是引入第二资源、prestige 或多面板。

### General Principles

- 优先暴露已有深度，而不是添加新系统。
- 目标提示可以更具体，但不能让首屏变成教程。
- 不新增按钮、资源、面板、指标字段或反馈渠道。
- 如果文案超过复杂度预算或造成噪音，应回到 `SIMPLIFY`。

### Decision Impact

本轮候选是最小 UI 文案切片：当玩家已有自动采集器但尚未调校时，目标提示说明可以购买下一台自动采集器或第一次调校；当已有调校等级后，目标提示改为“扩建或调校，让每秒星尘继续提高”。这不改变经济，只让 60 秒后已存在的选择更明显。

### What Not To Copy

- 不新增第三种升级、第二资源、任务系统、成就、prestige 或新面板。
- 不把“丰富内容”解释为一次性扩展多个系统。
- 不新增图片资产、外部 analytics、站内反馈表单或玩家身份收集。

## 2026-05-07 - 核心循环清晰后的低复杂度下一步玩法

### Question

在星尘、采集、自动采集器、购买进度和反馈入口已经清晰后，下一步玩法内容应如何扩展，才能提升“再玩一分钟”的选择感，同时不新增第二资源、面板、prestige、复杂 lore 或外部 tracking？

### Sources / Observations

- GameAnalytics 的 idle game 指南强调从简单目标开始，再逐步加入货币管理、解锁内容和升级；它支持先扩展现有升级选择，而不是立刻引入新系统。
- Kongregate 的 idle game math 文章把早期循环拆成 primary currency、generator、production rate 和 cost；当前游戏已有这些元素，下一步应继续围绕同一货币和 generator 做成本/收益选择。
- Incremental game 类型资料强调持续增长、升级和自动化是核心；当前 `IDEA_PARKING_LOT.md` 里 “Soft Automation” 与此匹配，且比第二资源或 prestige 更低复杂度。

Sources:

- https://www.gameanalytics.com/blog/how-to-make-an-idle-game-adjust
- https://www.kongregate.com/pages/the-math-of-idle-games-part-i
- https://en.wikipedia.org/wiki/Incremental_game

### General Principles

- 保持单一资源：星尘仍是唯一货币。
- 保持现有主屏，不新增面板。
- 新内容应是第二种 upgrade type，而不是第二资源或新系统。
- 新选择应帮助玩家减少纯点击压力，或让自动采集器更有成长感。
- 不把研究直接当实现；必须先进入 `DECISION.md` 和设计文档。

### Decision Impact

下一步候选是 “Soft Automation / 调校工具”：一个使用星尘购买的第二升级类型，逐步提升自动采集器效率。它保留单一资源和同一主屏，让玩家在“买更多自动采集器”和“强化已有自动采集器”之间形成早期选择。

该方向应先作为设计候选记录，不在本轮实现。实现前需要确认复杂度预算仍允许第二 upgrade type，并用 TDD 覆盖成本、倍率、渲染和存档兼容性。

### What Not To Copy

- 不引入 prestige、第二货币、多世界或复杂自动化链。
- 不添加新面板、任务系统、成就系统或弹窗教程。
- 不复制广告、付费、软启动或商业化模式。
- 不把多个升级一次性加入；最多设计一个新 upgrade type。

## 2026-05-06 - 不打扰首屏的外部 playtest 邀请

### Question

公开预览和 issue form 已存在但仍没有真实反馈时，如何在不打扰游戏首屏、不新增 analytics SDK、上传路径、个人数据或第二反馈渠道的前提下，邀请外部 playtest 并获得前 60 秒反馈？

### Sources / Observations

- Games User Research 建议：如果目标是发现游戏中的问题，少量玩家即可形成有用的第一轮输入；它给出的实践起点是 6 名 playtester，然后停下来反思发现的问题。
- Games User Research 的招募指南强调先定义目标玩家，避免只找朋友或随机人群；代表性比人口统计信息更重要，类似游戏玩家是可用的招募线索。
- The Level Design Book 的 playtesting 指南强调观察玩家行为、少打断，并在远程测试中可让玩家私下直播或录屏；同时提醒大多数基础记录可通过认真记笔记完成，不必先引入 telemetry。
- Game Developer 的 playtesting 建议强调“测试的是游戏，不是玩家”，并建议提前准备聚焦问题、避免引导性问题，用 plain terms 询问玩家理解到了什么。
- 2024 indie pre-release experimentation survey 指出，独立游戏预发布实验通常受参与者获取、偏差和资源限制影响，因此早期更依赖 qualitative data。

Sources:

- https://gamesuserresearch.com/how-many-players-do-i-need-for-a-playtest/
- https://gamesuserresearch.com/a-simple-process-to-find-playtesters/
- https://book.leveldesignbook.com/process/blockout/playtesting
- https://www.gamedeveloper.com/design/best-practices-five-tips-for-better-playtesting
- https://arxiv.org/abs/2411.17183

### General Principles

- 不在游戏首屏新增邀请文案；游戏内仍只保留一个“反馈”入口。
- 外部邀请应发生在仓库/发布说明/社区帖子等站外上下文，不打断核心循环。
- 第一轮只需要少量目标玩家，目标是发现前 60 秒阻塞点，不做量化结论。
- 邀请文字应说明“测试的是游戏，不是玩家”，并要求玩家按自然方式游玩到想停为止。
- 反馈仍回到同一个 GitHub Issue Form；不新增 Discord、表单服务、邮件列表、录屏上传要求或 analytics SDK。

### Decision Impact

下一步候选不是改游戏 UI，而是在项目文档或发布说明中补一个短 playtest 邀请，包含公开预览 URL、同一个 `feedback.yml` issue form 链接、目标问题“前 60 秒哪里不清楚”，以及不收集个人数据/不需要联系方式的边界。该邀请应作为站外招募素材，不在首屏展示。

### What Not To Copy

- 不创建新反馈渠道、邮件列表、Discord、外部问卷或录屏上传流程。
- 不把 6 人 playtest 当成统计结论或真实留存指标。
- 不要求玩家提供个人身份、联系方式或跨设备追踪信息。
- 不在首屏弹窗、横幅或按钮文案中加入 playtest 招募说明。

## 2026-05-06 - 现有反馈入口的信号质量

### Question

公开预览存在但仍没有真实反馈时，如何在不新增 analytics SDK、上传路径、强制弹窗或第二反馈渠道的前提下，让现有 GitHub Issue 反馈更容易产生可路由的前 60 秒信号？

### Sources / Observations

- GitHub Docs 说明 issue form 可以在仓库的 `/.github/ISSUE_TEMPLATE` 中用 YAML 定义，并支持不同输入类型、校验、默认标题和默认 labels；提交后的回答会转换为普通 issue body。
- GitHub Docs 还说明 `issues/new` URL 可以带 `template` 参数，并可预填 issue form 中定义的自定义文本字段。
- UserTesting / UserZoom 的非引导问题指南强调：避免引导性问题、避免 yes/no 问题、一次只问一个问题，并用直接但不暗示答案的表述。
- UserTesting 的反馈偏差指南强调：任务 wording 过于直接会让用户照着指令走，而不是暴露界面是否可理解；目标应明确，但不要泄露完成路径。
- Department of Product 的 usability task 指南强调：任务应服务于研究问题、保持简单，并避免在任务文字里告诉用户应该点击哪里。

Sources:

- https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
- https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue
- https://help.usertesting.com/hc/en-us/articles/4402111012369-Write-non-leading-questions
- https://help.usertesting.com/hc/en-us/articles/11880401159709-Avoid-bias-when-collecting-feedback
- https://www.departmentofproduct.com/blog/how-to-write-tasks-for-usability-testing/

### General Principles

- 不要新增第二反馈渠道；先提升现有 GitHub Issue 流程的结构化程度。
- 反馈问题应聚焦一个研究目标：前 60 秒哪里阻塞或不清楚。
- 表单字段应要求玩家描述“发生了什么”和“当时想做什么”，避免暗示某个 UI 元素一定有问题。
- 可以用少量枚举字段帮助路由，例如卡在采集、购买、目标、离线收益、反馈入口或其他；但枚举不能替代开放描述。
- 不应把表单做成问卷、满意度评分或强制弹窗。

### Decision Impact

下一步候选不是新增玩法或 analytics，而是把现有 GitHub Issue 反馈链接迁移到单一 GitHub Issue Form。该表单应保留 `feedback` label，围绕前 60 秒设置 2-3 个必填字段，并继续让 App 只记录 `feedback_clicked`，不记录提交完成、不上传 telemetry。

### What Not To Copy

- 不复制长问卷、满意度评分、NPS、录屏或外部用户研究平台。
- 不把表单字段设计成“这个按钮是否难找”这类暗示答案的问题。
- 不新增站内提交系统、登录要求、外部 SDK 或个人联系方式字段。

## 2026-05-06 - 无真实反馈后的下一步

### Question

公开预览已存在但没有真实玩家反馈时，下一步应继续添加玩法，还是先降低获取真实反馈的成本？

### Sources / Observations

- Interaction Design Foundation 的 early-design testing 指南强调早期测试可验证假设、发现用户是否理解目标，并建议先定义清晰问题再测试。
- UserTesting 的 startup feedback guide 强调不要等到产品完成再测试，并引用小样本测试可以发现大量可用性问题的观点。
- Usability testing 资料强调多轮小规模测试比一次大测试更适合有限资源团队，也说明早期阶段可先找普通测试者发现阻塞问题。
- 2024 pre-release indie game experimentation survey 指出，indie 预发布实验受时间、参与者获取和样本代表性限制，早期更偏重 qualitative data。

Sources:

- https://ixdf.org/literature/topics/early-design-testing
- https://www.usertesting.com/resources/guides/startups-guide-user-feedback
- https://en.wikipedia.org/wiki/Usability_testing
- https://arxiv.org/abs/2411.17183

### General Principles

- 没有真实反馈时，不要用新增系统代替外部验证。
- 继续 self-playtest 只能发现明显问题；下一步应降低真实玩家反馈成本。
- 反馈请求应围绕一个窄问题，例如“前一分钟哪里不清楚”，而不是泛泛征求意见。
- 反馈入口不应打断核心循环，不应新增上传、SDK 或个人数据。

### Decision Impact

下一步候选应是改进现有反馈入口的上下文，而不是添加玩法系统。优先考虑让 GitHub Issue 预填内容更聚焦“前 60 秒哪里不清楚”，或在文档中明确下一轮反馈问题；不要新增第二反馈渠道或站内提交系统。

### What Not To Copy

- 不把早期反馈做成复杂问卷或强制弹窗。
- 不引入外部 analytics、录屏、用户识别或跨设备追踪。
- 不根据没有真实玩家证据的假设添加第二资源、prestige 或更复杂升级。

## 2026-05-06 - 购买升级后的低复杂度反馈

### Question

前 60 秒的首目标、里程碑、离线收益提示和动态目标文案基本稳定后，下一步应优先增强哪类低复杂度反馈？

### Sources / Observations

- GameAnalytics 的 idle game 指南强调：idle/clicker 游戏通常从简单目标开始，再逐步引入货币管理、可解锁内容和升级；这支持继续打磨第一升级循环，而不是立刻扩展系统。
- Kongregate 的 idle game math 文章把核心结构拆成 primary currency、generator、production rate 和 cost；当前游戏已经有这四项，下一步应让“花费货币获得 generator”的反馈更明确。
- Pichlmair 与 Johansen 的 game feel survey 将 moment-to-moment interaction 的反馈清晰度视为 game feel 的一部分；这支持给关键购买动作增加轻量确认，而不是增加新机制。

Sources:

- https://www.gameanalytics.com/blog/how-to-make-an-idle-game-adjust
- https://www.kongregate.com/en/pages/the-math-of-idle-games-part-i
- https://arxiv.org/abs/2011.09201

### General Principles

- 先强化已有循环的关键动作：点击、攒星尘、购买自动采集器、看到产出提升。
- 购买升级是前 60 秒内最重要的状态变化，应有明确但不打断的反馈。
- 反馈应轻量、短暂、可忽略，不引入弹窗、奖励系统或第二资源。
- 如果反馈会增加 UI 噪音，就应该优先砍掉或收敛，而不是继续叠加。

### Decision Impact

下一步候选应是购买自动采集器后的短暂确认文案，例如提示“自动采集器启动，每秒产出提升”。这比新增资源、奖励里程碑、prestige 或复杂动画更符合当前阶段。

### What Not To Copy

- 不复制广告、付费、软启动或商业化模式。
- 不引入多 generator 分类、prestige、倍率奖励或复杂经济公式。
- 不添加强制弹窗、任务系统或打断式教程。

## 2026-05-06 - Early Progress Feedback Before New Mechanics

### Question

After a playable idle MVP with a clear first goal, should the next iteration improve early progress feedback or add another mechanic?

### Sources / Observations

- GameAnalytics notes that idle games usually start with a simple objective, then introduce currency management, unlocks, and upgrades over time. It also emphasizes user feedback and retention-oriented UX.
- Kongregate’s idle game math article frames the genre around primary currency, generators, production rate, costs, and the balance between income and next purchase cost. Its early AdVenture Capitalist example highlights that early production can quickly make the next generator affordable.
- Incremental game genre references describe steady progression, frequent feedback, upgrades that automate income, and milestone systems as common direction-setting tools.

Sources:

- https://www.gameanalytics.com/blog/how-to-make-an-idle-game-adjust
- https://www.kongregate.com/en/pages/the-math-of-idle-games-part-i
- https://en.wikipedia.org/wiki/Incremental_game

### General Principles

- First, make the existing loop feel responsive: click, see number move, understand the next purchase, and see passive production matter.
- Delay new mechanics until the player has seen clear value from the first generator.
- Use visible progress and small milestones to create direction before adding resources, panels, or prestige-like systems.
- Treat research as product input only; it must become a constrained decision before implementation.

### Decision Impact

The next product decision should prioritize early progress feedback over new mechanics. A good next candidate is a minimal milestone or affordance that makes “progress toward the first and second auto collector” more visible without adding a new resource.

### What Not To Copy

- Do not copy monetization, ads, or rewarded video patterns.
- Do not add prestige, multiple generators, or layered currencies yet.
- Do not chase genre complexity before the first minute proves clear.

## Research Log Template

```md
## YYYY-MM-DD - Question

### Question

### Sources / Observations

### General Principles

### Decision Impact

### What Not To Copy
```

## 2026-05-07 - 当前是否需要首个视觉素材

### Question

Asset Workflow 已建立后，当前星尘工坊是否应立即用 `imagegen` 生成首个 raster 视觉素材？

### Sources / Observations

- `docs/ASSET_WORKFLOW.md` 要求：只有当素材能改善前 60 秒清晰度、成长反馈、回访体验或当前 roadmap 目标时，才允许进入实现。
- 当前 `src/` 下没有 `src/assets/`，游戏仍是纯 UI 原型。
- Issue #1 已处理且没有玩家新补充；当前没有新 issue 指向“看不懂自动采集器长什么样”或“缺少视觉目标”。
- 最新 self-playtest 记录显示：动作区已有采集、自动采集器和调校工具三个按钮，后续要优先避免继续扩张首屏控件。
- `docs/NORTH_STAR.md` 当前优先级仍是 first 60 seconds clarity、first upgrade、visible growth feedback 和 simple persistence。

### General Principles

- `imagegen` 是需要图片时必须评估的工具，不是每轮必须生成图片的义务。
- 视觉素材应解决一个已观察到的玩家理解问题；没有问题来源时，不应添加装饰图。
- 当前更高价值的素材候选不是背景或复杂世界观，而是未来若出现信号时的单一功能素材，例如自动采集器图标、升级状态 cutout 或 playtest 邀请主视觉。
- 如果素材会让首屏更拥挤，应该先考虑 CSS、文案收敛或不做。

### Decision Impact

当前不生成图片资产，不新增 `src/assets/`，也不改 UI。下一步继续等待真实反馈或新的 self-playtest gap；未来若出现“自动采集器概念不清楚”“调校工具难理解”或站外 playtest 需要主视觉，再按 Asset Workflow 记录用途、尺寸、风格和 `imagegen` 决策。

### What Not To Copy

- 不为了填空白生成背景图、插图或复杂工坊世界观。
- 不用图片替代应该清楚的按钮文案、进度反馈和数值反馈。
- 不生成大量升级图标、sprite set、角色、地图或 lore 资产。
- 不在没有决策来源时添加远程图片、热链素材或不明授权素材。

## Current Position

The game is playable and publicly previewable. Research now supports small first-60-second clarity decisions, not broad feature generation.
