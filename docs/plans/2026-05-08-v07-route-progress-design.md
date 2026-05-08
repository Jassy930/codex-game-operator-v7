# v0.7 归航航线差距读回设计

## 背景

v0.7 `归航航线` 已把重复归航组织成 3 段长期目标，但当前读回只给出下一段门槛。玩家能知道规则，却还要自己计算离下一段差几次归航、差几点额外共鸣。

## 方案

在 `getReturnRouteReadback` 中继续只从现有 `GameState` 派生信息：

- 当前段仍由 `returnCount`、额外共鸣和已启动永久节点决定。
- 未贯通航线时，新增 `progressSummary`，显示距下一段还差多少次归航和多少点额外共鸣。
- 已贯通航线时，`progressSummary` 变为储备后续版本的提示。
- `共鸣矩阵` 和阶段目标复用这段读回，不新增面板、资源、存档字段或 telemetry。

## 取舍

选择动态差距读回，而不是降低门槛或新增节点。这样能增强 20 小时后目标感，但不改变数值节奏，也不把 v0.7 扩成任务系统或节点等级树。

## 验证

- `src/return-route.test.ts` 覆盖第一段、第二段和已贯通航线的差距读回。
- `src/App.test.tsx` 覆盖现有 `共鸣矩阵` 和阶段目标中的差距文案。
- 标准链路：`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh`、`git diff --check`。
