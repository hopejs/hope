import { ReactiveEffect as RE } from "@vue/reactivity";
export { effect, stop, reactive, computed, isReactive } from "@vue/reactivity";

export type ReactiveEffect<T = any> = RE<T> & {
  _hope_effects?: Set<ReactiveEffect<T>>[];
};
