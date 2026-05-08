# Research

历史研究记录已归档到 `docs/archive/2026-05-08-runtime-docs/RESEARCH.md`。本文件只保留当前可执行研究结论。

## Current Research Posture

当前不需要新增外部研究才能继续：用户方向已经明确为“前期积极扩展玩法内容，目标先做到 20 小时”，且 v0.5 已选择 `星尘归航` 作为长线主机制。

## Applied Findings

- Idle / incremental game 的中后段需要从 active clicking 过渡到 planning 和 return behavior。
- Milestone / achievement-like structures 适合提供方向，但不能替代真实策略层。
- Prestige / reset loop 适合在进度变慢后提供长期循环，但必须清楚说明重置、保留和奖励。
- 对本项目而言，`共鸣` 作为归航奖励资源比新增第三资源更符合当前复杂度预算。

## Current Decision Candidate

下一轮不优先研究新系统，而是复核已实现的归航循环：

- 归航后玩家是否先消费可用共鸣。
- 两个永久节点已满后，重复归航是否仍有明确目标。
- 如果第二轮仍显空，优先调整既有读回或既有节点效果，不直接新增节点等级树或星图巡航。

## Research Guardrails

- 不复制竞品内容、数值表或文案。
- 不把研究发现直接当 task；实现仍必须进入 `docs/DECISION.md`。
- 不用研究绕过 complexity budget。
- 外部 telemetry、个人数据和跨设备追踪继续禁止。

## Next Research Trigger

只有当 self-playtest 无法解释归航第二轮问题，或真实玩家反馈指出当前长线循环不可理解时，才进入 `GAME_RESEARCH`。
