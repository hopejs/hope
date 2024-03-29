import { watch } from '@/activity';
import {
  getCurrentScope,
  ScopeTree,
  setCurrentScope,
} from '@/activity/makeScopeTree';
import { remove } from '@/renderer';
import { bfs, isFunction } from '@/utils';
import { nextTick } from '@/api/scheduler';
import {
  BlockTree,
  getCurrentBlock,
  makeBlockTree,
  setCurrentBlock,
} from './makeBlockTree';
import { getCurrentRender, setCurrentRender } from '@/html/makeRenderTree';
import { needDelete } from '@/activity/watch';

export const useBlockTree = <T>(
  value: T | (() => T),
  component: (value: T, blockTree?: BlockTree) => void
) => {
  makeBlockTree(() => {
    const blockTree = getCurrentBlock()!,
      scopeTree = getCurrentScope(),
      renderTree = getCurrentRender();

    if (isFunction(value)) {
      watch(value, (v) => {
        const oldScope = getCurrentScope(),
          oldBlock = getCurrentBlock(),
          oldRender = getCurrentRender();

        setCurrentScope(scopeTree);
        setCurrentBlock(blockTree);
        setCurrentRender(renderTree, blockTree.ct);
        removeUnuseWatcher(scopeTree, blockTree);
        component(v, blockTree);
        setCurrentScope(oldScope);
        setCurrentBlock(oldBlock);
        setCurrentRender(oldRender);
      });
    } else {
      component(value, blockTree);
    }
  });
};

export const removeUnuseWatcher = (
  scopeTree: ScopeTree | null,
  blockTree: BlockTree
) => {
  if (scopeTree) {
    scopeTree.subs = scopeTree.subs?.filter(
      (watcher) => !needDelete(watcher, blockTree)
    );
  }
};

export const removeNodes = (blockTree: BlockTree) => {
  if (blockTree.ns) {
    blockTree.ns.forEach((item) => remove(item, blockTree.ct));
    blockTree.ns = null;
  }
  nextTick(() => {
    bfs(blockTree, (node) => {
      if (node.oum) {
        node.oum.forEach((handler) => handler());
        // It will only run once
        node.oum = null;
        node.c = null;
      }
    });
  });
};
