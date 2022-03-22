export function removeChild(child: Element | DocumentFragment | Comment | Node) {
  const container = child.parentNode;
  container && container.removeChild(child);
}
