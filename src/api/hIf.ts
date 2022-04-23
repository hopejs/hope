import { ScopeTree } from '@/activity/makeScopeTree';
import { needDelete } from '@/activity/watch';
import { BlockTree } from '@/lifecycle/makeBlockTree';
import { keepEnv } from '@/lifecycle/useBlockTree';
import { nextSibling, remove } from '@/renderer';
import { bfs } from '@/utils';
import { nextTick } from './scheduler';

export const hIf = <T>(
  cond: T | (() => T),
  handleTrue: (value: T) => void,
  handleFalse?: (value: T) => void
) => {
  keepEnv(cond, (value, blockTree, scopeTree) => {
    removeUnuseWatcher(scopeTree!, blockTree!);
    blockTree && removeNodes(blockTree);
    value ? handleTrue(value) : handleFalse?.(value);
  });
};

const removeUnuseWatcher = (
  scopeTree: ScopeTree | null,
  blockTree: BlockTree
) => {
  if (scopeTree) {
    scopeTree.subs = scopeTree.subs?.filter(
      (watcher) => !needDelete(watcher, blockTree)
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
