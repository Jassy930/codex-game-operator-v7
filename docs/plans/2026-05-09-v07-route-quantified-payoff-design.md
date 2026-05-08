# v0.7 归航航线量化收益设计

## 背景

`归航航线` 已经在现有 `共鸣矩阵` 内显示当前段、当前收益、差距、行动提示、节奏预判、航线图和首行摘要。上一轮摘要加入了当前段价值短语，但“起步星尘已生效”和“重建时间继续压缩”仍偏抽象。

这个缺口会让玩家知道航线有价值，却不一定知道当前额外共鸣已经值多少进度。

## 本轮选择

继续保持纯派生读回，只把 `routeSummary` 和 `currentPayoff` 的收益短语量化：

- 使用现有 `calculateReturnAfterglowDust` 和 `calculateAffordableAutoCollectors` 换算当前额外共鸣。
- 未贯通时，摘要直接显示“下轮起步可重建 N 台自动采集器”。
- `currentPayoff` 同步读回“可立即重建 N 台自动采集器”。
- UI 仍复用现有 `共鸣矩阵` 的 `归航航线` 块，不新增面板、不新增存档字段。

## 明确不做

- 不新增资源、节点、节点等级、任务系统、多生产线、额外面板、存档字段、视觉资产或 telemetry。
- 不修改 `星尘归航` 奖励。
- 不修改 `归航余辉` 公式或 50 星尘上限。
- 不改变 v0.7 最多 3 段航线的复杂度边界。

## 验证

- `src/return-route.test.ts` 覆盖 1 台和 3 台自动采集器的收益换算。
- `src/App.test.tsx` 覆盖矩阵 SSR 读回。
- 完整运行 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh`、`git diff --check`。
