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
- feedback_sent

## Metrics Gap

Metrics remain local only and are not uploaded. Historical session summaries are not retained. Save load metrics only record that a valid local save was loaded, and offline reward metrics only record that a local return message was shown.

## Current Decision

Keep telemetry local while the project is not publicly deployed. Add only metrics that directly support feedback intake or first-60-second clarity.

## Privacy Boundary

- No personal data.
- No external analytics SDK.
- No upload path.
- No cross-device tracking.
