# Codex Game Operator v7.2 Clean Room

这是一个重新开项目用的 Codex `/goal` + Harness 项目骨架。

v7.2 的目标不是让 Codex 无限写代码，而是让 Codex 成为一个能持续自我约束、自我审查、自我改进的“游戏主理人”。

## 设计目标

- Codex 自己跟随项目进展选择下一步。
- 不依赖外部 shell loop 调度。
- `ops/*.sh` 只是工具箱，由 Codex 自己决定何时运行。
- Issue 是 signal，不是 task。
- 没有 issue 时，Codex 通过 roadmap gap、self-playtest、metrics gap、research 来获取输入。
- Codex 可以改进 harness，但不能为了方便自己削弱约束。
- 减少文档职责重叠，按四层组织。

## 四层结构

```text
Layer 1 Constitutional
  AGENTS.md
  prompts/goal.md
  docs/NORTH_STAR.md
  docs/HARNESS.md

Layer 2 Governance
  docs/OPERATING_MODES.md
  docs/GOVERNOR_STATE.md
  docs/SIGNAL_ROUTING.md
  docs/RESPONSE_BUDGET.md
  docs/COMPLEXITY_BUDGET.md
  docs/REVIEW_PROTOCOL.md

Layer 3 Runtime
  docs/DECISION.md
  docs/ROADMAP.md
  docs/RELEASE_LOG.md
  docs/FEEDBACK.md
  docs/FEEDBACK_CLUSTERS.md
  docs/ISSUE_LEDGER.md
  docs/METRICS.md
  docs/SELF_PLAYTEST.md
  docs/IDEA_PARKING_LOT.md

Layer 4 Learning / Meta
  docs/RESEARCH.md
  docs/RESEARCH_POLICY.md
  docs/RETROSPECTIVE.md
  docs/META_GOVERNANCE.md
  docs/HARNESS_CHANGELOG.md
```

## 快速开始

```bash
git clone git@github.com:Jassy930/codex-game-operator-v7.git
cd codex-game-operator-v7
chmod +x ops/*.sh

git add .
git commit -m "bootstrap v7.2 clean-room goal harness"
```

## 第一次启动 Codex

在 Codex CLI 中执行：

```text
/goal <复制 prompts/goal.md 的完整内容>
```

之后让 Codex 自主推进：

```text
/goal resume
```

## 可选工具

这些脚本不是调度器，只是 Codex 可主动调用的工具：

```bash
./ops/collect-feedback.sh
./ops/governor-check.sh
./ops/autopush.sh
./ops/deploy.sh
./ops/create-pages-workflow.sh
./ops/snapshot.sh
```

## 重要原则

```text
Goal drives direction.
Harness provides operating rules.
Governor prevents drift.
Issues are signals, not tasks.
Meta-governance allows harness improvement without weakening constraints.
```
