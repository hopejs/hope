export declare function collectElementUnmountedHook(hook: () => any): void;
export declare function collectUnmountedHook(hooks: (() => any)[]): void;
/**
 * 处理并销毁列表中的元素
 * @param list
 * @param key
 * @param operator
 */
export declare function destroy(list: Set<any>, key: string, operator: Function): void;
