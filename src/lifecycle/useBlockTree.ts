import { watch } from '@/activity';
import { getCurrentScope, ScopeTree, setCurrentScope } from '@/activity/makeScopeTree';
import { render } from '@/html';
import { getFragment } from '@/html/h';
import { insert, nextSibling, parentNode, remove } from '@/renderer';
import { bfs, isFunction } from '@/utils';
import { nextTick } from '@/api/scheduler';
import { BlockTree, getCurrentBlock, makeBlockTree } from './makeBlockTree';
import { needDelete } from '@/activity/watch';
import { getCurrentRenderTree, RenderTree } from '@/html/makeRenderTree';

export const useBlockTree = <T>(
  value: T | (() => T),
  component: (value: T) => void
) => {
  if (isFunction(value)) {
    makeBlockTree(() => {
      const blockTree = getCurrentBlock()!;
      const scopeTree = getCurrentScope();
      let oldRenderTree: RenderTree;
      watch(value, (v) => {
        const oldScope = getCurrentScope();
        setCurrentScope(scopeTree);
        const { fragment } = render(() => {
          oldRenderTree && removeUnuseWatcher(scopeTree, oldRenderTree);
          oldRenderTree = getCurrentRenderTree()!;
          component(v);
        });
        removeNodes(blockTree);
        fragment &&
          insert(
            fragment,
            parentNode(blockTree.end) || getFragment()!,
            blockTree.end
          );
        setCurrentScope(oldScope);
      });
    });
  } else {
    component(value);
  }
};

const removeUnuseWatcher = (
  scopeTree: ScopeTree | null,
  renderTree: RenderTree
) => {
  if (scopeTree) {
    scopeTree.subs = scopeTree.subs?.filter(
      (watcher) => !needDelete(watcher, renderTree)
    );
  }
};

const removeNodes = (blockTree: BlockTree) => {
  const { start, end } = blockTree;
  let next = nextSibling(start);
  if (next !== end && next !== null) {
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
  }
  while (next !== end && next !== null) {
    remove(next!);
    next = nextSibling(start);
  }
};
