let componentOn: Record<string, (...arg: any[]) => void> | null;

export function setComponentOn() {
  componentOn = {};
}

export function resetComponentOn() {
  componentOn = null;
}

export function getComponentOn() {
  return componentOn;
}
