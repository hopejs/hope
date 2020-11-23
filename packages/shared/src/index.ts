export {
  isString,
  isFunction,
  isObject,
  isArray,
  normalizeClass,
  normalizeStyle,
  stringifyStyle,
} from "@vue/shared";

export function isElement(value: any): value is Element {
  return value instanceof Element;
}

export function getLast<T>(stack: T[]): T | undefined {
  return stack[stack.length - 1];
}

export function logError(err: string) {
  console.error(`[Hope error]: ${err}`);
}

export function logWarn(warn: string) {
  console.warn(`[Hope warn]: ${warn}`);
}

export const LIFECYCLE_KEYS = {
  mounted: '_h_mounted',
  unmounted: '_h_unmounted',
  updated: '_h_updated',
};
