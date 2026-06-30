import { describe, expect, test } from "bun:test"
import { Functor } from "./Functor.ts"
import { constant, identity } from "./Identity.ts"

describe("identity", () => {
  test("should return the same value for primitives", () => {
    expect(identity(42)).toBe(42)
    expect(identity("hello")).toBe("hello")
    expect(identity(true)).toBe(true)
  })

  test("should return the same reference for objects", () => {
    const obj = { a: 1 }
    expect(identity(obj)).toBe(obj)
  })
})

describe("constant", () => {
  test("should always return the captured value regardless of input", () => {
    const always42 = constant(42)
    expect(always42("ignored")).toBe(42)
    expect(always42(undefined)).toBe(42)
    expect(always42(null)).toBe(42)
    expect(always42(999)).toBe(42)
  })
})

describe("functor identity law", () => {
  test("functor.map(identity) should equal the original functor", () => {
    const functor = new Functor(42)
    const mapped = functor.map(identity)
    expect(mapped.value).toEqual(functor.value)
  })
})
