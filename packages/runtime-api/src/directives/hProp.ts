import { effect, reactive } from '@hopejs/reactivity';
import {
  getCurrentElement,
  queueJob,
  collectEffects,
  getLifecycleHandlers,
  callUpdated,
} from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { outsideWarn } from './outsideWarn';

let componentProps: Record<string, any> | null;

export function hProp<K extends keyof HTMLElementTagNameMap>(
  key: keyof HTMLElementTagNameMap[K],
  value: unknown | (() => unknown)
): void;
export function hProp<K extends keyof SVGElementTagNameMap>(
  key: keyof SVGElementTagNameMap[K],
  value: unknown | (() => unknown)
): void;
export function hProp<T extends object>(
  key: keyof T,
  value: unknown | (() => unknown)
): void;
export function hProp(key: any, value: unknown | (() => unknown)) {
  // 组件运行的时候会设置该值，此时说明 hProp 指令
  // 运行在组件内，用以向组件传递 prop。
  if (componentProps) {
    processComponentProps(key, value);
    return;
  }

  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      const ef = effect(
        () => {
          (currentElement as any)[key] = value();
          updatedHandlers && callUpdated(updatedHandlers);
        },
        { scheduler: queueJob }
      );
      collectEffects(ef);
    } else {
      (currentElement as any)[key] = value;
    }
  } else {
    outsideWarn('hProp');
  }
}

export function setComponentProps() {
  componentProps = reactive({});
}

export function resetComponentProps() {
  componentProps = null;
}

export function getComponentProps() {
  return componentProps;
}

function processComponentProps(key: any, value: unknown | (() => unknown)) {
  if (isFunction(value)) {
    const { updatedHandlers } = getLifecycleHandlers()!;
    const props = componentProps;
    const ef = effect(
      () => {
        props![key] = value();
        updatedHandlers && callUpdated(updatedHandlers);
      },
      { scheduler: queueJob }
    );
    collectEffects(ef);
  } else {
    componentProps![key] = value;
  }
}
