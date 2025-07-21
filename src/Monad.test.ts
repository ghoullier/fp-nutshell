import { describe, expect, test } from "bun:test"

import { Monad } from "./Monad.ts"

describe("Monad", () => {
  test("should map value without change the original reference", () => {
    const content = new Monad("content")
    const html = content.map((value) => `<div>${value}</div>`)
    expect(content.value).toBe("content")
    expect(html.value).toBe("<div>content</div>")
  })

  test("should flatMap value without stacking Monad", () => {
    const content = new Monad("content")
    const html = content.flatMap((value) => new Monad(`<div>${value}</div>`))
    expect(content.value).toBe("content")
    expect(html.value).toBe("<div>content</div>")
  })

  test("should correctly render when apply toString()", () => {
    const content = new Monad("content")
    expect(content.toString()).toBe("Monad(content)")
  })
})
