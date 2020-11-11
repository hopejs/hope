export function insertBefore(child: Element | DocumentFragment | Comment, anchor: Element | Comment) {
  const container = anchor.parentNode;
  container?.insertBefore(child, anchor);
}
