import { setAttribute } from "@hopejs/renderer";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction, normalizeClass } from "@hopejs/shared";
import { effect } from "@hopejs/reactivity";
import { outsideWarn } from "./outsideWarn";
import { callUpdated, getLifecycleHandlers } from "../lifecycle";

type ClassObject = Record<string, any>;
type ClassArray = (string | ClassObject)[];

export function hClass(value: ClassArray | (() => ClassArray)): void;
export function hClass(value: ClassObject | (() => ClassObject)): void;
export function hClass(value: string | (() => string)): void;
export function hClass(value: any) {
  // TODO: 该指令不允许在组件中使用

  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      const { updatedHandlers } = getLifecycleHandlers()!;
      effect(() => {
        setAttribute(currentElement, "class", normalizeClass(value()));
        updatedHandlers && callUpdated(updatedHandlers);
      });
    } else {
      setAttribute(currentElement, "class", normalizeClass(value));
    }
  } else {
    outsideWarn("hClass");
  }
}
