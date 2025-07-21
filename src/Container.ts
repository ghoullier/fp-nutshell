/**
 * A container for a value.
 */
export class Container<const Value> {
  readonly #value: Value
  constructor(value: Value) {
    this.#value = value
  }
  /**
   * The value contained in the container.
   */
  get value(): Value {
    return this.#value
  }

  /**
   * Returns a string representation of the container.
   * @returns {string}
   */
  toString(): string {
    return `Container(${String(this.value)})`
  }
}
