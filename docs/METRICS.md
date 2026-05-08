# Metrics

## 当前指标

指标只保存在浏览器本地存储中。

- `stardust-workshop-feedback-events-v1`: 反馈链接点击事件队列。
- `stardust-workshop-metrics-v1`: 当前 session 开始/结束时间、session 时长、点击次数、升级购买次数、首次升级时间、有效存档加载次数、离线收益提示次数、最后一次离线收益数值、共鸣获得次数、共鸣节点解锁次数和首次共鸣时间。每次打开 App 都会重置为新的 session。
- `stardust-workshop-metrics-history-v1`: 最近 10 个 session 的本地汇总，只在 session 结束时写入，用于本机回看前 60 秒相关指标趋势。

## 本地查看方式

这些指标只存在于当前浏览器的 `localStorage`。operator 做 self-playtest 或本机复核时，可以在浏览器控制台读取：

```js
window.stardustWorkshopMetricsSnapshot()
JSON.parse(localStorage.getItem("stardust-workshop-metrics-v1") ?? "null")
JSON.parse(localStorage.getItem("stardust-workshop-metrics-history-v1") ?? "[]")
JSON.parse(localStorage.getItem("stardust-workshop-feedback-events-v1") ?? "[]")
```

解释方式：

- `window.stardustWorkshopMetricsSnapshot()` 是首选读回入口；它一次性返回当前 session、活跃 session 已持续时长、最近 session history、对应 storage key 和 `feedback_clicked` 计数，便于把 self-playtest 证据写入文档。
- `activeSessionDurationMs` 是快照派生值，不写入 localStorage。页面仍打开、`current.sessionDurationMs` 还没有随 `pagehide` 写入时，用它判断本机 self-playtest 当前已经持续多久。
- 当前 session 用于查看本轮点击数、升级购买数、首次升级时间、是否看到离线收益提示、是否获得共鸣和是否解锁共鸣节点。
- `offline_reward_claimed` 只表示玩家看到了本地离线收益提示；低于 `0.1` 星尘的离线收益不会展示，也不会计入该指标，避免出现或记录“离线获得 0 星尘”。
- `resonance_earned` 和 `resonance_node_unlocked` 只记录本机 session 中共鸣系统是否被触达，不上传、不跨设备，也不记录玩家身份。
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
- resonance_earned
- resonance_node_unlocked
- first_resonance_time
- feedback_clicked
- session_history
- local_metrics_snapshot
- active_session_duration_readback

## 延后指标

- feedback_sent: 延后到反馈在 App 内提交，或 GitHub 提供可靠且隐私安全的确认路径后再评估。当前反馈链接会在新标签页打开 GitHub Issue Form，App 只能记录 `feedback_clicked`。

## 指标缺口

指标仍只保存在本地，不上传。历史 session 汇总只保留最近 10 条，且只包含 session 时间、时长、点击数、升级购买数、首次升级时间、有效存档加载次数、离线收益提示次数、共鸣获得次数、共鸣节点解锁次数和首次共鸣时间。存档加载指标只记录有效本地存档被加载，离线收益指标只记录达到展示阈值并实际展示的本地返回提示。

`local_metrics_snapshot` 不新增采集字段，只是把已有 current metrics、history、活跃 session 派生时长和 feedback click 计数打包为一次本地读回。它只能在当前浏览器上下文中读取，不能代表真实玩家整体行为，也不会上传。

## 当前决策

公开预览阶段仍保持 telemetry local-only。只添加直接支持反馈入口、前 60 秒清晰度、回访评估或 v0.3 共鸣系统触达判断的指标。除非另有治理决策，不添加上传、外部 analytics SDK、个人数据或跨设备追踪。

## 隐私边界

- 不记录个人数据。
- 不添加外部 analytics SDK。
- 不提供上传路径。
- 不做跨设备追踪。
