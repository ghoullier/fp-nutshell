import { Container } from "./Container.ts"

import type { Mapper } from "./Mapper.ts"

/**
 * An Applicative functor — sits between Functor and Monad in the type class hierarchy.
 *
 * While a Functor lets you apply a plain function to a wrapped value (`map`),
 * an Applicative lets you apply a *wrapped* function to a wrapped value (`ap`).
 * This enables combining independent effects without sequencing them
 * (unlike Monad, which sequences dependent effects via `flatMap`).
 *
 * Laws:
 * - Identity: `v.ap(Applicative.of(identity))` ≡ `v`
 * - Homomorphism: `Applicative.of(x).ap(Applicative.of(f))` ≡ `Applicative.of(f(x))`
 * - Interchange: `Applicative.of(x).ap(u)` ≡ `u.ap(Applicative.of(f => f(x)))`
 *
 * @extends Container
 */
export class Applicative<const Value> extends Container<Value> {
  /**
   * Lifts a value into the Applicative context (pure/unit).
   */
  static of<const V>(value: V): Applicative<V> {
    return new Applicative(value)
  }

  /**
   * Maps the value of the container to a new value (functor behavior).
   * @param {Mapper<Value, Result>} mapper
   * @returns {Applicative<Result>}
   */
  map<const Result>(mapper: Mapper<Value, Result>): Applicative<Result> {
    return new Applicative(mapper(this.value))
  }

  /**
   * Applies a wrapped function to this wrapped value.
   *
   * Convention: `value.ap(wrappedFn)` — the receiver holds the value,
   * and the argument holds the function to apply.
   *
   * @param {Applicative<Mapper<Value, Result>>} fn - An Applicative containing a function
   * @returns {Applicative<Result>}
   */
  ap<const Result>(
    fn: Applicative<Mapper<Value, Result>>,
  ): Applicative<Result> {
    return new Applicative(fn.value(this.value))
  }

  /**
   * Returns a readable string of the container.
   * @returns {string}
   */
  override toString(): string {
    return `Applicative(${String(this.value)})`
  }
}
