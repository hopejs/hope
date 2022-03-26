import { callUpdated, getLifecycleHandlers } from '@/core';
import { getCurrentComponent, removeComponent } from '@/core/scheduler';
import { onUnmounted } from './lifecycle';

export function autoUpdate(block: () => any) {
  const { updatedHandlers } = getLifecycleHandlers();
  const currentComponent = getCurrentComponent();
  block();
  updatedHandlers && callUpdated(updatedHandlers);
  currentComponent?.uq?.push(block);
  onUnmounted(() => {
    if (currentComponent) {
      removeComponent(currentComponent);
    }
  });
}
