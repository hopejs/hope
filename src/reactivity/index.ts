// export {
//   effect,
//   stop,
//   reactive,
//   isReactive,
// } from '@vue/reactivity';

import { NOOP } from '@/shared';

export const effect = (fn: any) => fn();
export const stop = NOOP
export const reactive = (value: any) => value;
export const isReactive = () => true;