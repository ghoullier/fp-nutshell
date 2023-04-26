import type { Mapper } from "./Mapper.js";

interface Some<Value> {
  value: Value;
}

interface None<Value> {}

type $Option<Value> = Some<Value> | None<Value>;

export class Option<Value> {
  readonly #option: $Option<Value>;
  static Some<Value>(value: Value): Option<Value> {
    return new Option({ value });
  }
  static None<Value>(): Option<Value> {
    return new Option({});
  }
  private constructor(option: $Option<Value>) {
    this.#option = option;
  }
  isOk(): boolean {
    return "value" in this.#option;
  }
  orElse(fallback: Value): Value {
    if (this.isOk()) {
      return (this.#option as Some<Value>).value;
    }
    return fallback;
  }
  toString(): string {
    if (this.isOk()) {
      return `Some(${(this.#option as Some<Value>).value})`;
    }
    return "None";
  }
  map<Result>(mapper: Mapper<Value, Result>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return Option.Some(mapper((this.#option as Some<Value>).value));
  }
  flatMap<Result>(mapper: Mapper<Value, Option<Result>>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return mapper((this.#option as Some<Value>).value);
  }
}
