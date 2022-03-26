import { appendChild, createComment } from '@/renderer';
import { getCurrentElement } from '@/core';
import { isFunction } from '@/shared';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';

export function hComment(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hComment');

  const comment = createComment('');
  if (isFunction(value)) {
    let oldValue: any;
    autoUpdate(() => {
      const newValue = value();
      if (oldValue === newValue) return;
      comment.textContent = oldValue = newValue;
    });
  } else {
    comment.textContent = value;
  }
  appendChild(currentElement!, comment);
}
