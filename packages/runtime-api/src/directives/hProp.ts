import { effect } from "@hopejs/reactivity";
import { getCurrentElement } from "@hopejs/runtime-core";
import { isFunction } from "@hopejs/shared";
import { outsideWarn } from "./outsideWarn";

export function hProp<K extends keyof HTMLElementTagNameMap>(
  key: keyof HTMLElementTagNameMap[K],
  value: unknown | (() => unknown)
): void;
export function hProp<K extends keyof SVGElementTagNameMap>(
  key: keyof SVGElementTagNameMap[K],
  value: unknown | (() => unknown)
): void;
export function hProp(key: any, value: unknown | (() => unknown)) {
  const currentElement = getCurrentElement();
  if (currentElement) {
    if (isFunction(value)) {
      effect(() => (currentElement as any)[key] = value());
    } else {
      (currentElement as any)[key] = value;
    }
  } else {
    outsideWarn("hProp");
  }
}
