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
  cat docs/GOVERNOR_STATE.md || true
  echo
  echo "## Decision"
  cat docs/DECISION.md || true
  echo
  echo "## Issue Ledger"
  cat docs/ISSUE_LEDGER.md || true
  echo
  echo "## Feedback Clusters"
  cat docs/FEEDBACK_CLUSTERS.md || true
  echo
  echo "## Release Log"
  cat docs/RELEASE_LOG.md || true
  echo
  echo "## Harness Changelog"
  cat docs/HARNESS_CHANGELOG.md || true
} > "$out"

echo "Saved $out"
