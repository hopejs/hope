import {
  addCssRuleListToStyleSheet,
  createCssRule,
  getStyleElementByComponentId,
} from '@hopejs/style-sheet';
import { isString, stringifyStyle } from '@hopejs/shared';
import { inComponent } from '@hopejs/runtime-core';
import {
  getCurrentSid,
  getCurrentComponentDynamicCss,
  getCurrentComponentStaticCss,
  setAMethodForAddCss,
  setAMethodForGetStyleElement,
  setCurrentComponentStaticCss,
  getCurrentDid,
} from './defineComponent';

export function addCssRule(
  selector: string,
  style: CSSStyleDeclaration | string
) {
  if (!inComponent()) {
    // TODO: 在组件外部时，定义全局样式
    return;
  }

  // 在这里设置这两个方法，避免了 defineComponent 依赖
  // style-sheet 模块，有利于 tree-shaking。
  setAMethodForAddCss(addCssRuleListToStyleSheet);
  setAMethodForGetStyleElement(getStyleElementByComponentId);

  const staticId = getCurrentSid()!;
  const dynamicId = getCurrentDid()!;
  let staticCss = getCurrentComponentStaticCss() || '';
  const {
    staticSelector,
    dynamicSelector,
    staticStyle,
    dynamicStyle,
  } = createCssRule(selector, style, staticId, dynamicId);

  staticCss += `${staticSelector}${
    isString(staticStyle)
      ? staticStyle
      : `{${stringifyStyle(staticStyle as any)}}`
  }`;
  setCurrentComponentStaticCss(staticCss);
  if (dynamicStyle && dynamicStyle._hasStyle) {
    getCurrentComponentDynamicCss().push({
      selector: dynamicSelector,
      dynamicStyle,
    });
  }
}
