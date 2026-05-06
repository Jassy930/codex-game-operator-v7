# Metrics

## Current Metrics

Local-only metrics are stored in browser storage.

- `stardust-workshop-feedback-events-v1`: feedback-click event queue.
- `stardust-workshop-metrics-v1`: current session start/end time, session duration, click count, upgrade purchase count, first upgrade time, valid save load count, offline reward shown count, and last offline reward amount. This resets when the app opens a new session.

## Desired Metrics

- session_start
- session_end
- session_duration
- click_count
- first_upgrade_time
- upgrade_purchase_count
- save_loaded
- offline_reward_claimed
- feedback_clicked

## Deferred Metrics

- feedback_sent: 延后到反馈在 App 内提交，或 GitHub 提供可靠且隐私安全的确认路径后再评估。当前反馈链接会在新标签页打开 GitHub Issues，App 只能记录 `feedback_clicked`。

## Metrics Gap

Metrics remain local only and are not uploaded. Historical session summaries are not retained. Save load metrics only record that a valid local save was loaded, and offline reward metrics only record that a local return message was shown.

## Current Decision

公开预览阶段仍保持 telemetry local-only。只添加直接支持反馈入口、前 60 秒清晰度或回访评估的指标。除非另有治理决策，不添加上传、外部 analytics SDK、个人数据或跨设备追踪。

## Privacy Boundary

- No personal data.
- No external analytics SDK.
- No upload path.
- No cross-device tracking.
