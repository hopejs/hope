import { isElement, isString, logError } from '@hopejs/shared';
import { mount as coreMount } from '@hopejs/runtime-core';
import { querySelector } from '@hopejs/renderer';
import { flushPostFlushCbs } from '@hopejs/runtime-core';

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
    if (!result) {
      logError(`找不到以 ${container} 为选择器的元素！`);
    }
    return result;
  } else if (isElement(container)) {
    return container;
  }
  logError('组件只能挂载到有效的元素容器中。');
  return null;
}
