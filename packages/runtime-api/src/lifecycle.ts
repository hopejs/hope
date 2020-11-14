import { logWarn } from "@hopejs/shared/src";

interface Lifecycle {
  mountedHandlers: any[];
  unmountedHandlers: any[];
  updatedHandlers: any[];
}

let currentLifecycle: Lifecycle | undefined;
let stack: Lifecycle[] = [];

const COMMON_WARN = "应该在定义组件的时候，写在组件定义中。";
export const LIFECYCLE_KEYS = {
  mounted: "_h_mounted",
  unmounted: "_h_unmounted",
  updated: "_h_updated",
};

export function onMounted(handler: () => any) {
  if (!currentLifecycle) return logWarn(`onMounted ${COMMON_WARN}`);
  currentLifecycle.mountedHandlers &&
    currentLifecycle.mountedHandlers.push(handler);
}

export function onUnmounted(handler: () => any) {
  if (!currentLifecycle) return logWarn(`onUnmounted ${COMMON_WARN}`);
  currentLifecycle.unmountedHandlers &&
    currentLifecycle.unmountedHandlers.push(handler);
}

export function onUpdated(handler: () => any) {
  if (!currentLifecycle) return logWarn(`onUpdated ${COMMON_WARN}`);
  currentLifecycle.updatedHandlers &&
    currentLifecycle.updatedHandlers.push(handler);
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
  return currentLifecycle;
}

export function callMounted(handlers: (() => void)[]) {
  console.log("mounted");
}

export function callUnmounted(handlers: (() => void)[]) {
  console.log("unmounted");
}

export function callUpdated(handlers: (() => void)[]) {
  console.log("updated");
}
