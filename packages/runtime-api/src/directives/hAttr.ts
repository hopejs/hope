import { setAttribute } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { autoUpdate } from '../autoUpdate';
import { isBetweenStartAndEnd } from '../defineComponent';
import { cantUseError } from './cantUseError';
import { outsideError } from './outsideError';

export function hAttr(name: string, value: string | (() => string)) {
  if (__DEV__ && isBetweenStartAndEnd()) return cantUseError('hAttr');

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hAttr');

  if (isFunction(value)) {
    autoUpdate(() => setAttribute(currentElement!, name, value()));
  } else {
    setAttribute(currentElement!, name, value);
  }
}
