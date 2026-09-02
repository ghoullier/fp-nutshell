import { describe, expect, test } from "bun:test"
import { Option } from "./Option.ts"
import { Result } from "./Result.ts"
import {
  sequence,
  sequenceResult,
  traverse,
  traverseResult,
} from "./Traversable.ts"

describe("traverse", () => {
  test("with all Some results returns Some of array", () => {
    const result = traverse([1, 2, 3], (n) => Option.Some(n * 2))
    expect(result.isOk()).toBe(true)
    expect(result.orElse([])).toEqual([2, 4, 6])
  })

  test("with a None result returns None", () => {
    const result = traverse([1, 2, 3], (n) =>
      n === 2 ? Option.None() : Option.Some(n * 2),
    )
    expect(result.isOk()).toBe(false)
  })
})

describe("sequence", () => {
  test("collects all Some values into Some array", () => {
    const result = sequence([
      Option.Some(1),
      Option.Some(2),
      Option.Some(3),
    ])
    expect(result.isOk()).toBe(true)
    expect(result.orElse([])).toEqual([1, 2, 3])
  })

  test("with any None returns None", () => {
    const result = sequence([
      Option.Some(1),
      Option.None(),
      Option.Some(3),
    ])
    expect(result.isOk()).toBe(false)
  })
})

describe("traverseResult", () => {
  test("with all Ok returns Ok of array", () => {
    const result = traverseResult([1, 2, 3], (n) =>
      Result.Ok<number, string>(n * 2),
    )
    expect(result.isError()).toBe(false)
    expect(result.match((v) => v, () => [])).toEqual([2, 4, 6])
  })

  test("with an Error returns the first Error", () => {
    const result = traverseResult([1, 2, 3], (n) =>
      n === 2
        ? Result.Error<number, string>("failed at 2")
        : Result.Ok<number, string>(n * 2),
    )
    expect(result.isError()).toBe(true)
    expect(result.match(() => "", (e) => e)).toBe("failed at 2")
  })
})

describe("sequenceResult", () => {
  test("collects all Ok values into Ok array", () => {
    const result = sequenceResult([
      Result.Ok<number, string>(1),
      Result.Ok<number, string>(2),
      Result.Ok<number, string>(3),
    ])
    expect(result.isError()).toBe(false)
    expect(result.match((v) => v, () => [])).toEqual([1, 2, 3])
  })

  test("with any Error returns the first Error", () => {
    const result = sequenceResult([
      Result.Ok<number, string>(1),
      Result.Error<number, string>("oops"),
      Result.Ok<number, string>(3),
    ])
    expect(result.isError()).toBe(true)
    expect(result.match(() => "", (e) => e)).toBe("oops")
  })
})
