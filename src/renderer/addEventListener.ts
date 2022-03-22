export function addEventListener<K extends keyof ElementEventMap>(
  target: Element,
  type: K,
  listener: (this: Element, ev: ElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void;
export function addEventListener(
  target: Element,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;
export function addEventListener(
  target: Element,
  type: any,
  listener: any,
  options?: any
) {
  target.addEventListener(type, listener, options);
}
