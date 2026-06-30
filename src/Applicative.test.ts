import { describe, expect, test } from "bun:test"

import { Applicative } from "./Applicative.ts"
import { identity } from "./Identity.ts"

describe("Applicative", () => {
  test("of wraps a value", () => {
    const a = Applicative.of(42)
    expect(a.value).toBe(42)
  })

  test("map transforms the value (functor behavior)", () => {
    const a = Applicative.of(3)
    const b = a.map((x) => x * 2)
    expect(b.value).toBe(6)
    expect(a.value).toBe(3)
  })

  test("ap applies a wrapped function to a wrapped value", () => {
    const value = Applicative.of(5)
    const fn = Applicative.of((x: number) => x + 1)
    expect(value.ap(fn).value).toBe(6)
  })

  test("identity law: v.ap(Applicative.of(identity)) equals v", () => {
    const v = Applicative.of(42)
    const result = v.ap(Applicative.of(identity))
    expect(result.value).toBe(v.value)
  })

  test("homomorphism law: Applicative.of(x).ap(Applicative.of(f)) equals Applicative.of(f(x))", () => {
    const f = (x: number) => x * 3
    const x = 7
    const left = Applicative.of(x).ap(Applicative.of(f))
    const right = Applicative.of(f(x))
    expect(left.value).toBe(right.value)
  })

  test("combining two Applicatives with a curried function", () => {
    const add = (a: number) => (b: number) => a + b
    const a = Applicative.of(3)
    const b = Applicative.of(4)
    const result = b.ap(a.ap(Applicative.of(add)))
    expect(result.value).toBe(7)
  })

  test("toString returns readable representation", () => {
    const a = Applicative.of("hello")
    expect(a.toString()).toBe("Applicative(hello)")
  })
})
