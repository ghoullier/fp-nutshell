import type { Semigroup } from "./Semigroup.ts"
import { Product, Str, Sum } from "./Semigroup.ts"

/**
 * A Monoid is a Semigroup with an identity element (`empty`).
 * For any value a:
 *   a.concat(empty) === a  (right identity)
 *   empty.concat(a) === a  (left identity)
 */
export interface Monoid<T> extends Semigroup<T> {}

/**
 * A constructor-like type that provides the identity element for a Monoid.
 * Since TypeScript interfaces cannot enforce static methods, we use a
 * separate type to represent the "companion object" of a Monoid.
 */
export type MonoidConstructor<T> = { empty(): T }

/**
 * MonoidConstructor for Sum — identity element is 0.
 */
export const SumMonoid: MonoidConstructor<Sum> = {
  empty(): Sum {
    return new Sum(0)
  },
}

/**
 * MonoidConstructor for Product — identity element is 1.
 */
export const ProductMonoid: MonoidConstructor<Product> = {
  empty(): Product {
    return new Product(1)
  },
}

/**
 * MonoidConstructor for Str — identity element is the empty string.
 */
export const StrMonoid: MonoidConstructor<Str> = {
  empty(): Str {
    return new Str("")
  },
}

/**
 * Folds an array of monoidal values into a single value using the
 * monoid's identity element as the starting accumulator.
 * Returns `monoid.empty()` for an empty array.
 */
export function concatAll<T extends Semigroup<T>>(
  monoid: MonoidConstructor<T>,
  values: T[],
): T {
  return values.reduce(
    (acc, value) => acc.concat(value),
    monoid.empty(),
  )
}
