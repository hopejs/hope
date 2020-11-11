import {
  appendChild,
  createComment,
  createElement,
  insertBefore,
  removeChild,
} from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";

export function hShow(value: any | (() => any)) {
  const currentElement = getCurrentElement();
  const cache = createElement("div");
  const placeholder = createComment("hShow");
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => {
        if (value()) {
          showElement(currentElement, cache, placeholder);
        } else {
          hideElement(currentElement, cache, placeholder);
        }
      });
    } else {
      if (value) {
        showElement(currentElement, cache, placeholder);
      } else {
        hideElement(currentElement, cache, placeholder);
      }
    }
  } else {
    outsideWarn("hShow");
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
