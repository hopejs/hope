declare type Functional<T> = {
    [P in keyof T]?: T[P] | (() => T[P]) | undefined;
};
export declare function addCssRule(selector: string, style: Functional<CSSStyleDeclaration>): void;
export declare function keyframes(block: () => void): string | void;
export declare function media(condition: string, block: () => void): void;
export {};
