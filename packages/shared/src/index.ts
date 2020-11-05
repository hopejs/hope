export const isObject = (val: unknown): val is object =>
  val !== null && typeof val === "object";
