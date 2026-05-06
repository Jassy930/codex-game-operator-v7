#!/usr/bin/env bash
set -euo pipefail

mkdir -p snapshots
ts="$(date +%Y%m%d-%H%M%S)"
out="snapshots/snapshot-$ts.md"

{
  echo "# Snapshot $ts"
  echo
  echo "## Git Status"
  git status --short || true
  echo
  echo "## Governor"
  cat docs/GOVERNOR_STATE.md
  echo
  echo "## Decision"
  cat docs/DECISION.md
  echo
  echo "## Issue Ledger"
  cat docs/ISSUE_LEDGER.md
  echo
  echo "## Feedback Clusters"
  cat docs/FEEDBACK_CLUSTERS.md
  echo
  echo "## Release Log"
  cat docs/RELEASE_LOG.md
} > "$out"

echo "Saved $out"
