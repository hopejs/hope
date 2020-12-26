declare type CssGroup = CSSStyleSheet | CSSMediaRule | CSSKeyframesRule | undefined;
export declare function createCssRule(selector: string, style: string, componentId: string): CSSRule | null | undefined;
export declare function setGroup(v: CssGroup): void;
export declare function resetGroup(): void;
export {};
