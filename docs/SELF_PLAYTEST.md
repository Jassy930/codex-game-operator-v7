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

2026-05-06 North Star return check. This is not real player feedback.

- Save/load applies passive production for elapsed time.
- The UI says “自动保存”, but does not tell returning players what was earned while away.

Gap: offline progress should be visible when it adds star dust.

2026-05-06 offline progress follow-up. This is not real player feedback.

- Save/load can now report how much star dust was earned while away.
- Returning players see a small “离线获得 … 星尘” message only when offline gain is positive.

2026-05-06 本地指标辅助目标文案检查。这不是真实玩家反馈。

- 模拟：每秒点击一次时，自动采集器会在第 10、23、39 秒购入。
- 前 10 秒：首次购买前，初始目标文案有用。
- 前 30 秒：第一次购买后，目标文案仍然写“购买第一个自动采集器”。
- 前 60 秒：里程碑在 3 / 5 时仍然有用，但主目标文案已经过期。

Gap: 购买第一台自动采集器后，目标提示应该更新。

2026-05-06 购买动作反馈检查。这不是真实玩家反馈。

- 前 10 秒：玩家会攒够星尘并购买第一台自动采集器。
- 前 30 秒：购买动作会改变数字和按钮状态，但没有一句话确认“自动采集器已经启动”。
- 前 60 秒：玩家能继续追下一台自动采集器，但升级成功瞬间的反馈偏弱。

Gap: 购买自动采集器后应显示短暂、非打断式确认反馈。

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

在添加新资源系统之前，继续验证购买反馈是否足够清晰且不过度打扰。
