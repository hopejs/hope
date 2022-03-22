import { setAttribute, setAttributeNS } from '@/renderer';
import { isSVGElement, NS } from '@/shared';
import { CSSStyleValue } from './style';

export type Attrs =
  | {
      [key: string]: string | (() => string | void);
    }
  | {
      class?:
        | string
        | (() => string)
        | Record<string, boolean | (() => boolean)>
        | (() => Record<string, boolean | (() => boolean)>)
        | Record<string, boolean | (() => boolean)>[]
        | (() => Record<string, boolean | (() => boolean)>[]);
      style?: CSSStyleValue | (() => CSSStyleValue);
    };

export function setAtrrs(el: Element, value: any, key: string) {
  if (isSVGElement(el) && key.startsWith('xlink:')) {
    setAttributeNS(el, NS.XLINK, key, value);
  } else {
    setAttribute(el, key, value);
  }
}
