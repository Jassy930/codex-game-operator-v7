# Governor State

## Selected Mode

RESEARCH

## Reason

当前没有开放 GitHub Issues。上一轮 SELF_PLAYTEST 未发现足够具体的新增改动 gap；继续添加首屏提示会增加 UI 噪音。产品问题转为：公开预览存在但没有真实反馈时，如何在不新增 analytics SDK、上传路径、强制弹窗或第二反馈渠道的前提下，获得更有用的前 60 秒反馈。

## Allowed Actions

- 围绕一个问题做 web research。
- 更新 `docs/RESEARCH.md`。
- 在 `docs/DECISION.md` 记录一个研究支撑的决策。
- 只允许文档变更。

## Forbidden Actions

- 不直接实现功能或改游戏代码。
- 不复制外部内容。
- 不新增反馈渠道、analytics SDK、上传路径、个人数据或跨设备追踪。
- 不把研究结论当成真实玩家反馈。
- 不回复 issue。

## Exit Criteria

- `docs/RESEARCH.md` 记录研究问题、来源/观察、原则、决策影响和不可复制内容。
- `docs/DECISION.md` 记录一个研究支撑的决策。
- `./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮禁止新增玩法或反馈渠道，只允许研究如何提高现有反馈路径的信号质量。

## Last Updated

2026-05-06: RELEASE_INFRA 收尾完成；workflow run `25430225912` 成功，公开预览 HTTP 200，工作区检查无未提交变更。切换到 SELF_PLAYTEST。

2026-05-06: SELF_PLAYTEST 只读检查完成；未发现足够具体的新增改动 gap。记录 no-change 决策，避免为了迭代而增加首屏提示或玩法系统。

2026-05-06: 切换到 RESEARCH；研究问题限定为提高现有 GitHub Issue 反馈路径的信号质量，不新增跟踪、上传、弹窗或渠道。

2026-05-06: RESEARCH 完成；记录单一 GitHub Issue Form 作为下一步反馈入口候选，继续禁止新增 analytics、上传路径、个人数据、强制弹窗或第二渠道。
