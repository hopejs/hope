import { effect, ReactiveEffect, stop } from "@hopejs/reactivity";
import {
  appendChild,
  createPlaceholder,
  insertBefore,
  removeChild,
} from "@hopejs/renderer";
import {
  BlockFragment,
  createBlockFragment,
  getCurrentElement,
  getCurrntBlockFragment,
  getFragment,
  HopeElement,
  resetBlockFragment,
  setBlockFragment,
} from "@hopejs/runtime-core";
import { callUpdated, getLifecycleHandlers, LIFECYCLE_KEYS } from "./lifecycle";

export function block(range: () => void) {
  const start = createPlaceholder("block start");
  const end = createPlaceholder("block end");
  const container =
    getCurrentElement() || getCurrntBlockFragment() || getFragment();
  appendChild(container, start);
  appendChild(container, end);

  const blockFragment = createBlockFragment();
  const { updatedHandlers } = getLifecycleHandlers();
  const ef = effect(() => {
    setBlockFragment(blockFragment);
    range();
    resetBlockFragment();
    insertBlockFragment(blockFragment, start, end);
    updatedHandlers && callUpdated(updatedHandlers);
  });
  collectEffects(ef);
}

/**
 * 每个 block 里面的根元素都有可能会被 remove，
 * 当被 remove 时应该 stop 该元素下所有的 effect，
 * 该方法就是把 block 根元素所依赖的所有 effect 都
 * 收集到 block 根元素的 `_hope_effects` 属性下，
 * 当 block 根元素被 remove 时，可以遍历该属性，集体 stop。
 * @param effect
 */
export function collectEffects(effect: ReactiveEffect<void>) {
  const blockFragment = getCurrntBlockFragment();
  if (!blockFragment) return;
  addEffectInToBlockRootElement(blockFragment, effect);
}

function addEffectInToBlockRootElement(
  blockFragment: BlockFragment,
  effect: ReactiveEffect<void>
) {
  const blockRootElement = blockFragment._elementStack[0];
  if (blockRootElement) {
    (
      blockRootElement._hope_effects || (blockRootElement._hope_effects = [])
    ).push(effect);
  }
  blockFragment._parent &&
    addEffectInToBlockRootElement(blockFragment._parent, effect);
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

  stopEffects(next);
  // 调用组件的卸载钩子
  next[LIFECYCLE_KEYS.unmounted] && next[LIFECYCLE_KEYS.unmounted]();

  removeChild(next!);
  remove(start, end, firstNode);
}

function stopEffects(el: HopeElement) {
  if (!el._hope_effects) return;
  el._hope_effects.forEach(stop);
  el._hope_effects.length = 0;
}
