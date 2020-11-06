export const isObject = (val: unknown): val is object =>
  val !== null && typeof val === "object";

export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

export const isArray = Array.isArray;

export const isSymbol = (val: unknown): val is symbol =>
  typeof val === "symbol";

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
  val: object,
  key: string | number | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

export function logError(err: unknown) {
  console.error(err);
}

export function logWarn(warn: unknown) {
  console.warn(warn);
}
