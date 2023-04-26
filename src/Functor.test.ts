import { describe, expect, it } from "vitest";

import { Functor } from "./Functor.js";

describe("Functor", () => {
  it("should map value without change the original reference", () => {
    const content = new Functor("content");
    const html = content.map((value) => `<div>${value}</div>`);
    expect(content.getValue()).toBe("content");
    expect(html.getValue()).toBe("<div>content</div>");
  });
});
