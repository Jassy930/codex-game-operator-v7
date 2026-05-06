# Governor State

## Selected Mode

METRICS_INFRA

## Reason

The game is playable and self-playtest now needs local measurement support for first-60-second decisions.

## Allowed Actions

- Add local-only telemetry events.
- Add session and first-minute counters.
- Update `docs/METRICS.md`.
- Add tests for metric recording.

## Forbidden Actions

- Do not upload telemetry.
- Do not collect personal data.
- Do not add external analytics SDKs.
- Do not add gameplay mechanics.
- Do not reply to issues.

## Exit Criteria

- At least one local metric supports first-60-second evaluation.
- `docs/METRICS.md` explains what is recorded and where.
- Tests and build pass.

## Drift Status

No drift detected. The next change is local-only measurement infrastructure.

## Last Updated

2026-05-06: METRICS_INFRA session reset correction completed locally; tests and build pass.
