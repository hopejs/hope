export function insertBefore(child: Element | DocumentFragment | Node, anchor: Element | Node) {
  const container = anchor.parentNode;
  container && container.insertBefore(child, anchor);
}
