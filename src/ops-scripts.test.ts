import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
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

  it("fails governor check when v0.5 stardust return budget is missing", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/COMPLEXITY_BUDGET.md"),
      `# Complexity Budget

## v0.1 First Public Version Budget

- Secondary resources: 0

## v0.2 3-15 Minute Version Budget

- Secondary resources: 0
- Upgrade types: max 4
- prestige is forbidden

## v0.3 Resonance Version Budget

- Secondary resources: max 1

## v0.4 20-Hour Resonance Budget

- Secondary resources: max 1
`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Complexity budget missing v0.5 stardust return budget");
  });

  it("fails governor check when v0.6 return afterglow budget is missing", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/COMPLEXITY_BUDGET.md"),
      `# Complexity Budget

## v0.1 First Public Version Budget

- Secondary resources: 0

## v0.2 3-15 Minute Version Budget

- Secondary resources: 0
- Upgrade types: max 4
- prestige is forbidden

## v0.5 Stardust Return Budget

- Prestige loop: allowed as \`星尘归航\`
- Prestige reward resource: \`共鸣\`
- Save format versions: max 3
- 第三普通资源
`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Complexity budget missing v0.6 return afterglow budget");
  });

  it("fails governor check when v0.7 return route budget is missing", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/COMPLEXITY_BUDGET.md"),
      `# Complexity Budget

## v0.1 First Public Version Budget

- Secondary resources: 0

## v0.2 3-15 Minute Version Budget

- Secondary resources: 0
- Upgrade types: max 4
- prestige is forbidden

## v0.5 Stardust Return Budget

- Prestige loop: allowed as \`星尘归航\`
- Prestige reward resource: \`共鸣\`
- Save format versions: max 3
- 第三普通资源

## v0.6 Return Afterglow Budget

- Parked resonance afterglow: allowed
- Afterglow starting dust bonus: max 50 星尘
- 节点等级
`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Complexity budget missing v0.7 return route budget");
  });

  it("fails governor check when meaningful iteration fields are missing", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/GOVERNOR_STATE.md"),
      `# Governor State

## Selected Mode

SELF_PLAYTEST
`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Governor state missing meaningful iteration field: Iteration Track");
  });

  it("fails governor check when cycle bet is missing", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/GOVERNOR_STATE.md"),
      `# Governor State

## Selected Mode

OPERATE

## Iteration Track

PLAYABLE_CONTENT

## Expected Content Advance

Implement one supported change tied to the current decision.

## Evidence Source

Test fixture.

## Required Artifact

Tests and release note.

## Cycle Status

active
`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Governor state missing meaningful iteration field: Cycle Bet");
  });

  it("fails governor check when cycle status is invalid", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/GOVERNOR_STATE.md"),
      `# Governor State

## Selected Mode

OPERATE

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

Ship one visible playable change within the current budget.

## Expected Content Advance

Implement one supported change tied to the current decision.

## Evidence Source

Test fixture.

## Required Artifact

Tests and release note.

## Cycle Status

stalled
`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Governor state has invalid cycle status: stalled");
  });

  it("fails governor check when runtime docs exceed their line budget", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/DECISION.md"),
      `# Decision\n\nDECISION:2026-05-07-operate\n${Array.from({ length: 190 }, (_, index) => `- stale decision ${index}`).join("\n")}\n`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Runtime doc exceeds line budget: docs/DECISION.md");
  });

  it("fails governor check when runtime docs exceed their size budget", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(
      join(workspace, "docs/RELEASE_LOG.md"),
      `# Release Log\n\n## Unreleased\n\n- ${"stale release detail ".repeat(1200)}\n`,
    );

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Runtime doc exceeds size budget: docs/RELEASE_LOG.md");
  });

  it("fails governor check when the harness engineering scorecard is incomplete", () => {
    const workspace = createHarnessWorkspace({
      ledgerRow:
        "| #1 | unclear-first-minute | first-60s | ACTIONABLE | accepted | none | DECISION:2026-05-07-operate | none | route |",
      clusters: "# Feedback Clusters\n\n## first-60s\n",
      decision: "# Decision\n\nDECISION:2026-05-07-operate\n",
      releaseLog: "# Release Log\n\n## Unreleased\n",
    });
    writeFileSync(join(workspace, "docs/QUALITY_SCORE.md"), "# Quality Score\n\n## Agent Readability\n");

    const result = runGovernorCheck(workspace);

    expect(result.status).not.toBe(0);
    expect(result.output).toContain("Quality score missing required section: Content Depth");
    expect(result.output).toContain("Quality score missing required section: Garbage Collection");
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
if [ "$1 $2" = "label list" ]; then
  printf 'feedback\\tPlayer feedback\\t#0e8a16\\n'
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

  it("fails feedback collection when the required feedback label is missing", () => {
    const workspace = createCollectorWorkspace();
    const binDir = join(workspace, "bin");
    mkdirSync(binDir);
    writeFileSync(
      join(binDir, "gh"),
      `#!/usr/bin/env sh
if [ "$1 $2" = "auth status" ]; then
  exit 0
fi
if [ "$1 $2" = "label list" ]; then
  printf 'bug\\tSomething is not working\\t#d73a4a\\n'
  exit 0
fi
exit 1
`,
      { mode: 0o755 },
    );

    const result = spawnSync("bash", [join(workspace, "ops/collect-feedback.sh")], {
      cwd: workspace,
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH ?? ""}`,
      },
      encoding: "utf8",
    });

    const output = readFileSync(join(workspace, "data/feedback/github-feedback.md"), "utf8");
    rmSync(workspace, { recursive: true, force: true });

    expect(result.status).not.toBe(0);
    expect(output).toContain("Missing required GitHub label: feedback");
  });

  it("generates the current deploy-pages workflow without swallowing test failures", () => {
    const workspace = mkdtempSync(join(tmpdir(), "pages-workflow-"));
    mkdirSync(join(workspace, "ops"), { recursive: true });
    cpSync(
      join(process.cwd(), "ops/create-pages-workflow.sh"),
      join(workspace, "ops/create-pages-workflow.sh"),
    );

    execFileSync("bash", [join(workspace, "ops/create-pages-workflow.sh")], {
      cwd: workspace,
    });

    const workflow = readFileSync(
      join(workspace, ".github/workflows/deploy-pages.yml"),
      "utf8",
    );
    const hasLegacyWorkflow = existsSync(join(workspace, ".github/workflows/pages.yml"));
    rmSync(workspace, { recursive: true, force: true });

    expect(workflow).toContain("uses: actions/checkout@v6.0.2");
    expect(workflow).toContain("uses: actions/upload-pages-artifact@v5.0.0");
    expect(workflow).toContain("uses: actions/deploy-pages@v5.0.0");
    expect(workflow).toContain("run: bun test");
    expect(workflow).toContain("run: bun run test");
    expect(workflow).not.toContain("bun test || true");
    expect(hasLegacyWorkflow).toBe(false);
  });
});

describe("visual assets", () => {
  it("uses the generated stardust workshop background from project assets", () => {
    expect(styles).toContain("./assets/stardust-workshop-bg.webp");
  });

  it("keeps mobile action buttons compact when they stack vertically", () => {
    expect(styles).toMatch(
      /@media \(max-width: 560px\)[\s\S]*\.collect-button \{[\s\S]*min-height: 70px;/,
    );
    expect(styles).toMatch(
      /@media \(max-width: 560px\)[\s\S]*\.upgrade-card \{[\s\S]*grid-template-columns: 1fr;/,
    );
  });

  it("keeps collapsed HUD panels hidden when component display styles apply", () => {
    expect(styles).toContain(".hud-panel[hidden]");
    expect(styles).toMatch(/\.hud-panel\[hidden\]\s*\{[\s\S]*display: none;/);
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
    join(workspace, "docs/GOVERNOR_STATE.md"),
    `# Governor State

## Selected Mode

OPERATE

## Iteration Track

PLAYABLE_CONTENT

## Cycle Bet

Ship one visible playable change within the current budget.

## Expected Content Advance

Implement one supported change tied to the current decision.

## Evidence Source

Test fixture.

## Required Artifact

Tests and release note.

## Cycle Status

active
`,
  );

  writeFileSync(
    join(workspace, "docs/COMPLEXITY_BUDGET.md"),
    `# Complexity Budget

## v0.1 First Public Version Budget

- Secondary resources: 0

## v0.2 3-15 Minute Version Budget

- Secondary resources: 0
- Upgrade types: max 4
- prestige is forbidden

## v0.5 Stardust Return Budget

- Prestige loop: allowed as \`星尘归航\`
- Prestige reward resource: \`共鸣\`
- Save format versions: max 3
- 第三普通资源

## v0.6 Return Afterglow Budget

- Parked resonance afterglow: allowed
- Afterglow starting dust bonus: max 50 星尘
- 节点等级

## v0.7 Return Route Budget

- Return route plan: allowed
- Return route milestones: max 3
`,
  );

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
  "docs/ITERATION_POLICY.md",
  "docs/DOCUMENTATION_POLICY.md",
  "docs/QUALITY_SCORE.md",
  "docs/DECISION.md",
  "docs/RELEASE_LOG.md",
  "docs/ISSUE_LEDGER.md",
  "docs/FEEDBACK_CLUSTERS.md",
];
