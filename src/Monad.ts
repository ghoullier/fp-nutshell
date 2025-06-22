import { Container } from "./Container.ts"

import type { Mapper } from "./Mapper.ts"

/**
 * A container for a value that can be mapped over.
 * @extends Container
 */
export class Monad<const Value> extends Container<Value> {
  /**
   * Maps the value of the container to a new value.
   * @param {Mapper<Value, Result>} mapper
   * @returns {Monad<Result>}
   */
  map<const Result>(mapper: Mapper<Value, Result>): Monad<Result> {
    return new Monad(mapper(this.value))
  }
  /**
   * Flat maps the value of the container to a new container.
   * @param {Mapper<Value, Monad<Result>>} mapper
   * @returns {Monad<Result>}
   */
  flatMap<const Result>(mapper: Mapper<Value, Monad<Result>>): Monad<Result> {
    return mapper(this.value)
  }
}
