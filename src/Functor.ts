import { Container } from "./Container.ts"

import type { Mapper } from "./Mapper.ts"

/**
 * A container for a value that can be mapped over.
 * @extends Container
 */
export class Functor<const Value> extends Container<Value> {
  /**
   * Maps the value of the container to a new value.
   * @param {Mapper<Value, Result>} mapper
   * @returns Functor<Result>
   */
  map<const Result>(mapper: Mapper<Value, Result>): Functor<Result> {
    return new Functor(mapper(this.value))
  }
}
