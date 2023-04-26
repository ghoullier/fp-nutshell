export class Container<Value> {
  readonly #value: Value;
  constructor(value: Value) {
    this.#value = value;
  }
  getValue(): Value {
    return this.#value;
  }
}
