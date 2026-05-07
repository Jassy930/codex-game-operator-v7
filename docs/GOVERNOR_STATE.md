# Governor State

## Selected Mode

META_IMPROVE

## Reason

用户指出当前游戏生成机制没有提示 operator 在需要图片时使用 `imagegen`。本轮进入 META_IMPROVE，新增资产工作流文档并挂入 review/governor 检查，确保未来视觉素材需求会显式评估 `imagegen`。

## Allowed Actions

- 新增 `docs/ASSET_WORKFLOW.md`。
- 将资产工作流挂入 `docs/HARNESS.md` 和 `docs/REVIEW_PROTOCOL.md`。
- 将 `docs/ASSET_WORKFLOW.md` 纳入 `ops/governor-check.sh` 必需文档检查。
- 更新 `docs/DECISION.md`、`docs/HARNESS_CHANGELOG.md` 和 `docs/RELEASE_LOG.md`。

## Forbidden Actions

- 不生成实际图片资产。
- 不改变游戏玩法、经济、UI 或反馈渠道。
- 不新增上传 telemetry、analytics SDK 或个人数据收集。
- 不强制每轮使用 imagegen；只要求在需要图片时显式评估。
- 不削弱 issue routing、response budget、复杂度预算或 review protocol。

## Exit Criteria

- `docs/ASSET_WORKFLOW.md` 清楚说明何时使用 imagegen、何时不使用、如何记录理由。
- Review protocol 能检查资产需求和 imagegen 决策。
- `./ops/governor-check.sh` 通过。
- 周期结束后工作区状态已记录。

## Drift Status

未发现玩法漂移。本轮只补资产工作流文档和检查入口，不生成图片、不改变游戏、不新增视觉复杂度。

## Last Updated

2026-05-06: RELEASE_INFRA 收尾完成；workflow run `25430225912` 成功，公开预览 HTTP 200，工作区检查无未提交变更。切换到 SELF_PLAYTEST。

2026-05-06: SELF_PLAYTEST 只读检查完成；未发现足够具体的新增改动 gap。记录 no-change 决策，避免为了迭代而增加首屏提示或玩法系统。

2026-05-06: 切换到 RESEARCH；研究问题限定为提高现有 GitHub Issue 反馈路径的信号质量，不新增跟踪、上传、弹窗或渠道。

2026-05-06: RESEARCH 完成；记录单一 GitHub Issue Form 作为下一步反馈入口候选，继续禁止新增 analytics、上传路径、个人数据、强制弹窗或第二渠道。

2026-05-06: 切换到 FEEDBACK_INFRA；实施单一 GitHub Issue Form，保持反馈入口仍为同一 GitHub Issues 渠道。

2026-05-06: FEEDBACK_INFRA 实施完成；反馈 URL 指向 `feedback.yml` issue form，继续只记录 local-only `feedback_clicked`。

2026-05-06: 切换到 SELF_PLAYTEST；只读检查 issue form 入口是否影响前 60 秒核心循环。

2026-05-06: SELF_PLAYTEST 只读检查完成；issue form 入口未破坏前 60 秒节奏，本轮不继续改游戏代码。

2026-05-06: 切换到 RESEARCH；研究如何在不打扰首屏、不加追踪和不新增渠道的前提下邀请外部 playtest。

2026-05-06: RESEARCH 完成；决策为下一步候选补站外 playtest 邀请素材，反馈仍回到单一 GitHub Issue Form。

2026-05-06: 切换到 FEEDBACK_INFRA；补 README/反馈文档中的站外 playtest 邀请素材。

2026-05-06: FEEDBACK_INFRA 实施完成；README 已包含站外 playtest 邀请素材，只指向公开预览和单一 GitHub Issue Form。

2026-05-06: 切换到 SIMPLIFY；中文化反馈聚类文档，提升 M3 反馈处理准备度。

2026-05-06: SIMPLIFY 完成；`docs/FEEDBACK_CLUSTERS.md` 已中文化，仍明确当前没有真实反馈聚类。

