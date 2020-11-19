import { ReactiveEffect } from "@hopejs/reactivity";
import { createElement, createFragment, appendChild } from "@hopejs/renderer";
import { flushPostFlushCbs } from "./scheduler";

/**
 * 标签元素中的静态属性参数
 */
export type StaticAttr = Record<string, string>;
export type BlockFragment = DocumentFragment & {
  _elementStack: HopeElement[];
  _parent: BlockFragment | undefined;

  // 在更新阶段，blockFragment._elementStack 中的元素
  // 个数为 0 ，所以需要在子 fragment 中记录下父元素的
  // rootElement ，以便可以正常的收集 effect。
  _parentBlockRootElement: HopeElement;
};
export type HopeElement = Element & {
  _hope_effects?: Set<ReactiveEffect<void>>;
};

let currentElement: HopeElement | undefined;
const elementStack: Element[] = [];
const blockFragmentStack: BlockFragment[] = [];

// 用于存储生成的元素，最终添加到 DOM 树中
const fragment = createFragment();
let blockFragment: BlockFragment | undefined;

export function start<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attr?: StaticAttr
): void;
/** @deprecated */
export function start<K extends keyof HTMLElementDeprecatedTagNameMap>(
  tag: K,
  attr?: StaticAttr
): void;
export function start<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attr?: StaticAttr
): void;
export function start(tag: string, attr?: StaticAttr): void {
  currentElement = createElement(tag);
  appendElement();
  if (blockFragment) {
    blockFragment._elementStack.push(currentElement);
  } else {
    elementStack.push(currentElement);
  }
}

export function end() {
  if (blockFragment) {
    const stack = blockFragment._elementStack;
    stack.pop();
    currentElement = getLast(stack);
  } else {
    elementStack.pop();
    currentElement = getLast(elementStack);
  }
}

export function mount(container: Element) {
  container.innerHTML = "";
  appendChild(container, fragment);
  flushPostFlushCbs();
}

export function getCurrentElement() {
  return currentElement;
}

export function getCurrntBlockFragment() {
  return blockFragment;
}

export function createBlockFragment() {
  const result = createFragment() as BlockFragment;
  result._elementStack = [];
  return result;
}

export function setBlockFragment(value: BlockFragment) {
  value._parent || (value._parent = blockFragment);
  blockFragment = value;
  blockFragmentStack.push(value);
  currentElement = undefined;
}

export function resetBlockFragment() {
  blockFragmentStack.pop();
  blockFragment = getLast(blockFragmentStack);
  if (blockFragment) {
    currentElement = getLast(blockFragment._elementStack);
  } else {
    currentElement = getLast(elementStack);
  }
}

export function getFragment() {
  return fragment;
}

export function getContainer() {
  return getCurrentElement() || getCurrntBlockFragment() || getFragment();
}

function appendElement() {
  if (!currentElement) return;
  if (blockFragment) {
    appendBlockElement();
    return;
  }
  if (!elementStack.length) {
    appendChild(fragment, currentElement);
  } else {
    appendChild(getLast(elementStack), currentElement);
  }
}

function getLast(stack: any[]) {
  return stack[stack.length - 1];
}

function appendBlockElement() {
  const stack = blockFragment!._elementStack;
  if (!stack.length) {
    appendChild(blockFragment!, currentElement!);
  } else {
    appendChild(getLast(stack), currentElement!);
  }
}
