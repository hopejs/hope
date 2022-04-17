import { watch } from '@/activity/watch';
import { isFunction } from '@/utils';

export function setDomProp(el: any, key: any, value: any) {
  if (isFunction(value)) {
    watch(value, (v) => {
      el[key] = v;
    });
  } else {
    el[key] = value;
  }
}
