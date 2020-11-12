export function insertBefore(child: Element | DocumentFragment | Node, anchor: Element | Node) {
  const container = anchor.parentNode;
  container?.insertBefore(child, anchor);
}
