import { Container } from "./Container.js";

import type { Mapper } from "./Mapper.js";

export class Monad<Value> extends Container<Value> {
  map<Result>(mapper: Mapper<Value, Result>): Monad<Result> {
    return new Monad(mapper(this.getValue()));
  }
  flatMap<Result>(mapper: Mapper<Value, Monad<Result>>): Monad<Result> {
    return mapper(this.getValue());
  }
}
