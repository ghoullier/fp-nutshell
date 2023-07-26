import { describe, expect, test } from "bun:test";

import { Container } from "./Container.js";

describe("Container", () => {
  test("should get the internal container value", () => {
    const content = new Container("content");
    expect(content.value).toBe("content");
  });
});
