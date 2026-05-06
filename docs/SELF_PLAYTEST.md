# Self Playtest

Self-playtest is the primary input source when no real feedback exists and the game is runnable.

## Latest Result

2026-05-06 self-playtest from local/public preview inspection. This is not real player feedback.

- First 10 seconds: player can see “星尘” and the primary “采集” action immediately.
- First 30 seconds: first upgrade is visible, but its button text only shows `10`; the UI does not explicitly say this is a star dust cost.
- First 60 seconds: after buying the first auto collector, passive growth is visible through “每秒 +0.2”.

Gap: first upgrade cost wording should state the unit and intent more clearly.

2026-05-06 follow-up self-playtest. This is not real player feedback.

- First 10 seconds: the main click action is still clear.
- First 30 seconds: the cost wording is clearer after the previous fix.
- First 60 seconds: the player can infer the first goal from the button and progress bar, but no single sentence states “save for the first auto collector.”

Gap: the first objective should be stated directly in one short line.

2026-05-06 research-backed follow-up. This is not real player feedback.

- First 10 seconds: the first goal line gives the player a direct objective.
- First 30 seconds: the upgrade cost and progress bar are readable.
- First 60 seconds: early generator progress still benefits from a visible milestone before any new system is introduced.

Gap: show progress toward a small early auto-collector milestone without adding rewards.

2026-05-06 metrics-assisted simulation. This is not real player feedback.

- Simulated one click per second for 60 seconds.
- First auto collector purchased at 10 seconds.
- Second auto collector purchased at 23 seconds.
- Third auto collector purchased at 39 seconds.

Gap: a fixed `0 / 2` milestone is completed before the first minute ends and then stops giving direction.

## Checklist

### First 10 seconds

- Does the player know what to click?
- Is resource growth visible?
- Is there immediate feedback?

### First 30 seconds

- Can the player reach or understand the first upgrade?
- Is the next goal visible?

### First 60 seconds

- Does the player understand the core loop?
- Is there a reason to continue?
- Is UI complexity within budget?

## Next Improvement Candidate

Use dynamic early auto-collector milestones so the first minute keeps a visible next target without adding rewards.
