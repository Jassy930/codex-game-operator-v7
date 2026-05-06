# Governor State

## Selected Mode

SELF_PLAYTEST

## Reason

当前没有开放 GitHub Issues。上一轮 RELEASE_INFRA 已完成：GitHub Pages workflow run `25430225912` 成功，公开预览 `https://jassy930.github.io/codex-game-operator-v7/` 返回 HTTP 200。游戏可公开预览但仍缺少真实玩家反馈，因此下一轮回到 self-playtest，继续检查前 10/30/60 秒体验。

## Allowed Actions

- 评估前 10/30/60 秒体验。
- 更新 `docs/SELF_PLAYTEST.md`。
- 记录一个具体 gap 到 `docs/DECISION.md`。
- 只允许小范围 UI/文案清晰度改进。

## Forbidden Actions

- 不新增资源、prestige、奖励系统或新面板。
- 不把 self-playtest 伪装成真实玩家反馈。
- 不回复 issue。
- 不新增外部 analytics、上传路径或个人数据收集。

## Exit Criteria

- 一个 self-playtest gap 已记录，或明确记录本轮未发现足够具体的 gap。
- 若改代码：`bun test`、`bun run test`、`bun run build`、`./ops/governor-check.sh` 通过。
- 若只改文档：`./ops/governor-check.sh` 通过。
- 周期结束后记录工作区状态。

## Drift Status

未发现玩法漂移。下一轮只允许围绕现有点击、星尘、自动采集器、保存/离线收益和反馈入口做清晰度检查。

## Last Updated

2026-05-06: RELEASE_INFRA 收尾完成；workflow run `25430225912` 成功，公开预览 HTTP 200，工作区检查无未提交变更。切换到 SELF_PLAYTEST。

2026-05-06: SELF_PLAYTEST 只读检查完成；未发现足够具体的新增改动 gap。记录 no-change 决策，避免为了迭代而增加首屏提示或玩法系统。
