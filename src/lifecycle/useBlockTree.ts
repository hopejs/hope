import { watch } from '@/activity';
import {
  getCurrentScope,
  ScopeTree,
  setCurrentScope,
} from '@/activity/makeScopeTree';
import { isFunction } from '@/utils';
import {
  BlockTree,
  getCurrentBlock,
  makeBlockTree,
  setCurrentBlock,
} from './makeBlockTree';
import {
  getCurrentRender,
  RenderTree,
  setCurrentRender,
} from '@/html/makeRenderTree';
import { parentNode } from '@/renderer';

export const keepEnv = <T>(
  value: T | (() => T),
  component: (
    value: T,
    blockTree?: BlockTree,
    scopeTree?: ScopeTree,
    renderTree?: RenderTree
  ) => void
) => {
  if (isFunction(value)) {
    makeBlockTree(() => {
      const blockTree = getCurrentBlock()!,
        scopeTree = getCurrentScope(),
        renderTree = getCurrentRender();

      watch(value, (v) => {
        const oldScope = getCurrentScope(),
          oldBlock = getCurrentBlock(),
          oldRender = getCurrentRender();

        setCurrentScope(scopeTree);
        setCurrentBlock(blockTree);
        setCurrentRender(renderTree, parentNode(blockTree.start)!);
        component(v, blockTree, scopeTree!);
        setCurrentScope(oldScope);
        setCurrentBlock(oldBlock);
        setCurrentRender(oldRender);
      });
    });
  } else {
    component(value);
  }
};
