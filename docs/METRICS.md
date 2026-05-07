# Metrics

## 当前指标

指标只保存在浏览器本地存储中。

- `stardust-workshop-feedback-events-v1`: 反馈链接点击事件队列。
- `stardust-workshop-metrics-v1`: 当前 session 开始/结束时间、session 时长、点击次数、升级购买次数、首次升级时间、有效存档加载次数、离线收益提示次数和最后一次离线收益数值。每次打开 App 都会重置为新的 session。
- `stardust-workshop-metrics-history-v1`: 最近 10 个 session 的本地汇总，只在 session 结束时写入，用于本机回看前 60 秒相关指标趋势。

## 本地查看方式

这些指标只存在于当前浏览器的 `localStorage`。operator 做 self-playtest 或本机复核时，可以在浏览器控制台读取：

```js
JSON.parse(localStorage.getItem("stardust-workshop-metrics-v1") ?? "null")
JSON.parse(localStorage.getItem("stardust-workshop-metrics-history-v1") ?? "[]")
JSON.parse(localStorage.getItem("stardust-workshop-feedback-events-v1") ?? "[]")
```

解释方式：

- 当前 session 用于查看本轮点击数、升级购买数、首次升级时间和是否看到离线收益提示。
- 最近 session history 用于本机回看趋势，只保留最近 10 次 session summary。
- 这些数据不能代表真实玩家整体行为；没有明确导出、上传或人工记录时，不要把本机 localStorage 当成真实玩家指标。

## 目标指标

- session_start
- session_end
- session_duration
- click_count
- first_upgrade_time
- upgrade_purchase_count
- save_loaded
- offline_reward_claimed
- feedback_clicked
- session_history

## 延后指标

- feedback_sent: 延后到反馈在 App 内提交，或 GitHub 提供可靠且隐私安全的确认路径后再评估。当前反馈链接会在新标签页打开 GitHub Issue Form，App 只能记录 `feedback_clicked`。

## 指标缺口

指标仍只保存在本地，不上传。历史 session 汇总只保留最近 10 条，且只包含 session 时间、时长、点击数、升级购买数、首次升级时间、有效存档加载次数和离线收益提示次数。存档加载指标只记录有效本地存档被加载，离线收益指标只记录本地返回提示被展示。

## 当前决策

公开预览阶段仍保持 telemetry local-only。只添加直接支持反馈入口、前 60 秒清晰度或回访评估的指标。除非另有治理决策，不添加上传、外部 analytics SDK、个人数据或跨设备追踪。

## 隐私边界

- 不记录个人数据。
- 不添加外部 analytics SDK。
- 不提供上传路径。
- 不做跨设备追踪。
