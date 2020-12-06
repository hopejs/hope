import {
  appendChild,
  createElement,
  createPlaceholder,
  insertBefore,
  removeChild,
} from '@hopejs/renderer';
import { getCurrentElement } from '@hopejs/runtime-core';
import { isFunction } from '@hopejs/shared';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';

export function hShow(value: any | (() => any)) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError('hShow');

  const cache = createElement('div');
  const placeholder = createPlaceholder('hShow');
  if (isFunction(value)) {
    autoUpdate(() => {
      if (value()) {
        showElement(currentElement!, cache, placeholder);
      } else {
        hideElement(currentElement!, cache, placeholder);
      }
    });
  } else {
    if (value) {
      showElement(currentElement!, cache, placeholder);
    } else {
      hideElement(currentElement!, cache, placeholder);
    }
  }
}

function hideElement(
  el: Element,
  cache: Element,
  placeholder: Element | Comment
) {
  insertBefore(placeholder, el);
  appendChild(cache, el);
}

function showElement(
  el: Element,
  cache: Element,
  placeholder: Element | Comment
) {
  if (!cache.childNodes.length) return;
  insertBefore(el, placeholder);
  removeChild(placeholder);
}
