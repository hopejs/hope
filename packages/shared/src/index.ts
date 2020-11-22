export {
  isString,
  isFunction,
  isObject,
  isArray,
  normalizeClass,
  normalizeStyle,
  stringifyStyle,
} from "@vue/shared";

export function getLast<T>(stack: T[]): T | undefined {
  return stack[stack.length - 1];
}

export function logError(err: string) {
  console.error(`[Hope error]: ${err}`);
}

export function logWarn(warn: string) {
  console.warn(`[Hope warn]: ${warn}`);
}
