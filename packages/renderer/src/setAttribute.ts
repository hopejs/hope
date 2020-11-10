export function setAttribute(el: Element, name: string, value: string) {
  if (value !== "") {
    // TODO: 处理 svg 的情况
    el.setAttribute(name, value);
  } else {
    el.removeAttribute(name);
  }
}
