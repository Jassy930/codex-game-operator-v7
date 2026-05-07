# Roadmap

Roadmap 只记录里程碑层级方向，不是任务清单。

## 当前状态

- M0 治理框架：已完成并持续维护。
- M1 本地 MVP：已完成，游戏可点击、购买、自动产出并保存。
- M2 公开预览：已完成，GitHub Pages 已发布并持续通过 workflow 验证。
- M3 反馈处理：已完成基础闭环，Issue #1 已路由、发布修复并回复一次；后续不重复回复，等待新信息。
- M4 持续运营：进行中，v0.3 / 共鸣系统第一版已实现；首次共鸣可领取、选择前、选择后、节点启动后和回访线圈生效后的目标/状态文案已收敛，前 60 秒作为回归护栏保留。
- M5 可持续演化：进行中，harness 已通过 meta-governance 增加反馈闭环检查和 Asset Workflow。

## 下一道闸门

当前进入 v0.3 / 共鸣系统版本，但不要因为版本切换就一次性新增 prestige、任务系统、多生产线或多个新面板。首次节点选择前后的基础说明已经收敛，下一步只能来自：

- 新 issue 或 Issue #1 的玩家补充。
- 新 self-playtest gap，且能追溯到 3-15 分钟内容弧线、成长反馈、回访体验或前 60 秒回归风险。
- local-only metrics 暴露的可解释问题。
- research-backed 决策，且通过 `docs/COMPLEXITY_BUDGET.md` 和 `docs/DECISION.md`。
- meta-governance 发现的可验证 harness 缺口。

## 当前阶段闸门：v0.3 / 回访后策略层

进入下一轮玩法扩展前，operator 应优先检查：

- 前 60 秒是否仍不被 `共鸣矩阵` 干扰。
- `星尘引擎室` 后玩家是否能理解共鸣门槛：20 台自动采集器和 12 次调校。
- 首次领取共鸣后，三选一永久节点是否形成清楚选择，且已选节点是否解释下一步价值。
- local-only 共鸣指标是否能说明本机 self-playtest 是否触达共鸣。
- 是否存在真实反馈或 self-playtest gap 支撑下一步，而不是直接追加 prestige 或任务系统。

允许的下一步仍必须是小切片：共鸣门槛文案、已选节点价值提示、单个节点数值调整、local-only metrics readback、self-playtest 复核或 no-change 决策。禁止把 v0.3 直接扩成 prestige、任务系统、多生产线或多个新面板。

## 阶段推进节奏

不要在同一阶段停留太久。

- 同一时间窗连续 2 轮 no-change 后，必须做 stage review。
- stage review 只能得出三类结论：扩大时间窗、定义内容弧线、或明确等待真实反馈。
- 如果扩大时间窗，下一轮检查必须写清新的目标范围，例如 `15-60 分钟` 或 `首次回访`。
- 如果定义内容弧线，先写文档，不直接实现系统。
- 如果等待真实反馈，不继续产出重复 no-change 文档；转向反馈获取、metrics readback 或暂停新增玩法。

当前 `docs/CONTENT_ARC.md` 已覆盖 0-60 分钟、首次回访和 v0.3 回访后策略层。后续实现必须从该内容弧线、真实反馈、self-playtest gap 或 local-only metrics 出发。

最近阶段切换：用户明确要求更丰富玩法后，v0.3 已实现为 `共鸣系统` 第一版；随后 self-playtest 已收敛首个共鸣可领取、首次节点选择前、选择后、首个已选节点后的目标文案，以及 `回访线圈` 在可见离线收益状态下的节点价值归因。下一步应优先读取 local-only 共鸣指标、复核 `调校刻印` 的价值感或等待真实反馈，而不是直接进入 prestige、任务系统、多生产线或多个新面板。

## M0: 治理框架就绪

- v7.2 文档存在。
- goal prompt 存在。
- 治理文档存在。
- ops 工具存在。

## M1: 可玩的本地 MVP

- React + TypeScript + Vite + Vitest
- 点击获得资源。
- 自动产出。
- 升级。
- 存档/读档。

## M2: 公开预览

- GitHub Pages or Vercel
- release log。
- 基础反馈入口。

## M3: 反馈处理

- issue ledger
- feedback clusters。
- response budget。
- 不重复回复 issue。

## M4: 被持续运营的游戏

- 基于反馈簇更新。
- 使用指标或人工反馈。
- 定期 retrospective。

## M5: 可持续演化

- 只有核心循环足够清晰后，才考虑更丰富的系统。
- harness 只能通过 meta-governance 安全演化。
