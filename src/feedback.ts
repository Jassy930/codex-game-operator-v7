export const FEEDBACK_EVENTS_KEY = "stardust-workshop-feedback-events-v1";

const FEEDBACK_REPOSITORY = "Jassy930/codex-game-operator-v7";

export type FeedbackEvent = {
  type: "feedback_clicked";
  createdAt: number;
};

export function createFeedbackIssueUrl(): string {
  const params = new URLSearchParams({
    template: "feedback.yml",
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
