import { watch } from '@/activity/watch';
import { DynamicFlags, markWithDynamicFlags } from '@/html/makeRenderTree';
import { isFunction } from '@/utils';

export function setDomProp(el: any, key: any, value: any) {
  isFunction(value)
    ? (markWithDynamicFlags(el, DynamicFlags.PROP),
      watch(value, (v) => {
        el[key] = v;
      }))
    : (el[key] = value);
}
