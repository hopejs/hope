import { getSlots } from '@hopejs/runtime-core';
import { logError } from '@hopejs/shared';

export function hSlot(slot: (props: object) => void): void;
export function hSlot(name: string, slot: (props: object) => void): void;
export function hSlot(name: any, slot?: any) {
  const slots = getSlots();
  if (__DEV__ && !slots) return logError('hSlot 只能在组件内使用。');
  if (!slot) {
    slot = name;
    name = 'default';
  }
  slots![name] = slot;
}
