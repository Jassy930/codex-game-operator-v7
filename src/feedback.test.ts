import {
  FEEDBACK_EVENTS_KEY,
  createFeedbackIssueUrl,
  recordFeedbackClick,
} from "./feedback";

describe("feedback intake", () => {
  it("creates a GitHub issue URL for player feedback", () => {
    const url = new URL(createFeedbackIssueUrl());

    expect(url.origin).toBe("https://github.com");
    expect(url.pathname).toBe("/Jassy930/codex-game-operator-v7/issues/new");
    expect(url.searchParams.get("labels")).toBe("feedback");
    expect(url.searchParams.get("title")).toContain("玩家反馈");
    expect(url.searchParams.get("body")).toContain("前 60 秒哪里不清楚");
  });

  it("appends a local feedback_clicked event", () => {
    const storage = createMemoryStorage();

    recordFeedbackClick(storage, 1_000);
    recordFeedbackClick(storage, 2_000);

    expect(JSON.parse(storage.getItem(FEEDBACK_EVENTS_KEY) ?? "[]")).toEqual([
      {
        type: "feedback_clicked",
        createdAt: 1_000,
      },
      {
        type: "feedback_clicked",
        createdAt: 2_000,
      },
    ]);
  });
});

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();

  return {
    get length() {
      return values.size;
    },
    clear() {
      values.clear();
    },
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(values.keys())[index] ?? null;
    },
    removeItem(key: string) {
      values.delete(key);
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}
