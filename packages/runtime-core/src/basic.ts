import { effect } from "@hopejs/hope";
import { createElement, createFragment } from "@hopejs/renderer";

interface CurrentElementState {
  el: Element;
}

/**
 * 标签元素中的静态属性参数
 */
export type StaticAttr = Record<string, string>;
export type ContentCallback = (state: CurrentElementState) => void;

let currentElement: Element | undefined;
const elementStack: Element[] = [];

// 用于存储生成的元素，最终添加到 DOM 树中
const fragment = createFragment();

export function start(tag: string, attr?: StaticAttr) {
  currentElement = createElement(tag);
  appendElement();
  elementStack.push(currentElement);
}

export function end() {
  currentElement = elementStack.pop();
}

export function content(callback: ContentCallback) {
  if (!currentElement) return;
  const state = {
    el: currentElement,
  };
  effect(callback, state);
}

export function mount(container: Element) {
  container.innerHTML = '';
  container.appendChild(fragment);
}

function appendElement() {
  if (!currentElement) return;
  const length = elementStack.length;
  if (!length) {
    fragment.appendChild(currentElement);
  } else {
    elementStack[length - 1].appendChild(currentElement);
  }
}
