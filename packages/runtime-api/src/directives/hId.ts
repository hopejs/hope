import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { setAttribute } from '@hopejs/renderer';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';
import { isBetweenStartAndEnd } from '../defineComponent';
import { cantUseError } from './cantUseError';

export function hId(value: string | (() => string)) {
  if (__DEV__ && isBetweenStartAndEnd()) return cantUseError('hId');

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hId');

  if (isFunction(value)) {
    autoUpdate(() => setAttribute(currentElement!, 'id', value()));
  } else {
    setAttribute(currentElement!, 'id', value);
  }
}
