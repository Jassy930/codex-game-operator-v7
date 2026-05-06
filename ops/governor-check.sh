#!/usr/bin/env bash
set -euo pipefail

echo "== Governor Check =="

fail=0
required=(
  "docs/NORTH_STAR.md"
  "docs/SIGNAL_ROUTING.md"
  "docs/RESPONSE_BUDGET.md"
  "docs/ISSUE_LEDGER.md"
  "docs/FEEDBACK_CLUSTERS.md"
  "docs/GOVERNOR_STATE.md"
  "docs/COMPLEXITY_BUDGET.md"
  "docs/DECISION.md"
  "docs/RELEASE_LOG.md"
)

for f in "${required[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing required harness file: $f"
    fail=1
  fi
done

if [ -f package.json ]; then
  echo "package.json found."
else
  echo "No package.json yet. Governor mode should remain BOOTSTRAP."
fi

exit "$fail"
