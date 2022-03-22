export function querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
export function querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
export function querySelector<E extends Element = Element>(selectors: string): E | null;
export function querySelector(selector: any) {
  return document.querySelector(selector);
}