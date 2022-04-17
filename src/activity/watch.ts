import { getCurrentRenderTree, RenderTree } from '@/html/makeRender';
import { getCurrentScope, subscribe } from './makeScope';

export const watch = <P>(prop: () => P, effect: (param: P) => void) => {
  let oldValue: P;
  const watcher = () => {
    const newValue = prop();
    if (oldValue === newValue) return;
    oldValue = newValue;

    effect(newValue);
  };
  markWithRender(watcher);
  subscribe(getCurrentScope(prop), watcher);
  watcher();
};

/**
 * Flag used to determine whether to delete
 * @param watcher
 */
export const markWithRender = (
  watcher: (() => void) & { _rt?: RenderTree | null }
) => {
  watcher._rt = getCurrentRenderTree();
};

export const needDelete = (
  watcher: (() => void) & { _rt?: RenderTree | null },
  renderTree: RenderTree
) => {
  let _renderTree = watcher._rt;
  if (_renderTree === renderTree) {
    return true;
  }
  while (_renderTree?.p) {
    if (_renderTree.p === renderTree) {
      return true;
    }
    _renderTree = _renderTree.p;
  }
  return false;
};
