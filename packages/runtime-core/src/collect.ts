import { ReactiveEffect } from '@hopejs/reactivity';
import { LIFECYCLE_KEYS } from '@hopejs/shared';
import { BlockFragment, getCurrntBlockFragment } from './basic';

/**
 * 每个 block 里面的根元素都有可能会被 remove，
 * 当被 remove 时应该 stop 该元素下所有的 effect，
 * 该方法就是把 block 根元素所依赖的所有 effect 都
 * 收集到 block 根元素的 `_hope_effects` 属性下，
 * 当 block 根元素被 remove 时，可以遍历该属性，集体 stop。
 * @param effect
 */
export function collectEffects(effect: ReactiveEffect<void>) {
  addSomethingInToBlockRootElement('_hope_effects', effect);
}

export function collectElementUnmountedHook(hook: () => any) {
  addSomethingInToBlockRootElement(LIFECYCLE_KEYS.elementUnmounted, hook);
}

export function collectUnmountedHook(hooks: (() => any)[]) {
  addSomethingInToBlockRootElement(LIFECYCLE_KEYS.unmounted, hooks);
}

/**
 * 处理并销毁列表中的元素
 * @param list
 * @param key
 * @param operator
 */
export function destroy(list: Set<any>, key: string, operator: Function) {
  if (!list) return;
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

function addSomethingInToBlockRootElement(
  key: string,
  something: any,
  blockFragment = getCurrntBlockFragment(),
  childBlockFragment?: BlockFragment
) {
  if (!blockFragment) return;

  // 每个 block 应该保存下父 block 的 rootElement，
  // 以便在更新的时候能够获取到正确的 rootElement。
  const blockRootElement: any =
    blockFragment._elementStack[0] ||
    childBlockFragment?._parentBlockRootElement;
  if (blockRootElement) {
    (blockRootElement[key] || (blockRootElement[key] = new Set())).add(
      something
    );

    // 用于对象销毁时清空列表。
    (something[key] || (something[key] = [])).push(blockRootElement[key]);

    childBlockFragment &&
      (childBlockFragment._parentBlockRootElement = blockRootElement);
  }
  blockFragment._parent &&
    addSomethingInToBlockRootElement(
      key,
      something,
      blockFragment._parent,
      blockFragment
    );
}
