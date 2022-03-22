import {
  appendChild,
  createElement,
  createPlaceholder,
  insertBefore,
  removeChild,
} from '@/renderer';
import { getCurrentElement } from '@/core';
import { isFunction } from '@/shared';
import { outsideError } from './outsideError';
import { autoUpdate } from '../autoUpdate';
import { isBetweenStartAndEnd } from '../defineComponent';
import { cantUseError } from './cantUseError';

export function hShow(value: any | (() => any)) {
  if (__DEV__ && isBetweenStartAndEnd()) return cantUseError('hShow');

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
