import { describe, expect, it, vi } from "vitest";

import { Option } from "./Option.js";

describe("Option", () => {
  it("should be true when the Option is Some", () => {
    const some = Option.Some("content");
    expect(some.isOk()).toBe(true);
  });
  it("should be false when the Option is None", () => {
    const none = Option.None();
    expect(none.isOk()).toBe(false);
  });
  it("should return the fallback value when the Option is None", () => {
    const none = Option.None();
    expect(none.orElse("hello")).toBe("hello");
  });
  it("should not call the map function when the value is None", () => {
    const none = Option.None<string>();
    const mapper = vi.fn((value) => `<div>${value}</div>`);
    const html = none.map(mapper);
    expect(html.isOk()).toBe(false);
    expect(mapper).not.toHaveBeenCalled();
  });
  it("should call the map function when the value is Some", () => {
    const some = Option.Some("content");
    const mapper = vi.fn((value) => `<div>${value}</div>`);
    const html = some.map(mapper);
    expect(html.isOk()).toBe(true);
    expect(mapper).toHaveBeenCalledOnce();
    expect(html.orElse(`fallback`)).toBe(`<div>content</div>`);
  });
  it("should flatMap not self wrap result", () => {
    const some = Option.Some("content");
    const mapper = vi.fn((value) => Option.Some(`<div>${value}</div>`));
    const html = some.flatMap(mapper);
    expect(html.isOk()).toBe(true);
    expect(mapper).toHaveBeenCalledOnce();
    expect(html.orElse(`fallback`)).toBe(`<div>content</div>`);
  });
});
