# v0.7 归航航线细节渐进展开设计

`归航航线` 已经能解释当前段、本段进度、量化收益、差距、行动提示、节奏预判、航线图、下一段预览和贯通态 `深空信标储备`。复核发现：这些信息连续铺在 `共鸣矩阵` 里时，玩家虽然能找到答案，但会先读到一整串正文，违背“游戏在变深，但不是变吵”。

## 决策

保留 `ReturnRouteReadback` 的现有字段和语义，不新增资源、存档字段、节点或面板。UI 只调整同一个 `归航航线` 块内的信息层级：

- 首层显示 `routeSummary`、`currentPayoff` 和 `actionHint`。
- `description`、`routeProgress`、`nextRequirement`、`progressSummary`、`cadenceForecast`、`routeMap` 和 `nextPreview` 收进同块内的 `航线细节`。
- 阶段目标和归航完成事件保持当前短读回，不改变归航奖励、余辉公式或航线门槛。

## 验证

- `src/App.test.tsx` 覆盖首层样式和 `航线细节` 结构。
- 标准验证链路仍为 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh`、`git diff --check`。
