import { appendChild, createTextNode } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";
import { callUpdated, getLifecycleHandlers } from "../lifecycle";

export function hText(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  const textNode = createTextNode("");
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers()!;
      effect(() => {
        textNode.textContent = value();
        updatedHandlers && callUpdated(updatedHandlers);
      });
    } else {
      textNode.textContent = value;
    }
    appendChild(currentElement, textNode);
  } else {
    outsideWarn("hText");
  }
}