2026-05-06: 继续 SIMPLIFY；中文化 signal routing 和 response budget，保持规则语义不变。

2026-05-06: SIMPLIFY 完成；`docs/SIGNAL_ROUTING.md` 和 `docs/RESPONSE_BUDGET.md` 已中文化，路由和回复预算语义保持不变。

2026-05-06: 继续 SIMPLIFY；中文化 `docs/FEEDBACK.md` 剩余小节名和字段标签，并补 retrospective。

2026-05-06: SIMPLIFY 完成；`docs/FEEDBACK.md` 剩余小节名和字段标签已中文化，Retrospective 7 已记录。

2026-05-06: 切换到 SELF_PLAYTEST；用当前经济函数重新检查前 60 秒节奏。

2026-05-06: SELF_PLAYTEST 完成；当前经济模拟未发现数值改动 gap，第 60 秒下一台购买进度约 98%。

2026-05-06: 切换到 METRICS_INFRA；补最近 session 汇总，仍保持 local-only 和无个人数据。

2026-05-06: METRICS_INFRA 实施完成；新增 `stardust-workshop-metrics-history-v1`，只保留最近 10 个本地 session 汇总。

2026-05-07: 切换到 OPERATE；Issue #1 提供第一条真实玩家反馈，问题集中在前 60 秒采集动机和即时兴奋点不足。

2026-05-07: 切换到 META_IMPROVE；根据代码评审收紧反馈闭环自动化检查和 issue 证据采集。

2026-05-07: OPERATE 最小改动已通过本地验证；新增采集动机文案和短暂采集反馈，等待提交、推送和 issue 回复。

2026-05-07: commit `861ba0b` 已推送；Pages workflow `25472615361` 成功，公开预览 HTTP 200。Issue #1 ledger 标记为 released，下一步只做一次有证据回复。

2026-05-07: 顺带收紧 issue 证据自动化检查；governor check 现在验证 issue ledger 的聚类、决策锚点和 commit/release 证据。

2026-05-07: 切换回 OPERATE；release evidence 已齐备，准备按 response budget 对 Issue #1 回复一次。

2026-05-07: 已按 response budget 回复 Issue #1 一次：`https://github.com/Jassy930/codex-game-operator-v7/issues/1#issuecomment-4393783244`。后续等待新信息，不重复回复。

2026-05-07: 切换到 META_IMPROVE；修正 `collect-feedback` 真实输出缺少 issue 原始正文的问题。

2026-05-07: 切换到 SELF_PLAYTEST；复核 Issue #1 改动后的前 60 秒体验，不重复处理同一 issue。

2026-05-07: SELF_PLAYTEST 复核完成；采集动机缺口已有最小修复，本轮 no-change，避免继续向首屏叠加提示。

2026-05-07: 切换到 RESEARCH；研究核心循环清晰后的下一步低复杂度玩法内容。

2026-05-07: 切换到 SELF_PLAYTEST 实施切片；按 TDD 实现 `调校工具` 候选。

2026-05-07: Soft Automation 周期已发布并收口；commit `7a15e5d` 已推送，Pages workflow `25474199644` 成功，公开预览 HTTP 200。Issue #1 无新玩家补充，本轮不回复 issue，不继续加玩法。

2026-05-07: 切换到 RESEARCH；调校工具发布后的下一步问题是是否等待真实反馈、做 no-change self-playtest，或研究一个不增加资源/面板的更小内容切片。

2026-05-07: 切换到 SELF_PLAYTEST；执行调校工具发布后的 no-change 复核，优先判断是否应等待真实反馈而不是继续新增内容。

2026-05-07: SELF_PLAYTEST 复核完成；无新 issue 或玩家补充，60 秒模拟显示自动采集器仍在第 10、23、39 秒购入，调校工具第 55 秒购入。本轮记录 no-change，不新增第三种升级或调整经济。

2026-05-07: 切换到 META_IMPROVE；新增 Asset Workflow，要求未来图片素材需求显式评估 `imagegen`。
