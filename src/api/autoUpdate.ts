import { getLifecycleHandlers } from '@/core';
import { getCurrentComponent } from '@/core/scheduler';
import { onElementUnmounted } from './lifecycle';

export function autoUpdate(block: () => any) {
  const { updatedHandlers } = getLifecycleHandlers();
  const currentComponent = getCurrentComponent();
  block();
  if (currentComponent) {
    (currentComponent.uq || (currentComponent.uq = [])).push(block);
    currentComponent.ulh || (currentComponent.ulh = updatedHandlers);
    onElementUnmounted(() => {
      currentComponent.uq = currentComponent.uq?.filter(
        (item) => item !== block
      );
    });
    // onUnmounted(() => {
    //   if (currentComponent) {
    //     removeComponent(currentComponent);
    //   }
    // });
  }
}
