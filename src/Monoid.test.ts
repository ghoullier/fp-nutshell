import { describe, expect, test } from "bun:test"

import { Product, Str, Sum } from "./Semigroup.ts"
import {
  ProductMonoid,
  StrMonoid,
  SumMonoid,
  concatAll,
} from "./Monoid.ts"

describe("Monoid", () => {
  describe("SumMonoid", () => {
    test("empty() returns Sum(0)", () => {
      expect(SumMonoid.empty().value).toBe(0)
    })

    test("satisfies right identity: a.concat(empty) === a", () => {
      const a = new Sum(42)
      expect(a.concat(SumMonoid.empty()).value).toBe(a.value)
    })

    test("satisfies left identity: empty.concat(a) === a", () => {
      const a = new Sum(42)
      expect(SumMonoid.empty().concat(a).value).toBe(a.value)
    })
  })

  describe("ProductMonoid", () => {
    test("empty() returns Product(1)", () => {
      expect(ProductMonoid.empty().value).toBe(1)
    })

    test("satisfies right identity: a.concat(empty) === a", () => {
      const a = new Product(7)
      expect(a.concat(ProductMonoid.empty()).value).toBe(a.value)
    })

    test("satisfies left identity: empty.concat(a) === a", () => {
      const a = new Product(7)
      expect(ProductMonoid.empty().concat(a).value).toBe(a.value)
    })
  })

  describe("StrMonoid", () => {
    test("empty() returns Str('')", () => {
      expect(StrMonoid.empty().value).toBe("")
    })

    test("satisfies right identity: a.concat(empty) === a", () => {
      const a = new Str("hello")
      expect(a.concat(StrMonoid.empty()).value).toBe(a.value)
    })

    test("satisfies left identity: empty.concat(a) === a", () => {
      const a = new Str("hello")
      expect(StrMonoid.empty().concat(a).value).toBe(a.value)
    })
  })

  describe("concatAll", () => {
    test("folds an array of Sum values", () => {
      const values = [new Sum(1), new Sum(2), new Sum(3)]
      expect(concatAll(SumMonoid, values).value).toBe(6)
    })

    test("folds an array of Product values", () => {
      const values = [new Product(2), new Product(3), new Product(4)]
      expect(concatAll(ProductMonoid, values).value).toBe(24)
    })

    test("folds an array of Str values", () => {
      const values = [new Str("a"), new Str("b"), new Str("c")]
      expect(concatAll(StrMonoid, values).value).toBe("abc")
    })

    test("returns identity for an empty array", () => {
      expect(concatAll(SumMonoid, []).value).toBe(0)
      expect(concatAll(ProductMonoid, []).value).toBe(1)
      expect(concatAll(StrMonoid, []).value).toBe("")
    })
  })
})
