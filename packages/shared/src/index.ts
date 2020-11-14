export {
  isString,
  isFunction,
  isObject,
  normalizeClass,
  normalizeStyle,
  stringifyStyle,
} from "@vue/shared";

export function logError(err: string) {
  console.error(`[Hope error]: ${err}`);
}

export function logWarn(warn: string) {
  console.warn(`[Hope warn]: ${warn}`);
}
