import { LIFECYCLE_KEYS } from '@hopejs/shared';
export declare type BlockFragment = DocumentFragment & {
    _elementStack: HopeElement[];
    _parent: BlockFragment | undefined;
    _parentBlockRootElement: HopeElement;
    _shouldAsSVG: boolean;
};
export declare type HopeElement = Element & {
    [LIFECYCLE_KEYS.unmounted]?: Set<(() => any)[]>;
    [LIFECYCLE_KEYS.elementUnmounted]?: Set<(() => any)[]>;
};
export declare function start<T extends string>(tag: T): void;
export declare function end(): void;
export declare function mount(container: Element): void;
export declare function getCurrentElement(): HopeElement | undefined;
export declare function getCurrntBlockFragment(): BlockFragment | undefined;
export declare function createBlockFragment(): BlockFragment;
export declare function setBlockFragment(value: BlockFragment): void;
export declare function resetBlockFragment(): void;
export declare function getFragment(): DocumentFragment;
export declare function clearFragmentChildren(): void;
export declare function getContainer(): DocumentFragment | HopeElement;
export declare function getTagNameStack(): string[];
export declare function shouldAsSVG(tagName: string): boolean;
