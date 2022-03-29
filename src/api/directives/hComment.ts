import { appendChild, createComment } from "@/renderer";
import { callUpdated, getCurrentElement } from "@/core";
import { isFunction } from "@/shared";
import { outsideError } from "./outsideError";
import { autoUpdate } from "../autoUpdate";
import { getCurrentComponent } from "@/core/scheduler";

export function hComment(value: string | (() => string)) {
  const currentElement = getCurrentElement();
  if (__DEV__ && !currentElement) return outsideError("hComment");

  const comment = createComment("");
  if (isFunction(value)) {
    const currentComponent = getCurrentComponent()!;
    let oldValue: any;
    autoUpdate(() => {
      const newValue = value();
      if (oldValue === newValue) return;
      comment.textContent = oldValue = newValue;
      callUpdated(currentComponent.ulh!);
    });
  } else {
    comment.textContent = value;
  }
  appendChild(currentElement!, comment);
}
