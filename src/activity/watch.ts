import { BlockTree, getCurrentBlock } from '@/lifecycle/makeBlockTree';
import { getCurrentScope, subscribe } from './makeScopeTree';

let currentWatcher: (() => void) | null = null;

export const watch = <P>(prop: () => P, effect: (param: P) => void) => {
  let oldValue: P;
  const watcher = () => {
    const newValue = prop();
    if (oldValue === newValue) return;
    oldValue = newValue;
    currentWatcher = watcher;

    effect(newValue);
    currentWatcher = null;
  };
  markWithBlock(watcher);
  subscribe(getCurrentScope(prop), watcher);
  watcher();
};

/**
 * Flag used to determine whether to delete
 * @param watcher
 */
export const markWithBlock = (
  watcher: (() => void) & { _b?: BlockTree | null }
) => {
  watcher._b = getCurrentBlock();
};

export const needDelete = (
  watcher: (() => void) & { _b?: BlockTree | null },
  blockTree: BlockTree
) => {
  // If the current watcher is deleted, the next data update will not respond
  if (watcher === currentWatcher) {
    return false;
  }

  let _blockTree = watcher._b;
  if (_blockTree === blockTree) {
    return true;
  }
  while (_blockTree?.p) {
    if (_blockTree.p === blockTree) {
      return true;
    }
    _blockTree = _blockTree.p;
  }
  return false;
};
