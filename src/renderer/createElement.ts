import { getDocument } from './getDocument';

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: ElementCreationOptions
): HTMLElementTagNameMap[K];
/** @deprecated */
export function createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(
  tag: K,
  options?: ElementCreationOptions
): HTMLElementDeprecatedTagNameMap[K];
export function createElement(
  tag: string,
  options?: ElementCreationOptions
): HTMLElement;
export function createElement(tag: any, options?: ElementCreationOptions) {
  return getDocument().createElement(tag, options);
}
