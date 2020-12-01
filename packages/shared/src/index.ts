export {
  isString,
  isFunction,
  isObject,
  isArray,
  normalizeClass,
  normalizeStyle,
  stringifyStyle,
} from '@vue/shared';

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

/**
 * 将一个 css 文件中的选择器替换为带有指定 scopeId 的版本
 * @param css
 * @param scopeId
 */
export function getScopeIdVersion(css: string, scopeId: string) {
  // 保证可以正常替换第一个选择器
  css = '{}' + css;

  return css.replace(/[}{;]([^{}@()%]+){/g, (match, p1: string) => {
    const tp1 = p1.trim();
    if (tp1 === 'to' || tp1 === 'from') return match;
    const arr = tp1.split(',').map((value) => {
      value = value.trim();
      if (value.indexOf(':') !== -1) {
        return value.replace(':', `[${scopeId}]`);
      } else {
        return value + `[${scopeId}]`;
      }
    });
    return match[0] + arr.join(',') + match[match.length - 1];
  });
}

export function addScopeForSelector(selector: string, scopeId: string) {
  selector = selector.trim();
  const arr = selector.split(',').map((str) => {
    str = str.trim();
    if (!str) return;
    if (isAnimationSelector(str)) return str;
    if (str.indexOf(':') >= 0) {
      return str.replace(':', `[${scopeId}]:`);
    }
    return str + `[${scopeId}]`;
  });
  return arr.filter((v) => v).join(',');
}

function isAnimationSelector(selector: string) {
  if (
    selector === 'to' ||
    selector === 'from' ||
    selector[selector.length - 1] === '%'
  )
    return true;
  return false;
}
