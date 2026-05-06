import { getAutoCollectorMilestone } from "./milestones";

describe("auto collector milestones", () => {
  it("targets the second auto collector before the first milestone is complete", () => {
    expect(getAutoCollectorMilestone(0)).toEqual({
      current: 0,
      target: 2,
    });
    expect(getAutoCollectorMilestone(1)).toEqual({
      current: 1,
      target: 2,
    });
  });

  it("moves to a larger visible target after two auto collectors", () => {
    expect(getAutoCollectorMilestone(2)).toEqual({
      current: 2,
      target: 5,
    });
    expect(getAutoCollectorMilestone(3)).toEqual({
      current: 3,
      target: 5,
    });
  });
});
