# Signal Routing

## 原则

GitHub Issues 是信号，不是任务。

默认行为：

```text
不直接实现。
不直接回复。
不做承诺。
先分类。
```

## 流程

```text
Issue
→ 指纹
→ Ledger
→ 聚类
→ North Star 检查
→ 当前阶段检查
→ 决策
→ 可能形成任务
→ 可能回复
```

## 分类

### CRITICAL

允许立即行动。

例子：

- 游戏无法启动
- 构建或部署损坏
- 存档损坏
- 安全或隐私问题

### ACTIONABLE

如果符合当前阶段和 North Star，可以转化为任务。

例子：

- 第一个升级太慢
- 下一个目标不清楚
- UI 噪音太多
- 存档不可用
- 反馈按钮不可用

### ARCHIVE

以后可能有用，但现在不做。

例子：

- prestige 系统
- 复杂技能树
- 多世界
- 高级自动化

处理：

- 记录到 `IDEA_PARKING_LOT.md` 或 `FEEDBACK_CLUSTERS.md`
- 现在不实现

### IGNORE / DECLINE

不符合 North Star。

例子：

- PvP
- 多人经济
- 无关平台请求
- 要求重写产品方向

处理：

- 不实现
- 可选择一次简短拒绝
- 不重复讨论

## 主线保护

任何 issue 都不能直接修改 `ROADMAP.md`。

它必须先出现在：

1. `ISSUE_LEDGER.md`
2. `FEEDBACK_CLUSTERS.md`
3. `DECISION.md`
