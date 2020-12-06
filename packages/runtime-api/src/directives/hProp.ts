import { getComponentProps, getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { autoUpdate } from '../autoUpdate';
import { outsideError } from './outsideError';

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
  if (getComponentProps()) {
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

function processComponentProps(key: any, value: unknown | (() => unknown)) {
  const props = getComponentProps();
  if (isFunction(value)) {
    autoUpdate(() => (props![key] = value()));
  } else {
    props![key] = value;
  }
}
