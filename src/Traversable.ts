import { Option } from "./Option.ts"
import { Result } from "./Result.ts"

/**
 * Traversable utilities invert nested structures.
 * For example, `Array<Option<T>>` becomes `Option<Array<T>>`,
 * enabling "fail-fast" collection processing: if any element
 * fails (None or Error), the entire result fails immediately.
 */

/**
 * Maps each element through a function returning Option, then flips
 * the structure: if all results are Some, returns Some of the array;
 * if any is None, returns None.
 * @param values - The array of values to traverse
 * @param fn - A function mapping each value to an Option
 * @returns Option containing the array of results, or None
 */
export function traverse<T, R>(
  values: T[],
  fn: (value: T) => Option<R>,
): Option<R[]> {
  const results: R[] = []
  for (const value of values) {
    const result = fn(value)
    if (!result.isOk()) {
      return Option.None()
    }
    results.push(result.orElse(undefined as never))
  }
  return Option.Some(results)
}

/**
 * Flips an `Option<T>[]` into an `Option<T[]>`.
 * If all values are Some, returns Some of the array;
 * if any is None, returns None.
 * @param values - The array of Options to sequence
 * @returns Option containing the array of unwrapped values, or None
 */
export function sequence<T>(values: Option<T>[]): Option<T[]> {
  return traverse(values, (v) => v)
}

/**
 * Maps each element through a function returning Result, then flips
 * the structure: if all results are Ok, returns Ok of the array;
 * if any is Error, returns the first Error.
 * @param values - The array of values to traverse
 * @param fn - A function mapping each value to a Result
 * @returns Result containing the array of results, or the first Error
 */
export function traverseResult<T, R, E>(
  values: T[],
  fn: (value: T) => Result<R, E>,
): Result<R[], E> {
  const results: R[] = []
  for (const value of values) {
    const result = fn(value)
    if (result.isError()) {
      return Result.Error(
        result.match(
          () => undefined as never,
          (e) => e,
        ),
      )
    }
    results.push(
      result.match(
        (v) => v,
        () => undefined as never,
      ),
    )
  }
  return Result.Ok(results)
}

/**
 * Flips a `Result<T, E>[]` into a `Result<T[], E>`.
 * If all values are Ok, returns Ok of the array;
 * if any is Error, returns the first Error.
 * @param values - The array of Results to sequence
 * @returns Result containing the array of unwrapped values, or the first Error
 */
export function sequenceResult<T, E>(
  values: Result<T, E>[],
): Result<T[], E> {
  return traverseResult(values, (v) => v)
}
