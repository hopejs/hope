import { effect } from "@hopejs/reactivity";
import {
  appendChild,
  createPlaceholder,
  insertBefore,
  removeChild,
} from "@hopejs/renderer";
import {
  createBlockFragment,
  getCurrentElement,
  getFragment,
  resetBlockFragment,
  setBlockFragment,
} from "@hopejs/runtime-core";
import { callUpdated, getLifecycleHandlers, LIFECYCLE_KEYS } from "./lifecycle";

export function block(range: () => void) {
  const start = createPlaceholder("block start");
  const end = createPlaceholder("block end");
  const container = getCurrentElement() || getFragment();
  appendChild(container, start);
  appendChild(container, end);

  const blockFragment = createBlockFragment();
  const { updatedHandlers } = getLifecycleHandlers();
  effect(() => {
    setBlockFragment(blockFragment);
    range();
    resetBlockFragment();
    insertBlockFragment(blockFragment, start, end);
    updatedHandlers && callUpdated(updatedHandlers);
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
  if (next === end) return;

  // 调用组件的卸载钩子
  next[LIFECYCLE_KEYS.unmounted] && next[LIFECYCLE_KEYS.unmounted]();

  removeChild(next!);
  remove(start, end, firstNode);
}
