export function setAttributeNS(el: Element, namespace: string | null, name: string, value?: string) {
  if (value != null) {
    el.setAttributeNS(namespace, name, value);
  } else {
    el.removeAttributeNS(namespace, name);
  }
}