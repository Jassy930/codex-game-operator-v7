#!/usr/bin/env bash
set -euo pipefail

mkdir -p data/feedback
OUT="data/feedback/github-feedback.md"

{
  echo "# GitHub Feedback"
  echo
  echo "Generated at: $(date)"
  echo
} > "$OUT"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh not found." >> "$OUT"
  exit 0
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "gh not authenticated." >> "$OUT"
  exit 0
fi

{
  echo "## Open Issues"
  gh issue list --state open --limit 100 || true
  echo
  echo "## Feedback Issues"
  gh issue list --label feedback --state open --limit 50 || true
  echo
  echo "## Bug Issues"
  gh issue list --label bug --state open --limit 50 || true
  echo
  echo "## Balance Issues"
  gh issue list --label balance --state open --limit 50 || true
  echo
  echo "## Idea Issues"
  gh issue list --label idea --state open --limit 50 || true
} >> "$OUT"

{
  echo
  echo "## Issue Evidence"
} >> "$OUT"

issue_numbers="$(
  gh issue list --state all --limit 100 2>/dev/null \
    | awk '{print $1}' \
    | sed 's/^#//' \
    | grep -E '^[0-9]+$' \
    || true
)"

if [ -z "$issue_numbers" ]; then
  {
    echo
    echo "No issues available for evidence capture."
  } >> "$OUT"
  exit 0
fi

for issue_number in $issue_numbers; do
  {
    echo
    echo "### Issue #$issue_number"
    gh issue view "$issue_number" --comments || true
    echo
    echo "#### Ledger Draft"
    fingerprint="issue-$issue_number-$(gh issue view "$issue_number" --comments 2>/dev/null | cksum | awk '{print $1}')"
    echo "| Issue | Fingerprint | Cluster | Class | Status | Last Reply | Linked Decision | Linked Commit/Release | Next Action |"
    echo "|---|---|---|---|---|---|---|---|---|"
    echo "| #$issue_number | $fingerprint | TODO | TODO | new | none | none | none | route through SIGNAL_ROUTING |"
  } >> "$OUT"
done
