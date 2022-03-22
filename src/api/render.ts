import { isElement, isString, logError } from '@/shared';
import { mount as coreMount, flushPostFlushCbs } from '@/core';
import { querySelector } from '@/renderer';

export function mount(containerOrSelector: string | Element) {
  const container = normalizeContainer(containerOrSelector);
  if (container) {
    // 等待浏览器处理完样式信息，
    // 有利于提高首次渲染速度。
    setTimeout(() => {
      coreMount(container);
      flushPostFlushCbs();
    });
  }
}

function normalizeContainer(container: string | Element): Element | null {
  if (isString(container)) {
    const result = querySelector(container);
    if (__DEV__ && !result) {
      logError(`找不到以 ${container} 为选择器的元素！`);
    }
    return result;
  } else if (isElement(container)) {
    return container;
  }
  __DEV__ && logError('无效的容器。');
  return null;
}
