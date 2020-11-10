import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";
import { setAttribute } from "@hopejs/renderer";

export function hId(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => {
        setAttribute(currentElement, "id", value());
      });
    } else {
      setAttribute(currentElement, "id", value);
    }
  } else {
    outsideWarn("hId");
  }
}
