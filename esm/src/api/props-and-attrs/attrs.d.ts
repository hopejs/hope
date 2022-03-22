import { CSSStyleValue } from './style';
export declare type Attrs = {
    [key: string]: string | (() => string | void);
} | {
    class?: string | (() => string) | Record<string, boolean | (() => boolean)> | (() => Record<string, boolean | (() => boolean)>) | Record<string, boolean | (() => boolean)>[] | (() => Record<string, boolean | (() => boolean)>[]);
    style?: CSSStyleValue | (() => CSSStyleValue);
};
export declare function setAtrrs(el: Element, value: any, key: string): void;
