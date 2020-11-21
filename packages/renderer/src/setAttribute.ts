export function setAttribute(el: Element, name: string, value: string | undefined) {
  if (value !== undefined) {
    // TODO: 处理 svg 的情况
    el.setAttribute(name, value);
  } else {
    el.removeAttribute(name);
  }
}
