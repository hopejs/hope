import { setAttribute } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction, normalizeStyle, stringifyStyle } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";
import { callUpdated, getLifecycleHandlers } from "../lifecycle";

type CSSStyle<T = CSSStyleDeclaration> = {
  [P in keyof T]?: any;
};
type CSSStyleValue = CSSStyle | CSSStyle[];

export function hStyle(value: CSSStyleValue | (() => CSSStyleValue)): void;
export function hStyle(value: any) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      effect(() => {
        setAttribute(
          currentElement,
          "style",
          stringifyStyle(normalizeStyle(value()))
        );
        updatedHandlers && callUpdated(updatedHandlers);
      });
    } else {
      setAttribute(
        currentElement,
        "style",
        stringifyStyle(normalizeStyle(value))
      );
    }
  } else {
    outsideWarn("hStyle");
  }
}
