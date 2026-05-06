# Governor State

## Selected Mode

SIMPLIFY

## Reason

当前没有开放 GitHub Issues。Roadmap M3 依赖 `docs/SIGNAL_ROUTING.md` 和 `docs/RESPONSE_BUDGET.md`，但这两份核心反馈处理文档仍以英文为主，不符合当前中文文档约束。本轮继续 SIMPLIFY，只做反馈处理规则文档清晰化。

## Allowed Actions

- 中文化 `docs/SIGNAL_ROUTING.md`。
- 中文化 `docs/RESPONSE_BUDGET.md`。
- 保留现有路由、预算和禁止项语义。
- 更新 `docs/DECISION.md`、`docs/RELEASE_LOG.md`。
- 只允许文档变更。

## Forbidden Actions

- 不改游戏代码。
- 不新增或删除反馈渠道。
- 不伪造反馈、聚类或指标。
- 不改变 issue routing、response budget 或 North Star 约束。
- 不回复 issue。

## Exit Criteria

- `docs/SIGNAL_ROUTING.md` 使用中文说明，且路由顺序不变。
- `docs/RESPONSE_BUDGET.md` 使用中文说明，且回复预算不变。
- `./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮只做反馈处理规则文档收敛，不改变游戏、反馈入口或回复预算。

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
