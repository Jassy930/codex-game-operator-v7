# Governor State

## Selected Mode

META_IMPROVE

## Reason

The goal prompt lists metrics gap as an input source, but `docs/OPERATING_MODES.md` has no mode that explicitly permits local metrics infrastructure work.

## Allowed Actions

- Add a constrained `METRICS_INFRA` operating mode.
- Update `docs/HARNESS_CHANGELOG.md`.
- Verify the change does not weaken core constraints.
- Commit the governance documentation together.

## Forbidden Actions

- Do not weaken issue routing.
- Do not weaken response budget.
- Do not weaken complexity budget.
- Do not weaken review protocol.
- Do not change gameplay.

## Exit Criteria

- `METRICS_INFRA` mode is recorded in `docs/OPERATING_MODES.md`.
- The change is recorded in `docs/HARNESS_CHANGELOG.md`.
- `./ops/governor-check.sh` passes.
- Git status is explicit after commit.

## Drift Status

No drift detected. This is a constrained mode addition for an existing prompt input source.

## Last Updated

2026-05-06: selected `META_IMPROVE` to add a constrained metrics infrastructure mode.
