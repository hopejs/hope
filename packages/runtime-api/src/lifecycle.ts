import {
  callMounted,
  callUpdated,
  collectElementUnmountedHook,
  getLifecycleHandlers,
  canUseLifecycle,
} from '@hopejs/runtime-core';
import { logError } from '@hopejs/shared';

const COMMON_WARN = '应该在定义组件的时候，写在组件定义中。';

export function onMounted(handler: () => any) {
  if (__DEV__ && !canUseLifecycle()) return logError(`onMounted ${COMMON_WARN}`);
  const currentLifecycle = getLifecycleHandlers();
  currentLifecycle!.mountedHandlers &&
    currentLifecycle!.mountedHandlers.push(handler);
  // 调用已挂载钩子
  callMounted(handler);
}

export function onUnmounted(handler: () => any) {
  if (__DEV__ && !canUseLifecycle()) return logError(`onUnmounted ${COMMON_WARN}`);
  const currentLifecycle = getLifecycleHandlers();
  currentLifecycle!.unmountedHandlers &&
    currentLifecycle!.unmountedHandlers.push(handler);
}

export function onUpdated(handler: () => any) {
  if (__DEV__ && !canUseLifecycle()) return logError(`onUpdated ${COMMON_WARN}`);
  const currentLifecycle = getLifecycleHandlers();
  currentLifecycle!.updatedHandlers &&
    currentLifecycle!.updatedHandlers.push(handler);
  // 一开始调用一次更新钩子
  callUpdated(handler);
}

export function onElementUnmounted(handler: () => any) {
  collectElementUnmountedHook(handler);
}
