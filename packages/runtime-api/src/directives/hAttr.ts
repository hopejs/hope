import { setAttribute } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { forEachObj, isFunction } from '@hopejs/shared';
import { isReactive } from '@hopejs/reactivity';
import { autoUpdate } from '../autoUpdate';
import { isBetweenStartAndEnd } from '../defineComponent';
import { cantUseError } from './cantUseError';
import { outsideError } from './outsideError';

export type Attrs = {
  [key: string]: string | (() => string);
};

export function hAttr(attrs: Attrs) {
  if (__DEV__ && isBetweenStartAndEnd()) return cantUseError('hAttr');

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hAttr');

  if (isReactive(attrs)) {
    autoUpdate(() =>
      forEachObj(attrs, (value, name) => {
        setAttribute(currentElement!, name as string, value as string);
      })
    );
  } else {
    forEachObj(attrs, (value, name) => {
      if (isFunction(value)) {
        autoUpdate(() => setAttribute(currentElement!, name as string, value()));
      } else {
        setAttribute(currentElement!, name as string, value);
      }
    });
  }
}
