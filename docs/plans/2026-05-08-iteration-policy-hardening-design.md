# Iteration Policy Hardening Design

## 背景

Meaningful Iteration Gate 已经要求每轮声明 `Iteration Track`、`Expected Content Advance`、`Evidence Source` 和 `Required Artifact`。下一步需要避免两个新风险：

- 只声明 track，但没有阶段赌注，导致多个小切片仍然分散。
- 一轮完成后没有明确收口和下一步倾向，导致 operator 停在已经完成的机制或同一阶段里反复打转。

## 设计目标

在现有机制上增加三个轻量要求：

1. 每轮必须有 `Cycle Bet`，说明当前一组迭代赌什么、包含什么、不包含什么。
2. 每轮必须有 `Cycle Status`，说明当前 cycle 是 `active` 还是 `completed`。
3. 每轮结束必须更新机制和下一步倾向，避免停在已完成状态。

## 策略

新增 `docs/ITERATION_POLICY.md`，作为 `docs/OPERATING_MODES.md` 的下游细则。该文档定义：

- Cycle Bet 格式。
- Cycle Status 语义。
- Track 必需产出。
- 每 3-5 轮做一次 mix review 的要求。
- 完成后必须记录 next candidate track。

## 自动化

扩展 `ops/governor-check.sh`：

- `docs/ITERATION_POLICY.md` 成为必需文档。
- `docs/GOVERNOR_STATE.md` 必须包含 `Cycle Bet` 和 `Cycle Status`。
- `Cycle Bet` 不能为空或占位。
- `Cycle Status` 必须是 `active` 或 `completed`。
- `Evidence Source` 和 `Required Artifact` 也必须非空。

这仍然是轻量校验，不尝试从 Markdown 中推断所有语义。更复杂的 per-track artifact 校验留给后续小步推进。
