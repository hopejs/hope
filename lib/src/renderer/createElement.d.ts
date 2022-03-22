export declare function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
/** @deprecated */
export declare function createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(tag: K, options?: ElementCreationOptions): HTMLElementDeprecatedTagNameMap[K];
export declare function createElement(tag: string, options?: ElementCreationOptions): HTMLElement;
