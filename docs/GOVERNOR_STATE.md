# Governor State

## Selected Mode

METRICS_INFRA

## Reason

The game now shows offline progress on return, but `offline_reward_claimed` remains a desired local metric gap.

## Allowed Actions

- Add local-only telemetry events.
- Add session and first-minute counters.
- Update `docs/METRICS.md`.
- Add tests for metric recording.

## Forbidden Actions

- Do not collect personal data.
- Do not add external analytics SDKs.
- Do not upload telemetry.
- Do not add gameplay mechanics.
- Do not reply to issues.

## Exit Criteria

- At least one local metric supports first-60-second evaluation.
- `docs/METRICS.md` explains what is recorded and where.
- Tests and build pass.

## Drift Status

No drift detected. The next change is local-only measurement infrastructure.

## Last Updated

2026-05-06: METRICS_INFRA offline reward metric exit criteria met locally; tests and build pass.
