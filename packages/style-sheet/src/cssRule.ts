import {
  appendChild,
  createElement,
  createTextNode,
  getHead,
} from '@hopejs/renderer';
import { addScopeForSelector, isFunction, isString } from '@hopejs/shared';

const componentStyles: Record<string, HTMLStyleElement> = {};

export function addCssRuleListToStyleSheet(
  cssText: string,
  componentId: string
) {
  if (componentStyles[componentId]) return;
  componentStyles[componentId] = createStyleElement(cssText);
}

export function createCssRule(
  selector: string,
  style: CSSStyleDeclaration | string,
  scopeId: string
) {
  selector = addScopeForSelector(selector, scopeId);
  const { staticStyle, dynamicStyle } = processStyle(style);
  return {
    selector,
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
  const style = createElement('style');
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
  const dynamicStyle = {} as CSSStyleDeclaration;
  Object.keys(style).forEach((key: any) => {
    if (isFunction(style[key])) {
      dynamicStyle[key] = style[key];
      delete style[key];
    }
  });
  return { staticStyle: style, dynamicStyle };
}
