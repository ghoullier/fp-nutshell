import { describe, expect, test } from "bun:test";

import { Result } from "./Result.js";

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

  test("should correctly render when apply toString() when Result is Error", () => {
    const content = Result.Error(new Error("failure"));
    expect(content.toString()).toBe("Error ( Error: failure )");
  });
});
