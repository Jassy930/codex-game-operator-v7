# Retrospective

## Trigger

Update this file when either is true:

- 10 commits have occurred since the last retrospective.
- 5 release-log entries have been added since the last retrospective.
- drift is detected.
- a harness change is proposed.

## Latest Retrospective

## 2026-05-06 Retrospective

### Window

从 clean-room harness 到首个公开预览与一次 SELF_PLAYTEST 清晰度修复。

### What Changed

- 创建 React + TypeScript + Vite + Vitest + Bun 项目。
- 实现“星尘工坊”最小 idle loop：点击采集、自动采集器、被动产出、版本化本地存档。
- 增加 GitHub Issues 反馈入口与本地 `feedback_clicked` 队列。
- 配置并验证 GitHub Pages 公开预览。
- 通过一次 self-playtest 改进首个升级成本文案。

### What Improved

- Roadmap M1 可玩本地 MVP 已完成。
- 反馈入口已存在，且没有伪造反馈。
- 公开预览 URL 可访问。
- CI 运行 Bun 原生测试、Vitest 和 Vite build。

### What Got Worse

- 发布基础设施调试产生了多个小 commit。
- GitHub Actions 仍提示部分 action 目标 Node.js 20；当前通过 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` 运行，但后续应关注 action 版本。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无。
- feature bloat: 无，仍是一资源、一升级类型。
- lack of tests: 无，核心循环、反馈入口、首屏渲染均有测试。
- unclear North Star: 无，仍优先前 60 秒清晰度。
- harness friction: Pages 启用和 lockfile registry 暴露了 CI 环境差异，但未削弱治理约束。

### Harness Lessons

- lockfile 不能保留本地镜像 registry；CI 需要显式使用公开 npm registry。
- Pages 首次启用可能需要仓库级 API 权限，不能只依赖 workflow token。

### Next Operating Mode

若没有真实反馈，继续 `SELF_PLAYTEST`；若出现真实 GitHub Issues，进入 `OPERATE` 并先更新 `docs/ISSUE_LEDGER.md`。

## 2026-05-06 Retrospective 2

### Window

从首个公开预览后的 self-playtest 文案改进，到本地 metrics infrastructure 成型。

### What Changed

- 增加首目标文案，直接说明攒星尘购买第一个自动采集器。
- 增加 UI-only 早期里程碑：`0 / 2` 自动采集器。
- 增加本地指标模式 `METRICS_INFRA`。
- 增加本地 session、点击、升级、首升时间、session end 和 session duration 指标。
- 修正指标 session 语义，确保每次 app session 重置。

### What Improved

- 第一目标更明确，早期进度反馈更强。
- 后续 self-playtest 可以查看本地指标，而不是只靠主观观察。
- metrics 模式边界更清楚：本地、无上传、无个人数据、无 SDK。

### What Got Worse

- 文档和 release-log 更新频率较高，产生多个小提交。
- GitHub Actions 仍提示部分 action 目标 Node.js 20；当前通过 Node 24 强制运行成功。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无。
- feature bloat: 无，未新增资源、奖励里程碑或系统。
- lack of tests: 无，metrics 已有本地测试。
- unclear North Star: 无，仍围绕前 60 秒清晰度。
- harness friction: metrics gap 已通过新增 `METRICS_INFRA` 模式解决。

### Harness Lessons

- 如果 prompt 提到某类输入源，operating modes 也需要对应的合法执行路径。
- 本地指标必须明确 session 边界，否则会污染后续 self-playtest 判断。

### Next Operating Mode

若没有真实反馈，继续 `SELF_PLAYTEST`，用本地指标辅助判断下一处前 60 秒缺口；若出现 issue，进入 `OPERATE`。

## 2026-05-06 Retrospective 3

### Window

从本地指标基础设施成型，到离线收益提示、动态里程碑、动态目标文案和下一步购买反馈研究。

### What Changed

- 动态里程碑替代固定 `0 / 2`，避免前 60 秒中途变成过期目标。
- 返回游戏时显示离线获得的星尘，并记录本地 offline reward 指标。
- 购买第一台自动采集器后，目标提示会继续指向下一台自动采集器。
- 新增研究结论：下一步优先增强购买自动采集器后的轻量确认反馈。

### What Improved

- 前 60 秒的目标指引更少过期信息。
- 返回体验更符合 North Star 中“离开后进度仍在继续”的要求。
- 下一步候选仍限定在 UI-only 反馈，不扩展资源、奖励或经济系统。

### What Got Worse

- release-log 和治理文档继续快速增长，需要后续保持精简。
- GitHub Actions 仍出现 Node.js 20 deprecation annotation；当前通过 Node 24 强制运行成功。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，未新增资源、奖励系统、prestige 或新面板。
- lack of tests: 无，动态目标文案已有渲染回归测试。
- unclear North Star: 无，仍围绕前 60 秒清晰度和稳定增长反馈。
- harness friction: 无，`METRICS_INFRA` 与 `RESEARCH` 边界清楚。

### Harness Lessons

- 每轮 self-playtest 修复后，如果下一步产品方向不清楚，应进入 `RESEARCH`，避免脑补功能。
- release-log 达到 5 条时要及时 retrospective，否则治理状态会失真。

### Next Operating Mode

若没有真实反馈，下一轮可进入 `SELF_PLAYTEST` 验证购买动作反馈缺口；若出现 issue，进入 `OPERATE` 并先更新 `docs/ISSUE_LEDGER.md`。

## 2026-05-06 Retrospective 4

### Window

从购买反馈实现，到本地 `save_loaded` 指标、反馈指标边界、公开预览 metrics policy 和反馈文档收口。

### What Changed

- 购买自动采集器后显示短暂确认反馈。
- 有效本地存档加载时记录 local-only `saveLoadedCount`。
- 将 `feedback_sent` 明确为 deferred metric，当前只记录 `feedback_clicked`。
- 修正公开预览阶段的 metrics policy：仍保持 local-only。
- 收口 `FEEDBACK.md` 和 `ISSUE_LEDGER.md`，让反馈文档更贴近实际 GitHub Issue 流程。

### What Improved

- 前 60 秒购买动作反馈更清楚。
- 回访和离线收益相关的本地判断更有数据基础。
- 指标边界更清楚，避免公开预览后误加上传或外部 SDK。
- 反馈路由文档更符合中文文档约束。

### What Got Worse

- runtime 文档继续增长，后续需要保持 `AGENTS.md` 和高层文档只做导航。
- 仍没有真实玩家反馈，产品判断主要来自 self-playtest、metrics gap 和 research。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，未新增资源、奖励系统或新面板。
- lack of tests: 无，购买反馈和 save-loaded 指标均有测试。
- unclear North Star: 无，仍围绕清晰目标、稳定增长和回访体验。
- harness friction: 无；本轮是文档漂移收口，没有削弱治理约束。

### Harness Lessons

- 公开预览不等于可以自动上传 telemetry；metrics policy 必须明确 consent 和 governance 边界。
- 外部 GitHub Issue 流程只能可靠记录点击，不能伪造提交完成。
- 反馈文档需要描述实际链接行为，否则后续 agent 容易误判反馈入口能力。

### Next Operating Mode

若没有真实反馈，下一轮优先 `SELF_PLAYTEST` 检查购买反馈和整体 UI 是否开始接近复杂度上限；若出现 issue，进入 `OPERATE`。

## 2026-05-06 Retrospective 5

### Window

从无真实反馈后的研究，到反馈正文聚焦和核心运行文档中文化。

### What Changed

- 研究确认：没有真实反馈时，优先降低反馈成本，而不是新增玩法系统。
- GitHub Issue 反馈正文改为聚焦“前 60 秒哪里不清楚”。
- 中文化 `docs/METRICS.md`、`docs/SELF_PLAYTEST.md` 和 `docs/ROADMAP.md` 的说明文字。
- 保留 metric key、storage key 和 M0-M5 roadmap 结构。

### What Improved

- 反馈入口更容易产生可路由的前 60 秒清晰度信号。
- 关键运行文档更符合中文文档约束。
- 文档收口没有改变代码行为、玩法、指标结构或反馈渠道。

### What Got Worse

- 文档维护占用了多个小提交。
- 仍没有真实玩家反馈，下一步不应继续无限中文化低优先级文档而忽视 playable experience。

### Drift Check

- repeated issue replies: 无。
- issue-driven thrashing: 无，没有开放 issue。
- feature bloat: 无，本窗口只有一次反馈正文改动和文档收口。
- lack of tests: 无，反馈正文改动有测试，文档变更通过治理检查。
- unclear North Star: 无，仍围绕前 60 秒清晰度和真实反馈获取。
- harness friction: 无，文档语言收口未削弱治理约束。

### Harness Lessons

- 文档中文化应优先处理高频运行文档，避免把所有文档翻译变成无边界任务。
- 反馈正文需要聚焦具体问题，才能把点击转化为有用 signal。

### Next Operating Mode

若仍没有真实反馈，下一轮优先 `SELF_PLAYTEST` 重新评估当前 playable experience，而不是继续只做文档语言收口。

## Template

```md
## YYYY-MM-DD Retrospective

### Window

### What Changed

### What Improved

### What Got Worse

### Drift Check

- repeated issue replies:
- issue-driven thrashing:
- feature bloat:
- lack of tests:
- unclear North Star:
- harness friction:

### Harness Lessons

### Next Operating Mode
```
