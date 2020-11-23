import { queuePostFlushCb, SchedulerCbs } from './scheduler';

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

export function callMounted(handlers: SchedulerCbs) {
  queuePostFlushCb(handlers);
}

export function callUnmounted(handlers: SchedulerCbs) {
  queuePostFlushCb(handlers);
}

export function callUpdated(handlers: SchedulerCbs) {
  queuePostFlushCb(handlers);
}

/**
 * 当前是否在组件中。
 */
export function inComponent(): boolean {
  return !!currentLifecycle;
}
