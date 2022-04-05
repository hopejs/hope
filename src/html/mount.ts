import { insert, querySelector } from '@/renderer';
import { isString } from '@/utils';
import { getFragment } from './h';

export function mount(fragment: DocumentFragment, container: string | Element) {
  container = normalizeContainer(container)!;
  if (__DEV__ && container == null) {
    return console.error(`无效的容器`);
  }
  insert(fragment, container);
}

export const render = (component: any) => {
  component();
  return getFragment();
};

function normalizeContainer(container: string | Element): Element | null {
  if (isString(container)) {
    const result = querySelector(container);
    if (__DEV__ && !result) {
      console.error(`找不到以 ${container} 为选择器的元素！`);
    }
    return result;
  }
  return container;
}
