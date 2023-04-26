import { describe, expect, it } from "vitest";

import { Result } from "./Result.js";

describe("Result", () => {
  it("should map value without change the original reference", () => {
    const content = Result.Ok(`content`);
    const html = content.map((value) => `<div>${value}</div>`);
    expect(html.ok().orElse("fallback")).toBe("<div>content</div>");
  });
});
