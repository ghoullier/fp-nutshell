import { describe, expect, test } from "bun:test"

import { Result } from "./Result.ts"

describe("Result", () => {
  test("should map value without change the original reference", () => {
    const content = Result.Ok("content")
    const html = content.map((value) => `<div>${value}</div>`)
    expect(html.ok().orElse("fallback")).toBe("<div>content</div>")
  })

  test("should correctly render when apply toString()", () => {
    const content = Result.Ok("content")
    const html = content.map((value) => `<div>${value}</div>`)
    expect(html.toString()).toBe("Ok ( <div>content</div> )")
  })

  test("should return true when the Result is an Error", () => {
    const error = Result.Error("error")
    expect(error.isError()).toBe(true)
  })

  test("should return false when the Result is Ok", () => {
    const ok = Result.Ok("ok")
    expect(ok.isError()).toBe(false)
  })

  test("should correctly render when apply toString() to an Error", () => {
    const error = Result.Error("error")
    expect(error.toString()).toBe("Error ( error )")
  })

  test("should flatMap value without stacking Result", () => {
    const content = Result.Ok("content")
    const html = content.flatMap((value) => Result.Ok(`<div>${value}</div>`))
    expect(html.ok().orElse("fallback")).toBe("<div>content</div>")
  })

  test("should match Ok value", () => {
    const content = Result.Ok("content")
    const result = content.match(
      (value) => `Ok: ${value}`,
      (error) => `Error: ${error}`,
    )
    expect(result).toBe("Ok: content")
  })

  test("should match Error value", () => {
    const content = Result.Error("error")
    const result = content.match(
      (value) => `Ok: ${value}`,
      (error) => `Error: ${error}`,
    )
    expect(result).toBe("Error: error")
  })

  test("should return Some when the Result is Ok", () => {
    const ok = Result.Ok("ok")
    const some = ok.ok()
    expect(some.isOk()).toBe(true)
    expect(some.orElse("fallback")).toBe("ok")
  })

  test("should return None when the Result is an Error", () => {
    const error = Result.Error("error")
    const none = error.ok()
    expect(none.isOk()).toBe(false)
  })
})
