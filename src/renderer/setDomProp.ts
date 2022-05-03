import { watch } from '@/activity/watch';
import { DynamicFlags, markFlag } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export function setDomProp(el: any, key: any, value: any) {
  isFunction(value)
    ? (markFlag(el, DynamicFlags.PROP),
      watch(
        value,
        (v) => {
          el[key] = v;
        },
        el[key]
      ))
    : el[key] !== value && (el[key] = value);
}
