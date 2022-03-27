import { getLifecycleHandlers } from '@/core';
import { getCurrentComponent } from '@/core/scheduler';

export function autoUpdate(block: () => any) {
  const { updatedHandlers } = getLifecycleHandlers();
  const currentComponent = getCurrentComponent();
  block();
  if (currentComponent) {
    (currentComponent.uq || (currentComponent.uq = [])).push(block);
    currentComponent.ulh || (currentComponent.ulh = updatedHandlers);
  }
  // onUnmounted(() => {
  //   if (currentComponent) {
  //     removeComponent(currentComponent);
  //   }
  // });
}
