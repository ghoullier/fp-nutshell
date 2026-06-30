import { describe, expect, test } from "bun:test"

import { flow, pipe } from "./Pipe.ts"

describe("pipe", () => {
  test("should return the value when no functions are provided", () => {
    expect(pipe(5)).toBe(5)
  })

  test("should apply a single function to a value", () => {
    const result = pipe(5, (n) => n * 2)
    expect(result).toBe(10)
  })

  test("should thread a value through multiple transformations", () => {
    const result = pipe(
      5,
      (n) => n * 2,
      (n) => n + 1,
      (n) => String(n),
    )
    expect(result).toBe("11")
  })

  test("should preserve type inference through the pipeline", () => {
    const result = pipe(
      "hello",
      (s) => s.length,
      (n) => n > 3,
    )
    expect(result).toBe(true)
  })
})

describe("flow", () => {
  test("should create a composed function from a single function", () => {
    const double = flow((n: number) => n * 2)
    expect(double(5)).toBe(10)
  })

  test("should create a composed function that can be reused", () => {
    const transform = flow(
      (n: number) => n * 2,
      (n) => n + 1,
      (n) => String(n),
    )
    expect(transform(5)).toBe("11")
    expect(transform(10)).toBe("21")
  })

  test("should compose multiple functions left to right", () => {
    const process = flow(
      (s: string) => s.trim(),
      (s) => s.toUpperCase(),
      (s) => s.split(" "),
      (arr) => arr.length,
    )
    expect(process("  hello world  ")).toBe(2)
  })

  test("should preserve type inference through the composition", () => {
    const isLong = flow(
      (s: string) => s.length,
      (n) => n > 3,
    )
    expect(isLong("hi")).toBe(false)
    expect(isLong("hello")).toBe(true)
  })
})
