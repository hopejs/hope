import {
  createElement,
  createFragment,
  appendChild,
  createElementNS,
} from '@hopejs/renderer';
import { getLast, isElement, LIFECYCLE_KEYS, NS } from '@hopejs/shared';

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
  _isSVG: boolean;
};
export type HopeElement = Element & {
  [LIFECYCLE_KEYS.unmounted]?: Set<(() => any)[]>;
  [LIFECYCLE_KEYS.elementUnmounted]?: Set<(() => any)[]>;
};

let currentElement: HopeElement | undefined;
const elementStack: Element[] = [];
const blockFragmentStack: BlockFragment[] = [];

// 用于存储生成的元素，最终添加到 DOM 树中
const fragment = createFragment();
let blockFragment: BlockFragment | undefined;

const tagNameStack: string[] = [];

export function start<K extends keyof HTMLElementTagNameMap>(tag: K): void;
/** @deprecated */
export function start<K extends keyof HTMLElementDeprecatedTagNameMap>(
  tag: K
): void;
export function start<K extends keyof SVGElementTagNameMap>(tag: K): void;
export function start(tag: string): void {
  currentElement = isSVG(tag)
    ? createElementNS(NS.SVG, tag)
    : createElement(tag);

  // 需放在 createElement 之后
  tagNameStack.push(tag);

  appendElement();
  if (blockFragment) {
    blockFragment._elementStack.push(currentElement);
  } else {
    elementStack.push(currentElement);
  }
}

export function end() {
  tagNameStack.pop();
  if (blockFragment) {
    const stack = blockFragment._elementStack;
    stack.pop();
    currentElement = getBlockCurrentParent(stack);
  } else {
    elementStack.pop();
    currentElement = getLast(elementStack);
  }
}

export function mount(container: Element) {
  container.innerHTML = '';
  appendChild(container, fragment);
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
  result._isSVG = isSVG('');
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

export function clearFragmentChildren() {
  const container = createElement('div');
  mount(container);
}

export function getContainer() {
  return getCurrentElement() || getCurrntBlockFragment() || getFragment();
}

export function getTagNameStack() {
  return tagNameStack;
}

export function isSVG(tagName: string) {
  if (tagName === 'svg') return true;
  const tagNameStack = getTagNameStack();
  let length = tagNameStack.length;

  while (length--) {
    if (tagNameStack[length] === 'foreignObject') return false;
    if (tagNameStack[length] === 'svg') return true;
  }

  // 如果一个元素在一个 block 中，则会在 fragment 中保存
  // 其子元素是否为 svg 的状态，以便在动态更新时获取正确的状态值。
  const currentBlockFragment = getCurrntBlockFragment();
  return currentBlockFragment ? currentBlockFragment._isSVG : false;
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
    appendChild(getLast(elementStack)!, currentElement);
  }
}

function appendBlockElement() {
  const stack = blockFragment!._elementStack;
  const parent = getBlockCurrentParent(stack);
  if (parent) {
    appendChild(parent, currentElement!);
  } else {
    appendChild(blockFragment!, currentElement!);
  }
}

/**
 * 获取在 block 中新生成的元素的父元素，
 * 注意当存在组件时，会往 stack 中 push
 * 一个占位符节点，用以保存生命周期钩子，
 * 该节点不能作为父节点，所以要判断一下。
 * @param stack
 */
function getBlockCurrentParent(stack: Node[]) {
  let length = stack.length;
  while (length--) {
    const el = stack[length];
    if (isElement(el)) {
      return el;
    }
  }
  return undefined;
}
