import { defineComponent, mount } from '@/api';
import { delay } from '@/shared';

export function comWithSlot(slot: () => void) {
  const [com, $com] = defineComponent(slot);
  com();
  $com();
}

export async function withMount() {
  const container = document.createElement('div');
  mount(container);
  await delay();
  return container;
}
