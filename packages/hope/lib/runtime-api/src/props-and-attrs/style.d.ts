export declare type CSSStyle = {
    [P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P] | (() => CSSStyleDeclaration[P]);
};
export declare type CSSStyleValue = CSSStyle | CSSStyle[];
export declare function setStyle(value: CSSStyleValue | (() => CSSStyleValue)): void;
