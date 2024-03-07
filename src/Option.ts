import { Container } from "./Container.ts";
import type { Mapper } from "./Mapper.ts";

interface Some<Value> {
  value: Value;
}

interface None {}

type $Option<Value> = Some<Value> | None;

/**
 * A container for a value that may or may not exist.
 * @extends Container
 */
export class Option<const Value> extends Container<$Option<Value>> {
  /**
   * Creates a container with a value.
   * @param {Value} value
   * @returns {Option<Value>}
   */
  static Some<const Value>(value: Value): Option<Value> {
    return new Option({ value });
  }
  /**
   * Creates a container with no value.
   * @returns {Option<Value>}
   */
  static None<const Value>(): Option<Value> {
    return new Option({});
  }
  /**
   * Checks if the container contains a value.
   * @returns {boolean}
   */
  isOk(): boolean {
    return "value" in this.value;
  }
  /**
   * Extracts the value from the container with a fallback value.
   * @param {Value} fallback
   * @returns {Value}
   */
  orElse(fallback: Value): Value {
    if (this.isOk()) {
      return (this.value as Some<Value>).value;
    }
    return fallback;
  }
  /**
   * Returns a readable string of the container.
   * @returns {string}
   */
  override toString(): string {
    if (this.isOk()) {
      return `Some(${String((this.value as Some<Value>).value)})`;
    }
    return "None";
  }
  /**
   * Maps the value of the container to a new value.
   * @param {Mapper<Value, Result>} mapper
   * @returns {Option<Result>}
   */
  map<const Result>(mapper: Mapper<Value, Result>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return Option.Some(mapper((this.value as Some<Value>).value));
  }
  /**
   * Flat maps the value of the container to a new container.
   * @param {Mapper<Value, Option<Result>>} mapper
   * @returns {Option<Result>}
   */
  flatMap<const Result>(mapper: Mapper<Value, Option<Result>>): Option<Result> {
    if (!this.isOk()) {
      return Option.None();
    }
    return mapper((this.value as Some<Value>).value);
  }
}
