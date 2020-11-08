export function createElement(tag: string, options?: ElementCreationOptions) {
  // TODO: 判断 svg 标签
  return document.createElement(tag, options);
}