# Iteration Policy

本文档定义每轮迭代如何选题、推进和收口。它补充 `docs/OPERATING_MODES.md`，避免 operator 在同一阶段停滞，或把持续运营误解成随意小改。

## 每轮必须记录

`docs/GOVERNOR_STATE.md` 必须包含：

- `Selected Mode`: 当前 operating mode。
- `Iteration Track`: 当前内容推进轨道。
- `Cycle Bet`: 本轮或本组小切片赌什么、包括什么、不包括什么。
- `Expected Content Advance`: 本轮具体推进什么。
- `Evidence Source`: 本轮信号来源。
- `Required Artifact`: 本轮必须产出的文档、代码、测试、截图、反馈整理或 release 记录。
- `Cycle Status`: `active` 或 `completed`。

## Cycle Bet

`Cycle Bet` 是本轮不漂移的锚点。它应该写清：

- 目标：这组迭代希望完成什么玩家价值或治理价值。
- appetite：最多允许几个小切片，或限定在一次短周期内。
- 包括：本轮可以做的内容。
- 不包括：本轮不碰的内容。
- 完成定义：什么证据说明这轮可以收口。

示例：

```md
## Cycle Bet

目标：完成 v0.5 星尘归航第一版可玩闭环。
Appetite：最多 3 个小切片。
包括：归航条件、固定 1 共鸣奖励、本轮重置、现有矩阵按钮和反馈。
不包括：节点等级树、星图巡航、第三资源、任务系统。
完成定义：玩家达到门槛后能归航并进入下一轮，测试和构建通过。
```

## Track 必需产出

- `GAME_RESEARCH`: 更新 `docs/RESEARCH.md`，并产出一个 decision candidate。
- `PLAYER_FEEDBACK`: 更新 feedback snapshot、issue ledger、cluster、decision 或明确延后/拒绝理由。
- `CONTENT_PLANNING`: 更新 `docs/CONTENT_ARC.md`、`docs/ROADMAP.md` 或 `docs/plans/`。
- `CONTENT_REVIEW`: 产出 findings、整理结果、stage review 或有证据的 no-change。
- `BUGFIX`: 记录复现步骤或失败测试，并完成回归验证。
- `VISUAL_POLISH`: 产出素材决策、资产更新、截图/布局验证或视觉一致性记录。
- `PLAYABLE_CONTENT`: 产出玩家可感知变化、测试、decision 和 release 记录。
- `HARNESS_MAINTENANCE`: 产出更强检查、更清晰规则或流程修复，并记录 harness changelog。

## Harness Engineering Scorecard

`docs/QUALITY_SCORE.md` 是迭代选题的二级信号。没有更强的用户指令、真实玩家反馈或明显 bug 时，下一轮应优先选择分数最低的维度，避免持续停在同类小切片。

必须评分的维度：

- `Agent Readability`: 新 operator 能否从仓库地图快速找到当前事实。
- `Content Depth`: 游戏内容是否继续推进，而不是只做治理和文档。
- `Mechanical Checks`: 规则是否已经进入测试、脚本或 CI，而不是只停在文字。
- `Garbage Collection`: 是否主动清理过时文档、重复规则、漂移模式和低价值记录。

## 每轮收口

每轮结束时必须：

1. 将 `Cycle Status` 更新为 `completed`。
2. 在 `docs/GOVERNOR_STATE.md` 的 `Last Updated` 记录本轮验证结果。
3. 写出下一轮候选 mode/track，除非用户明确暂停。
4. 按 `docs/DOCUMENTATION_POLICY.md` 检查运行态文档；如果接近预算，先归档和压缩，再继续追加记录。
5. 如果本轮改变了 harness、文档结构、验证链路或内容方向，同步更新 `docs/QUALITY_SCORE.md`。
6. 如果连续多轮没有玩家可感知变化，优先选择 `CONTENT_REVIEW`、`GAME_RESEARCH`、`PLAYER_FEEDBACK` 或 `PLAYABLE_CONTENT`，不要继续只做文档或 harness。

## Mix Review

每 3-5 次迭代做一次轻量 mix review，检查最近迭代分布：

- 可玩内容推进是否足够。
- bugfix / review / visual polish 是否长期缺席。
- harness 维护是否挤占游戏内容。
- no-change 是否重复出现在同一时间窗。

如果发现偏斜，下一轮 `Cycle Bet` 应主动纠偏。
