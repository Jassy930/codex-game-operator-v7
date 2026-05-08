# Complexity Budget

## Versioned Budgets

复杂度预算按版本推进。新版本可以提高上限，但必须保留旧版本作为回归护栏。

## v0.1 First Public Version Budget

- Primary resource: 1
- Secondary resources: 0
- Main actions: max 2
- Upgrade types: max 3
- Visible panels: max 4
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Save format versions: 1
- Feedback channels shown in UI: max 1 primary, 1 secondary

## v0.2 3-15 Minute Version Budget

目标：让 3-15 分钟有更明确的内容弧线，同时保持轻量 idle / incremental 体验。

- Primary resource: 1
- Secondary resources: 0
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 4
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- 3-15 minute content arc: allowed
- Stage milestone / workshop phase: allowed
- Delayed unlock copy: allowed
- Save format versions: max 2
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.2 仍然禁止：

- 第二资源
- prestige
- 任务系统
- 复杂地图
- 新增多面板管理界面
- 外部 analytics SDK 或上传 telemetry

## v0.3 Resonance Version Budget

目标：在首次回访后引入一个真实策略层，而不是只增加里程碑文案。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Resonance resource: allowed
- Resonance matrix panel: max 1
- Save format versions: max 2
- Local-only resonance metric fields: max 3
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.3 仍然禁止：

- prestige
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 外部 analytics SDK 或上传 telemetry

## v0.4 20-Hour Resonance Budget

目标：把 v0.3 的首个回访后策略层延长到约 20 小时目标，同时避免把游戏扩成任务系统、prestige 或多面板管理。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Resonance resource: allowed
- Resonance matrix panel: max 1
- Resonance milestones: max 2
- Unlockable resonance nodes: max 2 of the existing 3 nodes
- Save format versions: max 2
- Local-only resonance metric fields: max 3
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.4 仍然禁止：

- prestige
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 新资源
- 新共鸣节点
- 外部 analytics SDK 或上传 telemetry

## v0.5 Stardust Return Budget

目标：把 v0.4 的 20 小时目标骨架升级为可重复的 prestige 长线循环，让共鸣成为归航奖励资源。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Prestige loop: allowed as `星尘归航`
- Prestige reward resource: `共鸣`
- Resonance resource: allowed
- Resonance matrix panel: max 1
- Return count field: allowed
- Save format versions: max 3
- Local-only return metric fields: max 2
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.5 仍然禁止：

- 第三普通资源
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 第三共鸣门槛
- 新共鸣节点
- 节点等级树
- 外部 analytics SDK 或上传 telemetry

## v0.6 Return Afterglow Budget

目标：让满节点后的额外共鸣在重复归航中产生轻量价值，同时避免升级为节点等级树或任务系统。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Prestige loop: allowed as `星尘归航`
- Prestige reward resource: `共鸣`
- Parked resonance afterglow: allowed
- Afterglow starting dust bonus: max 50 星尘
- Resonance resource: allowed
- Resonance matrix panel: max 1
- Save format versions: max 3
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.6 仍然禁止：

- 第三普通资源
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 第三共鸣门槛
- 新共鸣节点
- 节点等级树
- 节点等级
- 外部 analytics SDK 或上传 telemetry

## v0.7 Return Route Budget

目标：把 20 小时后的重复归航组织成清楚的长期航线目标，而不是新增资源、节点等级树或任务系统。

- Primary resource: 1
- Secondary resources: max 1
- Main actions: max 2
- Upgrade types: max 4
- Visible panels: max 5
- First 60 seconds mechanics: max 3
- First 60 seconds text: under 300 Chinese characters or 180 English words
- Prestige loop: allowed as `星尘归航`
- Prestige reward resource: `共鸣`
- Parked resonance afterglow: allowed
- Afterglow starting dust bonus: max 50 星尘
- Return route plan: allowed
- Return route milestones: max 3
- Return route readback: reuse existing `共鸣矩阵` and stage target
- Save format versions: max 3
- Feedback channels shown in UI: max 1 primary, 1 secondary

v0.7 仍然禁止：

- 第三普通资源
- 任务系统
- 复杂地图
- 多生产线
- 多个新面板
- 第三共鸣门槛
- 新共鸣节点
- 节点等级树
- 节点等级
- 外部 analytics SDK 或上传 telemetry

## Rule

Every new mechanic must pass:

1. North Star fit
2. Current stage fit
3. Complexity budget
4. Decision authorization

进入 v0.2、v0.3、v0.4、v0.5、v0.6 或 v0.7 不自动授权任何具体功能。每个新机制仍必须在 `docs/DECISION.md` 中说明它使用哪个版本预算，以及为什么没有破坏 v0.1 的前 60 秒回归护栏。

## If Over Budget

Enter `SIMPLIFY`.

Allowed:
- remove
- merge
- clarify
- hide advanced information
- improve onboarding

Forbidden:
- add systems
- add panels
- add resources
