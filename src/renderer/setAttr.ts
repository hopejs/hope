import { watch } from '@/activity/watch';
import { HostElement } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export const xlinkNS = 'http://www.w3.org/1999/xlink';

export function setAttr(
  el: HostElement,
  key: string,
  value: any,
  isSVG?: boolean
) {
  isFunction(value)
    ? isSVG
      ? watch(value, (v: any) => {
          el.setAttributeNS(xlinkNS, key, v);
        })
      : watch(value, (v: any) => {
          el.setAttribute(key, v);
        })
    : isSVG
    ? el.setAttributeNS(xlinkNS, key, value)
    : el.setAttribute(key, value);
}
