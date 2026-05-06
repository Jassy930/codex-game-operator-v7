# Metrics

## Current Metrics

Local-only feedback-click events are queued in browser storage under `stardust-workshop-feedback-events-v1`.

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

No session or progression telemetry exists yet. Feedback-click telemetry exists locally only and is not uploaded.

## Current Decision

Keep telemetry local while the project is not publicly deployed. Add only metrics that directly support feedback intake or first-60-second clarity.
