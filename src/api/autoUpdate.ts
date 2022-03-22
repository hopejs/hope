import { effect, stop } from '@/reactivity';
import {
  callUpdated,
  getLifecycleHandlers,
  queueJob,
} from '@/core';
import { onElementUnmounted } from './lifecycle';

export function autoUpdate(block: () => any) {
  const { updatedHandlers } = getLifecycleHandlers();
  const ef = effect(
    () => {
      block();
      updatedHandlers && callUpdated(updatedHandlers);
    },
    { scheduler: queueJob }
  );
  onElementUnmounted(() => stop(ef));
}
