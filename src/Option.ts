import { Container } from "./Container.js";
import type { Mapper } from "./Mapper.js";

interface Some<Value> {
  value: Value;
}

interface None {}

type $Option<Value> = Some<Value> | None;

export class Option<const Value> extends Container<$Option<Value>>{
  static Some<const Value>(value: Value): Option<Value> {
    return new Option({ value });
  }
  static None<const Value>(): Option<Value> {
    return new Option({});
  }
  isOk(): boolean {
    return "value" in this.value;
  }
  orElse(fallback: Value): Value {
    if (this.isOk()) {
      return (this.value as Some<Value>).value;
    }
    return fallback;
  }
  override toString(): string {
    if (this.isOk()) {
      return `Some(${String((this.value as Some<Value>).value)})`;
    }
    return "None";
  }
  map<const Result>(mapper: Mapper<Value, Result>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return Option.Some(mapper((this.value as Some<Value>).value));
  }
  flatMap<const Result>(mapper: Mapper<Value, Option<Result>>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return mapper((this.value as Some<Value>).value);
  }
}
