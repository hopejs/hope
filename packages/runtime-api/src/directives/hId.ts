import {
  getCurrentElement,
  queueJob,
  collectEffects,
  getLifecycleHandlers,
  callUpdated,
} from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { effect } from '@hopejs/reactivity';
import { setAttribute } from '@hopejs/renderer';
import { outsideWarn } from './outsideWarn';

export function hId(value: string | (() => string)) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      const ef = effect(
        () => {
          setAttribute(currentElement, 'id', value());
          updatedHandlers && callUpdated(updatedHandlers);
        },
        { scheduler: queueJob }
      );
      collectEffects(ef);
    } else {
      setAttribute(currentElement, 'id', value);
    }
  } else {
    outsideWarn('hId');
  }
}
