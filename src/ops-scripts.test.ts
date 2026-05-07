import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("ops scripts", () => {
  it("fails governor check when an accepted issue is not clustered", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | missing-cluster | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## other-cluster\n",
      decision: "# Decision\n\n2026-05-07 operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Issue #1 references missing cluster missing-cluster");
  });

  it("fails governor check when a fixed issue has no release evidence", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | fixed-awaiting-release | none | DECISION:2026-05-07-operate | pending | reply |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Issue #1 is fixed-awaiting-release without concrete commit/release evidence");
  });

  it("fails governor check when v0.2 complexity budget is missing", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/COMPLEXITY_BUDGET.md"),
      "# Complexity Budget\n\n## v0.1 First Public Version Budget\n\n- Upgrade types: max 3\n",
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Complexity budget missing v0.2 3-15 minute budget");
  });

  it("collects issue body and comments for routing evidence", () => {
    const workspace = createCollectorWorkspace();
    const binDir = join(workspace, "bin");
    mkdirSync(binDir);
    writeFileSync(
      join(binDir, "gh"),
      `#!/usr/bin/env sh
if [ "$1 $2" = "auth status" ]; then
  exit 0
fi
if [ "$1 $2 $3" = "issue list --state" ]; then
  if echo "$*" | grep -q -- "--json"; then
    printf '[{"number":1}]\\n'
  else
    printf '#1\\tOPEN\\t玩家反馈\\tfeedback\\n'
  fi
  exit 0
fi
if [ "$1 $2" = "issue view" ]; then
  if echo "$*" | grep -q -- "--json"; then
    printf 'title: 玩家反馈：星尘工坊\\n'
    printf 'body: 我不知道为何要采集。\\n'
    printf 'comments: 采集反馈不明显。\\n'
  else
    printf 'comments: 采集反馈不明显。\\n'
  fi
  exit 0
fi
exit 1
`,
      { mode: 0o755 },
    );

    execFileSync("bash", [join(workspace, "ops/collect-feedback.sh")], {
      cwd: workspace,
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH ?? ""}`,
      },
    });

    const output = readFileSync(join(workspace, "data/feedback/github-feedback.md"), "utf8");
    expect(output).toContain("我不知道为何要采集");
    expect(output).toContain("采集反馈不明显");
    expect(output).toContain("Ledger Draft");
  });
});

describe("visual assets", () => {
  it("uses the generated stardust workshop background from project assets", () => {
    expect(styles).toContain("./assets/stardust-workshop-bg.webp");
  });
});

function createHarnessWorkspace(files: {
  ledgerRow: string;
  clusters: string;
  decision: string;
  releaseLog: string;
}): string {
  const workspace = mkdtempSync(join(tmpdir(), "governor-check-"));
  mkdirSync(join(workspace, "docs"), { recursive: true });
  mkdirSync(join(workspace, "ops"), { recursive: true });
  mkdirSync(join(workspace, "prompts"), { recursive: true });
  cpSync(join(process.cwd(), "ops/governor-check.sh"), join(workspace, "ops/governor-check.sh"));

  for (const file of REQUIRED_HARNESS_FILES) {
    writeFileSync(join(workspace, file), `# ${file}\n`);
  }

  writeFileSync(
    join(workspace, "docs/ISSUE_LEDGER.md"),
    `# Issue Ledger

| Issue | Fingerprint | Cluster | Class | Status | Last Reply | Linked Decision | Linked Commit/Release | Next Action |
|---|---|---|---|---|---|---|---|---|
${files.ledgerRow}
`,
  );
  writeFileSync(join(workspace, "docs/FEEDBACK_CLUSTERS.md"), files.clusters);
  writeFileSync(join(workspace, "docs/DECISION.md"), files.decision);
  writeFileSync(join(workspace, "docs/RELEASE_LOG.md"), files.releaseLog);

  return workspace;
}

function createCollectorWorkspace(): string {
  const workspace = mkdtempSync(join(tmpdir(), "collect-feedback-"));
  mkdirSync(join(workspace, "ops"), { recursive: true });
  cpSync(join(process.cwd(), "ops/collect-feedback.sh"), join(workspace, "ops/collect-feedback.sh"));
  return workspace;
}

function runGovernorCheck(workspace: string): { status: number | null; output: string } {
  const result = spawnSync("bash", [join(workspace, "ops/governor-check.sh")], {
    cwd: workspace,
    encoding: "utf8",
  });

  rmSync(workspace, { recursive: true, force: true });

  return {
    status: result.status,
    output: `${result.stdout}${result.stderr}`,
  };
}

const REQUIRED_HARNESS_FILES = [
  "AGENTS.md",
  "prompts/goal.md",
  "docs/NORTH_STAR.md",
  "docs/HARNESS.md",
  "docs/META_GOVERNANCE.md",
  "docs/OPERATING_MODES.md",
  "docs/GOVERNOR_STATE.md",
  "docs/SIGNAL_ROUTING.md",
  "docs/RESPONSE_BUDGET.md",
  "docs/COMPLEXITY_BUDGET.md",
  "docs/REVIEW_PROTOCOL.md",
  "docs/ASSET_WORKFLOW.md",
  "docs/DECISION.md",
  "docs/RELEASE_LOG.md",
  "docs/ISSUE_LEDGER.md",
  "docs/FEEDBACK_CLUSTERS.md",
];
