#!/usr/bin/env bash
set -u

SLEEP_SECONDS="${SLEEP_SECONDS:-120}"
LOG_DIR="${LOG_DIR:-.goal-harness-logs}"
mkdir -p "$LOG_DIR"

round=0

echo "Starting goal harness loop."
echo "This assumes Codex supports /goal and that a goal has already been set."
echo "Press Ctrl+C to stop."

while true; do
  round=$((round + 1))
  ts="$(date +%Y%m%d-%H%M%S)"
  log="$LOG_DIR/round-${round}-${ts}.log"

  echo
  echo "========== GOAL HARNESS ROUND $round =========="
  echo

  {
    ./ops/collect-feedback.sh || true
    ./ops/governor-check.sh || true
    ./ops/update-cycle-context.sh || true
    echo
    echo "Running Codex goal resume..."
    codex exec "/goal resume"
  } 2>&1 | tee "$log"

  sleep "$SLEEP_SECONDS"
done
