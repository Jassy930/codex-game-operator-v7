#!/usr/bin/env bash
set -euo pipefail

mkdir -p data/feedback
OUT="data/feedback/github-feedback.md"
required_labels=("feedback")

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
  echo "## Required Labels"
} >> "$OUT"

label_names="$(gh label list --limit 200 2>/dev/null | awk '{print $1}' || true)"

for label in "${required_labels[@]}"; do
  if printf "%s\n" "$label_names" | grep -Fx "$label" >/dev/null 2>&1; then
    echo "- $label: present" >> "$OUT"
  else
    echo "- $label: missing" >> "$OUT"
    echo "Missing required GitHub label: $label" >> "$OUT"
    exit 3
  fi
done

echo >> "$OUT"

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
    gh issue view "$issue_number" \
      --json number,title,body,comments,url,state,author,createdAt,updatedAt \
      --template '{{printf "number: #%v\n" .number}}{{printf "title: %s\n" .title}}{{printf "url: %s\n" .url}}{{printf "state: %s\n" .state}}{{printf "author: %s\n" .author.login}}{{printf "createdAt: %s\n" .createdAt}}{{printf "updatedAt: %s\n\n" .updatedAt}}body:
{{.body}}

comments:
{{range .comments}}{{printf "- %s at %s:\n%s\n" .author.login .createdAt .body}}{{else}}none
{{end}}' || true
    echo
    echo "#### Ledger Draft"
    fingerprint="issue-$issue_number-$(gh issue view "$issue_number" --json title,body,comments 2>/dev/null | cksum | awk '{print $1}')"
    echo "| Issue | Fingerprint | Cluster | Class | Status | Last Reply | Linked Decision | Linked Commit/Release | Next Action |"
    echo "|---|---|---|---|---|---|---|---|---|"
    echo "| #$issue_number | $fingerprint | TODO | TODO | new | none | none | none | route through SIGNAL_ROUTING |"
  } >> "$OUT"
done
