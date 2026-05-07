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
  "docs/ASSET_WORKFLOW.md"
  "docs/DECISION.md"
  "docs/RELEASE_LOG.md"
  "docs/ISSUE_LEDGER.md"
  "docs/FEEDBACK_CLUSTERS.md"
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

check_complexity_budget() {
  if [ ! -f docs/COMPLEXITY_BUDGET.md ]; then
    return
  fi

  if ! grep -F "v0.1 First Public Version Budget" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget missing v0.1 first public budget."
    fail=1
  fi

  if ! grep -F "v0.2 3-15 Minute Version Budget" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget missing v0.2 3-15 minute budget."
    fail=1
  fi

  if ! grep -F "Upgrade types: max 4" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget v0.2 must keep upgrade types max 4."
    fail=1
  fi

  if ! grep -F "Secondary resources: 0" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget must keep secondary resources at 0."
    fail=1
  fi

  if ! grep -F "prestige" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget v0.2 must explicitly forbid prestige."
    fail=1
  fi
}

trim() {
  printf "%s" "$1" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//'
}

is_empty_evidence() {
  case "$1" in
    ""|"none"|"pending"|"pending-release"|"pending-commit")
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

check_issue_ledger() {
  if [ ! -f docs/ISSUE_LEDGER.md ]; then
    return
  fi

  while IFS='|' read -r _ issue fingerprint cluster class status last_reply linked_decision linked_evidence next_action _rest; do
    issue="$(trim "$issue")"
    fingerprint="$(trim "$fingerprint")"
    cluster="$(trim "$cluster")"
    class="$(trim "$class")"
    status="$(trim "$status")"
    last_reply="$(trim "$last_reply")"
    linked_decision="$(trim "$linked_decision")"
    linked_evidence="$(trim "$linked_evidence")"
    next_action="$(trim "$next_action")"

    case "$issue" in
      "#"*|"Issue"|"---"|"")
        ;;
      *)
        continue
        ;;
    esac

    if [ "$issue" = "Issue" ] || [ "$issue" = "---" ] || [ -z "$issue" ]; then
      continue
    fi

    if [ "$status" != "new" ] && [ "$status" != "declined" ] && [ "$status" != "closed-no-action" ] && [ "$class" != "CRITICAL" ]; then
      if [ -z "$cluster" ] || [ "$cluster" = "none" ]; then
        echo "Issue $issue is $status but has no cluster."
        fail=1
      elif ! grep -F "## $cluster" docs/FEEDBACK_CLUSTERS.md >/dev/null 2>&1; then
        echo "Issue $issue references missing cluster $cluster."
        fail=1
      fi
    fi

    case "$status" in
      accepted|fixed-awaiting-release|released)
        if [ -z "$fingerprint" ] || [ "$fingerprint" = "none" ]; then
          echo "Issue $issue is $status but has no fingerprint."
          fail=1
        fi

        if [ -z "$linked_decision" ] || [ "$linked_decision" = "none" ]; then
          echo "Issue $issue is $status but has no linked decision."
          fail=1
        elif ! printf "%s" "$linked_decision" | grep -E '^DECISION:[0-9]{4}-[0-9]{2}-[0-9]{2}-' >/dev/null 2>&1; then
          echo "Issue $issue has non-verifiable decision link: $linked_decision"
          fail=1
        elif ! grep -F "$linked_decision" docs/DECISION.md >/dev/null 2>&1; then
          echo "Issue $issue linked decision not found in docs/DECISION.md: $linked_decision"
          fail=1
        fi
        ;;
    esac

    case "$status" in
      fixed-awaiting-release|released)
        if is_empty_evidence "$linked_evidence"; then
          echo "Issue $issue is $status without concrete commit/release evidence."
          fail=1
        elif printf "%s" "$linked_evidence" | grep -E '^RELEASE_LOG:' >/dev/null 2>&1; then
          release_anchor="${linked_evidence#RELEASE_LOG:}"
          if ! grep -F "## $release_anchor" docs/RELEASE_LOG.md >/dev/null 2>&1; then
            echo "Issue $issue release log anchor not found: $linked_evidence"
            fail=1
          fi
          if ! grep -F "Issue ${issue#\#}" docs/RELEASE_LOG.md >/dev/null 2>&1 && ! grep -F "$issue" docs/RELEASE_LOG.md >/dev/null 2>&1; then
            echo "Issue $issue has release evidence but docs/RELEASE_LOG.md does not mention it."
            fail=1
          fi
        elif ! printf "%s" "$linked_evidence" | grep -E '^[0-9a-f]{7,40}$' >/dev/null 2>&1; then
          echo "Issue $issue has non-verifiable commit/release evidence: $linked_evidence"
          fail=1
        fi
        ;;
    esac

    if [ -n "$last_reply" ] && [ "$last_reply" != "none" ] && is_empty_evidence "$linked_evidence"; then
      echo "Issue $issue has a reply but no concrete commit/release evidence."
      fail=1
    fi

    if [ -z "$next_action" ]; then
      echo "Issue $issue has no next action."
      fail=1
    fi
  done < docs/ISSUE_LEDGER.md
}

check_complexity_budget
check_issue_ledger

exit "$fail"
