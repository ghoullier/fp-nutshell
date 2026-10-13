import { describe, expect, test } from "bun:test"

import { Either } from "./Either.ts"

describe("Either", () => {
  test("Left creates a Left variant", () => {
    const either = Either.Left("hello")
    expect(either.isLeft()).toBe(true)
    expect(either.isRight()).toBe(false)
  })

  test("Right creates a Right variant", () => {
    const either = Either.Right(42)
    expect(either.isRight()).toBe(true)
    expect(either.isLeft()).toBe(false)
  })

  test("isLeft returns true for Left", () => {
    expect(Either.Left("x").isLeft()).toBe(true)
  })

  test("isRight returns true for Right", () => {
    expect(Either.Right("x").isRight()).toBe(true)
  })

  test("map transforms the Right value", () => {
    const either = Either.Right<string, number>(10)
    const mapped = either.map((x) => x * 2)
    expect(mapped.getOrElse(0)).toBe(20)
  })

  test("map passes through Left unchanged", () => {
    const either = Either.Left<string, number>("error")
    const mapped = either.map((x) => x * 2)
    expect(mapped.isLeft()).toBe(true)
    expect(mapped.toString()).toBe("Left(error)")
  })

  test("mapLeft transforms the Left value", () => {
    const either = Either.Left<string, number>("hello")
    const mapped = either.mapLeft((s) => s.toUpperCase())
    expect(mapped.toString()).toBe("Left(HELLO)")
  })

  test("mapLeft passes through Right unchanged", () => {
    const either = Either.Right<string, number>(42)
    const mapped = either.mapLeft((s) => s.toUpperCase())
    expect(mapped.isRight()).toBe(true)
    expect(mapped.getOrElse(0)).toBe(42)
  })

  test("flatMap chains on Right", () => {
    const either = Either.Right<string, number>(5)
    const result = either.flatMap((x) => Either.Right(x + 1))
    expect(result.getOrElse(0)).toBe(6)
  })

  test("flatMap passes through Left", () => {
    const either = Either.Left<string, number>("fail")
    const result = either.flatMap((x) => Either.Right(x + 1))
    expect(result.isLeft()).toBe(true)
  })

  test("match dispatches to onLeft for Left", () => {
    const either = Either.Left<string, number>("left")
    const output = either.match(
      (l) => `Left: ${l}`,
      (r) => `Right: ${r}`,
    )
    expect(output).toBe("Left: left")
  })

  test("match dispatches to onRight for Right", () => {
    const either = Either.Right<string, number>(99)
    const output = either.match(
      (l) => `Left: ${l}`,
      (r) => `Right: ${r}`,
    )
    expect(output).toBe("Right: 99")
  })

  test("getOrElse returns Right value when Right", () => {
    const either = Either.Right<string, number>(7)
    expect(either.getOrElse(0)).toBe(7)
  })

  test("getOrElse returns fallback when Left", () => {
    const either = Either.Left<string, number>("nope")
    expect(either.getOrElse(0)).toBe(0)
  })

  test("functor identity law: map(x => x) equals original", () => {
    const either = Either.Right<string, number>(42)
    const mapped = either.map((x) => x)
    expect(mapped.getOrElse(0)).toBe(either.getOrElse(0))
  })

  test("toString returns Left(<value>) for Left", () => {
    expect(Either.Left("abc").toString()).toBe("Left(abc)")
  })

  test("toString returns Right(<value>) for Right", () => {
    expect(Either.Right(123).toString()).toBe("Right(123)")
  })
})
