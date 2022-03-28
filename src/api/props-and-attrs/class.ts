import { callUpdated, getCurrentElement } from "@/core";
import { getCurrentComponent } from "@/core/scheduler";
import { isFunction } from "@/shared";
import { autoUpdate } from "../autoUpdate";

type ClassObject = Record<string, boolean>;
type ClassArray = (string | ClassObject)[];

export function setClass(value: ClassArray | (() => ClassArray)): void;
export function setClass(value: ClassObject | (() => ClassObject)): void;
export function setClass(value: string | (() => string)): void;
export function setClass(value: any) {
  const currentElement = getCurrentElement();
  if (isFunction(value)) {
    const currentComponent = getCurrentComponent()!;
    let oldValue: any;
    autoUpdate(() => {
      const newValue = value();
      if (oldValue === newValue) return;
      currentElement!.className = oldValue = newValue;
      callUpdated(currentComponent.ulh);
    });
  } else {
    currentElement!.className = value;
  }
}
