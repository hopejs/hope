import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { setAttribute } from '@hopejs/renderer';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';

export function hId(value: string | (() => string)) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hId');

  if (isFunction(value)) {
    autoUpdate(() => setAttribute(currentElement!, 'id', value()));
  } else {
    setAttribute(currentElement!, 'id', value);
  }
}
