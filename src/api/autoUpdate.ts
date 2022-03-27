import { getLifecycleHandlers } from '@/core';
import { getCurrentComponent, removeComponent } from '@/core/scheduler';
import { onUnmounted } from './lifecycle';

export function autoUpdate(block: () => any) {
  const { updatedHandlers } = getLifecycleHandlers();
  const currentComponent = getCurrentComponent()!;
  block();
  currentComponent.uq?.push(block);
  currentComponent.ulh || (currentComponent.ulh = updatedHandlers);
  onUnmounted(() => {
    if (currentComponent) {
      removeComponent(currentComponent);
    }
  });
}
