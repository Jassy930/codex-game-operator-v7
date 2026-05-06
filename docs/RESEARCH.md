# Research

## Current Research

2026-05-06 - 无真实反馈后的下一步。

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

## Current Position

The game is playable and publicly previewable. Research now supports small first-60-second clarity decisions, not broad feature generation.
