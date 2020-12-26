declare type ClassObject = Record<string, boolean>;
declare type ClassArray = (string | ClassObject)[];
export declare function setClass(value: ClassArray | (() => ClassArray)): void;
export declare function setClass(value: ClassObject | (() => ClassObject)): void;
export declare function setClass(value: string | (() => string)): void;
export {};
