# Governor State

## Selected Mode

FEEDBACK_INFRA

## Reason

当前没有开放 GitHub Issues。上一轮 RESEARCH 决策明确：下一步候选是补站外 playtest 邀请素材，不改游戏首屏，不新增反馈渠道或追踪。该素材属于反馈基础设施文档维护。

## Allowed Actions

- 更新 README 或反馈文档中的站外 playtest 邀请素材。
- 保留公开预览 URL 和单一 GitHub Issue Form 链接。
- 更新 `docs/FEEDBACK.md`、`docs/DECISION.md`、`docs/RELEASE_LOG.md`。
- 只允许文档变更。

## Forbidden Actions

- 不改游戏代码或首屏 UI。
- 不新增反馈渠道、analytics SDK、上传路径、个人数据或跨设备追踪。
- 不把 playtest 邀请伪装成真实玩家反馈。
- 不回复 issue。

## Exit Criteria

- README 或反馈文档包含可直接复用的 playtest 邀请素材。
- 邀请素材只指向公开预览和单一 GitHub Issue Form。
- `./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮只允许补站外 playtest 邀请素材，不允许新增游戏 UI 或第二反馈入口。

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
