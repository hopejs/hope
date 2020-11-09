import { effect } from "@hopejs/reactivity";
import { setAttribute } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { outsideWarn } from "./outsideWarn";

export function hAttr(name: string, value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => {
        setAttribute(currentElement, name, value());
      });
    } else {
      setAttribute(currentElement, name, value);
    }
  } else {
    outsideWarn("hAttr");
  }
}
