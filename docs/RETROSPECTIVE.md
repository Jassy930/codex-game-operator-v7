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
