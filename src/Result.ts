import { Option } from "./Option.js";

import type { Mapper } from "./Mapper.js";

interface Failure<Error> {
  error: Error;
}

interface Success<Value> {
  value: Value;
}

type $Result<Value, Error> = Success<Value> | Failure<Error>;

export class Result<Value, Error> {
  readonly #result: $Result<Value, Error>;
  static Ok<Value, Error>(value: Value): Result<Value, Error> {
    return new this({ value });
  }
  static Error<Value, Error>(error: Error): Result<Value, Error> {
    return new this({ error });
  }
  private constructor(result: $Result<Value, Error>) {
    this.#result = result;
  }
  isError(): boolean {
    return "error" in this.#result;
  }
  toString(): string {
    if (this.isError()) {
      return `Error ( ${(this.#result as Failure<Error>).error} )`;
    }
    return `Ok ( ${(this.#result as Success<Value>).value} )`;
  }
  map<Output>(mapper: Mapper<Value, Output>): Result<Output, Error> {
    if (this.isError()) {
      return Result.Error((this.#result as Failure<Error>).error);
    }
    return Result.Ok(mapper((this.#result as Success<Value>).value));
  }
  flatMap<Output>(
    mapper: Mapper<Value, Result<Output, Error>>
  ): Result<Output, Error> {
    if (this.isError()) {
      return Result.Error((this.#result as Failure<Error>).error);
    }
    return mapper((this.#result as Success<Value>).value);
  }
  match<Output>(
    resolve: Mapper<Value, Output>,
    reject: Mapper<Error, Output>
  ): Output {
    if (this.isError()) {
      return reject((this.#result as Failure<Error>).error);
    }
    return resolve((this.#result as Success<Value>).value);
  }
  ok(): Option<Value> {
    if (this.isError()) {
      return Option.None();
    }
    return Option.Some((this.#result as Success<Value>).value);
  }
}
