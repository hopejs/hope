import { effect } from '@hopejs/reactivity';
import { setAttribute } from '@hopejs/renderer';
import {
  getCurrentElement,
  queueJob,
  collectEffects,
} from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { callUpdated, getLifecycleHandlers } from '../lifecycle';
import { outsideWarn } from './outsideWarn';

export function hAttr(name: string, value: string | (() => string)) {
  // TODO: 该指令不允许在组件中使用

  if (!name) return;
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      const ef = effect(
        () => {
          setAttribute(currentElement, name, value());
          updatedHandlers && callUpdated(updatedHandlers);
        },
        { scheduler: queueJob }
      );
      collectEffects(ef);
    } else {
      setAttribute(currentElement, name, value);
    }
  } else {
    outsideWarn('hAttr');
  }
}
