import { appendChild, createComment } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { outsideWarn } from './outsideWarn';
import { autoUpdate } from '../autoUpdate';

export function hComment(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  const comment = createComment('');
  if (currentElement) {
    if (isFunction(value)) {
      autoUpdate(() => (comment.textContent = value()));
    } else {
      comment.textContent = value;
    }
    appendChild(currentElement, comment);
  } else {
    outsideWarn('hComment');
  }
}
