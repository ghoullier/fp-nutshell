/**
 * Returns its argument unchanged.
 * This is a fundamental combinator used to verify functor and monad identity laws.
 * @example identity(42) // 42
 */
export const identity = <const T>(value: T): T => value

/**
 * Returns a function that always returns the captured value, ignoring its argument.
 * This is a fundamental combinator used to express and verify algebraic laws.
 * @example constant(42)("ignored") // 42
 */
export const constant =
  <const T>(value: T) =>
  (_: unknown): T =>
    value
