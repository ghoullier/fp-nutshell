import { describe, expect, test } from "bun:test"

import { curry, partial } from "./Curry.ts"

describe("curry", () => {
  test("should convert a binary function into nested unary calls", () => {
    const add = (a: number, b: number) => a + b
    const curried = curry(add)
    expect(curried(1)(2)).toBe(3)
  })

  test("should convert a ternary function correctly", () => {
    const volume = (l: number, w: number, h: number) => l * w * h
    const curried = curry(volume)
    expect(curried(2)(3)(4)).toBe(24)
  })

  test("should maintain correct types", () => {
    const concat = (a: string, b: string) => `${a}${b}`
    const curried = curry(concat)
    const result: string = curried("hello ")("world")
    expect(result).toBe("hello world")
  })
})

describe("partial", () => {
  test("should fix the first argument", () => {
    const add = (a: number, b: number) => a + b
    const add10 = partial(add, 10)
    expect(add10(5)).toBe(15)
  })

  test("should fix multiple arguments", () => {
    const sum3 = (a: number, b: number, c: number) => a + b + c
    const sum10and20 = partial(sum3, 10, 20)
    expect(sum10and20(3)).toBe(33)
  })

  test("should maintain correct types", () => {
    const greet = (greeting: string, name: string) => `${greeting}, ${name}!`
    const hello = partial(greet, "Hello")
    const result: string = hello("World")
    expect(result).toBe("Hello, World!")
  })
})
