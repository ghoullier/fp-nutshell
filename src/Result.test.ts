import { expect, test } from "bun:test";

import { Result } from "./Result.js";

test("Result", () => {
  test("should map value without change the original reference", () => {
    const content = Result.Ok(`content`);
    const html = content.map((value) => `<div>${value}</div>`);
    expect(html.ok().orElse("fallback")).toBe("<div>content</div>");
  });
});
