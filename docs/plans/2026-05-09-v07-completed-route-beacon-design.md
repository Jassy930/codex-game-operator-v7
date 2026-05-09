# v0.7 归航航线贯通信标储备设计

## 背景

`归航航线` 已经补齐本段进度、航标化阶段目标、量化收益、具名差距、行动提示、节奏预判、航线图、下一段预览和贯通态储备数量。复核发现：三段贯通后多处直接写“后续版本”，这能说明开发计划，但对 20 小时后的玩家像占位语，削弱完成后的游戏内目标感。

## 设计

继续保持纯派生读回，只调整三段贯通态文案：

- 将长期储备命名为 `深空信标储备`。
- `stageGoal`、`routeProgress`、`routeSummary`、`currentPayoff`、`nextRequirement`、`progressSummary`、`actionHint`、`cadenceForecast`、`routeMap` 和 `nextPreview` 使用一致的游戏内说法。
- 储备数量仍只从现有 `returnCount` 和额外 `resonance` 派生。

不新增资源、节点、节点等级、任务系统、面板、存档字段、视觉资产或 telemetry；不修改 `星尘归航` 奖励、`归航余辉` 公式或 50 星尘上限。

## 测试

- `src/return-route.test.ts` 覆盖贯通态信标储备字段。
- `src/App.test.tsx` 覆盖 SSR 中不再出现贯通态“后续版本”占位语。
- 完整验证继续使用 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。
