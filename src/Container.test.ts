import { describe, expect, it } from "vitest";

import { Container } from "./Container.js";

describe("Container", () => {
  it("should get the internal container value", () => {
    const content = new Container("content");
    expect(content.getValue()).toBe("content");
  });
});
