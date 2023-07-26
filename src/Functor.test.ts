import { describe, expect, test } from "bun:test";

import { Functor } from "./Functor.js";

describe("Functor", () => {
  test("should map value without change the original reference", () => {
    const content = new Functor("content");
    const html = content.map((value) => `<div>${value}</div>`);
    expect(content.value).toBe("content");
    expect(html.value).toBe("<div>content</div>");
  });
});
