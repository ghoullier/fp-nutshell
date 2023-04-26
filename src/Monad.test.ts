import { describe, expect, it } from "vitest";

import { Monad } from "./Monad.js";

describe("Monad", () => {
  it("should map value without change the original reference", () => {
    const content = new Monad("content");
    const html = content.map((value) => `<div>${value}</div>`);
    expect(content.getValue()).toBe("content");
    expect(html.getValue()).toBe("<div>content</div>");
  });
  it("should flatMap value without stacking Monad", () => {
    const content = new Monad("content");
    const html = content.flatMap((value) => new Monad(`<div>${value}</div>`));
    expect(content.getValue()).toBe("content");
    expect(html.getValue()).toBe("<div>content</div>");
  });
});
