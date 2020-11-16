import { effect } from "@hopejs/reactivity";
import { setAttribute } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { callUpdated, getLifecycleHandlers } from "../lifecycle";
import { outsideWarn } from "./outsideWarn";

export function hAttr(name: string, value: string | (() => string)) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers();
      effect(() => {
        setAttribute(currentElement, name, value());
        updatedHandlers && callUpdated(updatedHandlers);
      });
    } else {
      setAttribute(currentElement, name, value);
    }
  } else {
    outsideWarn("hAttr");
  }
}
