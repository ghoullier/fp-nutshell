import { describe, expect, test } from "bun:test";

import * as fp from "./index.ts";

describe("@ghoullier/fp-nutshell", () => {
  test("should exports expected classes", () => {
    expect(fp.Container).toBeDefined();
    expect(fp.Functor).toBeDefined();
    expect(fp.Monad).toBeDefined();
    expect(fp.Option).toBeDefined();
    expect(fp.Result).toBeDefined();
  });
});
