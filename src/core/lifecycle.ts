import { isArray } from "@/shared";
import { nextTick } from "./nextTick";
import { getCurrentComponent } from "./scheduler";

interface Lifecycle {
  mountedHandlers: any[];
  unmountedHandlers: any[];
  updatedHandlers: any[];
}

/**
 * 当第一次调用生命周期函数时，存储到这里，
 * 下次再次调用时先通过该对象进行检查是否
 * 已经放入队列，防止在一个事件循环中重复
 * 调用相同的生命周期回调函数。
 */
const lifecycleStore = new WeakMap();

let currentLifecycle: Lifecycle | undefined;
let stack: Lifecycle[] = [];

export function setLifecycleHandlers() {
  currentLifecycle && stack.push(currentLifecycle);
  currentLifecycle = {
    mountedHandlers: [],
    unmountedHandlers: [],
    updatedHandlers: [],
  };
}

export function resetLifecycleHandlers() {
  currentLifecycle = stack.pop();
}

export function getLifecycleHandlers() {
  return currentLifecycle;
}

export function callMounted(
  handlers: (() => void) | (() => void) | (() => void)[]
) {
  waitNextTick(handlers);
}

export function callUnmounted(handlers: (() => void) | (() => void)[]) {
  waitNextTick(handlers);
}

export function callUpdated(handlers: (() => void) | (() => void)[]) {
  waitNextTick(handlers);
}

export function callElementUnmounted(handlers: (() => void) | (() => void)[]) {
  waitNextTick(handlers);
}

/**
 * 当前能够使用组件的生命周期函数
 */
export function canUseLifecycle(): boolean {
  return !!getCurrentComponent();
}

function waitNextTick(handlers: (() => void) | (() => void) | (() => void)[]) {
  if (lifecycleStore.has(handlers)) {
    return;
  }
  lifecycleStore.set(handlers, true);

  const fn = isArray(handlers)
    ? () => handlers.forEach((handler) => handler())
    : handlers;
  nextTick(() => {
    lifecycleStore.delete(handlers);
    fn();
  });
}
