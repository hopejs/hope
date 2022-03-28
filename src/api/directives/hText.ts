import { appendChild, createTextNode } from "@/renderer";
import { callUpdated, getCurrentElement } from "@/core";
import { isFunction } from "@/shared";
import { outsideError } from "./outsideError";
import { autoUpdate } from "../autoUpdate";
import { getCurrentComponent } from "@/core/scheduler";

export function hText(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError("hText");

  const textNode = createTextNode("");
  if (isFunction(value)) {
    const currentComponent = getCurrentComponent()!;
    let oldValue: any;
    autoUpdate(() => {
      const newValue = value();
      if (oldValue === newValue) return;
      textNode.textContent = oldValue = newValue;
      callUpdated(currentComponent.ulh);
    });
  } else {
    textNode.textContent = value;
  }
  appendChild(currentElement!, textNode);
}
