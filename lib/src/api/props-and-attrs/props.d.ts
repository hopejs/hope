export declare type Props<T> = {
    [K in keyof T]?: T[K] | (() => T[K] | void);
};
export declare function setProps(el: any, value: any, key: string): void;
export declare function setPropsForComponent(props: any): void;
export declare function shouldSetAsProp(el: Element, key: string, value: unknown): boolean;
