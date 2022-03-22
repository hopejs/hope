export declare function removeEventListener<K extends keyof ElementEventMap>(target: Element, type: K, listener: (this: Element, ev: ElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
export declare function removeEventListener(target: Element, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
