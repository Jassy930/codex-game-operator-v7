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
