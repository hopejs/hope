import { defineComponent } from '@/api';

export function comWithSlot(slot: () => void) {
  const [com, $com] = defineComponent(slot);
  com();
  $com();
}
