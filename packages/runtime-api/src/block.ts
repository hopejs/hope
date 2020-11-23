import { effect, stop } from '@hopejs/reactivity';
import {
  appendChild,
  createPlaceholder,
  insertBefore,
  removeChild,
} from '@hopejs/renderer';
import {
  collectEffects,
  createBlockFragment,
  getContainer,
  HopeElement,
  queueJob,
  queuePostFlushCb,
  resetBlockFragment,
  setBlockFragment,
} from '@hopejs/runtime-core';
import { callUpdated, getLifecycleHandlers } from './lifecycle';

export function block(range: () => void) {
  const start = createPlaceholder('block start');
  const end = createPlaceholder('block end');
  const container = getContainer();
  appendChild(container, start);
  appendChild(container, end);

  const blockFragment = createBlockFragment();
  const { updatedHandlers } = getLifecycleHandlers();
  const ef = effect(
    () => {
      setBlockFragment(blockFragment);
      range();
      resetBlockFragment();
      insertBlockFragment(blockFragment, start, end);
      updatedHandlers && callUpdated(updatedHandlers);
    },
    { scheduler: queueJob }
  );
  collectEffects(ef);
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

  stopEffects(next);
  // 调用组件的卸载钩子
  invokeUnmountedHooks(next);

  removeChild(next!);
  remove(start, end, firstNode);
}

function invokeUnmountedHooks(node: HopeElement) {
  const hooks = node._h_unmounted;
  if (!hooks) return;
  destroy(hooks, '_h_unmounted', queuePostFlushCb);
}

function stopEffects(node: HopeElement) {
  const effects = node._hope_effects;
  if (!effects) return;
  destroy(effects, '_hope_effects', stop);
}

function destroy(list: Set<any>, key: string, operator: Function) {
  list.forEach((some) => {
    operator(some);

    // 这个列表的最前面的，在视图中是嵌套最深的，
    // 当前 block 的子 block 的列表应该直接被
    // 清空，感觉这样性能会好些。。
    let canClear = true;
    some[key].forEach((collection: Set<any>) => {
      if (collection === list) {
        canClear = false;
        return;
      }
      if (canClear) {
        // TODO: 不确定这里的 clear 有没有必要！
        // 如果不 clear ，不知道会不会造成循环引用？
        collection.size && collection.clear();
      } else {
        collection.delete(some);
      }
    });
  });
  list.clear();
}
