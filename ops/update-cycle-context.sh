#!/usr/bin/env bash
set -euo pipefail

mkdir -p .harness
OUT=".harness/cycle-context.md"

{
  echo "# Cycle Context"
  echo
  echo "Generated at: $(date)"
  echo
  echo "## Git Status"
  git status --short || true
  echo
  echo "## Governor State"
  cat docs/GOVERNOR_STATE.md
  echo
  echo "## Decision"
  cat docs/DECISION.md
  echo
  echo "## Issue Ledger"
  cat docs/ISSUE_LEDGER.md
  echo
  echo "## GitHub Feedback"
  cat data/feedback/github-feedback.md || true
  echo
  echo "## Manual Feedback"
  cat data/feedback/manual-feedback.md || true
} > "$OUT"

echo "Wrote $OUT"
