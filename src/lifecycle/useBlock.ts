import { makeScope, watch } from '@/activity';
import { getFragment, render } from '@/html';
import { insert, nextSibling, parentNode, remove } from '@/renderer';
import { bfs, isFunction } from '@/utils';
import { nextTick } from '..';
import { Block, getCurrentBlock, makeBlock } from './makeBlock';

export const useBlock = <T>(
  value: T | (() => T),
  component: (value: T) => void
) => {
  if (isFunction(value)) {
    makeBlock(() => {
      makeScope(() => {
        const blockTree = getCurrentBlock()!;
        watch(value, (v) => {
          const { fragment } = render(() => component(v));
          removeNodes(blockTree);
          fragment &&
            insert(
              fragment,
              parentNode(blockTree.end) || getFragment()!,
              blockTree.end
            );
        });
      });
    });
  } else {
    component(value);
  }
};

const removeNodes = (blockTree: Block) => {
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
