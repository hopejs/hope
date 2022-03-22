import {
  createElement,
  createTextNode,
  getDocument,
  getHead,
  setAttribute,
} from '@hopejs/renderer';
import { logError } from '@hopejs/shared';

const styleElements: Record<string, HTMLStyleElement> = {};

export function getStyleSheet(componentId: string) {
  const styleEl = registerStyleElement(componentId);
  if (styleEl.sheet) {
    return styleEl.sheet;
  }

  // Avoid Firefox quirk where the style element might not have a sheet property
  // (from styled-components)
  const { styleSheets } = getDocument();
  for (let i = 0, l = styleSheets.length; i < l; i++) {
    const sheet = styleSheets[i];
    if (sheet.ownerNode === styleEl) {
      return sheet;
    }
  }

  __DEV__ && logError('获取 StyleSheet 失败！');
}

export function getStyleElement(
  componentId: string
): HTMLStyleElement | undefined {
  return styleElements[componentId];
}

export function deleteStyleElement(componentId: string) {
  delete styleElements[componentId];
}

function registerStyleElement(componentId: string, target?: Element) {
  if (styleElements[componentId]) {
    return styleElements[componentId];
  }
  const styleEl = createStyleElement();
  (target || getHead()).appendChild(styleEl);
  return (styleElements[componentId] = styleEl);
}

function createStyleElement() {
  const style = createElement('style');
  setAttribute(style, 'type', 'text/css');
  const textNode = createTextNode('');
  // Avoid Edge bug where empty style elements don't create sheets
  // (from styled-components)
  style.appendChild(textNode);
  return style;
}
