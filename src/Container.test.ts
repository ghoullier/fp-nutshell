import { describe, expect, test } from "bun:test";

import { Container } from "./Container.ts";

describe("Container", () => {
  test("should get the internal container value", () => {
    const content = new Container("content");
    expect(content.value).toBe("content");
  });

  test("should not mutate container value", () => {
    let source = 0;
    const content = new Container(source);
    source = 1;
    expect(content.value).toBe(0);
  });
});
