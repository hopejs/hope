import { appendChild, createTextNode } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';

export function hText(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hText');

  const textNode = createTextNode('');
  if (isFunction(value)) {
    autoUpdate(() => (textNode.textContent = value()));
  } else {
    textNode.textContent = value;
  }
  appendChild(currentElement!, textNode);
}
