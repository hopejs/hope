let slots: Record<string, (props: object) => void> | null;

export function setSlots() {
  slots = {};
}

export function resetSlots() {
  slots = null;
}

export function getSlots() {
  return slots;
}
