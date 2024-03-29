import { watch } from '@/activity/watch';
import { DynamicFlags, HostElement, markFlag } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export function setClass(
  el: HostElement,
  value: string | (() => string),
  isSVG?: boolean,
  collectFlag?: boolean
) {
  isFunction(value)
    ? (collectFlag && markFlag(el, DynamicFlags.CLASS),
      isSVG
        ? watch(value, (v) => {
            el.setAttribute('class', v);
          })
        : watch(value, (v) => {
            //@ts-ignore
            el.className = v;
          }))
    : isSVG
    ? el.setAttribute('class', value)
    : //@ts-ignore
      (el.className = value);
}
