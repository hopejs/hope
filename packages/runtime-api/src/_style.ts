import {
  addCssRuleListToStyleSheet,
  createCssRule,
  getStyleElementByComponentId,
} from '@hopejs/style-sheet';
import { isString, stringifyStyle } from '@hopejs/shared';
import { inComponent } from '@hopejs/runtime-core';
import {
  getCurrentCid,
  getCurrentComponentDynamicCss,
  getCurrentComponentStaticCss,
  setAMethodForAddCss,
  setAMethodForGetStyleElement,
  setCurrentComponentStaticCss,
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

  const componentId = getCurrentCid()!;
  const dynamicCss = getCurrentComponentDynamicCss();
  let staticCss = getCurrentComponentStaticCss() || '';
  const { selector: se, staticStyle, dynamicStyle } = createCssRule(
    selector,
    style,
    componentId
  );

  staticCss += `${se}${
    isString(staticStyle)
      ? staticStyle
      : `{${stringifyStyle(staticStyle as any)}}`
  }`;
  setCurrentComponentStaticCss(staticCss);
  dynamicStyle &&
    dynamicCss.push({
      selector: se,
      dynamicStyle,
    });
}
