/**
 * Converts a function of N arguments into a chain of N unary functions.
 * Transforms f(a, b, c) into f(a)(b)(c).
 *
 * @example
 * const add = (a: number, b: number) => a + b
 * const curriedAdd = curry(add)
 * curriedAdd(1)(2) // 3
 */
export function curry<A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R
export function curry<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
): (a: A) => (b: B) => (c: C) => R
export function curry<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
): (a: A) => (b: B) => (c: C) => (d: D) => R
export function curry(fn: (...args: unknown[]) => unknown) {
  const arity = fn.length
  const resolve =
    (acc: unknown[]) =>
    (arg: unknown): unknown => {
      const args = [...acc, arg]
      return args.length >= arity ? fn(...args) : resolve(args)
    }
  return resolve([])
}

/**
 * Partially applies arguments to a function, returning a new function
 * expecting the remaining arguments.
 *
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c
 * const add10 = partial(add, 10)
 * add10(5, 3) // 18
 */
export function partial<A, B, R>(fn: (a: A, b: B) => R, a: A): (b: B) => R
export function partial<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  a: A,
): (b: B, c: C) => R
export function partial<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  a: A,
  b: B,
): (c: C) => R
export function partial<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  a: A,
  b: B,
  c: C,
): (d: D) => R
export function partial(
  fn: (...args: unknown[]) => unknown,
  ...applied: unknown[]
) {
  return (...remaining: unknown[]) => fn(...applied, ...remaining)
}
