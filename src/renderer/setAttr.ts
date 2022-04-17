import { watch } from '@/activity/watch';
import { isFunction } from '@/utils';

export const xlinkNS = 'http://www.w3.org/1999/xlink';

export function setAttr(el: Element, key: string, value: any, isSVG?: boolean) {
  if (isFunction(value)) {
    if (isSVG) {
      watch(value, (v: any) => {
        el.setAttributeNS(xlinkNS, key, v);
      });
    } else {
      watch(value, (v: any) => {
        el.setAttribute(key, v);
      });
    }
  } else {
    if (isSVG) {
      el.setAttributeNS(xlinkNS, key, value);
    } else {
      el.setAttribute(key, value);
    }
  }
}
