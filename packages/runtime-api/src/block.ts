import {
  appendChild,
  createPlaceholder,
  insertBefore,
  removeChild,
} from '@hopejs/renderer';
import {
  callElementUnmounted,
  callUnmounted,
  createBlockFragment,
  destroy,
  getContainer,
  HopeElement,
  resetBlockFragment,
  setBlockFragment,
} from '@hopejs/runtime-core';
import { LIFECYCLE_KEYS } from '@hopejs/shared';
import { autoUpdate } from './autoUpdate';

export function block(range: () => void) {
  const start = createPlaceholder('block start');
  const end = createPlaceholder('block end');
  const container = getContainer();
  appendChild(container, start);
  appendChild(container, end);

  const blockFragment = createBlockFragment();
  autoUpdate(() => {
    setBlockFragment(blockFragment);
    range();
    resetBlockFragment();
    insertBlockFragment(blockFragment, start, end);
  });
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
  const next: any = start.nextSibling;
  // next 可能已经被 remove。
  if (!next || next === end) return;

  // 调用元素的卸载钩子
  invokeElementUnmountedHooks(next);
  // 调用组件的卸载钩子
  invokeUnmountedHooks(next);

  removeChild(next!);
  remove(start, end, firstNode);
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
