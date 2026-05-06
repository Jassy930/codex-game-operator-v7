# Governor State

## Selected Mode

BOOTSTRAP

## Reason

Clean-room project had no runnable game at cycle start. BOOTSTRAP remains the selected mode for this cycle while its exit criteria are verified.

## Allowed Actions

- Create project skeleton.
- Add tests.
- Add minimal game shell.
- Update runtime docs.

## Forbidden Actions

- Do not add advanced mechanics.
- Do not respond to non-critical issues.
- Do not production deploy.

## Exit Criteria

- `package.json` exists.
- `bun test` exists and passes.
- `bun run build` exists and passes.
- Minimal game shell exists.

## Drift Status

No drift detected. The implementation stays within the first public version complexity budget: one resource, one primary action, one upgrade type, and fewer than four visible panels.

## Last Updated

2026-05-06: BOOTSTRAP implementation completed locally. Next cycle should select `FEEDBACK_INFRA` if no higher-priority blocker appears.
