# Governor State

## Selected Mode

RESEARCH

## Reason

当前没有开放 GitHub Issues。上一轮 SELF_PLAYTEST 未发现 issue form 入口破坏前 60 秒节奏，也不建议继续在首屏解释反馈表单。产品问题转为：如何在不打断游戏首屏、不新增追踪、不新增第二反馈渠道的前提下，邀请外部 playtest 并获得真实反馈。

## Allowed Actions

- 围绕一个问题做 web research。
- 更新 `docs/RESEARCH.md`。
- 在 `docs/DECISION.md` 记录一个研究支撑的决策。
- 只允许文档变更。

## Forbidden Actions

- 不直接实现游戏代码或 UI 改动。
- 不新增反馈渠道、analytics SDK、上传路径、个人数据或跨设备追踪。
- 不把研究结论伪装成真实玩家反馈。
- 不回复 issue。

## Exit Criteria

- `docs/RESEARCH.md` 记录研究问题、来源/观察、原则、决策影响和不可复制内容。
- `docs/DECISION.md` 记录一个研究支撑的决策。
- `./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮禁止新增玩法或反馈入口，只研究外部 playtest 邀请方式。

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
