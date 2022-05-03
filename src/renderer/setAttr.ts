import { watch } from '@/activity/watch';
import { DynamicFlags, HostElement, markFlag } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export const xlinkNS = 'http://www.w3.org/1999/xlink';

export function setAttr(
  el: HostElement,
  key: string,
  value: any,
  isSVG?: boolean
) {
  isFunction(value)
    ? (markFlag(el, DynamicFlags.ATTR),
      isSVG
        ? watch(
            value,
            (v: any) => {
              el.setAttributeNS(xlinkNS, key, v);
            },
            el.getAttributeNS(xlinkNS, key)
          )
        : watch(
            value,
            (v: any) => {
              el.setAttribute(key, v);
            },
            el.getAttribute(key)
          ))
    : isSVG
    ? el.getAttributeNS(xlinkNS, key) !== value &&
      el.setAttributeNS(xlinkNS, key, value)
    : el.getAttribute(key) !== value && el.setAttribute(key, value);
}
