# Meaningful Iteration Gate Design

## 背景

当前 harness 已经能限制复杂度、避免 issue 牵引和防止同一时间窗无限 no-change，但仍允许 operator 从任意小缺口中挑一个很小的改动。用户希望每次迭代都有明确内容推进，而不是“随便找个地方改一点点”。

## 设计目标

每轮 autonomous cycle 必须先声明本轮属于哪一种内容推进轨道，并写清证据来源、预期产出和退出标准。小切片仍然允许，但必须服务于一个明确轨道。

## 迭代轨道

- `GAME_RESEARCH`: 游戏调研，来源可以是网络调研、竞品分析或类型研究，产出为 `docs/RESEARCH.md` 和一个决策候选。
- `PLAYER_FEEDBACK`: 玩家反馈处理，来源为 GitHub Issues 或反馈快照，产出为 ledger、cluster、decision、release 或明确延后/拒绝理由。
- `CONTENT_PLANNING`: 下一阶段内容规划，产出为内容弧线、计划文档或 roadmap 更新。
- `CONTENT_REVIEW`: 当前游戏内容 review 和整理，产出为 findings、清理项、文档收口或 no-change/stage review。
- `BUGFIX`: 当前内容 bug 修复，产出为失败测试、修复和回归验证。
- `VISUAL_POLISH`: 图像表现和视觉整理，产出为素材决策、资产更新或布局/视觉验证。
- `PLAYABLE_CONTENT`: 可玩内容推进，产出为玩家能感知的新机制、目标、反馈、数值或交互。
- `HARNESS_MAINTENANCE`: 治理系统维护，产出为更强检查、更清晰规则或流程修复。

## 规则

每轮必须在 `docs/GOVERNOR_STATE.md` 写入：

- `Iteration Track`
- `Expected Content Advance`
- `Evidence Source`
- `Required Artifact`

`Expected Content Advance` 不能是 `none`、`no-change`、`minor copy` 这类空泛描述。若确实需要 no-change，必须归入 `CONTENT_REVIEW`，并说明它如何完成阶段复核或触发下一阶段选择。

## 验证

`ops/governor-check.sh` 应校验当前 governor state 包含上述字段，并且轨道属于允许列表。该检查不强制每轮新增玩法，但会阻止没有主题的随意小改。
