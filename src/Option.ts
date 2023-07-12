import type { Mapper } from "./Mapper.js";

interface Some<Value> {
  value: Value;
}

interface None {}

type $Option<Value> = Some<Value> | None;

export class Option<const Value> {
  readonly #option: $Option<Value>;
  static Some<const Value>(value: Value): Option<Value> {
    return new Option({ value });
  }
  static None<const Value>(): Option<Value> {
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
      return `Some(${String((this.#option as Some<Value>).value)})`;
    }
    return "None";
  }
  map<const Result>(mapper: Mapper<Value, Result>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return Option.Some(mapper((this.#option as Some<Value>).value));
  }
  flatMap<const Result>(mapper: Mapper<Value, Option<Result>>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return mapper((this.#option as Some<Value>).value);
  }
}
