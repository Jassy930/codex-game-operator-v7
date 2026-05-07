# North Star

## Product Vision

Build a lightweight, coherent, browser-based idle/incremental game about steady growth, clear goals, and satisfying compounding progress.

The player should feel:

- “I know what to do next.”
- “One more upgrade is within reach.”
- “My progress continues even when I step away.”
- “The game is getting deeper, but not noisier.”

## Current Stage

v0.2 planning stage: 3-15 minute engagement.

The first 60 seconds remain a regression guardrail. The next version should make minutes 3-15 feel like a coherent content arc, not a pile of unrelated systems.

Do not stay in one stage indefinitely. A stage is a working focus, not a holding pen. After repeated no-change cycles, the operator must either broaden the time horizon, define the next content arc, or explicitly wait for new player signal without continuing to polish the same window.

Priority:

1. 3-15 minute content arc clarity
2. Sustained upgrade pacing after the first few upgrades
3. Return and offline progress comprehension
4. Visible growth feedback
5. First 60 seconds regression safety
6. Sustainable feedback processing
7. Public playable stability

## Core Loop

```text
Player action
→ resource grows
→ buy upgrade
→ production improves
→ next goal becomes visible
→ player returns later
```

## We Do Not Do Yet

- PvP
- social systems
- MMO systems
- complex map systems
- many resources at once
- wiki-like mechanics
- heavy real-time action
- excessive panels
- complex lore before core loop is fun
- second resources before 3-15 minute pacing is proven
- prestige before return behavior is understood

## Product Discipline

A player issue is valid input, but not a command.
A research finding is valid input, but not a task.
An idea is valid input, but not a backlog item.

Only `docs/DECISION.md` can authorize implementation.

## Stage Cadence

- Two consecutive no-change cycles in the same time window require a stage review.
- A released fix plus one clean regression check is enough to move that issue out of active focus.
- If a stage has no new feedback, no metric anomaly, and no concrete self-playtest gap, stop polishing it and define the next time horizon.
- Moving forward may be a content-arc document, research-backed candidate, or metrics plan; it does not automatically authorize new systems.
