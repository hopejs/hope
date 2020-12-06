import { logError } from '@hopejs/shared';

let slots: Record<string, (props: object) => void> | null;

export function hSlot(slot: (props: object) => void): void;
export function hSlot(name: string, slot: (props: object) => void): void;
export function hSlot(name: any, slot?: any) {
  if (__DEV__ && !slots) return logError('hSlot 只能在组件内使用。');
  if (!slot) {
    slot = name;
    name = 'default';
  }
  slots![name] = slot;
}

export function setSlots() {
  slots = {};
}

export function resetSlots() {
  slots = null;
}

export function getSlots() {
  return slots;
}
