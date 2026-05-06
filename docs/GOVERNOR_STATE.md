# Governor State

## Selected Mode

SELF_PLAYTEST

## Reason

当前没有开放 GitHub Issues。上一轮 FEEDBACK_INFRA 已完成并发布：反馈入口已迁移到单一 GitHub Issue Form，Pages workflow 成功，公开预览可访问。游戏仍缺少真实反馈，因此回到 SELF_PLAYTEST，只检查新反馈入口是否影响前 10/30/60 秒节奏。

## Allowed Actions

- 评估前 10/30/60 秒体验。
- 检查反馈入口是否可见但不打断核心循环。
- 更新 `docs/SELF_PLAYTEST.md`。
- 如发现具体 gap，在 `docs/DECISION.md` 记录一个小范围决策。

## Forbidden Actions

- 不新增玩法、资源、奖励、面板或第二反馈渠道。
- 不把 self-playtest 伪装成真实玩家反馈。
- 不新增 analytics SDK、上传路径、个人数据或跨设备追踪。
- 不回复 issue。

## Exit Criteria

- 一个具体 self-playtest gap 已记录，或明确记录本轮未发现足够具体的 gap。
- 若改代码：`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 通过。
- 若只改文档：`./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。本轮只允许评估现有反馈入口对首屏和前 60 秒节奏的影响。

## Last Updated

2026-05-06: RELEASE_INFRA 收尾完成；workflow run `25430225912` 成功，公开预览 HTTP 200，工作区检查无未提交变更。切换到 SELF_PLAYTEST。

2026-05-06: SELF_PLAYTEST 只读检查完成；未发现足够具体的新增改动 gap。记录 no-change 决策，避免为了迭代而增加首屏提示或玩法系统。

2026-05-06: 切换到 RESEARCH；研究问题限定为提高现有 GitHub Issue 反馈路径的信号质量，不新增跟踪、上传、弹窗或渠道。

2026-05-06: RESEARCH 完成；记录单一 GitHub Issue Form 作为下一步反馈入口候选，继续禁止新增 analytics、上传路径、个人数据、强制弹窗或第二渠道。

2026-05-06: 切换到 FEEDBACK_INFRA；实施单一 GitHub Issue Form，保持反馈入口仍为同一 GitHub Issues 渠道。

2026-05-06: FEEDBACK_INFRA 实施完成；反馈 URL 指向 `feedback.yml` issue form，继续只记录 local-only `feedback_clicked`。

2026-05-06: 切换到 SELF_PLAYTEST；只读检查 issue form 入口是否影响前 60 秒核心循环。

2026-05-06: SELF_PLAYTEST 只读检查完成；issue form 入口未破坏前 60 秒节奏，本轮不继续改游戏代码。
