import { error } from '@/log';
import { insert, querySelector } from '@/renderer';
import { isString } from '@/utils';
import { getCurrentRenderTree, makeRender } from './makeRender';

export function mount(fragment: DocumentFragment, container: string | Element) {
  container = normalizeContainer(container)!;
  if (__DEV__ && container == null) {
    return error(`Invalid container.`);
  }
  insert(fragment, container);
}

export const render = (component: () => any) => {
  let result: DocumentFragment;
  makeRender(() => {
    component();
    result = getCurrentRenderTree()!.f as DocumentFragment;
  });
  // @ts-ignore
  return result;
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
