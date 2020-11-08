export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: ElementCreationOptions
): HTMLElementTagNameMap[K];
/** @deprecated */
export function createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(
  tag: K,
  options?: ElementCreationOptions
): HTMLElementDeprecatedTagNameMap[K];
export function createElement<K extends keyof SVGElementTagNameMap>(
  tag: K
): SVGElementTagNameMap[K];
export function createElement(
  tag: string,
  options?: ElementCreationOptions
): HTMLElement;
export function createElement(tag: any, options?: ElementCreationOptions) {
  // TODO: 判断 svg 标签
  return document.createElement(tag, options);
}
