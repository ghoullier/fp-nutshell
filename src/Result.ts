import { Container } from "./Container.ts";
import { Option } from "./Option.ts";

import type { Mapper } from "./Mapper.ts";

interface Failure<Error> {
  error: Error;
}

interface Success<Value> {
  value: Value;
}

type $Result<Value, Error> = Success<Value> | Failure<Error>;

export class Result<const Value, const Error> extends Container<
  $Result<Value, Error>
> {
  static Ok<Value, Error>(value: Value): Result<Value, Error> {
    return new this({ value });
  }
  static Error<Value, Error>(error: Error): Result<Value, Error> {
    return new this({ error });
  }
  isError(): boolean {
    return "error" in this.value;
  }
  override toString(): string {
    if (this.isError()) {
      return `Error ( ${String((this.value as Failure<Error>).error)} )`;
    }
    return `Ok ( ${String((this.value as Success<Value>).value)} )`;
  }
  map<Output>(mapper: Mapper<Value, Output>): Result<Output, Error> {
    if (this.isError()) {
      return Result.Error((this.value as Failure<Error>).error);
    }
    return Result.Ok(mapper((this.value as Success<Value>).value));
  }
  flatMap<Output>(
    mapper: Mapper<Value, Result<Output, Error>>
  ): Result<Output, Error> {
    if (this.isError()) {
      return Result.Error((this.value as Failure<Error>).error);
    }
    return mapper((this.value as Success<Value>).value);
  }
  match<Output>(
    resolve: Mapper<Value, Output>,
    reject: Mapper<Error, Output>
  ): Output {
    if (this.isError()) {
      return reject((this.value as Failure<Error>).error);
    }
    return resolve((this.value as Success<Value>).value);
  }
  ok(): Option<Value> {
    if (this.isError()) {
      return Option.None();
    }
    return Option.Some((this.value as Success<Value>).value);
  }
}
