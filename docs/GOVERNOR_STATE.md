# Governor State

## Selected Mode

SELF_PLAYTEST

## Reason

当前没有开放 GitHub Issues。上一轮 Retrospective 7 明确：下一轮不应继续低优先级文档语言收口。游戏已公开可玩且缺少真实反馈，因此回到 SELF_PLAYTEST，用当前经济函数重新检查前 60 秒节奏和 “one more upgrade is within reach” 是否成立。

## Allowed Actions

- 评估前 10/30/60 秒体验。
- 使用现有游戏逻辑做本地模拟。
- 更新 `docs/SELF_PLAYTEST.md`。
- 如发现具体 gap，在 `docs/DECISION.md` 记录小范围决策。

## Forbidden Actions

- 不新增玩法、资源、奖励、面板或第二反馈渠道。
- 不把 self-playtest 伪装成真实玩家反馈。
- 不新增 analytics SDK、上传路径、个人数据或跨设备追踪。
- 不继续做低优先级文档语言收口。
- 不回复 issue。

## Exit Criteria

- 一个具体 self-playtest gap 已记录，或明确记录本轮未发现足够具体的 gap。
- 若改代码：`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 通过。
- 若只改文档：`./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮只检查现有核心循环节奏，不扩展系统。

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
