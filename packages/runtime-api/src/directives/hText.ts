import { appendChild, createTextNode } from '@hopejs/renderer';
import {
  getCurrentElement,
  queueJob,
  collectEffects,
  getLifecycleHandlers,
  callUpdated,
} from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { effect } from '@hopejs/reactivity';
import { outsideWarn } from './outsideWarn';

export function hText(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  const textNode = createTextNode('');
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      const ef = effect(
        () => {
          textNode.textContent = value();
          updatedHandlers && callUpdated(updatedHandlers);
        },
        { scheduler: queueJob }
      );
      collectEffects(ef);
    } else {
      textNode.textContent = value;
    }
    appendChild(currentElement, textNode);
  } else {
    outsideWarn('hText');
  }
}
