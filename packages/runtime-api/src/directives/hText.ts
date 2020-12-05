import { appendChild, createTextNode } from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { outsideWarn } from './outsideWarn';
import { autoUpdate } from '../autoUpdate';

export function hText(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  const textNode = createTextNode('');
  if (currentElement) {
    if (isFunction(value)) {
      autoUpdate(() => (textNode.textContent = value()));
    } else {
      textNode.textContent = value;
    }
    appendChild(currentElement, textNode);
  } else {
    outsideWarn('hText');
  }
}
