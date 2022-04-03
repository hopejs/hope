export function nextTick(handler?: () => void) {
  return Promise.resolve().then(handler);
}
