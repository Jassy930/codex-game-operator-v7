# Governor State

## Selected Mode

FEEDBACK_INFRA

## Reason

The game is now locally playable, but it does not yet provide a clear player feedback path.

## Allowed Actions

- Add one clear feedback button or link.
- Add GitHub issue feedback path.
- Add local telemetry queue for feedback-click events.
- Update README and runtime docs.

## Forbidden Actions

- Do not add new game systems.
- Do not treat GitHub issues as tasks.
- Do not reply to issues without ledger and response budget evidence.
- Do not production deploy.

## Exit Criteria

- A player has at least one clear feedback path.
- Feedback path is documented.
- Feedback-click telemetry is stored locally only.

## Drift Status

No drift detected. The next change is infrastructure-only and does not add mechanics, resources, or panels.

## Last Updated

2026-05-06: FEEDBACK_INFRA implementation completed locally. Next cycle should select `RELEASE_INFRA` if no higher-priority blocker appears.
