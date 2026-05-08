# Release Log

历史发布流水已归档到 `docs/archive/2026-05-08-runtime-docs/RELEASE_LOG.md`。本文件只保留当前版本窗口和最近高信号变化。

## Unreleased

- `归航余辉` 节奏读回：现有 `共鸣矩阵` 现在会把余辉起步星尘换算成可立即重建的自动采集器数量，并用结构化读回块显示“起步星尘”和“可重建”；50 星尘上限对应前 3 台自动采集器。
- v0.6 `归航余辉`：两个永久节点已满后，继续归航获得的额外共鸣会让新一轮以少量星尘起步，最高 50 星尘，并在现有 `共鸣矩阵` 和阶段目标中读回。
- 两个永久节点已满后，如果继续归航并带着额外共鸣回到新一轮，现有 `共鸣矩阵` 会说明额外共鸣暂存到后续版本，阶段目标也提示“额外共鸣已暂存”。
- 归航后第 2 轮开局现在会在已有可用共鸣、永久节点或归航历史时继续显示现有 `共鸣矩阵`，并优先提示用共鸣启动永久节点。
- 新增 runtime 文档预算政策并压缩当前运行态文档；历史细节归档到 `docs/archive/2026-05-08-runtime-docs/`，保留 Issue #1/#2 decision anchors 和当前 v0.5 归航方向。
- `governor-check` 对运行态文档同时检查行数和文件大小，避免超长单行继续制造文档膨胀。
- 新增 harness engineering scorecard：用 `docs/QUALITY_SCORE.md` 记录 agent readability、content depth、mechanical checks 和 garbage collection，并由 `governor-check` 校验结构。

## Current Playable State

- v0.5 `星尘归航` 第一版已实现：达到 25 台自动采集器和 15 次调校后，现有 `共鸣矩阵` 显示 `星尘归航 +1 共鸣`。
- 归航重启本轮工坊，奖励固定 `1 共鸣`，保留共鸣、已启动永久节点、已领取共鸣里程碑和归航次数。
- 归航后有可用共鸣时，新一轮开局继续显示现有 `共鸣矩阵`，阶段目标优先提示用共鸣启动永久节点；两个永久节点已满后，额外共鸣会点亮 capped `归航余辉`，并读回可重建的自动采集器数量。
- `共鸣矩阵` 仍保持最多 2 个永久节点，不新增第三共鸣门槛、新节点、节点等级树、任务系统、多生产线或额外面板。

## Recent Released Anchors

- `80c2e24 chore: harden iteration policy`: 新增 `Cycle Bet`、`Cycle Status` 和每轮收口规则。
- `59ef884 feat: add stardust return loop`: 完成 v0.5 `星尘归航` 第一版。
- `986a06d feat: add second resonance milestone`: 将 v0.4 目标拉向 20 小时，复用现有 `共鸣矩阵` 增加第二共鸣门槛和第二个现有节点选择。
- `d2d2f94`: Issue #2 post-60s engagement 目标提示修复已发布。
- `861ba0b`: Issue #1 first-60s collect motivation 修复已发布。

## Verification Notes

- 本地标准验证链路：`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh`、`git diff --check`。
- 远端 `gh run list` / Pages DNS 曾多次受网络影响；不能把远端不可达当成本地完成的前置条件，但需要在最终结果中说明。
