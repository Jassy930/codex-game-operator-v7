# v0.7 归航航线贯通储备设计

`归航航线` 已经能解释未贯通时的当前段、本段进度、量化收益、具名差距、行动提示、节奏预判、航线图和下一段预览。复核发现：三段贯通后读回会变成“后续版本储备”，但没有告诉玩家当前已经储备了多少归航历史和额外共鸣。

## 设计

继续保持纯派生读回，只调整贯通态文案：

- `routeProgress` 在三段贯通后显示累计归航次数和当前额外共鸣，例如：`本段进度：航线 3/3 已贯通 · 长期储备：6 次归航 / 5 点额外共鸣`
- `routeSummary` 和 `currentPayoff` 同步读出同一组储备数量。
- 阶段目标仍保持短提示，不新增面板、不新增存档字段、不新增资源或 telemetry。

## 验证

- `src/return-route.test.ts` 覆盖贯通态储备数量读回。
- `src/App.test.tsx` 覆盖 SSR 中的贯通态储备数量。
- 标准验证继续运行 `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 和 `git diff --check`。
