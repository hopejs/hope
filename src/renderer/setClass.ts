import { watch } from '@/activity/watch';
import { DynamicFlags, HostElement, markFlag } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export function setClass(
  el: HostElement,
  value: string | (() => string),
  isSVG?: boolean
) {
  isFunction(value)
    ? (markFlag(el, DynamicFlags.CLASS),
      isSVG
        ? watch(
            value,
            (v) => {
              el.setAttribute('class', v);
            },
            el.getAttribute('class') || ''
          )
        : watch(
            value,
            (v) => {
              //@ts-ignore
              el.className = v;
            },
            el.className
          ))
    : isSVG
    ? el.getAttribute('class') !== value && el.setAttribute('class', value)
    : //@ts-ignore
      el.className !== value && (el.className = value);
}
