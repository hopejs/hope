import { watch } from '@/activity/watch';
import { isFunction } from '@/utils';

export function setClass(
  el: Element,
  value: string | (() => string),
  isSVG?: boolean
) {
  if (isFunction(value)) {
    if (isSVG) {
      watch(value, (v) => {
        el.setAttribute('class', v);
      });
    } else {
      watch(value, (v) => {
        el.className = v;
      });
    }
  } else {
    if (isSVG) {
      el.setAttribute('class', value);
    } else {
      el.className = value;
    }
  }
}
