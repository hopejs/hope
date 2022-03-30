import { getLifecycleHandlers } from '@/core';
import {
  getCurrentComponent,
  removeComponent,
  removeTask,
} from '@/core/scheduler';
import { logError } from '@/shared';
import { onElementUnmounted, onUnmounted } from './lifecycle';

export function autoUpdate(block: () => any) {
  const currentComponent = getCurrentComponent();
  if (!currentComponent) {
    if (__DEV__) logError(`必须在组件内编写模版代码`);
    return;
  }

  const lifecycle = getLifecycleHandlers();
  (currentComponent.uq || (currentComponent.uq = [])).push(block);
  currentComponent.ulh || (currentComponent.ulh = lifecycle?.updatedHandlers);
  onElementUnmounted(() => {
    removeTask(currentComponent, block);
  });
  onUnmounted(() => {
    if (currentComponent) {
      removeComponent(currentComponent);
    }
  });
  block();
}
