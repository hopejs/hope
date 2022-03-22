export function setAttribute(el: Element, name: string, value?: string) {
  if (value != null) {
    el.setAttribute(name, value);
  } else {
    el.removeAttribute(name);
  }
}
