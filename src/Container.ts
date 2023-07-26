export class Container<const Value> {
  readonly #value: Value;
  constructor(value: Value) {
    this.#value = value;
  }
  get value(): Value {
    return this.#value;
  }
}
