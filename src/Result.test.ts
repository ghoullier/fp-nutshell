import { describe, expect, test } from "bun:test";

import { Result } from "./Result.ts";

describe("Result", () => {
  test("should map value without change the original reference", () => {
    const content = Result.Ok(`content`);
    const html = content.map((value) => `<div>${value}</div>`);
    expect(html.ok().orElse("fallback")).toBe("<div>content</div>");
  });

  test("should correctly render when apply toString()", () => {
    const content = Result.Ok(`content`);
    const html = content.map((value) => `<div>${value}</div>`);
    expect(html.toString()).toBe("Ok ( <div>content</div> )");
  });
});
