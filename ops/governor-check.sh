#!/usr/bin/env bash
set -euo pipefail

echo "== Governor Check =="

fail=0

required=(
  "AGENTS.md"
  "prompts/goal.md"
  "docs/NORTH_STAR.md"
  "docs/HARNESS.md"
  "docs/META_GOVERNANCE.md"
  "docs/OPERATING_MODES.md"
  "docs/GOVERNOR_STATE.md"
  "docs/SIGNAL_ROUTING.md"
  "docs/RESPONSE_BUDGET.md"
  "docs/COMPLEXITY_BUDGET.md"
  "docs/REVIEW_PROTOCOL.md"
  "docs/DECISION.md"
  "docs/RELEASE_LOG.md"
)

for f in "${required[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing required harness file: $f"
    fail=1
  fi
done

if grep -R "Issue.*task\\|issues are tasks\\|treat.*issue.*task" docs AGENTS.md prompts 2>/dev/null | grep -Evi "not|do not|不是" >/dev/null 2>&1; then
  echo "Warning: possible issue-as-task language found. Review SIGNAL_ROUTING."
fi

if [ -f package.json ]; then
  echo "package.json found."
else
  echo "No package.json yet. Governor mode should remain BOOTSTRAP."
fi

exit "$fail"
