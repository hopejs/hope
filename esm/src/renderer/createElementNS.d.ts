import { NS } from '@/shared';
export declare function createElementNS(namespaceURI: NS.XHTML, tag: string): HTMLElement;
export declare function createElementNS<K extends keyof SVGElementTagNameMap>(namespaceURI: NS.SVG, tag: K): SVGElementTagNameMap[K];
export declare function createElementNS(namespaceURI: NS.SVG, tag: string): SVGElement;
export declare function createElementNS(namespaceURI: string | null, tag: string, options?: ElementCreationOptions): Element;
export declare function createElementNS(namespace: string | null, tag: string, options?: string | ElementCreationOptions): Element;
