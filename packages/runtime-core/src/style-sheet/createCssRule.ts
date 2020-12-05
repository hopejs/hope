import {
  getLast,
  isKeyframesRule,
  isMediaRule,
  isStyleSheet,
} from '@hopejs/shared';
import { getStyleSheet } from './getStyleSheet';

type CssGroup = CSSStyleSheet | CSSMediaRule | CSSKeyframesRule | undefined;

let stackGroups: CssGroup[] = [];

export function createCssRule(
  selector: string,
  style: string,
  componentId: string
) {
  let group = getLast(stackGroups);
  if (!group && componentId) {
    group = getStyleSheet(componentId);
  }
  const cssText = selector + style;
  if (isStyleSheet(group) || isMediaRule(group)) {
    const lenght = group.cssRules.length;
    group.insertRule(cssText, lenght);
    return group.cssRules[lenght];
  }
  if (isKeyframesRule(group)) {
    group.appendRule(cssText);
    return group.findRule(selector);
  }
}

export function setGroup(v: CssGroup) {
  stackGroups.push(v);
}

export function resetGroup() {
  stackGroups.pop();
}
