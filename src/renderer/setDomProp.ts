import { watch } from '@/activity/watch';
import { isFunction } from '@/utils';

export function setDomProp(el: any, key: any, value: any) {
  isFunction(value)
    ? watch(
        value,
        (v) => {
          el[key] = v;
        },
        el[key]
      )
    : el[key] !== value && (el[key] = value);
}
