import { NS } from '@hopejs/shared';
import { getDocument } from './getDocument';

export function createElementNS(
  namespaceURI: NS.XHTML,
  tag: string
): HTMLElement;
export function createElementNS<K extends keyof SVGElementTagNameMap>(
  namespaceURI: NS.SVG,
  tag: K
): SVGElementTagNameMap[K];
export function createElementNS(namespaceURI: NS.SVG, tag: string): SVGElement;
export function createElementNS(
  namespaceURI: string | null,
  tag: string,
  options?: ElementCreationOptions
): Element;
export function createElementNS(
  namespace: string | null,
  tag: string,
  options?: string | ElementCreationOptions
): Element;
export function createElementNS(namespaceURI: any, tag: any, options?: any) {
  return getDocument().createElementNS(namespaceURI, tag, options);
}
