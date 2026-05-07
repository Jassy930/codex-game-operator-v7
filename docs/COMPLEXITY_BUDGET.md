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

## Rule

Every new mechanic must pass:

1. North Star fit
2. Current stage fit
3. Complexity budget
4. Decision authorization

进入 v0.2 不自动授权任何具体功能。每个新机制仍必须在 `docs/DECISION.md` 中说明它使用哪个版本预算，以及为什么没有破坏 v0.1 的前 60 秒回归护栏。

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
