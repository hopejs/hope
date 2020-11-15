import { isString, logError } from "@hopejs/shared";
import { mount as coreMount } from "@hopejs/runtime-core";
import { querySelector } from "@hopejs/renderer";

export function mount(containerOrSelector: string | Element) {
  const container = normalizeContainer(containerOrSelector);
  container && coreMount(container);
}

function normalizeContainer(container: string | Element): Element | null {
  if (isString(container)) {
    const result = querySelector(container);
    if (!result) {
      logError(`找不到以 ${container} 为选择器的元素！`);
    }
    return result;
  } else if (container instanceof Element) {
    return container;
  }
  logError("组件只能挂载到有效的元素容器中。");
  return null;
}
