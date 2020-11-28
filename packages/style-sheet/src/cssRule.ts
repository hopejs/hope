import {
  appendChild,
  createElement,
  createTextNode,
  getHead,
} from '@hopejs/renderer';
import { addScopeForSelector, isFunction, isString } from '@hopejs/shared';

type DynamicStyle = CSSStyleDeclaration & {
  _hasStyle: boolean;
};
type HopejsStyleElement = HTMLStyleElement & { _hopejs_count: number };

const componentStyles: Record<string, HopejsStyleElement> = {};

export function addCssRuleListToStyleSheet(
  cssText: string,
  componentId: string
) {
  const styleEl = componentStyles[componentId];
  if (styleEl) {
    styleEl._hopejs_count++;
    return;
  }
  componentStyles[componentId] = createStyleElement(cssText);
}

export function createCssRule(
  selector: string,
  style: CSSStyleDeclaration | string,
  staticId: string,
  dynamicId: string
) {
  const { staticStyle, dynamicStyle } = processStyle(style);
  return {
    staticSelector: addScopeForSelector(selector, staticId),
    dynamicSelector: addScopeForSelector(selector, dynamicId),
    staticStyle,
    dynamicStyle,
  };
}

export function insertCssRule(cssText: string, componentId: string) {
  const style = componentStyles[componentId];
  if (style) {
    const sheet = style.sheet;
    const cssRules = sheet!.cssRules;
    const lenght = cssRules!.length;
    sheet!.insertRule(cssText, lenght);
    return cssRules[lenght];
  }
}

export function getStyleElementByComponentId(componentId: string) {
  return componentStyles[componentId];
}

function createStyleElement(cssText: string) {
  const node = createTextNode(cssText);
  const style = createElement('style') as HopejsStyleElement;
  // 表示组件总共创建了多少次实例，
  // 当所有实例都卸载时就 remove
  // 掉该 style 元素。
  style._hopejs_count = 1;
  appendChild(style, node);
  appendChild(getHead(), style);
  return style;
}

/**
 * 把动态样式和静态样式分开
 * @param style
 */
function processStyle(style: CSSStyleDeclaration | string) {
  if (isString(style)) return { staticStyle: style };
  const dynamicStyle = {} as DynamicStyle;
  Object.keys(style).forEach((key: any) => {
    if (isFunction(style[key])) {
      dynamicStyle._hasStyle || (dynamicStyle._hasStyle = true);
      dynamicStyle[key] = style[key];
      delete style[key];
    }
  });
  return { staticStyle: style, dynamicStyle };
}
