import { watch } from '@/activity/watch';
import { DynamicFlags, markFlag } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export function setDomProp(
  el: any,
  key: any,
  value: any,
  collectFlag?: boolean
) {
  isFunction(value)
    ? (collectFlag && markFlag(el, DynamicFlags.PROP),
      watch(value, (v) => {
        el[key] = v;
      }))
    : (el[key] = value);
}
