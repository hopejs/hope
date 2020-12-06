import { appendChild, createComment } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';

export function hComment(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hComment');

  const comment = createComment('');
  if (isFunction(value)) {
    autoUpdate(() => (comment.textContent = value()));
  } else {
    comment.textContent = value;
  }
  appendChild(currentElement!, comment);
}
