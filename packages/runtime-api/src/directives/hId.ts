import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { setAttribute } from "@hopejs/renderer";
import { outsideWarn } from "./outsideWarn";
import { callUpdated, getLifecycleHandlers } from "../lifecycle";

export function hId(value: string | (() => string)) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers()!;
      effect(() => {
        setAttribute(currentElement, "id", value());
        updatedHandlers && callUpdated(updatedHandlers);
      });
    } else {
      setAttribute(currentElement, "id", value);
    }
  } else {
    outsideWarn("hId");
  }
}
