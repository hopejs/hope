export function setAttribute(el: Element, name: string, value: string | undefined) {
  if (value !== undefined) {
    el.setAttribute(name, value);
  } else {
    el.removeAttribute(name);
  }
}
