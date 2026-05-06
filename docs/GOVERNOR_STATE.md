# Governor State

## Selected Mode

RELEASE_INFRA

## Reason

The game is locally playable and has a feedback path, but it is not yet publicly deployable.

## Allowed Actions

- Add GitHub Pages workflow.
- Configure build base path for project Pages.
- Update deploy docs.
- Run local verification before any push.

## Forbidden Actions

- Do not change gameplay.
- Do not reply to issues.
- Do not deploy broken builds.
- Do not add unrelated release channels.

## Exit Criteria

- GitHub Pages workflow exists.
- Local tests and build pass.
- Public preview path is documented.

## Drift Status

No drift detected. The next change is release infrastructure only.

## Last Updated

2026-05-06: RELEASE_INFRA exit criteria met. GitHub Pages workflow run `25421667150` completed successfully and public preview returns HTTP 200.
