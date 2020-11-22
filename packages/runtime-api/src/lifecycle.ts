import { queuePostFlushCb, SchedulerCbs } from '@hopejs/runtime-core';
import { logWarn } from '@hopejs/shared';

interface Lifecycle {
  mountedHandlers: any[];
  unmountedHandlers: any[];
  updatedHandlers: any[];
}

let currentLifecycle: Lifecycle | undefined;
let stack: Lifecycle[] = [];

const COMMON_WARN = '应该在定义组件的时候，写在组件定义中。';
export const LIFECYCLE_KEYS = {
  mounted: '_h_mounted',
  unmounted: '_h_unmounted',
  updated: '_h_updated',
};

export function onMounted(handler: () => any) {
  if (!inComponent()) return logWarn(`onMounted ${COMMON_WARN}`);
  currentLifecycle!.mountedHandlers &&
    currentLifecycle!.mountedHandlers.push(handler);
  // 调用已挂载钩子
  callMounted(handler);
}

export function onUnmounted(handler: () => any) {
  if (!inComponent()) return logWarn(`onUnmounted ${COMMON_WARN}`);
  currentLifecycle!.unmountedHandlers &&
    currentLifecycle!.unmountedHandlers.push(handler);
}

export function onUpdated(handler: () => any) {
  if (!inComponent()) return logWarn(`onUpdated ${COMMON_WARN}`);
  currentLifecycle!.updatedHandlers &&
    currentLifecycle!.updatedHandlers.push(handler);
  // 一开始调用一次更新钩子
  callUpdated(handler);
}

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
