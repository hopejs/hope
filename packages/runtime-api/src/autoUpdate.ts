import { effect } from '@hopejs/reactivity';
import {
  callUpdated,
  collectEffects,
  getLifecycleHandlers,
  queueJob,
} from '@hopejs/runtime-core';

export function autoUpdate(block: () => any) {
  const { updatedHandlers } = getLifecycleHandlers();
  const ef = effect(
    () => {
      block();
      updatedHandlers && callUpdated(updatedHandlers);
    },
    { scheduler: queueJob }
  );
  collectEffects(ef);
}
