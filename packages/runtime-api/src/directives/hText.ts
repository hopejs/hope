import { appendChild, createTextNode } from "@hopejs/renderer/src";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@vue/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";

export function hText(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  const textNode = createTextNode("");
  if (currentElement) {
    appendChild(currentElement, textNode);
    if (isFunction(value)) {
      effect(() => {
        textNode.textContent = value();
      });
    } else {
      textNode.textContent = value;
    }
  } else {
    outsideWarn("hText");
  }
}
