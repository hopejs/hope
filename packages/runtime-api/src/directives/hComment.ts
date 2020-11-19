import { appendChild, createComment } from '@hopejs/renderer';
import { getCurrentElement, queueJob } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { effect } from '@hopejs/reactivity';
import { outsideWarn } from './outsideWarn';
import { callUpdated, getLifecycleHandlers } from '../lifecycle';
import { collectEffects } from '../block';

export function hComment(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  const comment = createComment('');
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      const ef = effect(
        () => {
          comment.textContent = value();
          updatedHandlers && callUpdated(updatedHandlers);
        },
        { scheduler: queueJob }
      );
      collectEffects(ef);
    } else {
      comment.textContent = value;
    }
    appendChild(currentElement, comment);
  } else {
    outsideWarn('hComment');
  }
}
