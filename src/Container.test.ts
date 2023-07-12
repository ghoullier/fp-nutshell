import { expect, test } from "bun:test";

import { Container } from "./Container.js";

test("should get the internal container value", () => {
  const content = new Container("content");
  expect(content.getValue()).toBe("content");
});
