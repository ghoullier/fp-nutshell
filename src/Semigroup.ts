/**
 * A Semigroup is a type with an associative binary operation (`concat`).
 * For any values a, b, c: a.concat(b).concat(c) === a.concat(b.concat(c))
 */
export interface Semigroup<T> {
  concat(other: T): T
}

/**
 * A Semigroup under addition.
 * Wraps a number and combines by adding values together.
 */
export class Sum implements Semigroup<Sum> {
  readonly #value: number

  constructor(value: number) {
    this.#value = value
  }

  get value(): number {
    return this.#value
  }

  concat(other: Sum): Sum {
    return new Sum(this.#value + other.value)
  }

  toString(): string {
    return `Sum(${this.#value})`
  }
}

/**
 * A Semigroup under multiplication.
 * Wraps a number and combines by multiplying values together.
 */
export class Product implements Semigroup<Product> {
  readonly #value: number

  constructor(value: number) {
    this.#value = value
  }

  get value(): number {
    return this.#value
  }

  concat(other: Product): Product {
    return new Product(this.#value * other.value)
  }

  toString(): string {
    return `Product(${this.#value})`
  }
}

/**
 * A Semigroup under string concatenation.
 * Wraps a string and combines by concatenating values together.
 */
export class Str implements Semigroup<Str> {
  readonly #value: string

  constructor(value: string) {
    this.#value = value
  }

  get value(): string {
    return this.#value
  }

  concat(other: Str): Str {
    return new Str(this.#value + other.value)
  }

  toString(): string {
    return `Str(${this.#value})`
  }
}
