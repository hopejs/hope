import { isArray } from '@/shared';
import { nextTick } from './nextTick';

interface Lifecycle {
  mountedHandlers: any[];
  unmountedHandlers: any[];
  updatedHandlers: any[];
}

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
  return currentLifecycle || ({} as Lifecycle);
}

export function callMounted(
  handlers: (() => void) | (() => void) | (() => void)[]
) {
  const fn = isArray(handlers)
    ? () => handlers.forEach((handler) => handler())
    : handlers;
  nextTick(fn);
}

export function callUnmounted(handlers: (() => void) | (() => void)[]) {
  isArray(handlers) ? handlers.forEach((handler) => handler()) : handlers();
}

export function callUpdated(handlers: (() => void) | (() => void)[]) {
  isArray(handlers) ? handlers.forEach((handler) => handler()) : handlers();
}

export function callElementUnmounted(handlers: (() => void) | (() => void)[]) {
  isArray(handlers) ? handlers.forEach((handler) => handler()) : handlers();
}

/**
 * 当前能够使用组件的生命周期函数
 */
export function canUseLifecycle(): boolean {
  return !!currentLifecycle;
}
