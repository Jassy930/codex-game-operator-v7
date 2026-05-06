# Metrics

## 当前指标

指标只保存在浏览器本地存储中。

- `stardust-workshop-feedback-events-v1`: 反馈链接点击事件队列。
- `stardust-workshop-metrics-v1`: 当前 session 开始/结束时间、session 时长、点击次数、升级购买次数、首次升级时间、有效存档加载次数、离线收益提示次数和最后一次离线收益数值。每次打开 App 都会重置为新的 session。

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

## 延后指标

- feedback_sent: 延后到反馈在 App 内提交，或 GitHub 提供可靠且隐私安全的确认路径后再评估。当前反馈链接会在新标签页打开 GitHub Issues，App 只能记录 `feedback_clicked`。

## 指标缺口

指标仍只保存在本地，不上传。当前不保留历史 session 汇总。存档加载指标只记录有效本地存档被加载，离线收益指标只记录本地返回提示被展示。

## 当前决策

公开预览阶段仍保持 telemetry local-only。只添加直接支持反馈入口、前 60 秒清晰度或回访评估的指标。除非另有治理决策，不添加上传、外部 analytics SDK、个人数据或跨设备追踪。

## 隐私边界

- 不记录个人数据。
- 不添加外部 analytics SDK。
- 不提供上传路径。
- 不做跨设备追踪。
