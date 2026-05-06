# Research

## Current Research

2026-05-06 - 购买升级后的低复杂度反馈。

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
