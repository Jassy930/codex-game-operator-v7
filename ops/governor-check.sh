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
  "docs/ITERATION_POLICY.md"
  "docs/DOCUMENTATION_POLICY.md"
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

  if ! grep -F "v0.5 Stardust Return Budget" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget missing v0.5 stardust return budget."
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

  if ! grep -F 'Prestige loop: allowed as `星尘归航`' docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget v0.5 must explicitly bound the stardust return prestige loop."
    fail=1
  fi

  if ! grep -F "Prestige reward resource: \`共鸣\`" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget v0.5 must keep resonance as the prestige reward resource."
    fail=1
  fi

  if ! grep -F "Save format versions: max 3" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget v0.5 must keep save format versions max 3."
    fail=1
  fi

  if ! grep -F "第三普通资源" docs/COMPLEXITY_BUDGET.md >/dev/null 2>&1; then
    echo "Complexity budget v0.5 must explicitly forbid a third normal resource."
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

section_value() {
  local heading="$1"
  local file="$2"

  awk -v heading="## $heading" '
    $0 == heading { in_section = 1; next }
    in_section && /^## / { exit }
    in_section && NF { print; exit }
  ' "$file"
}

check_meaningful_iteration_gate() {
  if [ ! -f docs/GOVERNOR_STATE.md ]; then
    return
  fi

  required_iteration_fields=(
    "Iteration Track"
    "Cycle Bet"
    "Expected Content Advance"
    "Evidence Source"
    "Required Artifact"
    "Cycle Status"
  )

  for field in "${required_iteration_fields[@]}"; do
    if ! grep -F "## $field" docs/GOVERNOR_STATE.md >/dev/null 2>&1; then
      echo "Governor state missing meaningful iteration field: $field"
      fail=1
    fi
  done

  track="$(trim "$(section_value "Iteration Track" docs/GOVERNOR_STATE.md)")"
  if [ -n "$track" ]; then
    case "$track" in
      GAME_RESEARCH|PLAYER_FEEDBACK|CONTENT_PLANNING|CONTENT_REVIEW|BUGFIX|VISUAL_POLISH|PLAYABLE_CONTENT|HARNESS_MAINTENANCE)
        ;;
      *)
        echo "Governor state has invalid iteration track: $track"
        fail=1
        ;;
    esac
  fi

  expected_advance="$(trim "$(section_value "Expected Content Advance" docs/GOVERNOR_STATE.md)")"
  case "$expected_advance" in
    ""|"none"|"no-change"|"minor copy")
      echo "Governor state expected content advance must describe a concrete artifact or review outcome."
      fail=1
      ;;
  esac

  cycle_bet="$(trim "$(section_value "Cycle Bet" docs/GOVERNOR_STATE.md)")"
  case "$cycle_bet" in
    ""|"none"|"no-change"|"minor copy")
      echo "Governor state cycle bet must describe the current stage bet."
      fail=1
      ;;
  esac

  evidence_source="$(trim "$(section_value "Evidence Source" docs/GOVERNOR_STATE.md)")"
  if [ -z "$evidence_source" ] || [ "$evidence_source" = "none" ]; then
    echo "Governor state evidence source must describe the input signal."
    fail=1
  fi

  required_artifact="$(trim "$(section_value "Required Artifact" docs/GOVERNOR_STATE.md)")"
  if [ -z "$required_artifact" ] || [ "$required_artifact" = "none" ]; then
    echo "Governor state required artifact must describe the cycle output."
    fail=1
  fi

  cycle_status="$(trim "$(section_value "Cycle Status" docs/GOVERNOR_STATE.md)")"
  case "$cycle_status" in
    active|completed)
      ;;
    "")
      ;;
    *)
      echo "Governor state has invalid cycle status: $cycle_status"
      fail=1
      ;;
  esac
}

check_runtime_doc_budgets() {
  runtime_doc_budgets=(
    "docs/DECISION.md:180:12000"
    "docs/GOVERNOR_STATE.md:160:12000"
    "docs/SELF_PLAYTEST.md:220:14000"
    "docs/RETROSPECTIVE.md:240:14000"
    "docs/HARNESS_CHANGELOG.md:280:16000"
    "docs/CONTENT_ARC.md:220:14000"
    "docs/RESEARCH.md:320:16000"
    "docs/RELEASE_LOG.md:220:16000"
  )

  for entry in "${runtime_doc_budgets[@]}"; do
    file="${entry%%:*}"
    budget="${entry#*:}"
    max_lines="${budget%%:*}"
    max_bytes="${budget##*:}"

    if [ ! -f "$file" ]; then
      continue
    fi

    line_count="$(wc -l < "$file" | tr -d '[:space:]')"
    if [ "$line_count" -gt "$max_lines" ]; then
      echo "Runtime doc exceeds line budget: $file ($line_count > $max_lines). Archive old detail and keep current state concise."
      fail=1
    fi

    byte_count="$(wc -c < "$file" | tr -d '[:space:]')"
    if [ "$byte_count" -gt "$max_bytes" ]; then
      echo "Runtime doc exceeds size budget: $file ($byte_count > $max_bytes bytes). Archive old detail and keep current state concise."
      fail=1
    fi
  done
}

check_complexity_budget
check_issue_ledger
check_meaningful_iteration_gate
check_runtime_doc_budgets

exit "$fail"
