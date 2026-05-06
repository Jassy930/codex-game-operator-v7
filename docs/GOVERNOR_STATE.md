# Governor State

## Selected Mode

FEEDBACK_INFRA

## Reason

当前没有开放 GitHub Issues。上一轮 RESEARCH 决策明确：下一步反馈改进候选是单一 GitHub Issue Form，用同一个 GitHub Issues 渠道提高前 60 秒反馈的结构化程度，而不是新增 analytics SDK、上传路径、强制弹窗或第二反馈渠道。

## Allowed Actions

- 添加单一 GitHub Issue Form。
- 更新游戏内反馈链接，使其指向该 form。
- 更新反馈、指标、决策和发布文档。
- 添加/更新测试，验证反馈链接仍为单一 GitHub issue 创建入口。

## Forbidden Actions

- 不新增反馈渠道、analytics SDK、上传路径、个人数据或跨设备追踪。
- 不记录 `feedback_sent` 或猜测 issue 是否提交。
- 不要求玩家填写联系方式。
- 不改玩法、资源、经济数值或 UI 主循环。
- 不回复 issue。

## Exit Criteria

- GitHub issue form 存在，且字段聚焦前 60 秒阻塞点。
- App 反馈链接指向该 issue form。
- `bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮只允许改进现有反馈路径，不允许新增玩法或第二反馈渠道。

## Last Updated

2026-05-06: RELEASE_INFRA 收尾完成；workflow run `25430225912` 成功，公开预览 HTTP 200，工作区检查无未提交变更。切换到 SELF_PLAYTEST。

2026-05-06: SELF_PLAYTEST 只读检查完成；未发现足够具体的新增改动 gap。记录 no-change 决策，避免为了迭代而增加首屏提示或玩法系统。

2026-05-06: 切换到 RESEARCH；研究问题限定为提高现有 GitHub Issue 反馈路径的信号质量，不新增跟踪、上传、弹窗或渠道。

2026-05-06: RESEARCH 完成；记录单一 GitHub Issue Form 作为下一步反馈入口候选，继续禁止新增 analytics、上传路径、个人数据、强制弹窗或第二渠道。

2026-05-06: 切换到 FEEDBACK_INFRA；实施单一 GitHub Issue Form，保持反馈入口仍为同一 GitHub Issues 渠道。

2026-05-06: FEEDBACK_INFRA 实施完成；反馈 URL 指向 `feedback.yml` issue form，继续只记录 local-only `feedback_clicked`。
