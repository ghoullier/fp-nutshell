import { Container } from "./Container.ts"
import type { Mapper } from "./Mapper.ts"

interface LeftVariant<Left> {
  left: Left
}

interface RightVariant<Right> {
  right: Right
}

type $Either<Left, Right> = LeftVariant<Left> | RightVariant<Right>

/**
 * Represents a disjunction: a value that is one of two possible types.
 *
 * Unlike Result, Either does not imply error semantics (success/failure).
 * It is useful for any branching logic where both sides are equally valid
 * (e.g., Left=string, Right=number).
 *
 * Either is Right-biased: map and flatMap operate on the Right value,
 * leaving Left values unchanged.
 *
 * @extends Container
 */
export class Either<const Left, const Right> extends Container<
  $Either<Left, Right>
> {
  static Left<Left, Right>(value: Left): Either<Left, Right> {
    return new Either({ left: value })
  }
  static Right<Left, Right>(value: Right): Either<Left, Right> {
    return new Either({ right: value })
  }
  isLeft(): boolean {
    return "left" in this.value
  }
  isRight(): boolean {
    return "right" in this.value
  }
  override toString(): string {
    if (this.isLeft()) {
      return `Left(${String((this.value as LeftVariant<Left>).left)})`
    }
    return `Right(${String((this.value as RightVariant<Right>).right)})`
  }
  /**
   * Maps over the Right value. Left values pass through unchanged.
   * Either is Right-biased, so map targets the Right side.
   */
  map<NewRight>(mapper: Mapper<Right, NewRight>): Either<Left, NewRight> {
    if (this.isLeft()) {
      return Either.Left((this.value as LeftVariant<Left>).left)
    }
    return Either.Right(mapper((this.value as RightVariant<Right>).right))
  }
  /**
   * Maps over the Left value. Right values pass through unchanged.
   */
  mapLeft<NewLeft>(mapper: Mapper<Left, NewLeft>): Either<NewLeft, Right> {
    if (this.isRight()) {
      return Either.Right((this.value as RightVariant<Right>).right)
    }
    return Either.Left(mapper((this.value as LeftVariant<Left>).left))
  }
  /**
   * Chains a computation on the Right value without nesting Either.
   */
  flatMap<NewRight>(
    mapper: Mapper<Right, Either<Left, NewRight>>,
  ): Either<Left, NewRight> {
    if (this.isLeft()) {
      return Either.Left((this.value as LeftVariant<Left>).left)
    }
    return mapper((this.value as RightVariant<Right>).right)
  }
  /**
   * Pattern matches on both sides, dispatching to the appropriate handler.
   */
  match<Output>(
    onLeft: Mapper<Left, Output>,
    onRight: Mapper<Right, Output>,
  ): Output {
    if (this.isLeft()) {
      return onLeft((this.value as LeftVariant<Left>).left)
    }
    return onRight((this.value as RightVariant<Right>).right)
  }
  /**
   * Extracts the Right value, or returns the provided fallback if this is Left.
   */
  getOrElse(fallback: Right): Right {
    if (this.isLeft()) {
      return fallback
    }
    return (this.value as RightVariant<Right>).right
  }
}
