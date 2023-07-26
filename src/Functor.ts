import { Container } from "./Container.js";

import type { Mapper } from "./Mapper.js";

export class Functor<const Value> extends Container<Value> {
  map<const Result>(mapper: Mapper<Value, Result>): Functor<Result> {
    return new Functor(mapper(this.value));
  }
}
