# Retrospective

历史 retrospective 已归档到 `docs/archive/2026-05-08-runtime-docs/RETROSPECTIVE.md`。本文件只保留最近运营教训和下一步约束。

## Latest Review

2026-05-08 harness engineering scorecard。

- 观察：博文强调不要把仓库做成巨型手册，而要做成 agent-readable 的记录系统，并把主观品味转成机械规则。
- 应用：新增 `docs/QUALITY_SCORE.md`，把 agent readability、content depth、mechanical checks、garbage collection 变成每轮可见信号。
- 后续：如果没有更强玩家信号，下一轮应优先补最低分的 `Content Depth`，不要继续停留在 harness 维护。

2026-05-08 runtime 文档预算恢复。

- 观察：`DECISION`、`GOVERNOR_STATE`、`SELF_PLAYTEST`、`RETROSPECTIVE`、`HARNESS_CHANGELOG`、`CONTENT_ARC`、`RESEARCH` 都累积了过多历史细节。
- 影响：运行态文档难以快速读取，`governor-check` 新增 line budget 后无法通过。
- 决策：历史细节进入 `docs/archive/2026-05-08-runtime-docs/`，运行态文档只保留当前状态、仍需自动化引用的 anchor 和下一步候选。
- 后续：每次迭代结束后只追加高信号摘要；如果需要保存长过程，先写入 `docs/archive/` 或 `docs/plans/`。

## Product Learning

- 满节点后继续归航不能只显示资源数字；即使暂不扩新机制，也需要说明额外共鸣会保留到后续版本。
- 长线门槛如果由同一次行动同时推进，读回必须说明这种耦合关系；否则玩家会把归航次数和额外共鸣误读成两条任务。
- v0.5 `星尘归航` 是当前 20 小时目标的主线；星图巡航和节点等级树都必须延后。
- 第一版归航奖励固定为 `1 共鸣`，优先验证第二轮读回和消费目标，而不是增加奖励公式。
- 视觉 polish 可以提升早期操作节奏，但不能替代可玩内容推进。

## Harness Learning

- `Cycle Bet` 和 `Cycle Status` 有效防止停在已完成阶段。
- 文档预算必须配套归档策略，否则检查会把所有后续提交挡住。
- `docs/DECISION.md` 必须保留 issue ledger 仍引用的 decision anchors。

## Next Retrospective Trigger

每 10 个 commit 或每 5 条 release-log 高信号条目做一次轻量 retrospective。下一次重点检查：v0.6 复杂度提升是否有足够内容收益，或是否应先做文档 Garbage Collection。
