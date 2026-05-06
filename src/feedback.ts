export const FEEDBACK_EVENTS_KEY = "stardust-workshop-feedback-events-v1";

const FEEDBACK_REPOSITORY = "Jassy930/codex-game-operator-v7";

export type FeedbackEvent = {
  type: "feedback_clicked";
  createdAt: number;
};

export function createFeedbackIssueUrl(): string {
  const params = new URLSearchParams({
    labels: "feedback",
    title: "玩家反馈：星尘工坊",
    body: [
      "## 前 60 秒哪里不清楚？",
      "",
      "例如：采集、购买自动采集器、目标提示、离线收益、反馈入口。",
      "",
      "## 你当时想做什么？",
      "",
      "## 其他补充",
      "",
    ].join("\n"),
  });

  return `https://github.com/${FEEDBACK_REPOSITORY}/issues/new?${params.toString()}`;
}

export function recordFeedbackClick(storage: Storage, now = Date.now()): void {
  const events = readEvents(storage);
  events.push({
    type: "feedback_clicked",
    createdAt: now,
  });

  storage.setItem(FEEDBACK_EVENTS_KEY, JSON.stringify(events.slice(-100)));
}

function readEvents(storage: Storage): FeedbackEvent[] {
  try {
    const raw = storage.getItem(FEEDBACK_EVENTS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isFeedbackEvent);
  } catch {
    return [];
  }
}

function isFeedbackEvent(value: unknown): value is FeedbackEvent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<FeedbackEvent>;
  return candidate.type === "feedback_clicked" && typeof candidate.createdAt === "number";
}
