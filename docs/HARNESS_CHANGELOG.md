# Harness Changelog

历史 harness changelog 已归档到 `docs/archive/2026-05-08-runtime-docs/HARNESS_CHANGELOG.md`。本文件只保留当前治理规则变化。

## 2026-05-08 - v0.6 Return Afterglow Budget

### Files Changed

- `docs/COMPLEXITY_BUDGET.md`
- `ops/governor-check.sh`
- `src/ops-scripts.test.ts`

### Change

新增 v0.6 `Return Afterglow Budget`，只允许满节点后的额外共鸣提供 capped 开局星尘助推，并由 `governor-check` 校验预算存在、余辉授权和 50 星尘上限。

### Why This Does Not Weaken Constraints

这只把 v0.5 暂存共鸣转成受限用途，仍禁止第三普通资源、任务系统、多生产线、新共鸣节点、节点等级树、额外面板和 telemetry。

## 2026-05-08 - Harness Engineering Scorecard

### Files Changed

- `docs/QUALITY_SCORE.md`
- `docs/HARNESS.md`
- `docs/ITERATION_POLICY.md`
- `docs/DOCUMENTATION_POLICY.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `ops/governor-check.sh`
- `src/ops-scripts.test.ts`

### Change

新增 harness engineering scorecard，把 agent readability、content depth、mechanical checks 和 garbage collection 变成每轮可读的质量信号。`governor-check` 会阻止缺少核心 scorecard section 的状态漂移。

### Why This Does Not Weaken Constraints

这只提高下一轮选题质量和治理可读性，不放宽 North Star、复杂度预算、issue routing、response budget、测试或部署要求。

## 2026-05-08 - Runtime Documentation Budget

### Files Changed

- `docs/DOCUMENTATION_POLICY.md`
- `docs/DECISION.md`
- `docs/GOVERNOR_STATE.md`
- `docs/SELF_PLAYTEST.md`
- `docs/RETROSPECTIVE.md`
- `docs/HARNESS_CHANGELOG.md`
- `docs/CONTENT_ARC.md`
- `docs/RESEARCH.md`
- `ops/governor-check.sh`
- `src/ops-scripts.test.ts`

### Failure Mode

运行态文档持续增长，operator 每轮需要读取过多历史细节；新增 line budget 检查后，仓库缺少配套 `docs/DOCUMENTATION_POLICY.md`，多个 runtime 文档超预算。

### Change

新增文档预算政策，把历史细节归档到 `docs/archive/2026-05-08-runtime-docs/`，并把运行态文档压缩为当前状态摘要、自动化仍需校验的 anchor 和下一步候选。`governor-check` 同时检查行数和文件大小，避免超长单行绕过预算。

### Why This Does Not Weaken Constraints

这只收紧文档可维护性，不改变 North Star、issue routing、response budget、complexity budget、review protocol、测试或部署要求。

## 2026-05-08 - Iteration Policy Hardening

新增 `docs/ITERATION_POLICY.md`，要求每轮记录 `Cycle Bet` 和 `Cycle Status`。`governor-check` 会阻止缺少 cycle bet、空 evidence/artifact 或非法 cycle status 的 governor state。

## 2026-05-08 - Meaningful Iteration Gate

每轮必须记录 `Iteration Track`、`Expected Content Advance`、`Evidence Source` 和 `Required Artifact`。允许轨道包括 game research、player feedback、content planning、content review、bugfix、visual polish、playable content 和 harness maintenance。

## Initial

- Created v7.2 clean-room four-layer harness.
- Added meta-governance, operating modes, self-playtest, signal routing, response budget, complexity budget and review protocol.
- Renamed ideas to idea parking lot to avoid backlog behavior.
