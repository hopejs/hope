import { isFunction, isArray, isObject } from '@vue/shared';

enum CSSRULE_TYPES {
  CHARSET_RULE = 2,
  FONT_FACE_RULE = 5,
  IMPORT_RULE = 3,
  KEYFRAMES_RULE = 7,
  KEYFRAME_RULE = 8,
  MEDIA_RULE = 4,
  NAMESPACE_RULE = 10,
  PAGE_RULE = 6,
  STYLE_RULE = 1,
  SUPPORTS_RULE = 12,
}

export enum LIFECYCLE_KEYS {
  mounted = '_h_mounted',
  unmounted = '_h_unmounted',
  updated = '_h_updated',
  elementUnmounted = '_h_element_unmounted',
}

export enum NS {
  SVG = 'http://www.w3.org/2000/svg',
  XHTML = 'http://www.w3.org/1999/xhtml',
  XLINK = 'http://www.w3.org/1999/xlink',
}

export {
  isString,
  isFunction,
  isObject,
  isArray,
  normalizeClass,
  normalizeStyle,
  stringifyStyle,
  isOn,
} from '@vue/shared';

/** { onClick$once: () => {} } */
export function parseEventName(name: string) {
  const arr = name.split('$');
  const eventName = arr[0].slice(2);
  return {
    name: `${eventName[0].toLowerCase()}${eventName.slice(1)}`,
    modifier: arr.slice(1),
  };
}

/**
 * 动态的值是表示写成函数的形式，或者其字段是函数的形式
 * @param value
 */
export function isDynamic(value: any) {
  if (isFunction(value)) return true;
  if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (isDynamic(value[i])) return true;
    }
    return false;
  }
  if (isObject(value)) {
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      if (isFunction(value[keys[i] as any])) {
        return true;
      }
    }
  }
  return false;
}

export function isSVGElement(el: Element): el is SVGElement {
  return el instanceof SVGElement;
}

export function isHTMLElement(el: Element): el is HTMLElement {
  return el instanceof HTMLElement;
}

export function isMediaRule(value: any): value is CSSMediaRule {
  if (value.type === CSSRULE_TYPES.MEDIA_RULE) return true;
  return false;
}
export function isKeyframesRule(value: any): value is CSSKeyframesRule {
  if (value.type === CSSRULE_TYPES.KEYFRAMES_RULE) return true;
  return false;
}

export function isStyleSheet(value: any): value is CSSStyleSheet {
  if (value instanceof CSSStyleSheet) return true;
  return false;
}

export function delay(time?: number) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isElement(value: any): value is Element {
  return value instanceof Element;
}

export function getLast<T>(stack: T[]): T | undefined {
  return stack[stack.length - 1];
}

export function logError(err: string) {
  throw new Error(`[Hope error]: ${err}`);
}

export function logWarn(warn: string) {
  console.warn(`[Hope warn]: ${warn}`);
}

export function forEachObj<T extends object, K extends keyof T>(
  obj: T,
  cb: (value: T[K], key: K) => void
) {
  if (!obj) return;
  (Object.keys(obj) as K[]).forEach((key) => cb(obj[key], key));
}

export function once(fn: Function & { _hasRun?: boolean }) {
  return (...arg: any[]) => {
    if (fn._hasRun) return;
    fn(...arg);
    fn._hasRun = true;
  };
}

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

export function NOOP() {}
