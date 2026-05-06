import { renderToStaticMarkup } from "react-dom/server";
import { App } from "./App";

describe("App", () => {
  it("renders the first playable screen with action and upgrade controls", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("星尘");
    expect(html).toContain("采集");
    expect(html).toContain("自动采集器");
    expect(html).toContain("需要 10 星尘");
    expect(html).toContain("反馈");
  });
});
