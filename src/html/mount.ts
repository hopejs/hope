import { error } from '@/log';
import { insert, querySelector } from '@/renderer';
import { bfs, isString } from '@/utils';
import { nextTick } from '@/api/scheduler';
import { getCurrentRenderTree, makeRender, RenderTree } from './makeRender';

interface RenderResult {
  fragment: DocumentFragment;
  runMountedHandlers?: () => void;
}

export function mount(
  fragment: DocumentFragment | RenderResult,
  container: string | Element
) {
  let runMountedHandlers;
  if (!(fragment instanceof DocumentFragment)) {
    runMountedHandlers = fragment.runMountedHandlers;
    fragment = fragment.fragment;
  }
  container = normalizeContainer(container)!;
  if (__DEV__ && container == null) {
    return error(`Invalid container.`);
  }
  insert(fragment, container);
  nextTick(runMountedHandlers);
}

export const render = (component: () => any): RenderResult => {
  let result: RenderTree;
  makeRender(() => {
    component();
    result = getCurrentRenderTree()!;
  });
  return {
    fragment: result!.f as DocumentFragment,
    runMountedHandlers: () => {
      bfs(result, (node) => {
        if (node.om) {
          node.om.forEach((handler) => handler());
          // It will only run once
          node.om = null;
        }
      });
    },
  };
};

function normalizeContainer(container: string | Element): Element | null {
  if (isString(container)) {
    const result = querySelector(container);
    if (__DEV__ && !result) {
      error(`Cannot find element with ${container} as selector.`);
    }
    return result;
  }
  return container;
}
