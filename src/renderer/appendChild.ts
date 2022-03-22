export function appendChild(child: Element | DocumentFragment | Text | Comment): void;
export function appendChild(
  container: Element | Document | DocumentFragment,
  child: Element | DocumentFragment | Text | Comment
): void;
export function appendChild(container: any, child?: any) {
  if (!child) {
    document.appendChild(container);
  } else {
    container.appendChild(child);
  }
}
