import { watch } from '@/activity/watch';
import { HostElement } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export function setClass(
  el: HostElement,
  value: string | (() => string),
  isSVG?: boolean
) {
  isFunction(value)
    ? isSVG
      ? watch(value, (v) => {
          el.setAttribute('class', v);
        })
      : watch(value, (v) => {
          //@ts-ignore
          el.className = v;
        })
    : isSVG
    ? el.setAttribute('class', value)
    : // @ts-ignore
      (el.className = value);
}
