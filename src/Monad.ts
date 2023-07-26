import { Container } from "./Container.js";

import type { Mapper } from "./Mapper.js";

export class Monad<const Value> extends Container<Value> {
  map<const Result>(mapper: Mapper<Value, Result>): Monad<Result> {
    return new Monad(mapper(this.value));
  }
  flatMap<const Result>(mapper: Mapper<Value, Monad<Result>>): Monad<Result> {
    return mapper(this.value);
  }
}
