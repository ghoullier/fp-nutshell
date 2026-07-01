import { describe, expect, test } from "bun:test"

import { Product, Str, Sum } from "./Semigroup.ts"

describe("Semigroup", () => {
  describe("Sum", () => {
    test("should add values via concat", () => {
      const a = new Sum(3)
      const b = new Sum(5)
      expect(a.concat(b).value).toBe(8)
    })

    test("should satisfy associativity law", () => {
      const a = new Sum(1)
      const b = new Sum(2)
      const c = new Sum(3)
      expect(a.concat(b).concat(c).value).toBe(a.concat(b.concat(c)).value)
    })

    test("should correctly render when apply toString()", () => {
      const a = new Sum(42)
      expect(a.toString()).toBe("Sum(42)")
    })
  })

  describe("Product", () => {
    test("should multiply values via concat", () => {
      const a = new Product(3)
      const b = new Product(5)
      expect(a.concat(b).value).toBe(15)
    })

    test("should satisfy associativity law", () => {
      const a = new Product(2)
      const b = new Product(3)
      const c = new Product(4)
      expect(a.concat(b).concat(c).value).toBe(a.concat(b.concat(c)).value)
    })

    test("should correctly render when apply toString()", () => {
      const a = new Product(7)
      expect(a.toString()).toBe("Product(7)")
    })
  })

  describe("Str", () => {
    test("should concatenate strings via concat", () => {
      const a = new Str("hello")
      const b = new Str(" world")
      expect(a.concat(b).value).toBe("hello world")
    })

    test("should satisfy associativity law", () => {
      const a = new Str("foo")
      const b = new Str("bar")
      const c = new Str("baz")
      expect(a.concat(b).concat(c).value).toBe(a.concat(b.concat(c)).value)
    })

    test("should correctly render when apply toString()", () => {
      const a = new Str("hello")
      expect(a.toString()).toBe("Str(hello)")
    })
  })
})
