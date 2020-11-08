import { isString, logError } from "@hopejs/shared";
import { mount as coreMount } from "@hopejs/runtime-core";

export function mount(containerOrSelector: string | Element) {
  const container = normalizeContainer(containerOrSelector);
  if (container) {
    coreMount(container);
  }
}

function normalizeContainer(container: string | Element): Element | null {
  if (isString(container)) {
    const result = document.querySelector(container);
    if (!result) {
      logError(`找不到以 ${container} 为选择器的元素！`);
    }
    return result;
  }
  return container;
}
