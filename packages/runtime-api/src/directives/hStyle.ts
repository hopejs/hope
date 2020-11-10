import { setAttribute } from "@hopejs/renderer/src";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction, normalizeStyle, stringifyStyle } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";

type CSSStyle<T = CSSStyleDeclaration> = {
  [P in keyof T]?: any;
};
type CSSStyleValue = CSSStyle | CSSStyle[];

export function hStyle(value: CSSStyleValue | (() => CSSStyleValue)): void;
export function hStyle(value: any) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => {
        setAttribute(
          currentElement,
          "style",
          stringifyStyle(normalizeStyle(value()))
        );
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
