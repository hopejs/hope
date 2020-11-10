import { setAttribute } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction, normalizeClass } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";

type ClassObject = Record<string, any>;
type ClassArray = (string | ClassObject)[];

export function hClass(value: ClassArray | (() => ClassArray)): void;
export function hClass(value: ClassObject | (() => ClassObject)): void;
export function hClass(value: string | (() => string)): void;
export function hClass(value: any) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => {
        setAttribute(currentElement, "class", normalizeClass(value()));
      });
    } else {
      setAttribute(currentElement, "class", normalizeClass(value));
    }
  } else {
    outsideWarn("hClass");
  }
}
