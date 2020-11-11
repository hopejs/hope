import { appendChild, createComment } from "@hopejs/renderer/src";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";

export function hComment(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  const comment = createComment("");
  if (currentElement) {
    appendChild(currentElement, comment);
    if (isFunction(value)) {
      effect(() => {
        comment.textContent = value();
      });
    } else {
      comment.textContent = value;
    }
  } else {
    outsideWarn("hComment");
  }
}
