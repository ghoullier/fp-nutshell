import { describe, expect, test } from "bun:test"

import { Foldable } from "./Foldable.ts"

describe("Foldable", () => {
  test("of creates a Foldable from values", () => {
    const foldable = Foldable.of(1, 2, 3)
    expect(foldable.values).toEqual([1, 2, 3])
  })

  test("reduce sums numbers left-to-right", () => {
    const foldable = Foldable.of(1, 2, 3, 4)
    const sum = foldable.reduce((acc, value) => acc + value, 0)
    expect(sum).toBe(10)
  })

  test("reduceRight builds a string right-to-left", () => {
    const foldable = Foldable.of("a", "b", "c")
    const result = foldable.reduceRight((acc, value) => acc + value, "")
    expect(result).toBe("cba")
  })

  test("fold combines with a binary operation", () => {
    const foldable = Foldable.of(1, 2, 3, 4)
    const product = foldable.fold((a, b) => a * b, 1)
    expect(product).toBe(24)
  })

  test("fold on empty Foldable returns the identity", () => {
    const foldable = Foldable.of<number>()
    const result = foldable.fold((a, b) => a + b, 0)
    expect(result).toBe(0)
  })

  test("toArray extracts values", () => {
    const foldable = Foldable.of(1, 2, 3)
    expect(foldable.toArray()).toEqual([1, 2, 3])
  })

  test("should correctly render when apply toString()", () => {
    const foldable = Foldable.of(1, 2, 3)
    expect(foldable.toString()).toBe("Foldable([1, 2, 3])")
  })
})
