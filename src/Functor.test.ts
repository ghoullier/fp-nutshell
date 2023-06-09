import { describe, expect, test } from "bun:test";

import { Functor } from "./Functor.js";

describe("Functor", () => {
  test("should map value without change the original reference", () => {
    const content = new Functor("content");
    const html = content.map((value) => `<div>${value}</div>`);
    expect(content.getValue()).toBe("content");
    expect(html.getValue()).toBe("<div>content</div>");
  });
});
