export function removeChild(child: Element | DocumentFragment | Comment) {
  const container = child.parentNode;
  container?.removeChild(child);
}
