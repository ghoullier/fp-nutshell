import { expect, test, spyOn } from "bun:test";

import { Option } from "./Option.js";

test("Option", () => {
  test("should be true when the Option is Some", () => {
    const some = Option.Some("content");
    expect(some.isOk()).toBe(true);
  });
  test("should be false when the Option is None", () => {
    const none = Option.None();
    expect(none.isOk()).toBe(false);
  });
  test("should return the fallback value when the Option is None", () => {
    const none = Option.None();
    expect(none.orElse("hello")).toBe("hello");
  });
  test("should not call the map function when the value is None", () => {
    const none = Option.None<string>();
    const mapper = spyOn((value) => `<div>${value}</div>`);
    const html = none.map(mapper);
    expect(html.isOk()).toBe(false);
    expect(mapper).toHaveBeenCalledOnce();
  });
  test("should call the map function when the value is Some", () => {
    const some = Option.Some("content");
    const mapper = spyOn((value) => `<div>${value}</div>`);
    const html = some.map(mapper);
    expect(html.isOk()).toBe(true);
    expect(html.orElse(`fallback`)).toBe(`<div>content</div>`);
    expect(mapper).toHaveBeenCalledOnce();
  });
  test("should flatMap not self wrap result", () => {
    const some = Option.Some("content");
    const mapper = spyOn((value) => Option.Some(`<div>${value}</div>`));
    const html = some.flatMap(mapper);
    expect(html.isOk()).toBe(true);
    expect(html.orElse(`fallback`)).toBe(`<div>content</div>`);
    expect(mapper).toHaveBeenCalledOnce();
  });
});
