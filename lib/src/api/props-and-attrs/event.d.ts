declare type Modifier = 'capture' | 'once' | 'passive' | string;
export declare function setEvent<K extends keyof ElementEventMap>(eventName: K, listener: (this: Element, ev: ElementEventMap[K]) => any): void;
export declare function setEvent<K extends keyof ElementEventMap>(eventName: K, modifier: Modifier[] | Modifier, listener: (this: Element, ev: ElementEventMap[K]) => any): void;
export declare function setEvent(eventName: string, listener: EventListenerOrEventListenerObject | ((...arg: any[]) => void)): void;
export declare function setEvent(eventName: string, modifier: Modifier[] | Modifier, listener: EventListenerOrEventListenerObject | ((...arg: any[]) => void)): void;
export {};
