import { Container } from "./Container.ts";

import type { Mapper } from "./Mapper.ts";

export class Functor<const Value> extends Container<Value> {
  map<const Result>(mapper: Mapper<Value, Result>): Functor<Result> {
    return new Functor(mapper(this.value));
  }
}
