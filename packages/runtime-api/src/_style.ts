import {
  createCssRule,
  queueJob,
  getStyleElement as getStyleElementFromCore,
} from '@hopejs/runtime-core';
import { addScopeForSelector, isFunction } from '@hopejs/shared';
import { effect, stop } from '@hopejs/reactivity';
import { getCurrentCid, getCurrentDsid } from './defineComponent';
import { onUnmounted } from './lifecycle';

const styleTypes: Record<
  string,
  Record<'hasDynamic' | 'hasStatic', boolean>
> = {};

export function addCssRule(
  selector: string,
  style: Partial<CSSStyleDeclaration>
) {
  let componentId = getCurrentCid()!;
  const styleType =
    styleTypes[componentId] ||
    (styleTypes[componentId] = { hasDynamic: false, hasStatic: false });

  if (isDynamic(style)) {
    styleType.hasDynamic = true;
    selector = addScopeForSelector(selector, getCurrentDsid()!);
  } else {
    styleType.hasStatic = true;
    selector = addScopeForSelector(selector, componentId);
  }

  const cssRule = createCssRule(selector, '{}', componentId);
  if (cssRule) {
    setCssRule(cssRule as any, style);
  }
}

export function getStyleElement(componentId: string) {
  return getStyleElementFromCore(componentId);
}

export function hasDynamicStyle(componentId: string) {
  return styleTypes[componentId].hasDynamic;
}

export function hasStaticStyle(componentId: string) {
  return styleTypes[componentId].hasStatic;
}

function isDynamic(style: Partial<CSSStyleDeclaration>) {
  const keys = Object.keys(style);
  for (let i = 0; i < keys.length; i++) {
    if (isFunction(style[keys[i] as any])) {
      return true;
    }
  }
  return false;
}

function setCssRule(
  cssRule: CSSStyleRule | CSSKeyframeRule,
  style: Partial<CSSStyleDeclaration>
) {
  const cssRuleStyle = cssRule.style;
  Object.keys(style).forEach((key) => {
    const value = style[key as any];
    if (!value) return;
    if (isFunction(value)) {
      const ef = effect(
        () => {
          cssRuleStyle[key as any] = value();
        },
        { scheduler: queueJob }
      );
      onUnmounted(() => {
        stop(ef);
        deleteCssRule(cssRule);
      });
    } else {
      cssRuleStyle[key as any] = value;
    }
  });
}

function deleteCssRule(cssRule: CSSStyleRule | CSSKeyframeRule) {
  while (cssRule.parentRule) {
    cssRule = cssRule.parentRule as any;
  }
  const styleSheet = cssRule.parentStyleSheet;
  if (styleSheet) {
    styleSheet.deleteRule(getIndex(cssRule, styleSheet.cssRules));
  }
}

function getIndex(
  cssRule: CSSStyleRule | CSSKeyframeRule,
  cssRules: CSSRuleList
) {
  let lenght = cssRules.length;
  while (lenght--) {
    if (cssRules[lenght] === cssRule) {
      return lenght;
    }
  }
  return -1;
}
