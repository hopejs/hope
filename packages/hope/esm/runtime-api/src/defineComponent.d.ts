interface ComponentOptions<P = Record<string, any>, S = Record<string, (props: object) => any>> {
    props: P;
    slots: S;
    emit(type: string, ...arg: any[]): any;
}
declare type MountOptions<P, S> = {
    target: string | Element;
    props?: P;
    slots?: S;
    on?: Record<string, (...arg: any[]) => any>;
};
export declare type ComponentStartTag<P = any> = (props?: {
    [K in keyof P]?: P[K] | (() => P[K]);
} & Record<string, any>) => any;
export declare type ComponentEndTag = (...arg: any[]) => any;
declare type Component<P = any, S = any> = [ComponentStartTag<P>, ComponentEndTag] & {
    mount: (options: MountOptions<P, S> | string | Element) => any;
};
export declare function defineComponent<P, S>(setup: (options: ComponentOptions<P, S>) => any): Component<P, S>;
/**
 * 获取组件实例的 dynamic style id,
 * 相同组件不同实例之间 dynamic style id 不相同
 */
export declare function getCurrentDsid(): string | undefined;
/**
 * 获取组件 cid,
 * 相同组件不同实例之间 cid 相同
 */
export declare function getCurrentCid(): string | undefined;
export declare function setHasDynamic(value: boolean): void;
export declare function setHasStatic(value: boolean): void;
export declare function getComponentInstanceCount(componentId: string): number;
export declare function getComponentCssRuleId(componentId: string, groupId?: (number | string)[]): string | number | undefined;
export declare function incrementComponentCssRuleId(componentId: string): void;
export declare function setComponentCssRuleId(componentId: string, value: number): void;
/**
 * 表示代码运行到组件的开标签和闭标签之间的区域
 */
export declare function isBetweenStartAndEnd(): boolean;
export {};
