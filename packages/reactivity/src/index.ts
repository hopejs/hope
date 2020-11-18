import { ReactiveEffect as RE } from "@vue/reactivity";
export { effect, stop, reactive, computed, isReactive } from "@vue/reactivity";

type ReactiveEffect<T = any> = RE<T> & {
  _hope_effects?: Set<ReactiveEffect<T>>[];
};

export { ReactiveEffect };
