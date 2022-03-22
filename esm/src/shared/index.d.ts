export declare enum LIFECYCLE_KEYS {
    mounted = "_h_mounted",
    unmounted = "_h_unmounted",
    updated = "_h_updated",
    elementUnmounted = "_h_element_unmounted"
}
export declare enum NS {
    SVG = "http://www.w3.org/2000/svg",
    XHTML = "http://www.w3.org/1999/xhtml",
    XLINK = "http://www.w3.org/1999/xlink"
}
export { isString, isFunction, isObject, isArray, normalizeClass, normalizeStyle, stringifyStyle, isOn, } from '@vue/shared';
/** { onClick$once: () => {} } */
export declare function parseEventName(name: string): {
    name: string;
    modifier: string[];
};
/**
 * 动态的值是表示写成函数的形式，或者其字段是函数的形式
 * @param value
 */
export declare function isDynamic(value: any): boolean;
export declare function isSVGElement(el: Element): el is SVGElement;
export declare function isHTMLElement(el: Element): el is HTMLElement;
export declare function isMediaRule(value: any): value is CSSMediaRule;
export declare function isKeyframesRule(value: any): value is CSSKeyframesRule;
export declare function isStyleSheet(value: any): value is CSSStyleSheet;
export declare function delay(time?: number): Promise<unknown>;
export declare function isNumber(value: any): value is number;
export declare function isElement(value: any): value is Element;
export declare function getLast<T>(stack: T[]): T | undefined;
export declare function logError(err: string): void;
export declare function logWarn(warn: string): void;
export declare function forEachObj<T extends object, K extends keyof T>(obj: T, cb: (value: T[K], key: K) => void): void;
export declare function once(fn: Function & {
    _hasRun?: boolean;
}): (...arg: any[]) => void;
/**
 * 将一个 css 文件中的选择器替换为带有指定 scopeId 的版本
 * @param css
 * @param scopeId
 */
export declare function getScopeIdVersion(css: string, scopeId: string): string;
export declare function addScopeForSelector(selector: string, scopeId: string): string;
