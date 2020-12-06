import { reactive } from '@hopejs/reactivity';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { autoUpdate } from '../autoUpdate';
import { outsideError } from './outsideError';

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
    return processComponentProps(key, value);
  }

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hProp');

  if (isFunction(value)) {
    autoUpdate(() => ((currentElement as any)[key] = value()));
  } else {
    (currentElement as any)[key] = value;
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
    const props = componentProps;
    autoUpdate(() => (props![key] = value()));
  } else {
    componentProps![key] = value;
  }
}
