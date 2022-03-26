import {
  appendChild,
  createPlaceholder,
  insertBefore,
  removeChild,
} from '@/renderer';
import {
  callElementUnmounted,
  callUnmounted,
  createBlockFragment,
  destroy,
  getContainer,
  HopeElement,
  resetBlockFragment,
  setBlockFragment,
} from '@/core';
import { isFunction, LIFECYCLE_KEYS } from '@/shared';
import { autoUpdate } from './autoUpdate';

enum BlockTypes {
  hFor = 'hFor',
  hIf = 'hIf',
}

export function block<T>(
  type: BlockTypes.hFor,
  value: T | (() => T),
  range: (item: T, index: number) => void
): void;
export function block(
  type: BlockTypes.hIf,
  value: any | (() => any),
  range: () => void,
  elseRange: () => void
): void;
export function block(
  type: BlockTypes,
  value: any,
  range: any,
  elseRange?: any
): void {
  if (isFunction(value)) {
    const start = createPlaceholder('block start');
    const end = createPlaceholder('block end');
    const container = getContainer();
    appendChild(container, start);
    appendChild(container, end);

    const blockFragment = createBlockFragment();
    if (type === BlockTypes.hFor) {
      let oldValue: any[];
      autoUpdate(() => {
        const newValue = value();
        if (oldValue === newValue) return;
        oldValue = newValue;
        setBlockFragment(blockFragment);
        newValue.forEach((item: any, index: number) => {
          range(item, index);
        });
        resetBlockFragment();
        insertBlockFragment(blockFragment, start, end);
      });
    } else if (type === BlockTypes.hIf) {
      let oldValue: any;
      autoUpdate(() => {
        const newValue = value();
        if (oldValue === newValue) return;
        oldValue = newValue;
        setBlockFragment(blockFragment);
        newValue ? range() : elseRange();
        resetBlockFragment();
        insertBlockFragment(blockFragment, start, end);
      });
    }
  } else {
    if (type === BlockTypes.hFor) {
      value?.forEach((item: any, index: number) => {
        range(item, index);
      });
    } else if (type === BlockTypes.hIf) {
      value ? range() : elseRange();
    }
  }
}

function insertBlockFragment(
  fragment: DocumentFragment,
  start: Node,
  end: Node
) {
  const firstNode = fragment.firstChild;
  insertBefore(fragment, end);
  remove(start, end, firstNode);
}

function remove(start: Node, end: Node, firstNode: Node | null) {
  end = firstNode || end;
  let next: any = start.nextSibling;
  // next 可能已经被 remove。
  while (next && next !== end) {
    // 调用元素的卸载钩子
    invokeElementUnmountedHooks(next);
    // 调用组件的卸载钩子
    invokeUnmountedHooks(next);
    removeChild(next!);

    next = start.nextSibling;
  }
}

function invokeUnmountedHooks(node: HopeElement) {
  destroy(
    node[LIFECYCLE_KEYS.unmounted]!,
    LIFECYCLE_KEYS.unmounted,
    callUnmounted
  );
}

function invokeElementUnmountedHooks(node: HopeElement) {
  destroy(
    node[LIFECYCLE_KEYS.elementUnmounted]!,
    LIFECYCLE_KEYS.elementUnmounted,
    callElementUnmounted
  );
}
