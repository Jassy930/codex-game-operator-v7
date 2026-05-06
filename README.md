# Codex Game Operator v7 - Goal Harness

从零开始的新项目骨架，用于测试：

- Codex `/goal` 长期目标驱动
- Harness Engineering 风格仓库自约束
- 真玩家反馈接入
- GitHub Issues 作为 signal，而不是 task
- 防止单个 issue 无限回复/无限修改
- 防止功能堆叠和目标漂移
- 自主 push / deploy / issue 回复，但受 Governor 约束

## 快速开始

```bash
git clone git@github.com:Jassy930/codex-game-operator-v7.git
cd codex-game-operator-v7
chmod +x scripts/*.sh ops/*.sh

git add .
git commit -m "bootstrap v7 goal harness"
```

## 第一次启动 Codex

进入 Codex CLI 后，执行：

```text
/goal <复制 prompts/goal.md 的完整内容>
```

之后使用：

```text
/goal resume
```

## 推荐运行

```bash
./scripts/harness-cycle.sh
```

如要长时间自动驱动：

```bash
SLEEP_SECONDS=120 ./scripts/goal-harness-loop.sh
```
