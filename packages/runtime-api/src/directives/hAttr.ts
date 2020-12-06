import { setAttribute } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { autoUpdate } from '../autoUpdate';
import { outsideError } from './outsideError';

export function hAttr(name: string, value: string | (() => string)) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hAttr');

  if (isFunction(value)) {
    autoUpdate(() => setAttribute(currentElement!, name, value()));
  } else {
    setAttribute(currentElement!, name, value);
  }
}
