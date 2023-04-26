export interface Mapper<Input, Output> {
  (item: Input): Output;
}
