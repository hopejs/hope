import { error } from '@/log';
import { querySelector } from '@/renderer';
import { bfs, isString } from '@/utils';
import { nextTick } from '@/api/scheduler';
import { HostElement, makeRenderTree, RenderTree } from './makeRenderTree';

function mount(renderResult: RenderTree, container: Element) {
  nextTick(() => {
    bfs(renderResult, (node) => {
      if (node.om) {
        node.om.forEach((handler) => handler());
        // It will only run once
        node.om = null;
      }
    });
  });
}

export const render = (
  component: (...param: any) => any,
  container: string | HostElement
): void => {
  let result: RenderTree;
  container = normalizeContainer(container)!;
  if (__DEV__ && !container) {
    return error(`Invalid container`) as any;
  }
  makeRenderTree((renderTree) => {
    renderTree.r = container as HostElement;
    component();
    result = renderTree;
  });
  //@ts-ignore
  mount(result, container);
};

function normalizeContainer(
  container: string | HostElement | undefined
): HostElement | null | undefined {
  if (isString(container)) {
    const result = querySelector(container) as HostElement;
    if (__DEV__ && !result) {
      error(`Cannot find element with ${container} as selector.`);
    }
    return result;
  }
  return container;
}
