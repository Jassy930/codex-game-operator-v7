#!/usr/bin/env bash
set -euo pipefail

echo "== Harness Cycle =="

./ops/collect-feedback.sh
./ops/governor-check.sh
./ops/update-cycle-context.sh

echo
echo "Next step:"
echo "  Open Codex CLI and run:"
echo "    /goal resume"
echo
echo "If first run:"
echo "    /goal <contents of prompts/goal.md>"
