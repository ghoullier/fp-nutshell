/**
 * Foldable represents structures that can be reduced (collapsed) to a single value.
 * It generalizes the concept of folding/reducing over a collection of values.
 */
export class Foldable<const Value> {
  readonly #values: Value[]

  constructor(values: Value[]) {
    this.#values = values
  }

  /**
   * Creates a Foldable from the given values.
   */
  static of<const V>(...values: V[]): Foldable<V> {
    return new Foldable(values)
  }

  /**
   * The values contained in the Foldable.
   */
  get values(): Value[] {
    return this.#values
  }

  /**
   * Left fold: reduces values from left to right using a reducer function and initial accumulator.
   */
  reduce<Acc>(reducer: (acc: Acc, value: Value) => Acc, initial: Acc): Acc {
    return this.#values.reduce(reducer, initial)
  }

  /**
   * Right fold: reduces values from right to left using a reducer function and initial accumulator.
   */
  reduceRight<Acc>(
    reducer: (acc: Acc, value: Value) => Acc,
    initial: Acc,
  ): Acc {
    return this.#values.reduceRight(reducer, initial)
  }

  /**
   * Folds the structure using a binary combine function and an identity (empty) value.
   */
  fold(combine: (a: Value, b: Value) => Value, empty: Value): Value {
    return this.#values.reduce(combine, empty)
  }

  /**
   * Extracts the values as an array.
   */
  toArray(): Value[] {
    return this.#values
  }

  /**
   * Returns a string representation of the Foldable.
   */
  toString(): string {
    return `Foldable([${this.#values.map(String).join(", ")}])`
  }
}
