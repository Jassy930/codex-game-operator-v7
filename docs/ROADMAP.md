# Roadmap

Roadmap 只记录里程碑层级方向，不是任务清单。

## 当前状态

- M0 治理框架：已完成并持续维护。
- M1 本地 MVP：已完成，游戏可点击、购买、自动产出并保存。
- M2 公开预览：已完成，GitHub Pages 已发布并持续通过 workflow 验证。
- M3 反馈处理：已完成基础闭环，Issue #1 已路由、发布修复并回复一次；后续不重复回复，等待新信息。
- M4 持续运营：进行中，当前进入 v0.3 / 共鸣系统设计；前 60 秒作为回归护栏保留。
- M5 可持续演化：进行中，harness 已通过 meta-governance 增加反馈闭环检查和 Asset Workflow。

## 下一道闸门

当前进入 v0.3 / 共鸣系统版本，但不要因为版本切换就一次性新增 prestige、任务系统、多生产线或多个新面板。下一步只能来自：

- 新 issue 或 Issue #1 的玩家补充。
- 新 self-playtest gap，且能追溯到 3-15 分钟内容弧线、成长反馈、回访体验或前 60 秒回归风险。
- local-only metrics 暴露的可解释问题。
- research-backed 决策，且通过 `docs/COMPLEXITY_BUDGET.md` 和 `docs/DECISION.md`。
- meta-governance 发现的可验证 harness 缺口。

## 当前阶段闸门：v0.2 / 3-15 分钟参与度

进入更长体验前，operator 应优先检查：

- 第 1 分钟后玩家是否仍知道下一个目标。
- 第 3-15 分钟内是否持续出现可理解的升级或回访目标。
- 调校工具是否让“数量 vs 效率”的选择更清晰，而不是让下一台自动采集器显得遥远。
- 离线收益和本地 session history 是否足以支持回访判断。
- 是否可以通过阶段里程碑、工坊阶段或延后解锁文案形成内容弧线，而不是新增资源或多面板。

允许的下一步仍必须是小切片：阶段里程碑、工坊阶段、延后解锁文案、现有升级的轻量反馈、metrics readback 或 no-change 决策。禁止把版本切换直接解释为第二资源、prestige、任务系统或新面板授权。

## 阶段推进节奏

不要在同一阶段停留太久。

- 同一时间窗连续 2 轮 no-change 后，必须做 stage review。
- stage review 只能得出三类结论：扩大时间窗、定义内容弧线、或明确等待真实反馈。
- 如果扩大时间窗，下一轮检查必须写清新的目标范围，例如 `15-60 分钟` 或 `首次回访`。
- 如果定义内容弧线，先写文档，不直接实现系统。
- 如果等待真实反馈，不继续产出重复 no-change 文档；转向反馈获取、metrics readback 或暂停新增玩法。

当前 v0.2 阶段已有 `docs/CONTENT_ARC.md` 覆盖 0-60 分钟和首次回访目标。后续实现必须从该内容弧线、真实反馈、self-playtest gap 或 local-only metrics 出发。

最近阶段切换：用户明确要求更丰富玩法后，v0.3 已设计为 `共鸣系统`。下一步应按计划实现第二资源 `共鸣`、一个紧凑 `共鸣矩阵`、v2 存档迁移和 local-only 指标；prestige、任务系统、多生产线和多个新面板继续禁止。

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
